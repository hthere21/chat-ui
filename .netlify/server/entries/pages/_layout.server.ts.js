import { c as collections } from "../../chunks/database.js";
import { U as UrlDependency } from "../../chunks/UrlDependency.js";
import { v as validateModel, a as defaultModel, m as models, o as oldModels } from "../../chunks/models.js";
import { a as authCondition, r as requiresUser } from "../../chunks/auth.js";
import { D as DEFAULT_SETTINGS } from "../../chunks/Settings.js";
import { S as SEARXNG_QUERY_URL, E as ENABLE_ASSISTANTS } from "../../chunks/private.js";
import { ObjectId } from "mongodb";
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
export {
  load
};
