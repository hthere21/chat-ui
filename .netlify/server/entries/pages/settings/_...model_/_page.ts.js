import { b as base } from "../../../../chunks/paths.js";
import { r as redirect } from "../../../../chunks/index.js";
async function load({ parent, params }) {
  const data = await parent();
  const model = data.models.find(({ id }) => id === params.model);
  if (!model || model.unlisted) {
    throw redirect(302, `${base}/settings`);
  }
  return data;
}
export {
  load
};
