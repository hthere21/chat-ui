

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/privacy/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/12.4de47585.js","_app/immutable/chunks/scheduler.6a9d17f6.js","_app/immutable/chunks/index.f8ec6462.js","_app/immutable/chunks/marked.esm.76161808.js"];
export const stylesheets = [];
export const fonts = [];
