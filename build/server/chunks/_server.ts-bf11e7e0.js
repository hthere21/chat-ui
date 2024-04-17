import { b as authCondition, s as sha256 } from './auth-1c371d85.js';
import { c as collections } from './database-f81a56a9.js';
import { b as base } from './paths-05fee424.js';
import { e as error } from './index-0087e825.js';
import { ObjectId } from 'mongodb';
import { nanoid } from 'nanoid';
import 'openid-client';
import 'date-fns';
import './private-f03b1afd.js';
import 'zod';
import './environment-03c3dd82.js';
import './prod-ssr-7cc47430.js';
import 'json5';

function getShareUrl(url, shareId) {
  return `${`${url.origin}${base}`}/r/${shareId}`;
}
async function hashConv(conv) {
  const messages = conv.messages.map((message) => {
    return (({ from, id, content, webSearchId }) => ({ from, id, content, webSearchId }))(message);
  });
  const hash = await sha256(JSON.stringify(messages));
  return hash;
}
async function POST({ params, url, locals }) {
  const conversation = await collections.conversations.findOne({
    _id: new ObjectId(params.id),
    ...authCondition(locals)
  });
  if (!conversation) {
    throw error(404, "Conversation not found");
  }
  const hash = await hashConv(conversation);
  const existingShare = await collections.sharedConversations.findOne({ hash });
  if (existingShare) {
    return new Response(
      JSON.stringify({
        url: getShareUrl(url, existingShare._id)
      }),
      { headers: { "Content-Type": "application/json" } }
    );
  }
  const shared = {
    _id: nanoid(7),
    hash,
    createdAt: /* @__PURE__ */ new Date(),
    updatedAt: /* @__PURE__ */ new Date(),
    rootMessageId: conversation.rootMessageId,
    messages: conversation.messages,
    title: conversation.title,
    model: conversation.model,
    embeddingModel: conversation.embeddingModel,
    preprompt: conversation.preprompt,
    assistantId: conversation.assistantId
  };
  await collections.sharedConversations.insertOne(shared);
  const files = await collections.bucket.find({ filename: { $regex: `${conversation._id}-` } }).toArray();
  await Promise.all(
    files.map(async (file) => {
      const newFilename = file.filename.replace(`${conversation._id}-`, `${shared._id}-`);
      const downloadStream = collections.bucket.openDownloadStream(file._id);
      const uploadStream = collections.bucket.openUploadStream(newFilename, {
        metadata: { ...file.metadata, conversation: shared._id.toString() }
      });
      downloadStream.pipe(uploadStream);
    })
  );
  return new Response(
    JSON.stringify({
      url: getShareUrl(url, shared._id)
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}

export { POST };
//# sourceMappingURL=_server.ts-bf11e7e0.js.map
