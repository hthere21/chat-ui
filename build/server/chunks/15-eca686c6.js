import { b as base } from './paths-05fee424.js';
import { r as redirect } from './index-0087e825.js';

async function load({ parent, params }) {
  const data = await parent();
  const model = data.models.find(({ id }) => id === params.model);
  if (!model || model.unlisted) {
    throw redirect(302, `${base}/settings`);
  }
  return data;
}

var _page_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 15;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-5816e216.js')).default;
const universal_id = "src/routes/settings/[...model]/+page.ts";
const imports = ["_app/immutable/nodes/15.05e171d3.js","_app/immutable/chunks/singletons.dcb5d507.js","_app/immutable/chunks/scheduler.6a9d17f6.js","_app/immutable/chunks/index.d7eb2526.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/index.f8ec6462.js","_app/immutable/chunks/stores.c2158893.js","_app/immutable/chunks/settings.053bb39b.js","_app/immutable/chunks/navigation.bcbcd3d3.js","_app/immutable/chunks/CopyToClipBoardBtn.abd1fd98.js","_app/immutable/chunks/arrow-up-right.f5284a17.js","_app/immutable/chunks/spread.84d39b6c.js","_app/immutable/chunks/link.7eccf3a0.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, stylesheets, _page_ts as universal, universal_id };
//# sourceMappingURL=15-eca686c6.js.map
