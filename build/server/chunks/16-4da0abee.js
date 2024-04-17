import { b as base } from './paths-05fee424.js';
import { r as redirect, f as fail } from './index-0087e825.js';
import { c as collections } from './database-f81a56a9.js';
import { ObjectId } from 'mongodb';
import { b as authCondition } from './auth-1c371d85.js';
import { z } from 'zod';
import './private-f03b1afd.js';
import 'openid-client';
import 'date-fns';
import './environment-03c3dd82.js';
import './prod-ssr-7cc47430.js';
import 'json5';

async function load({ parent, params }) {
  const data = await parent();
  const assistant = data.settings.assistants.find((id) => id === params.assistantId);
  if (!assistant) {
    throw redirect(302, `${base}/assistant/${params.assistantId}`);
  }
  return data;
}

var _page_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

async function assistantOnlyIfAuthor(locals, assistantId) {
  const assistant = await collections.assistants.findOne({ _id: new ObjectId(assistantId) });
  if (!assistant) {
    throw Error("Assistant not found");
  }
  if (assistant.createdById.toString() !== (locals.user?._id ?? locals.sessionId).toString()) {
    throw Error("You are not the author of this assistant");
  }
  return assistant;
}
const actions = {
  delete: async ({ params, locals }) => {
    let assistant;
    try {
      assistant = await assistantOnlyIfAuthor(locals, params.assistantId);
    } catch (e) {
      return fail(400, { error: true, message: e.message });
    }
    await collections.assistants.deleteOne({ _id: assistant._id });
    await collections.settings.updateMany(
      {
        assistants: { $in: [assistant._id] }
      },
      {
        $pull: { assistants: assistant._id }
      }
    );
    const fileCursor = collections.bucket.find({ filename: assistant._id.toString() });
    let fileId = await fileCursor.next();
    while (fileId) {
      await collections.bucket.delete(fileId._id);
      fileId = await fileCursor.next();
    }
    throw redirect(302, `${base}/settings`);
  },
  report: async ({ request, params, locals, url }) => {
    const report = await collections.reports.findOne({
      createdBy: locals.user?._id ?? locals.sessionId,
      assistantId: new ObjectId(params.assistantId)
    });
    if (report) {
      return fail(400, { error: true, message: "Already reported" });
    }
    const formData = await request.formData();
    const result = z.string().min(1).max(128).safeParse(formData?.get("reportReason"));
    if (!result.success) {
      return fail(400, { error: true, message: "Invalid report reason" });
    }
    const { acknowledged } = await collections.reports.insertOne({
      _id: new ObjectId(),
      assistantId: new ObjectId(params.assistantId),
      createdBy: locals.user?._id ?? locals.sessionId,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date(),
      reason: result.data
    });
    if (!acknowledged) {
      return fail(500, { error: true, message: "Failed to report assistant" });
    }
    return { from: "report", ok: true, message: "Assistant reported" };
  },
  subscribe: async ({ params, locals }) => {
    const assistant = await collections.assistants.findOne({
      _id: new ObjectId(params.assistantId)
    });
    if (!assistant) {
      return fail(404, { error: true, message: "Assistant not found" });
    }
    const settings = await collections.settings.findOne(authCondition(locals));
    if (settings?.assistants?.includes(assistant._id)) {
      return fail(400, { error: true, message: "Already subscribed" });
    }
    const result = await collections.settings.updateOne(authCondition(locals), {
      $addToSet: { assistants: assistant._id }
    });
    if (result.modifiedCount > 0) {
      await collections.assistants.updateOne({ _id: assistant._id }, { $inc: { userCount: 1 } });
    }
    return { from: "subscribe", ok: true, message: "Assistant added" };
  },
  unsubscribe: async ({ params, locals }) => {
    const assistant = await collections.assistants.findOne({
      _id: new ObjectId(params.assistantId)
    });
    if (!assistant) {
      return fail(404, { error: true, message: "Assistant not found" });
    }
    const result = await collections.settings.updateOne(authCondition(locals), {
      $pull: { assistants: assistant._id }
    });
    if (result.modifiedCount > 0) {
      await collections.assistants.updateOne({ _id: assistant._id }, { $inc: { userCount: -1 } });
    }
    throw redirect(302, `${base}/settings`);
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 16;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-46e53b3b.js')).default;
const universal_id = "src/routes/settings/assistants/[assistantId]/+page.ts";
const server_id = "src/routes/settings/assistants/[assistantId]/+page.server.ts";
const imports = ["_app/immutable/nodes/16.12de3d76.js","_app/immutable/chunks/singletons.7e5ab6ef.js","_app/immutable/chunks/scheduler.6a9d17f6.js","_app/immutable/chunks/index.d7eb2526.js","_app/immutable/chunks/control.f5b05b5f.js","_app/immutable/chunks/index.f8ec6462.js","_app/immutable/chunks/forms.15847325.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/navigation.b63c9ed8.js","_app/immutable/chunks/stores.7cb53fc7.js","_app/immutable/chunks/settings.e8a11d43.js","_app/immutable/chunks/pen.34648ac3.js","_app/immutable/chunks/spread.84d39b6c.js","_app/immutable/chunks/trash-can.c73da904.js","_app/immutable/chunks/link.7eccf3a0.js","_app/immutable/chunks/CopyToClipBoardBtn.abd1fd98.js","_app/immutable/chunks/Modal.7c732ae4.js","_app/immutable/chunks/index.e2b52378.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets, _page_ts as universal, universal_id };
//# sourceMappingURL=16-4da0abee.js.map
