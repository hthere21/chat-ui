import { c as collections } from "../../../../chunks/database.js";
import { ObjectId } from "mongodb";
import { e as error } from "../../../../chunks/index.js";
import { a as authCondition } from "../../../../chunks/auth.js";
import { U as UrlDependency } from "../../../../chunks/UrlDependency.js";
import { c as convertLegacyConversation } from "../../../../chunks/convertLegacyConversation.js";
const load = async ({ params, depends, locals }) => {
  let conversation;
  let shared = false;
  if (params.id.length === 7) {
    conversation = await collections.sharedConversations.findOne({
      _id: params.id
    });
    shared = true;
    if (!conversation) {
      throw error(404, "Conversation not found");
    }
  } else {
    conversation = await collections.conversations.findOne({
      _id: new ObjectId(params.id),
      ...authCondition(locals)
    });
    depends(UrlDependency.Conversation);
    if (!conversation) {
      const conversationExists = await collections.conversations.countDocuments({
        _id: new ObjectId(params.id)
      }) !== 0;
      if (conversationExists) {
        throw error(
          403,
          "You don't have access to this conversation. If someone gave you this link, ask them to use the 'share' feature instead."
        );
      }
      throw error(404, "Conversation not found.");
    }
  }
  const convertedConv = { ...conversation, ...convertLegacyConversation(conversation) };
  return {
    messages: convertedConv.messages,
    title: convertedConv.title,
    model: convertedConv.model,
    preprompt: convertedConv.preprompt,
    rootMessageId: convertedConv.rootMessageId,
    assistant: convertedConv.assistantId ? JSON.parse(
      JSON.stringify(
        await collections.assistants.findOne({
          _id: new ObjectId(convertedConv.assistantId)
        })
      )
    ) : null,
    shared
  };
};
export {
  load
};
