import { c as collections } from './database-f81a56a9.js';
import { e as error } from './index-0087e825.js';
import './private-f03b1afd.js';
import 'mongodb';

const NUM_PER_PAGE = 24;
const load = async ({ url, locals }) => {
  const modelId = url.searchParams.get("modelId");
  const pageIndex = parseInt(url.searchParams.get("p") ?? "0");
  const username = url.searchParams.get("user");
  const createdByCurrentUser = locals.user?.username && locals.user.username === username;
  let user = null;
  if (username) {
    user = await collections.users.findOne(
      { username },
      { projection: { _id: 1 } }
    );
    if (!user) {
      throw error(404, `User "${username}" doesn't exist`);
    }
  }
  const filter = {
    ...modelId && { modelId },
    ...!createdByCurrentUser && { userCount: { $gt: 1 } },
    ...user ? { createdById: user._id } : { featured: true }
  };
  const assistants = await collections.assistants.find(filter).skip(NUM_PER_PAGE * pageIndex).sort({ userCount: -1 }).limit(NUM_PER_PAGE).toArray();
  const numTotalItems = await collections.assistants.countDocuments(filter);
  return {
    assistants: JSON.parse(JSON.stringify(assistants)),
    selectedModel: modelId ?? "",
    numTotalItems,
    numItemsPerPage: NUM_PER_PAGE
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-753bd369.js')).default;
const server_id = "src/routes/assistants/+page.server.ts";
const imports = ["_app/immutable/nodes/5.b86eb4f0.js","_app/immutable/chunks/scheduler.6a9d17f6.js","_app/immutable/chunks/index.f8ec6462.js","_app/immutable/chunks/each.81050b20.js","_app/immutable/chunks/isHuggingChat.69ebbc03.js","_app/immutable/chunks/public.bedf1950.js","_app/immutable/chunks/navigation.bcbcd3d3.js","_app/immutable/chunks/singletons.dcb5d507.js","_app/immutable/chunks/stores.c2158893.js","_app/immutable/chunks/add.51f471f2.js","_app/immutable/chunks/spread.84d39b6c.js","_app/immutable/chunks/close.5676f196.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-c6179b56.js.map
