import { s as sha256, a as authCondition, r as requiresUser } from "../../../../chunks/auth.js";
import { c as collections } from "../../../../chunks/database.js";
import { s as smallModel, e as embeddingModels, d as defaultEmbeddingModel, c as chunk, m as models } from "../../../../chunks/models.js";
import { e as error } from "../../../../chunks/index.js";
import { ObjectId } from "mongodb";
import { z } from "zod";
import "serpapi";
import { VirtualConsole, JSDOM } from "jsdom";
import { format } from "date-fns";
import { W as WEBSEARCH_ALLOWLIST, a as WEBSEARCH_BLOCKLIST } from "../../../../chunks/private.js";
import JSON5 from "json5";
import { dot } from "@xenova/transformers";
import { setTimeout as setTimeout$1 } from "node:timers/promises";
import sizeof from "image-size";
import { c as convertLegacyConversation } from "../../../../chunks/convertLegacyConversation.js";
import { i as isMessageId, b as buildSubtree } from "../../../../chunks/buildSubtree.js";
import { d as downloadFile } from "../../../../chunks/downloadFile.js";
var WebSearchProvider = /* @__PURE__ */ ((WebSearchProvider2) => {
  WebSearchProvider2["GOOGLE"] = "Google";
  WebSearchProvider2["YOU"] = "You.com";
  WebSearchProvider2["SEARXNG"] = "SearXNG";
  return WebSearchProvider2;
})(WebSearchProvider || {});
function getWebSearchProvider() {
  {
    return WebSearchProvider.GOOGLE;
  }
}
async function searchWeb(query) {
  throw new Error("No You.com or Serper.dev or SerpAPI key found");
}
async function generateFromDefaultEndpoint({
  messages,
  preprompt
}) {
  const endpoint = await smallModel.getEndpoint();
  const tokenStream = await endpoint({ messages, preprompt });
  for await (const output of tokenStream) {
    if (output.generated_text) {
      let generated_text = output.generated_text;
      for (const stop of [...smallModel.parameters?.stop ?? [], "<|endoftext|>"]) {
        if (generated_text.endsWith(stop)) {
          generated_text = generated_text.slice(0, -stop.length).trimEnd();
        }
      }
      return generated_text;
    }
  }
  throw new Error("Generation failed");
}
const listSchema = z.array(z.string()).default([]);
const allowList = listSchema.parse(JSON5.parse(WEBSEARCH_ALLOWLIST));
const blockList = listSchema.parse(JSON5.parse(WEBSEARCH_BLOCKLIST));
const queryModifier = [
  ...allowList.map((item) => "site:" + item),
  ...blockList.map((item) => "-site:" + item)
].join(" ");
async function generateQuery(messages) {
  const currentDate = format(/* @__PURE__ */ new Date(), "MMMM d, yyyy");
  const userMessages = messages.filter(({ from }) => from === "user");
  const previousUserMessages = userMessages.slice(0, -1);
  const lastMessage = userMessages.slice(-1)[0];
  const convQuery = [
    {
      from: "user",
      content: `Previous Questions:
- Who is the president of France?

Current Question: What about Mexico?
`
    },
    {
      from: "assistant",
      content: "President of Mexico"
    },
    {
      from: "user",
      content: `Previous questions: 
- When is the next formula 1 grand prix?

Current Question: Where is it being hosted?`
    },
    {
      from: "assistant",
      content: "location of next formula 1 grand prix"
    },
    {
      from: "user",
      content: "Current Question: What type of printhead does the Epson F2270 DTG printer use?"
    },
    {
      from: "assistant",
      content: "Epson F2270 DTG printer printhead"
    },
    { from: "user", content: "What were the news yesterday?" },
    {
      from: "assistant",
      content: `news ${format(new Date(Date.now() - 864e5), "MMMM d, yyyy")}`
    },
    { from: "user", content: "What is the current weather in Paris?" },
    { from: "assistant", content: `weather in Paris ${currentDate}` },
    {
      from: "user",
      content: (previousUserMessages.length > 0 ? `Previous questions: 
${previousUserMessages.map(({ content }) => `- ${content}`).join("\n")}` : "") + "\n\nCurrent Question: " + lastMessage.content
    }
  ];
  const webQuery = await generateFromDefaultEndpoint({
    messages: convQuery,
    preprompt: `You are tasked with generating web search queries. Give me an appropriate query to answer my question for google search. Answer with only the query. Today is ${currentDate}`
  });
  return (queryModifier + " " + webQuery).trim();
}
async function parseWeb(url) {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), 1e4);
  const htmlString = await fetch(url, { signal: abortController.signal }).then((response) => response.text()).catch();
  const virtualConsole = new VirtualConsole();
  virtualConsole.on("error", () => {
  });
  const dom = new JSDOM(htmlString ?? "", {
    virtualConsole
  });
  const { document } = dom.window;
  const textElTags = "p";
  const paragraphs = document.querySelectorAll(textElTags);
  if (!paragraphs.length) {
    throw new Error(`webpage doesn't have any "${textElTags}" element`);
  }
  const paragraphTexts = Array.from(paragraphs).map((p) => p.textContent);
  const text = paragraphTexts.join(" ").replace(/ {2}|\r\n|\n|\r/gm, "");
  return text;
}
function innerProduct(embeddingA, embeddingB) {
  return 1 - dot(embeddingA, embeddingB);
}
async function findSimilarSentences(embeddingModel, query, sentences, { topK = 5 }) {
  const inputs = [
    `${embeddingModel.preQuery}${query}`,
    ...sentences.map((sentence) => `${embeddingModel.prePassage}${sentence}`)
  ];
  const embeddingEndpoint = await embeddingModel.getEndpoint();
  const output = await embeddingEndpoint({ inputs });
  const queryEmbedding = output[0];
  const sentencesEmbeddings = output.slice(1, inputs.length - 1);
  const distancesFromQuery = [...sentencesEmbeddings].map(
    (sentenceEmbedding, index) => {
      return {
        distance: innerProduct(queryEmbedding, sentenceEmbedding),
        index
      };
    }
  );
  distancesFromQuery.sort((a, b) => {
    return a.distance - b.distance;
  });
  return distancesFromQuery.slice(0, topK).map((item) => item.index);
}
const MAX_N_PAGES_SCRAPE = 10;
const MAX_N_PAGES_EMBED = 5;
const DOMAIN_BLOCKLIST = ["youtube.com", "twitter.com"];
async function runWebSearch(conv, messages, updatePad) {
  const prompt = messages[messages.length - 1].content;
  const webSearch = {
    prompt,
    searchQuery: "",
    results: [],
    context: "",
    contextSources: [],
    createdAt: /* @__PURE__ */ new Date(),
    updatedAt: /* @__PURE__ */ new Date()
  };
  function appendUpdate(message, args, type) {
    updatePad({ type: "webSearch", messageType: type ?? "update", message, args });
  }
  try {
    webSearch.searchQuery = await generateQuery(messages);
    const searchProvider = getWebSearchProvider();
    appendUpdate(`Searching ${searchProvider}`, [webSearch.searchQuery]);
    const results = await searchWeb(webSearch.searchQuery);
    webSearch.results = (results.organic_results && results.organic_results.map((el) => {
      try {
        const { title, link, text } = el;
        const { hostname } = new URL(link);
        return { title, link, hostname, text };
      } catch (e) {
        return null;
      }
    })) ?? [];
    webSearch.results = webSearch.results.filter((value) => value !== null);
    webSearch.results = webSearch.results.filter(({ link }) => !DOMAIN_BLOCKLIST.some((el) => link.includes(el))).slice(0, MAX_N_PAGES_SCRAPE);
    const embeddingModel = embeddingModels.find((m) => m.id === conv.embeddingModel) ?? defaultEmbeddingModel;
    if (!embeddingModel) {
      throw new Error(`Embedding model ${conv.embeddingModel} not available anymore`);
    }
    let paragraphChunks = [];
    if (webSearch.results.length > 0) {
      appendUpdate("Browsing results");
      const promises = webSearch.results.map(async (result) => {
        const { link } = result;
        let text = result.text ?? "";
        if (!text) {
          try {
            text = await parseWeb(link);
            appendUpdate("Browsing webpage", [link]);
          } catch (e) {
          }
        }
        const MAX_N_CHUNKS = 100;
        const texts2 = chunk(text, embeddingModel.chunkCharLength).slice(0, MAX_N_CHUNKS);
        return texts2.map((t) => ({ source: result, text: t }));
      });
      const nestedParagraphChunks = (await Promise.all(promises)).slice(0, MAX_N_PAGES_EMBED);
      paragraphChunks = nestedParagraphChunks.flat();
      if (!paragraphChunks.length) {
        throw new Error("No text found on the first 5 results");
      }
    } else {
      throw new Error("No results found for this search query");
    }
    appendUpdate("Extracting relevant information");
    const topKClosestParagraphs = 8;
    const texts = paragraphChunks.map(({ text }) => text);
    const indices = await findSimilarSentences(embeddingModel, prompt, texts, {
      topK: topKClosestParagraphs
    });
    webSearch.context = indices.map((idx) => texts[idx]).join("");
    const usedSources = /* @__PURE__ */ new Set();
    for (const idx of indices) {
      const { source } = paragraphChunks[idx];
      if (!usedSources.has(source.link)) {
        usedSources.add(source.link);
        webSearch.contextSources.push(source);
      }
    }
    updatePad({
      type: "webSearch",
      messageType: "sources",
      message: "sources",
      sources: webSearch.contextSources
    });
  } catch (searchError) {
    if (searchError instanceof Error) {
      appendUpdate("An error occurred", [JSON.stringify(searchError.message)], "error");
    }
  }
  return webSearch;
}
let closed = false;
process.on("SIGINT", () => {
  closed = true;
});
let abortedGenerations = /* @__PURE__ */ new Map();
async function maintainAbortedGenerations() {
  while (!closed) {
    await setTimeout$1(1e3);
    try {
      const aborts = await collections.abortedGenerations.find({}).sort({ createdAt: 1 }).toArray();
      abortedGenerations = new Map(
        aborts.map(({ conversationId, createdAt }) => [conversationId.toString(), createdAt])
      );
    } catch (err) {
      console.error(err);
    }
  }
}
maintainAbortedGenerations();
async function summarize(prompt) {
  const messages = [
    { from: "user", content: "Who is the president of Gabon?" },
    { from: "assistant", content: "🇬🇦 President of Gabon" },
    { from: "user", content: "Who is Julien Chaumond?" },
    { from: "assistant", content: "🧑 Julien Chaumond" },
    { from: "user", content: "what is 1 + 1?" },
    { from: "assistant", content: "🔢 Simple math operation" },
    { from: "user", content: "What are the latest news?" },
    { from: "assistant", content: "📰 Latest news" },
    { from: "user", content: "How to make a great cheesecake?" },
    { from: "assistant", content: "🍰 Cheesecake recipe" },
    { from: "user", content: "what is your favorite movie? do a short answer." },
    { from: "assistant", content: "🎥 Favorite movie" },
    { from: "user", content: "Explain the concept of artificial intelligence in one sentence" },
    { from: "assistant", content: "🤖 AI definition" },
    { from: "user", content: prompt }
  ];
  return await generateFromDefaultEndpoint({
    messages,
    preprompt: `You are a summarization AI. You'll never answer a user's question directly, but instead summarize the user's request into a single short sentence of four words or less. Always start your answer with an emoji relevant to the summary.`
  }).then((summary) => {
    if (!/\p{Emoji}/u.test(summary.slice(0, 3))) {
      return "💬 " + summary;
    }
    return summary;
  }).catch((e) => {
    console.error(e);
    return null;
  });
}
async function uploadFile(file, conv) {
  const sha = await sha256(await file.text());
  const upload = collections.bucket.openUploadStream(`${conv._id}-${sha}`, {
    metadata: { conversation: conv._id.toString(), mime: "image/jpeg" }
  });
  upload.write(await file.arrayBuffer());
  upload.end();
  return new Promise((resolve, reject) => {
    upload.once("finish", () => resolve(sha));
    upload.once("error", reject);
    setTimeout(() => reject(new Error("Upload timed out")), 1e4);
  });
}
function addChildren(conv, message, parentId) {
  if (conv.messages.length === 0) {
    const messageId2 = crypto.randomUUID();
    conv.rootMessageId = messageId2;
    conv.messages.push({
      ...message,
      ancestors: [],
      id: messageId2
    });
    return messageId2;
  }
  if (!parentId) {
    throw new Error("You need to specify a parentId if this is not the first message");
  }
  const messageId = crypto.randomUUID();
  if (!conv.rootMessageId) {
    if (!!parentId && parentId !== conv.messages[conv.messages.length - 1].id) {
      throw new Error("This is a legacy conversation, you can only append to the last message");
    }
    conv.messages.push({ ...message, id: messageId });
    return messageId;
  }
  const ancestors = [...conv.messages.find((m) => m.id === parentId)?.ancestors ?? [], parentId];
  conv.messages.push({
    ...message,
    ancestors,
    id: messageId,
    children: []
  });
  const parent = conv.messages.find((m) => m.id === parentId);
  if (parent) {
    if (parent.children) {
      parent.children.push(messageId);
    } else
      parent.children = [messageId];
  }
  return messageId;
}
function addSibling(conv, message, siblingId) {
  if (conv.messages.length === 0) {
    throw new Error("Cannot add a sibling to an empty conversation");
  }
  if (!conv.rootMessageId) {
    throw new Error("Cannot add a sibling to a legacy conversation");
  }
  const sibling = conv.messages.find((m) => m.id === siblingId);
  if (!sibling) {
    throw new Error("The sibling message doesn't exist");
  }
  if (!sibling.ancestors || sibling.ancestors?.length === 0) {
    throw new Error("The sibling message is the root message, therefore we can't add a sibling");
  }
  const messageId = crypto.randomUUID();
  conv.messages.push({
    ...message,
    id: messageId,
    ancestors: sibling.ancestors,
    children: []
  });
  const nearestAncestorId = sibling.ancestors[sibling.ancestors.length - 1];
  const nearestAncestor = conv.messages.find((m) => m.id === nearestAncestorId);
  if (nearestAncestor) {
    if (nearestAncestor.children) {
      nearestAncestor.children.push(messageId);
    } else
      nearestAncestor.children = [messageId];
  }
  return messageId;
}
async function preprocessMessages(messages, multimodal, id) {
  return await Promise.all(
    messages.map(async (message, idx) => {
      if (idx === messages.length - 1 && message.webSearch && message.webSearch.context) {
        const lastUsrMsgIndex = messages.map((el) => el.from).lastIndexOf("user");
        const previousUserMessages = messages.filter((el) => el.from === "user").slice(0, -1);
        const previousQuestions = previousUserMessages.length > 0 ? `Previous questions: 
${previousUserMessages.map(({ content }) => `- ${content}`).join("\n")}` : "";
        const currentDate = format(/* @__PURE__ */ new Date(), "MMMM d, yyyy");
        message.content = `I searched the web using the query: ${message.webSearch.searchQuery}. Today is ${currentDate} and here are the results:
=====================
${message.webSearch.context}
=====================
${previousQuestions}
Answer the question: ${messages[lastUsrMsgIndex].content}`;
      }
      if (multimodal) {
        if (message.files && message.files.length > 0) {
          const markdowns = await Promise.all(
            message.files.map(async (hash) => {
              try {
                const { content: image, mime } = await downloadFile(hash, id);
                const b64 = image.toString("base64");
                return `![](data:${mime};base64,${b64})})`;
              } catch (e) {
                console.error(e);
              }
            })
          );
          message.content += markdowns.join("\n ");
        } else {
          message.content += "\n![](data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAQABADAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+/igAoAKACgD/2Q==)";
        }
      }
      return message;
    })
  );
}
async function POST({ request, locals, params, getClientAddress }) {
  const id = z.string().parse(params.id);
  const convId = new ObjectId(id);
  const promptedAt = /* @__PURE__ */ new Date();
  const userId = locals.user?._id ?? locals.sessionId;
  if (!userId) {
    throw error(401, "Unauthorized");
  }
  const convBeforeCheck = await collections.conversations.findOne({
    _id: convId,
    ...authCondition(locals)
  });
  if (convBeforeCheck && !convBeforeCheck.rootMessageId) {
    const res = await collections.conversations.updateOne(
      {
        _id: convId
      },
      {
        $set: {
          ...convBeforeCheck,
          ...convertLegacyConversation(convBeforeCheck)
        }
      }
    );
    if (!res.acknowledged) {
      throw error(500, "Failed to convert conversation");
    }
  }
  const conv = await collections.conversations.findOne({
    _id: convId,
    ...authCondition(locals)
  });
  if (!conv) {
    throw error(404, "Conversation not found");
  }
  await collections.messageEvents.insertOne({
    userId,
    createdAt: /* @__PURE__ */ new Date(),
    ip: getClientAddress()
  });
  const messagesBeforeLogin = 0;
  if (!locals.user?._id && requiresUser && messagesBeforeLogin) {
    const totalMessages = (await collections.conversations.aggregate([
      { $match: { ...authCondition(locals), "messages.from": "assistant" } },
      { $project: { messages: 1 } },
      { $limit: messagesBeforeLogin + 1 },
      { $unwind: "$messages" },
      { $match: { "messages.from": "assistant" } },
      { $count: "messages" }
    ]).toArray())[0]?.messages ?? 0;
    if (totalMessages > messagesBeforeLogin) {
      throw error(429, "Exceeded number of messages before login");
    }
  }
  Math.max(
    await collections.messageEvents.countDocuments({ userId }),
    await collections.messageEvents.countDocuments({ ip: getClientAddress() })
  );
  const model = models.find((m) => m.id === conv.model);
  if (!model) {
    throw error(410, "Model not available anymore");
  }
  const json = await request.json();
  const {
    inputs: newPrompt,
    id: messageId,
    is_retry: isRetry,
    is_continue: isContinue,
    web_search: webSearch,
    files: b64files
  } = z.object({
    id: z.string().uuid().refine(isMessageId).optional(),
    // parent message id to append to for a normal message, or the message id for a retry/continue
    inputs: z.optional(z.string().trim().min(1)),
    is_retry: z.optional(z.boolean()),
    is_continue: z.optional(z.boolean()),
    web_search: z.optional(z.boolean()),
    files: z.optional(z.array(z.string()))
  }).parse(json);
  const files = b64files?.map((file) => {
    const blob = Buffer.from(file, "base64");
    return new File([blob], "image.png");
  });
  if (files) {
    const filechecks = await Promise.all(
      files.map(async (file) => {
        const dimensions = sizeof(Buffer.from(await file.arrayBuffer()));
        return file.size > 2 * 1024 * 1024 || (dimensions.width ?? 0) > 224 || (dimensions.height ?? 0) > 224;
      })
    );
    if (filechecks.some((check) => check)) {
      throw error(413, "File too large, should be <2MB and 224x224 max.");
    }
  }
  let hashes;
  if (files) {
    hashes = await Promise.all(files.map(async (file) => await uploadFile(file, conv)));
  }
  let messageToWriteToId = void 0;
  let messagesForPrompt = [];
  if (isContinue && messageId) {
    if ((conv.messages.find((msg) => msg.id === messageId)?.children?.length ?? 0) > 0) {
      throw error(400, "Can only continue the last message");
    }
    messageToWriteToId = messageId;
    messagesForPrompt = buildSubtree(conv, messageId);
  } else if (isRetry && messageId) {
    const messageToRetry = conv.messages.find((message) => message.id === messageId);
    if (!messageToRetry) {
      throw error(404, "Message not found");
    }
    if (messageToRetry.from === "user" && newPrompt) {
      const newUserMessageId = addSibling(conv, { from: "user", content: newPrompt }, messageId);
      messageToWriteToId = addChildren(
        conv,
        { from: "assistant", content: "", files: hashes },
        newUserMessageId
      );
      messagesForPrompt = buildSubtree(conv, newUserMessageId);
    } else if (messageToRetry.from === "assistant") {
      messageToWriteToId = addSibling(conv, { from: "assistant", content: "" }, messageId);
      messagesForPrompt = buildSubtree(conv, messageId);
      messagesForPrompt.pop();
    }
  } else {
    const newUserMessageId = addChildren(
      conv,
      {
        from: "user",
        content: newPrompt ?? "",
        files: hashes,
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      },
      messageId
    );
    messageToWriteToId = addChildren(
      conv,
      {
        from: "assistant",
        content: "",
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      },
      newUserMessageId
    );
    messagesForPrompt = buildSubtree(conv, newUserMessageId);
  }
  const messageToWriteTo = conv.messages.find((message) => message.id === messageToWriteToId);
  if (!messageToWriteTo) {
    throw error(500, "Failed to create message");
  }
  if (messagesForPrompt.length === 0) {
    throw error(500, "Failed to create prompt");
  }
  await collections.conversations.updateOne(
    {
      _id: convId
    },
    {
      $set: {
        messages: conv.messages,
        title: conv.title,
        updatedAt: /* @__PURE__ */ new Date()
      }
    }
  );
  let doneStreaming = false;
  const stream = new ReadableStream({
    async start(controller) {
      messageToWriteTo.updates ??= [];
      function update(newUpdate) {
        if (newUpdate.type !== "stream") {
          messageToWriteTo?.updates?.push(newUpdate);
        }
        if (newUpdate.type === "stream" && newUpdate.token === "") {
          return;
        }
        controller.enqueue(JSON.stringify(newUpdate) + "\n");
        if (newUpdate.type === "finalAnswer") {
          controller.enqueue(" ".repeat(4096));
        }
      }
      update({ type: "status", status: "started" });
      const summarizeIfNeeded = (async () => {
        if (conv.title === "New Chat" && conv.messages.length === 3) {
          try {
            conv.title = await summarize(conv.messages[1].content) ?? conv.title;
            update({ type: "status", status: "title", message: conv.title });
            await collections.conversations.updateOne(
              {
                _id: convId
              },
              {
                $set: {
                  title: conv?.title,
                  updatedAt: /* @__PURE__ */ new Date()
                }
              }
            );
          } catch (e) {
            console.error(e);
          }
        }
      })();
      await collections.conversations.updateOne(
        {
          _id: convId
        },
        {
          $set: {
            title: conv.title,
            updatedAt: /* @__PURE__ */ new Date()
          }
        }
      );
      if (webSearch && !isContinue && !conv.assistantId) {
        messageToWriteTo.webSearch = await runWebSearch(conv, messagesForPrompt, update);
      }
      const processedMessages = await preprocessMessages(
        messagesForPrompt,
        model.multimodal,
        convId
      );
      const previousText = messageToWriteTo.content;
      try {
        const endpoint = await model.getEndpoint();
        for await (const output of await endpoint({
          messages: processedMessages,
          preprompt: conv.preprompt,
          continueMessage: isContinue
        })) {
          if (!output.generated_text) {
            if (!output.token.special) {
              update({
                type: "stream",
                token: output.token.text
              });
              const date = abortedGenerations.get(convId.toString());
              if (date && date > promptedAt) {
                break;
              }
              if (!output) {
                break;
              }
              messageToWriteTo.content += output.token.text;
            }
          } else {
            messageToWriteTo.interrupted = !output.token.special;
            const text = (model.parameters.stop ?? []).reduce((acc, curr) => {
              if (acc.endsWith(curr)) {
                messageToWriteTo.interrupted = false;
                return acc.slice(0, acc.length - curr.length);
              }
              return acc;
            }, output.generated_text.trimEnd());
            messageToWriteTo.content = previousText + text;
            messageToWriteTo.updatedAt = /* @__PURE__ */ new Date();
          }
        }
      } catch (e) {
        update({ type: "status", status: "error", message: e.message });
      }
      await collections.conversations.updateOne(
        {
          _id: convId
        },
        {
          $set: {
            messages: conv.messages,
            title: conv?.title,
            updatedAt: /* @__PURE__ */ new Date()
          }
        }
      );
      doneStreaming = true;
      update({
        type: "finalAnswer",
        text: messageToWriteTo.content
      });
      await summarizeIfNeeded;
      controller.close();
      return;
    },
    async cancel() {
      if (!doneStreaming) {
        await collections.conversations.updateOne(
          {
            _id: convId
          },
          {
            $set: {
              messages: conv.messages,
              title: conv.title,
              updatedAt: /* @__PURE__ */ new Date()
            }
          }
        );
      }
    }
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream"
    }
  });
}
async function DELETE({ locals, params }) {
  const convId = new ObjectId(params.id);
  const conv = await collections.conversations.findOne({
    _id: convId,
    ...authCondition(locals)
  });
  if (!conv) {
    throw error(404, "Conversation not found");
  }
  await collections.conversations.deleteOne({ _id: conv._id });
  return new Response();
}
async function PATCH({ request, locals, params }) {
  const { title } = z.object({ title: z.string().trim().min(1).max(100) }).parse(await request.json());
  const convId = new ObjectId(params.id);
  const conv = await collections.conversations.findOne({
    _id: convId,
    ...authCondition(locals)
  });
  if (!conv) {
    throw error(404, "Conversation not found");
  }
  await collections.conversations.updateOne(
    {
      _id: convId
    },
    {
      $set: {
        title
      }
    }
  );
  return new Response();
}
export {
  DELETE,
  PATCH,
  POST
};
