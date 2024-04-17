import { c as collections } from './database-f81a56a9.js';
import { z } from 'zod';
import { b as authCondition } from './auth-1c371d85.js';
import { D as DEFAULT_SETTINGS } from './Settings-606b351b.js';
import './private-f03b1afd.js';
import 'mongodb';
import 'openid-client';
import 'date-fns';
import './environment-03c3dd82.js';
import './prod-ssr-7cc47430.js';
import 'json5';
import './models-0e908230.js';
import 'handlebars';
import '@huggingface/inference';
import '@xenova/transformers';

async function POST({ request, locals }) {
  const body = await request.json();
  const { ethicsModalAccepted, ...settings } = z.object({
    shareConversationsWithModelAuthors: z.boolean().default(DEFAULT_SETTINGS.shareConversationsWithModelAuthors),
    hideEmojiOnSidebar: z.boolean().default(DEFAULT_SETTINGS.hideEmojiOnSidebar),
    ethicsModalAccepted: z.boolean().optional(),
    activeModel: z.string().default(DEFAULT_SETTINGS.activeModel),
    customPrompts: z.record(z.string()).default({})
  }).parse(body);
  await collections.settings.updateOne(
    authCondition(locals),
    {
      $set: {
        ...settings,
        ...ethicsModalAccepted && { ethicsModalAcceptedAt: /* @__PURE__ */ new Date() },
        updatedAt: /* @__PURE__ */ new Date()
      },
      $setOnInsert: {
        createdAt: /* @__PURE__ */ new Date()
      }
    },
    {
      upsert: true
    }
  );
  return new Response();
}

export { POST };
//# sourceMappingURL=_server.ts-0df89f14.js.map
