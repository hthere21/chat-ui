import { o as EXPOSE_API, C as COOKIE_NAME } from "./private.js";
import { g as PUBLIC_APP_DISCLAIMER, h as PUBLIC_GOOGLE_ANALYTICS_ID } from "./public.js";
import { c as collections } from "./database.js";
import { b as base } from "./paths.js";
import { s as sha256, f as findUser, b as refreshSessionCookie, r as requiresUser } from "./auth.js";
import { E as ERROR_MESSAGES } from "./errors.js";
import { addWeeks } from "date-fns";
const handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith(`${base}/api/`) && EXPOSE_API !== "true") {
    return new Response("API is disabled", { status: 403 });
  }
  function errorResponse(status, message) {
    const sendJson = event.request.headers.get("accept")?.includes("application/json") || event.request.headers.get("content-type")?.includes("application/json");
    return new Response(sendJson ? JSON.stringify({ error: message }) : message, {
      status,
      headers: {
        "content-type": sendJson ? "application/json" : "text/plain"
      }
    });
  }
  if (event.url.pathname.startsWith(`${base}/admin/`) || event.url.pathname === `${base}/admin`) {
    {
      return errorResponse(500, "Admin API is not configured");
    }
  }
  const token = event.cookies.get(COOKIE_NAME);
  let secretSessionId;
  let sessionId;
  if (token) {
    secretSessionId = token;
    sessionId = await sha256(token);
    const user = await findUser(sessionId);
    if (user) {
      event.locals.user = user;
    }
  } else {
    secretSessionId = crypto.randomUUID();
    sessionId = await sha256(secretSessionId);
    if (await collections.sessions.findOne({ sessionId })) {
      return errorResponse(500, "Session ID collision");
    }
  }
  event.locals.sessionId = sessionId;
  const requestContentType = event.request.headers.get("content-type")?.split(";")[0] ?? "";
  const nativeFormContentTypes = [
    "multipart/form-data",
    "application/x-www-form-urlencoded",
    "text/plain"
  ];
  if (event.request.method === "POST") {
    refreshSessionCookie(event.cookies, event.locals.sessionId);
    if (nativeFormContentTypes.includes(requestContentType)) {
      const referer = event.request.headers.get("referer");
      if (!referer) {
        return errorResponse(403, "Non-JSON form requests need to have a referer");
      }
      const validOrigins = [
        new URL(event.request.url).origin,
        ...[]
      ];
      if (!validOrigins.includes(new URL(referer).origin)) {
        return errorResponse(403, "Invalid referer for POST request");
      }
    }
  }
  if (event.request.method === "POST") {
    refreshSessionCookie(event.cookies, secretSessionId);
    await collections.sessions.updateOne(
      { sessionId },
      { $set: { updatedAt: /* @__PURE__ */ new Date(), expiresAt: addWeeks(/* @__PURE__ */ new Date(), 2) } }
    );
  }
  if (!event.url.pathname.startsWith(`${base}/login`) && !event.url.pathname.startsWith(`${base}/admin`) && !["GET", "OPTIONS", "HEAD"].includes(event.request.method)) {
    if (!event.locals.user && requiresUser && !(0 > 0)) {
      return errorResponse(401, ERROR_MESSAGES.authOnly);
    }
    if (!requiresUser && !event.url.pathname.startsWith(`${base}/settings`) && !!PUBLIC_APP_DISCLAIMER) {
      const hasAcceptedEthicsModal = await collections.settings.countDocuments({
        sessionId: event.locals.sessionId,
        ethicsModalAcceptedAt: { $exists: true }
      });
      if (!hasAcceptedEthicsModal) {
        return errorResponse(405, "You need to accept the welcome modal first");
      }
    }
  }
  let replaced = false;
  const response = await resolve(event, {
    transformPageChunk: (chunk) => {
      if (replaced || !chunk.html.includes("%gaId%")) {
        return chunk.html;
      }
      replaced = true;
      return chunk.html.replace("%gaId%", PUBLIC_GOOGLE_ANALYTICS_ID);
    }
  });
  return response;
};
export {
  handle
};
