import * as server from '../entries/pages/settings/assistants/new/_page.server.ts.js';

export const index = 18;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/settings/assistants/new/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/settings/assistants/new/+page.server.ts";
export const imports = ["_app/immutable/nodes/18.a22ca8df.js","_app/immutable/chunks/scheduler.6a9d17f6.js","_app/immutable/chunks/index.f8ec6462.js","_app/immutable/chunks/AssistantSettings.d61fbebf.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/each.81050b20.js","_app/immutable/chunks/forms.424ece40.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.58259e5f.js","_app/immutable/chunks/navigation.4764795c.js","_app/immutable/chunks/pen.34648ac3.js","_app/immutable/chunks/spread.84d39b6c.js","_app/immutable/chunks/IconLoading.fcfe275c.js","_app/immutable/chunks/settings.e19938f8.js"];
export const stylesheets = [];
export const fonts = [];
