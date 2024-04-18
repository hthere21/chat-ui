import { b as base } from "../../../../../chunks/paths.js";
import { r as requiresUser, a as authCondition, s as sha256 } from "../../../../../chunks/auth.js";
import { c as collections } from "../../../../../chunks/database.js";
import { f as fail, r as redirect } from "../../../../../chunks/index.js";
import { ObjectId } from "mongodb";
import { z } from "zod";
import sharp from "sharp";
const newAsssistantSchema = z.object({
  name: z.string().min(1),
  modelId: z.string().min(1),
  preprompt: z.string().min(1),
  description: z.string().optional(),
  exampleInput1: z.string().optional(),
  exampleInput2: z.string().optional(),
  exampleInput3: z.string().optional(),
  exampleInput4: z.string().optional(),
  avatar: z.instanceof(File).optional()
});
const uploadAvatar = async (avatar, assistantId) => {
  const hash = await sha256(await avatar.text());
  const upload = collections.bucket.openUploadStream(`${assistantId.toString()}`, {
    metadata: { type: avatar.type, hash }
  });
  upload.write(await avatar.arrayBuffer());
  upload.end();
  return new Promise((resolve, reject) => {
    upload.once("finish", () => resolve(hash));
    upload.once("error", reject);
    setTimeout(() => reject(new Error("Upload timed out")), 1e4);
  });
};
const actions = {
  default: async ({ request, locals }) => {
    const formData = Object.fromEntries(await request.formData());
    const parse = newAsssistantSchema.safeParse(formData);
    if (!parse.success) {
      const errors = parse.error.errors.map((error) => {
        return {
          field: error.path[0],
          message: error.message
        };
      });
      return fail(400, { error: true, errors });
    }
    if (!locals.user && requiresUser) {
      const errors = [{ field: "preprompt", message: "Must be logged in. Unauthorized" }];
      return fail(400, { error: true, errors });
    }
    const createdById = locals.user?._id ?? locals.sessionId;
    const newAssistantId = new ObjectId();
    const exampleInputs = [
      parse?.data?.exampleInput1 ?? "",
      parse?.data?.exampleInput2 ?? "",
      parse?.data?.exampleInput3 ?? "",
      parse?.data?.exampleInput4 ?? ""
    ].filter((input) => !!input);
    let hash;
    if (parse.data.avatar && parse.data.avatar.size > 0) {
      let image;
      try {
        image = await sharp(await parse.data.avatar.arrayBuffer()).resize(512, 512, { fit: "inside" }).jpeg({ quality: 80 }).toBuffer();
      } catch (e) {
        const errors = [{ field: "avatar", message: e.message }];
        return fail(400, { error: true, errors });
      }
      hash = await uploadAvatar(new File([image], "avatar.jpg"), newAssistantId);
    }
    const { insertedId } = await collections.assistants.insertOne({
      _id: newAssistantId,
      createdById,
      createdByName: locals.user?.username ?? locals.user?.name,
      ...parse.data,
      exampleInputs,
      avatar: hash,
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date(),
      userCount: 1,
      featured: false
    });
    await collections.settings.updateOne(authCondition(locals), {
      $addToSet: { assistants: insertedId }
    });
    throw redirect(302, `${base}/settings/assistants/${insertedId}`);
  }
};
export {
  actions
};
