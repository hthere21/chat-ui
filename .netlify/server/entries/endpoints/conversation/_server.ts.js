import { c as collections } from "../../../chunks/database.js";
import { ObjectId } from "mongodb";
import { e as error, r as redirect } from "../../../chunks/index.js";
import { b as base } from "../../../chunks/paths.js";
import { z } from "zod";
import { v as validateModel, m as models, d as defaultEmbeddingModel } from "../../../chunks/models.js";
const POST = async ({ locals, request }) => {
  const body = await request.text();
  let title = "";
  const values = z.object({
    fromShare: z.string().optional(),
    model: validateModel(models),
    assistantId: z.string().optional(),
    preprompt: z.string().optional()
  }).parse(JSON.parse(body));
  let messages = [
    {
      id: crypto.randomUUID(),
      from: "system",
      content: values.preprompt ?? "",
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date(),
      children: [],
      ancestors: []
    }
  ];
  let rootMessageId = messages[0].id;
  let embeddingModel;
  if (values.fromShare) {
    const conversation = await collections.sharedConversations.findOne({
      _id: values.fromShare
    });
    if (!conversation) {
      throw error(404, "Conversation not found");
    }
    title = conversation.title;
    messages = conversation.messages;
    rootMessageId = conversation.rootMessageId ?? rootMessageId;
    values.model = conversation.model;
    values.preprompt = conversation.preprompt;
    values.assistantId = conversation.assistantId?.toString();
    embeddingModel = conversation.embeddingModel;
  }
  const model = models.find((m) => m.name === values.model);
  if (!model) {
    throw error(400, "Invalid model");
  }
  embeddingModel ??= model.embeddingModel ?? defaultEmbeddingModel.name;
  if (model.unlisted) {
    throw error(400, "Can't start a conversation with an unlisted model");
  }
  const preprompt = await (async () => {
    if (values.assistantId) {
      const assistant = await collections.assistants.findOne({
        _id: new ObjectId(values.assistantId)
      });
      return assistant?.preprompt;
    } else {
      return values?.preprompt ?? model?.preprompt;
    }
  })();
  const res = await collections.conversations.insertOne({
    _id: new ObjectId(),
    title: title || "New Chat",
    rootMessageId,
    messages,
    model: values.model,
    preprompt: preprompt === model?.preprompt ? model?.preprompt : preprompt,
    assistantId: values.assistantId ? new ObjectId(values.assistantId) : void 0,
    createdAt: /* @__PURE__ */ new Date(),
    updatedAt: /* @__PURE__ */ new Date(),
    embeddingModel,
    ...locals.user ? { userId: locals.user._id } : { sessionId: locals.sessionId },
    ...values.fromShare ? { meta: { fromShareId: values.fromShare } } : {}
  });
  return new Response(
    JSON.stringify({
      conversationId: res.insertedId.toString()
    }),
    { headers: { "Content-Type": "application/json" } }
  );
};
const GET = async () => {
  throw redirect(302, `${base}/`);
};
export {
  GET,
  POST
};
