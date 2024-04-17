import { b as authCondition } from './auth-1c371d85.js';
import { c as collections } from './database-f81a56a9.js';
import { e as error } from './index-0087e825.js';
import { ObjectId } from 'mongodb';
import { z } from 'zod';
import 'openid-client';
import 'date-fns';
import './private-f03b1afd.js';
import './environment-03c3dd82.js';
import './prod-ssr-7cc47430.js';
import 'json5';

async function POST({ params, request, locals }) {
  const { score } = z.object({
    score: z.number().int().min(-1).max(1)
  }).parse(await request.json());
  const conversationId = new ObjectId(params.id);
  const messageId = params.messageId;
  const document = await collections.conversations.updateOne(
    {
      _id: conversationId,
      ...authCondition(locals),
      "messages.id": messageId
    },
    {
      ...score !== 0 ? {
        $set: {
          "messages.$.score": score
        }
      } : { $unset: { "messages.$.score": "" } }
    }
  );
  if (!document.matchedCount) {
    throw error(404, "Message not found");
  }
  return new Response();
}

export { POST };
//# sourceMappingURL=_server.ts-ba9a66c8.js.map
