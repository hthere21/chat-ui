import { b as base } from "../../../../chunks/paths.js";
import { c as collections } from "../../../../chunks/database.js";
import { r as redirect } from "../../../../chunks/index.js";
import { ObjectId } from "mongodb";
const load = async ({ params }) => {
  try {
    const assistant = await collections.assistants.findOne({
      _id: new ObjectId(params.assistantId)
    });
    if (!assistant) {
      throw redirect(302, `${base}`);
    }
    return { assistant: JSON.parse(JSON.stringify(assistant)) };
  } catch {
    throw redirect(302, `${base}`);
  }
};
export {
  load
};
