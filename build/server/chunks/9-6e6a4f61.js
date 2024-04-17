import { e as error, r as redirect } from './index-0087e825.js';
import { v as validateAndParseCsrfToken, c as getOIDCUserData, s as sha256, r as refreshSessionCookie } from './auth-1c371d85.js';
import { z } from 'zod';
import { b as base } from './paths-05fee424.js';
import { c as collections } from './database-f81a56a9.js';
import { ObjectId } from 'mongodb';
import { D as DEFAULT_SETTINGS } from './Settings-606b351b.js';
import crypto from 'crypto';
import { addWeeks } from 'date-fns';
import { b as ALLOWED_USER_EMAILS } from './private-f03b1afd.js';
import JSON5 from 'json5';
import 'openid-client';
import './environment-03c3dd82.js';
import './prod-ssr-7cc47430.js';
import './models-0e908230.js';
import 'handlebars';
import '@huggingface/inference';
import '@xenova/transformers';

async function updateUser(params) {
  const { userData, locals, cookies, userAgent, ip } = params;
  if (!userData.preferred_username && userData.upn) {
    userData.preferred_username = userData.upn;
  }
  const {
    preferred_username: username,
    name,
    email,
    picture: avatarUrl,
    sub: hfUserId
  } = z.object({
    preferred_username: z.string().optional(),
    name: z.string(),
    picture: z.string().optional(),
    sub: z.string(),
    email: z.string().email().optional()
  }).refine((data) => data.preferred_username || data.email, {
    message: "Either preferred_username or email must be provided by the provider."
  }).parse(userData);
  const existingUser = await collections.users.findOne({ hfUserId });
  let userId = existingUser?._id;
  const previousSessionId = locals.sessionId;
  const secretSessionId = crypto.randomUUID();
  const sessionId = await sha256(secretSessionId);
  if (await collections.sessions.findOne({ sessionId })) {
    throw error(500, "Session ID collision");
  }
  locals.sessionId = sessionId;
  if (existingUser) {
    await collections.users.updateOne(
      { _id: existingUser._id },
      { $set: { username, name, avatarUrl } }
    );
    await collections.sessions.deleteOne({ sessionId: previousSessionId });
    await collections.sessions.insertOne({
      _id: new ObjectId(),
      sessionId: locals.sessionId,
      userId: existingUser._id,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date(),
      userAgent,
      ip,
      expiresAt: addWeeks(/* @__PURE__ */ new Date(), 2)
    });
    refreshSessionCookie(cookies, secretSessionId);
  } else {
    const { insertedId } = await collections.users.insertOne({
      _id: new ObjectId(),
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date(),
      username,
      name,
      email,
      avatarUrl,
      hfUserId
    });
    userId = insertedId;
    await collections.sessions.insertOne({
      _id: new ObjectId(),
      sessionId: locals.sessionId,
      userId,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date(),
      userAgent,
      ip,
      expiresAt: addWeeks(/* @__PURE__ */ new Date(), 2)
    });
    const { matchedCount } = await collections.settings.updateOne(
      { sessionId: previousSessionId },
      {
        $set: { userId, updatedAt: /* @__PURE__ */ new Date() },
        $unset: { sessionId: "" }
      }
    );
    if (!matchedCount) {
      await collections.settings.insertOne({
        userId,
        ethicsModalAcceptedAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date(),
        createdAt: /* @__PURE__ */ new Date(),
        ...DEFAULT_SETTINGS
      });
    }
  }
  await collections.conversations.updateMany(
    { sessionId: previousSessionId },
    {
      $set: { userId },
      $unset: { sessionId: "" }
    }
  );
}
const allowedUserEmails = z.array(z.string().email()).optional().default([]).parse(JSON5.parse(ALLOWED_USER_EMAILS));
async function load({ url, locals, cookies, request, getClientAddress }) {
  const { error: errorName, error_description: errorDescription } = z.object({
    error: z.string().optional(),
    error_description: z.string().optional()
  }).parse(Object.fromEntries(url.searchParams.entries()));
  if (errorName) {
    throw error(400, errorName + (errorDescription ? ": " + errorDescription : ""));
  }
  const { code, state } = z.object({
    code: z.string(),
    state: z.string()
  }).parse(Object.fromEntries(url.searchParams.entries()));
  const csrfToken = Buffer.from(state, "base64").toString("utf-8");
  const validatedToken = await validateAndParseCsrfToken(csrfToken, locals.sessionId);
  if (!validatedToken) {
    throw error(403, "Invalid or expired CSRF token");
  }
  const { userData } = await getOIDCUserData({ redirectURI: validatedToken.redirectUrl }, code);
  if (allowedUserEmails.length > 0) {
    if (!userData.email) {
      throw error(403, "User not allowed: email not returned");
    }
    const emailVerified = userData.email_verified ?? true;
    if (!emailVerified) {
      throw error(403, "User not allowed: email not verified");
    }
    if (!allowedUserEmails.includes(userData.email)) {
      throw error(403, "User not allowed");
    }
  }
  await updateUser({
    userData,
    locals,
    cookies,
    userAgent: request.headers.get("user-agent") ?? void 0,
    ip: getClientAddress()
  });
  throw redirect(302, `${base}/`);
}

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 9;
const server_id = "src/routes/login/callback/+page.server.ts";
const imports = [];
const stylesheets = [];
const fonts = [];

export { fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=9-6e6a4f61.js.map
