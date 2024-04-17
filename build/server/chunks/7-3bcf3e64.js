import { b as base } from './paths-05fee424.js';
import { b as authCondition } from './auth-1c371d85.js';
import { c as collections } from './database-f81a56a9.js';
import { r as redirect } from './index-0087e825.js';
import 'openid-client';
import 'date-fns';
import './private-f03b1afd.js';
import 'zod';
import './environment-03c3dd82.js';
import './prod-ssr-7cc47430.js';
import 'json5';
import 'mongodb';

const actions = {
  async delete({ locals }) {
    if (locals.user?._id || locals.sessionId) {
      await collections.conversations.deleteMany({
        ...authCondition(locals)
      });
    }
    throw redirect(303, `${base}/`);
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 7;
const server_id = "src/routes/conversations/+page.server.ts";
const imports = [];
const stylesheets = [];
const fonts = [];

export { fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=7-3bcf3e64.js.map
