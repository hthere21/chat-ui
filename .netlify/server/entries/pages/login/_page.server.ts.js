import { r as redirect } from "../../../chunks/index.js";
import { g as getOIDCAuthorizationUrl } from "../../../chunks/auth.js";
import { b as base } from "../../../chunks/paths.js";
import { A as ALTERNATIVE_REDIRECT_URLS } from "../../../chunks/private.js";
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
export {
  actions
};
