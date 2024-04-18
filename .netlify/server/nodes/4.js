import * as server from '../entries/pages/assistant/_assistantId_/_page.server.ts.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/assistant/_assistantId_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/assistant/[assistantId]/+page.server.ts";
export const imports = ["_app/immutable/nodes/4.5cb86168.js","_app/immutable/chunks/scheduler.6a9d17f6.js","_app/immutable/chunks/index.f8ec6462.js","_app/immutable/chunks/singletons.58259e5f.js","_app/immutable/chunks/clickOutside.d00b6908.js","_app/immutable/chunks/navigation.4764795c.js","_app/immutable/chunks/settings.e19938f8.js","_app/immutable/chunks/forms.424ece40.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/public.bedf1950.js","_app/immutable/chunks/stores.9c2196c4.js"];
export const stylesheets = [];
export const fonts = [];
