import * as universal from '../entries/pages/settings/assistants/_assistantId_/_page.ts.js';
import * as server from '../entries/pages/settings/assistants/_assistantId_/_page.server.ts.js';

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/settings/assistants/_assistantId_/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/settings/assistants/[assistantId]/+page.ts";
export { server };
export const server_id = "src/routes/settings/assistants/[assistantId]/+page.server.ts";
export const imports = ["_app/immutable/nodes/16.89ea90dc.js","_app/immutable/chunks/singletons.58259e5f.js","_app/immutable/chunks/scheduler.6a9d17f6.js","_app/immutable/chunks/index.d7eb2526.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/index.f8ec6462.js","_app/immutable/chunks/forms.424ece40.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/navigation.4764795c.js","_app/immutable/chunks/stores.9c2196c4.js","_app/immutable/chunks/settings.e19938f8.js","_app/immutable/chunks/pen.34648ac3.js","_app/immutable/chunks/spread.84d39b6c.js","_app/immutable/chunks/trash-can.c73da904.js","_app/immutable/chunks/link.7eccf3a0.js","_app/immutable/chunks/CopyToClipBoardBtn.abd1fd98.js","_app/immutable/chunks/Modal.7c732ae4.js","_app/immutable/chunks/index.e2b52378.js"];
export const stylesheets = [];
export const fonts = [];
