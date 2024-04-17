import { c as collections } from './database-f81a56a9.js';
import { b as authCondition } from './auth-1c371d85.js';
import './private-f03b1afd.js';
import 'mongodb';
import 'openid-client';
import 'date-fns';
import 'zod';
import './environment-03c3dd82.js';
import './prod-ssr-7cc47430.js';
import 'json5';

async function GET({ locals }) {
  if (locals.user?._id || locals.sessionId) {
    const convs = await collections.conversations.find({
      ...authCondition(locals)
    }).project({
      title: 1,
      updatedAt: 1,
      model: 1
    }).sort({ updatedAt: -1 }).toArray();
    const res = convs.map((conv) => ({
      id: conv._id,
      title: conv.title,
      updatedAt: conv.updatedAt,
      modelId: conv.model
    }));
    return Response.json(res);
  } else {
    return Response.json({ message: "Must have session cookie" }, { status: 401 });
  }
}

export { GET };
//# sourceMappingURL=_server.ts-4b32d3ba.js.map
