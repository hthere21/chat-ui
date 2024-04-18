import * as server from '../entries/pages/settings/_layout.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/settings/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/settings/+layout.server.ts";
export const imports = ["_app/immutable/nodes/2.0f7aa4db.js","_app/immutable/chunks/scheduler.6a9d17f6.js","_app/immutable/chunks/index.f8ec6462.js","_app/immutable/chunks/each.81050b20.js","_app/immutable/chunks/singletons.58259e5f.js","_app/immutable/chunks/clickOutside.d00b6908.js","_app/immutable/chunks/navigation.4764795c.js","_app/immutable/chunks/stores.9c2196c4.js","_app/immutable/chunks/settings.e19938f8.js","_app/immutable/chunks/close.5676f196.js","_app/immutable/chunks/spread.84d39b6c.js","_app/immutable/chunks/checkmark.c1ac77be.js","_app/immutable/chunks/add.51f471f2.js","_app/immutable/chunks/index.e2b52378.js"];
export const stylesheets = [];
export const fonts = [];
