import { m as models, b as buildPrompt } from "../../../../../../../chunks/models.js";
import { a as authCondition } from "../../../../../../../chunks/auth.js";
import { c as collections } from "../../../../../../../chunks/database.js";
import { i as isMessageId, b as buildSubtree } from "../../../../../../../chunks/buildSubtree.js";
import { e as error } from "../../../../../../../chunks/index.js";
import { ObjectId } from "mongodb";
async function GET({ params, locals }) {
  const conv = params.id.length === 7 ? await collections.sharedConversations.findOne({
    _id: params.id
  }) : await collections.conversations.findOne({
    _id: new ObjectId(params.id),
    ...authCondition(locals)
  });
  if (conv === null) {
    throw error(404, "Conversation not found");
  }
  const messageId = params.messageId;
  const messageIndex = conv.messages.findIndex((msg) => msg.id === messageId);
  if (!isMessageId(messageId) || messageIndex === -1) {
    throw error(404, "Message not found");
  }
  const model = models.find((m) => m.id === conv.model);
  if (!model) {
    throw error(404, "Conversation model not found");
  }
  const messagesUpTo = buildSubtree(conv, messageId);
  const prompt = await buildPrompt({
    preprompt: conv.preprompt,
    messages: messagesUpTo,
    model
  });
  return new Response(
    JSON.stringify(
      {
        note: "This is a preview of the prompt that will be sent to the model when retrying the message. It may differ from what was sent in the past if the parameters have been updated since",
        prompt,
        model: model.name,
        parameters: {
          ...model.parameters,
          return_full_text: false
        }
      },
      null,
      2
    ),
    { headers: { "Content-Type": "application/json" } }
  );
}
export {
  GET
};
