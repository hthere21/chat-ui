import * as server from '../entries/pages/assistants/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/assistants/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/assistants/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.49c66edf.js","_app/immutable/chunks/scheduler.6a9d17f6.js","_app/immutable/chunks/index.f8ec6462.js","_app/immutable/chunks/each.81050b20.js","_app/immutable/chunks/isHuggingChat.69ebbc03.js","_app/immutable/chunks/public.bedf1950.js","_app/immutable/chunks/navigation.4764795c.js","_app/immutable/chunks/singletons.58259e5f.js","_app/immutable/chunks/stores.9c2196c4.js","_app/immutable/chunks/add.51f471f2.js","_app/immutable/chunks/spread.84d39b6c.js","_app/immutable/chunks/close.5676f196.js"];
export const stylesheets = [];
export const fonts = [];
