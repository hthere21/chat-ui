import { c as collections } from './database-f81a56a9.js';
import { U as UrlDependency } from './UrlDependency-114c02d5.js';
import { v as validateModel, d as defaultModel, m as models, o as oldModels } from './models-0e908230.js';
import { b as authCondition, a as requiresUser } from './auth-1c371d85.js';
import { D as DEFAULT_SETTINGS } from './Settings-606b351b.js';
import { S as SEARXNG_QUERY_URL, a as ENABLE_ASSISTANTS } from './private-f03b1afd.js';
import { ObjectId } from 'mongodb';
import 'handlebars';
import 'zod';
import '@huggingface/inference';
import '@xenova/transformers';
import 'json5';
import 'openid-client';
import 'date-fns';
import './environment-03c3dd82.js';
import './prod-ssr-7cc47430.js';

const load = async ({ locals, depends }) => {
  depends(UrlDependency.ConversationList);
  const settings = await collections.settings.findOne(authCondition(locals));
  if (settings && !validateModel(models).safeParse(settings?.activeModel).success && !settings.assistants?.map((el) => el.toString())?.includes(settings?.activeModel)) {
    settings.activeModel = defaultModel.id;
    await collections.settings.updateOne(authCondition(locals), {
      $set: { activeModel: defaultModel.id }
    });
  }
  if (settings?.activeModel && models.find((m) => m.id === settings?.activeModel)?.unlisted === true) {
    settings.activeModel = defaultModel.id;
    await collections.settings.updateOne(authCondition(locals), {
      $set: { activeModel: defaultModel.id }
    });
  }
  const enableAssistants = ENABLE_ASSISTANTS === "true";
  const assistantActive = !models.map(({ id }) => id).includes(settings?.activeModel ?? "");
  const assistant = assistantActive ? JSON.parse(
    JSON.stringify(
      await collections.assistants.findOne({
        _id: new ObjectId(settings?.activeModel)
      })
    )
  ) : null;
  const conversations = await collections.conversations.find(authCondition(locals)).sort({ updatedAt: -1 }).project({
    title: 1,
    model: 1,
    _id: 1,
    updatedAt: 1,
    createdAt: 1,
    assistantId: 1
  }).limit(300).toArray();
  const assistantIds = [
    ...settings?.assistants?.map((assistantId) => assistantId) ?? [],
    ...conversations.map((conv) => conv.assistantId).filter((el) => !!el)
  ];
  const assistants = await collections.assistants.find({ _id: { $in: assistantIds } }).toArray();
  const messagesBeforeLogin = 0;
  let loginRequired = false;
  if (requiresUser && !locals.user && messagesBeforeLogin) {
    if (conversations.length > messagesBeforeLogin) {
      loginRequired = true;
    } else {
      const totalMessages = (await collections.conversations.aggregate([
        { $match: { ...authCondition(locals), "messages.from": "assistant" } },
        { $project: { messages: 1 } },
        { $limit: messagesBeforeLogin + 1 },
        { $unwind: "$messages" },
        { $match: { "messages.from": "assistant" } },
        { $count: "messages" }
      ]).toArray())[0]?.messages ?? 0;
      loginRequired = totalMessages > messagesBeforeLogin;
    }
  }
  return {
    conversations: conversations.map((conv) => {
      if (settings?.hideEmojiOnSidebar) {
        conv.title = conv.title.replace(/\p{Emoji}/gu, "");
      }
      conv.title = conv.title.replace(/\uFFFD/gu, "").trimStart();
      return {
        id: conv._id.toString(),
        title: conv.title,
        model: conv.model ?? defaultModel,
        updatedAt: conv.updatedAt,
        assistantId: conv.assistantId?.toString(),
        avatarHash: conv.assistantId && assistants.find((a) => a._id.toString() === conv.assistantId?.toString())?.avatar
      };
    }),
    settings: {
      searchEnabled: !!SEARXNG_QUERY_URL,
      ethicsModalAccepted: !!settings?.ethicsModalAcceptedAt,
      ethicsModalAcceptedAt: settings?.ethicsModalAcceptedAt ?? null,
      activeModel: settings?.activeModel ?? DEFAULT_SETTINGS.activeModel,
      hideEmojiOnSidebar: settings?.hideEmojiOnSidebar ?? false,
      shareConversationsWithModelAuthors: settings?.shareConversationsWithModelAuthors ?? DEFAULT_SETTINGS.shareConversationsWithModelAuthors,
      customPrompts: settings?.customPrompts ?? {},
      assistants: settings?.assistants?.map((el) => el.toString()) ?? []
    },
    models: models.map((model) => ({
      id: model.id,
      name: model.name,
      websiteUrl: model.websiteUrl,
      modelUrl: model.modelUrl,
      datasetName: model.datasetName,
      datasetUrl: model.datasetUrl,
      displayName: model.displayName,
      description: model.description,
      logoUrl: model.logoUrl,
      promptExamples: model.promptExamples,
      parameters: model.parameters,
      preprompt: model.preprompt,
      multimodal: model.multimodal,
      unlisted: model.unlisted
    })),
    oldModels,
    assistants: assistants.map((el) => ({
      ...el,
      _id: el._id.toString(),
      createdById: void 0,
      createdByMe: el.createdById.toString() === (locals.user?._id ?? locals.sessionId).toString()
    })),
    user: locals.user && {
      id: locals.user._id.toString(),
      username: locals.user.username,
      avatarUrl: locals.user.avatarUrl,
      email: locals.user.email
    },
    assistant,
    enableAssistants,
    loginRequired,
    loginEnabled: requiresUser,
    guestMode: requiresUser && messagesBeforeLogin > 0
  };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 0;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-c667c9bd.js')).default;
const server_id = "src/routes/+layout.server.ts";
const imports = ["_app/immutable/nodes/0.d9bc89c6.js","_app/immutable/chunks/scheduler.6a9d17f6.js","_app/immutable/chunks/index.f8ec6462.js","_app/immutable/chunks/navigation.bcbcd3d3.js","_app/immutable/chunks/singletons.dcb5d507.js","_app/immutable/chunks/stores.c2158893.js","_app/immutable/chunks/public.bedf1950.js","_app/immutable/chunks/titleUpdate.44e7e95f.js","_app/immutable/chunks/cookiesAreEnabled.35a078a4.js","_app/immutable/chunks/settings.053bb39b.js","_app/immutable/chunks/close.5676f196.js","_app/immutable/chunks/spread.84d39b6c.js","_app/immutable/chunks/each.81050b20.js","_app/immutable/chunks/checkmark.c1ac77be.js","_app/immutable/chunks/trash-can.c73da904.js","_app/immutable/chunks/index.e2b52378.js","_app/immutable/chunks/Modal.7c732ae4.js"];
const stylesheets = ["_app/immutable/assets/0.43b34063.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=0-de58b75f.js.map
