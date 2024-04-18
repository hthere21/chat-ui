import { c as collections } from "../../../chunks/database.js";
import { e as error } from "../../../chunks/index.js";
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
export {
  load
};
