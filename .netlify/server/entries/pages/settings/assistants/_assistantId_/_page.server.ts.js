import { c as collections } from "../../../../../chunks/database.js";
import { f as fail, r as redirect } from "../../../../../chunks/index.js";
import { ObjectId } from "mongodb";
import { a as authCondition } from "../../../../../chunks/auth.js";
import { b as base } from "../../../../../chunks/paths.js";
import { z } from "zod";
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
export {
  actions
};
