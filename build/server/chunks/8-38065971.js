import { r as redirect } from './index-0087e825.js';
import { g as getOIDCAuthorizationUrl } from './auth-1c371d85.js';
import { b as base } from './paths-05fee424.js';
import { A as ALTERNATIVE_REDIRECT_URLS } from './private-f03b1afd.js';
import 'openid-client';
import 'date-fns';
import 'zod';
import './environment-03c3dd82.js';
import './prod-ssr-7cc47430.js';
import './database-f81a56a9.js';
import 'mongodb';
import 'json5';

const actions = {
  async default({ url, locals, request }) {
    const referer = request.headers.get("referer");
    let redirectURI = `${(referer ? new URL(referer) : url).origin}${base}/login/callback`;
    if (url.searchParams.has("callback")) {
      const callback = url.searchParams.get("callback") || redirectURI;
      if (ALTERNATIVE_REDIRECT_URLS.includes(callback)) {
        redirectURI = callback;
      }
    }
    const authorizationUrl = await getOIDCAuthorizationUrl(
      { redirectURI },
      { sessionId: locals.sessionId }
    );
    throw redirect(303, authorizationUrl);
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 8;
const server_id = "src/routes/login/+page.server.ts";
const imports = [];
const stylesheets = [];
const fonts = [];

export { fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=8-38065971.js.map
