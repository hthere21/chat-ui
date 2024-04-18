import { c as collections } from "../../../../../chunks/database.js";
import { a as authCondition } from "../../../../../chunks/auth.js";
import { z } from "zod";
import { ObjectId } from "mongodb";
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
export {
  GET
};
