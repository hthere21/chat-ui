import { b as base } from './paths-05fee424.js';
import { c as collections } from './database-f81a56a9.js';
import { r as redirect } from './index-0087e825.js';
import { ObjectId } from 'mongodb';
import './private-f03b1afd.js';

const load = async ({ params }) => {
  try {
    const assistant = await collections.assistants.findOne({
      _id: new ObjectId(params.assistantId)
    });
    if (!assistant) {
      throw redirect(302, `${base}`);
    }
    return { assistant: JSON.parse(JSON.stringify(assistant)) };
  } catch {
    throw redirect(302, `${base}`);
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 4;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-90c7dfee.js')).default;
const server_id = "src/routes/assistant/[assistantId]/+page.server.ts";
const imports = ["_app/immutable/nodes/4.22f89016.js","_app/immutable/chunks/scheduler.6a9d17f6.js","_app/immutable/chunks/index.f8ec6462.js","_app/immutable/chunks/singletons.dcb5d507.js","_app/immutable/chunks/clickOutside.d00b6908.js","_app/immutable/chunks/navigation.bcbcd3d3.js","_app/immutable/chunks/settings.053bb39b.js","_app/immutable/chunks/forms.425d80cf.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/public.bedf1950.js","_app/immutable/chunks/stores.c2158893.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-b007f676.js.map
