import { Issuer, custom } from 'openid-client';
import { addWeeks, addHours } from 'date-fns';
import { O as OPENID_CONFIG, f as OPENID_CLIENT_ID, g as OPENID_CLIENT_SECRET, h as OPENID_PROVIDER_URL, i as OPENID_SCOPES, j as OPENID_TOLERANCE, k as OPENID_RESOURCE, C as COOKIE_NAME } from './private-f03b1afd.js';
import { z } from 'zod';
import { d as dev } from './environment-03c3dd82.js';
import { c as collections } from './database-f81a56a9.js';
import JSON5 from 'json5';

async function sha256(input) {
  const utf8 = new TextEncoder().encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((bytes) => bytes.toString(16).padStart(2, "0")).join("");
  return hashHex;
}
const stringWithDefault = (value) => z.string().default(value).transform((el) => el ? el : value);
const OIDConfig = z.object({
  CLIENT_ID: stringWithDefault(OPENID_CLIENT_ID),
  CLIENT_SECRET: stringWithDefault(OPENID_CLIENT_SECRET),
  PROVIDER_URL: stringWithDefault(OPENID_PROVIDER_URL),
  SCOPES: stringWithDefault(OPENID_SCOPES),
  TOLERANCE: stringWithDefault(OPENID_TOLERANCE),
  RESOURCE: stringWithDefault(OPENID_RESOURCE)
}).parse(JSON5.parse(OPENID_CONFIG));
const requiresUser = !!OIDConfig.CLIENT_ID && !!OIDConfig.CLIENT_SECRET;
function refreshSessionCookie(cookies, sessionId) {
  cookies.set(COOKIE_NAME, sessionId, {
    path: "/",
    // So that it works inside the space's iframe
    sameSite: "none",
    secure: !dev,
    httpOnly: true,
    expires: addWeeks(/* @__PURE__ */ new Date(), 2)
  });
}
async function findUser(sessionId) {
  const session = await collections.sessions.findOne({ sessionId });
  if (!session) {
    return null;
  }
  return await collections.users.findOne({ _id: session.userId });
}
const authCondition = (locals) => {
  return locals.user ? { userId: locals.user._id } : { sessionId: locals.sessionId, userId: { $exists: false } };
};
async function generateCsrfToken(sessionId, redirectUrl) {
  const data = {
    expiration: addHours(/* @__PURE__ */ new Date(), 1).getTime(),
    redirectUrl
  };
  return Buffer.from(
    JSON.stringify({
      data,
      signature: await sha256(JSON.stringify(data) + "##" + sessionId)
    })
  ).toString("base64");
}
async function getOIDCClient(settings) {
  const issuer = await Issuer.discover(OIDConfig.PROVIDER_URL);
  return new issuer.Client({
    client_id: OIDConfig.CLIENT_ID,
    client_secret: OIDConfig.CLIENT_SECRET,
    redirect_uris: [settings.redirectURI],
    response_types: ["code"],
    [custom.clock_tolerance]: OIDConfig.TOLERANCE || void 0
  });
}
async function getOIDCAuthorizationUrl(settings, params) {
  const client = await getOIDCClient(settings);
  const csrfToken = await generateCsrfToken(params.sessionId, settings.redirectURI);
  return client.authorizationUrl({
    scope: OIDConfig.SCOPES,
    state: csrfToken,
    resource: OIDConfig.RESOURCE || void 0
  });
}
async function getOIDCUserData(settings, code) {
  const client = await getOIDCClient(settings);
  const token = await client.callback(settings.redirectURI, { code });
  const userData = await client.userinfo(token);
  return { token, userData };
}
async function validateAndParseCsrfToken(token, sessionId) {
  try {
    const { data, signature } = z.object({
      data: z.object({
        expiration: z.number().int(),
        redirectUrl: z.string().url()
      }),
      signature: z.string().length(64)
    }).parse(JSON.parse(token));
    const reconstructSign = await sha256(JSON.stringify(data) + "##" + sessionId);
    if (data.expiration > Date.now() && signature === reconstructSign) {
      return { redirectUrl: data.redirectUrl };
    }
  } catch (e) {
    console.error(e);
  }
  return null;
}

export { requiresUser as a, authCondition as b, getOIDCUserData as c, findUser as f, getOIDCAuthorizationUrl as g, refreshSessionCookie as r, sha256 as s, validateAndParseCsrfToken as v };
//# sourceMappingURL=auth-1c371d85.js.map
