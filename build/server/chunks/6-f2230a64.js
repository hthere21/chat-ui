import { c as collections } from './database-f81a56a9.js';
import { ObjectId } from 'mongodb';
import { e as error } from './index-0087e825.js';
import { b as authCondition } from './auth-1c371d85.js';
import { U as UrlDependency } from './UrlDependency-114c02d5.js';
import { c as convertLegacyConversation } from './convertLegacyConversation-2bdfc996.js';
import './private-f03b1afd.js';
import 'openid-client';
import 'date-fns';
import 'zod';
import './environment-03c3dd82.js';
import './prod-ssr-7cc47430.js';
import 'json5';

const load = async ({ params, depends, locals }) => {
  let conversation;
  let shared = false;
  if (params.id.length === 7) {
    conversation = await collections.sharedConversations.findOne({
      _id: params.id
    });
    shared = true;
    if (!conversation) {
      throw error(404, "Conversation not found");
    }
  } else {
    conversation = await collections.conversations.findOne({
      _id: new ObjectId(params.id),
      ...authCondition(locals)
    });
    depends(UrlDependency.Conversation);
    if (!conversation) {
      const conversationExists = await collections.conversations.countDocuments({
        _id: new ObjectId(params.id)
      }) !== 0;
      if (conversationExists) {
        throw error(
          403,
          "You don't have access to this conversation. If someone gave you this link, ask them to use the 'share' feature instead."
        );
      }
      throw error(404, "Conversation not found.");
    }
  }
  const convertedConv = { ...conversation, ...convertLegacyConversation(conversation) };
  return {
    messages: convertedConv.messages,
    title: convertedConv.title,
    model: convertedConv.model,
    preprompt: convertedConv.preprompt,
    rootMessageId: convertedConv.rootMessageId,
    assistant: convertedConv.assistantId ? JSON.parse(
      JSON.stringify(
        await collections.assistants.findOne({
          _id: new ObjectId(convertedConv.assistantId)
        })
      )
    ) : null,
    shared
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 6;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-468de973.js')).default;
const server_id = "src/routes/conversation/[id]/+page.server.ts";
const imports = ["_app/immutable/nodes/6.27657d84.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/scheduler.6a9d17f6.js","_app/immutable/chunks/index.f8ec6462.js","_app/immutable/chunks/pendingMessage.54687045.js","_app/immutable/chunks/each.81050b20.js","_app/immutable/chunks/spread.84d39b6c.js","_app/immutable/chunks/close.5676f196.js","_app/immutable/chunks/checkmark.c1ac77be.js","_app/immutable/chunks/singletons.dcb5d507.js","_app/immutable/chunks/Switch.47a95eb7.js","_app/immutable/chunks/stores.c2158893.js","_app/immutable/chunks/public.bedf1950.js","_app/immutable/chunks/Modal.7c732ae4.js","_app/immutable/chunks/index.e2b52378.js","_app/immutable/chunks/settings.053bb39b.js","_app/immutable/chunks/navigation.bcbcd3d3.js","_app/immutable/chunks/cookiesAreEnabled.35a078a4.js","_app/immutable/chunks/IconLoading.fcfe275c.js","_app/immutable/chunks/marked.esm.76161808.js","_app/immutable/chunks/CopyToClipBoardBtn.abd1fd98.js","_app/immutable/chunks/pen.34648ac3.js","_app/immutable/chunks/arrow-up-right.f5284a17.js","_app/immutable/chunks/titleUpdate.44e7e95f.js"];
const stylesheets = ["_app/immutable/assets/pendingMessage.de4b1a0f.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=6-f2230a64.js.map
