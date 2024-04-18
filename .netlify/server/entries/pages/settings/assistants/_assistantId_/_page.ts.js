import { b as base } from "../../../../../chunks/paths.js";
import { r as redirect } from "../../../../../chunks/index.js";
async function load({ parent, params }) {
  const data = await parent();
  const assistant = data.settings.assistants.find((id) => id === params.assistantId);
  if (!assistant) {
    throw redirect(302, `${base}/assistant/${params.assistantId}`);
  }
  return data;
}
export {
  load
};
