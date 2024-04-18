import { c as collections } from "../../../chunks/database.js";
import { z } from "zod";
import { a as authCondition } from "../../../chunks/auth.js";
import { D as DEFAULT_SETTINGS } from "../../../chunks/Settings.js";
async function POST({ request, locals }) {
  const body = await request.json();
  const { ethicsModalAccepted, ...settings } = z.object({
    shareConversationsWithModelAuthors: z.boolean().default(DEFAULT_SETTINGS.shareConversationsWithModelAuthors),
    hideEmojiOnSidebar: z.boolean().default(DEFAULT_SETTINGS.hideEmojiOnSidebar),
    ethicsModalAccepted: z.boolean().optional(),
    activeModel: z.string().default(DEFAULT_SETTINGS.activeModel),
    customPrompts: z.record(z.string()).default({})
  }).parse(body);
  await collections.settings.updateOne(
    authCondition(locals),
    {
      $set: {
        ...settings,
        ...ethicsModalAccepted && { ethicsModalAcceptedAt: /* @__PURE__ */ new Date() },
        updatedAt: /* @__PURE__ */ new Date()
      },
      $setOnInsert: {
        createdAt: /* @__PURE__ */ new Date()
      }
    },
    {
      upsert: true
    }
  );
  return new Response();
}
export {
  POST
};
