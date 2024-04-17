import { m as models, b as buildPrompt } from './models-0e908230.js';
import { b as authCondition } from './auth-1c371d85.js';
import { c as collections } from './database-f81a56a9.js';
import { i as isMessageId, b as buildSubtree } from './buildSubtree-46fc8b76.js';
import { e as error } from './index-0087e825.js';
import { ObjectId } from 'mongodb';
import './private-f03b1afd.js';
import 'handlebars';
import 'zod';
import '@huggingface/inference';
import '@xenova/transformers';
import 'json5';
import 'openid-client';
import 'date-fns';
import './environment-03c3dd82.js';
import './prod-ssr-7cc47430.js';

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

export { GET };
//# sourceMappingURL=_server.ts-2ba0f706.js.map
