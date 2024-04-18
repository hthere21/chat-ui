

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.1b0badc1.js","_app/immutable/chunks/scheduler.6a9d17f6.js","_app/immutable/chunks/index.f8ec6462.js","_app/immutable/chunks/stores.9c2196c4.js","_app/immutable/chunks/singletons.58259e5f.js"];
export const stylesheets = [];
export const fonts = [];
