import { b as authCondition } from './auth-1c371d85.js';
import { c as collections } from './database-f81a56a9.js';
import { e as error } from './index-0087e825.js';
import { ObjectId } from 'mongodb';
import 'openid-client';
import 'date-fns';
import './private-f03b1afd.js';
import 'zod';
import './environment-03c3dd82.js';
import './prod-ssr-7cc47430.js';
import 'json5';

async function POST({ params, locals }) {
  const conversationId = new ObjectId(params.id);
  const conversation = await collections.conversations.findOne({
    _id: conversationId,
    ...authCondition(locals)
  });
  if (!conversation) {
    throw error(404, "Conversation not found");
  }
  await collections.abortedGenerations.updateOne(
    { conversationId },
    { $set: { updatedAt: /* @__PURE__ */ new Date() }, $setOnInsert: { createdAt: /* @__PURE__ */ new Date() } },
    { upsert: true }
  );
  return new Response();
}

export { POST };
//# sourceMappingURL=_server.ts-1548c5b3.js.map
