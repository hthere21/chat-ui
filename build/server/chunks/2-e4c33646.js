import { c as collections } from './database-f81a56a9.js';
import './private-f03b1afd.js';
import 'mongodb';

const load = async ({ locals, parent }) => {
  const { assistants } = await parent();
  let reportsByUser = [];
  const createdBy = locals.user?._id ?? locals.sessionId;
  if (createdBy) {
    const reports = await collections.reports.find({ createdBy }, { projection: { _id: 0, assistantId: 1 } }).toArray();
    reportsByUser = reports.map((r) => r.assistantId.toString());
  }
  return {
    assistants: assistants.map((el) => ({
      ...el,
      reported: reportsByUser.includes(el._id)
    }))
  };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 2;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-4b5b95a4.js')).default;
const server_id = "src/routes/settings/+layout.server.ts";
const imports = ["_app/immutable/nodes/2.cbd9cc1e.js","_app/immutable/chunks/scheduler.6a9d17f6.js","_app/immutable/chunks/index.f8ec6462.js","_app/immutable/chunks/each.81050b20.js","_app/immutable/chunks/singletons.dcb5d507.js","_app/immutable/chunks/clickOutside.d00b6908.js","_app/immutable/chunks/navigation.bcbcd3d3.js","_app/immutable/chunks/stores.c2158893.js","_app/immutable/chunks/settings.053bb39b.js","_app/immutable/chunks/close.5676f196.js","_app/immutable/chunks/spread.84d39b6c.js","_app/immutable/chunks/checkmark.c1ac77be.js","_app/immutable/chunks/add.51f471f2.js","_app/immutable/chunks/index.e2b52378.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=2-e4c33646.js.map
