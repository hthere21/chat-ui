import { c as collections } from './database-f81a56a9.js';
import { b as authCondition } from './auth-1c371d85.js';
import { z } from 'zod';
import { ObjectId } from 'mongodb';
import './private-f03b1afd.js';
import 'openid-client';
import 'date-fns';
import './environment-03c3dd82.js';
import './prod-ssr-7cc47430.js';
import 'json5';

async function GET({ locals, params }) {
  const id = z.string().parse(params.id);
  const convId = new ObjectId(id);
  if (locals.user?._id || locals.sessionId) {
    const conv = await collections.conversations.findOne({
      _id: convId,
      ...authCondition(locals)
    });
    if (conv) {
      const res = {
        id: conv._id,
        title: conv.title,
        updatedAt: conv.updatedAt,
        modelId: conv.model,
        messages: conv.messages.map((message) => ({
          content: message.content,
          from: message.from,
          id: message.id,
          createdAt: message.createdAt,
          updatedAt: message.updatedAt,
          webSearch: message.webSearch
        }))
      };
      return Response.json(res);
    } else {
      return Response.json({ message: "Conversation not found" }, { status: 404 });
    }
  } else {
    return Response.json({ message: "Must have session cookie" }, { status: 401 });
  }
}

export { GET };
//# sourceMappingURL=_server.ts-915c1ab1.js.map
