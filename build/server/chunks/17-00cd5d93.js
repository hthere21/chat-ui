import { b as base } from './paths-05fee424.js';
import { a as requiresUser, s as sha256 } from './auth-1c371d85.js';
import { c as collections } from './database-f81a56a9.js';
import { f as fail, r as redirect } from './index-0087e825.js';
import { ObjectId } from 'mongodb';
import { z } from 'zod';
import sharp from 'sharp';
import 'openid-client';
import 'date-fns';
import './private-f03b1afd.js';
import './environment-03c3dd82.js';
import './prod-ssr-7cc47430.js';
import 'json5';

const newAsssistantSchema = z.object({
  name: z.string().min(1),
  modelId: z.string().min(1),
  preprompt: z.string().min(1),
  description: z.string().optional(),
  exampleInput1: z.string().optional(),
  exampleInput2: z.string().optional(),
  exampleInput3: z.string().optional(),
  exampleInput4: z.string().optional(),
  avatar: z.union([z.instanceof(File), z.literal("null")]).optional()
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
  default: async ({ request, locals, params }) => {
    const assistant = await collections.assistants.findOne({
      _id: new ObjectId(params.assistantId)
    });
    if (!assistant) {
      throw Error("Assistant not found");
    }
    if (assistant.createdById.toString() !== (locals.user?._id ?? locals.sessionId).toString()) {
      throw Error("You are not the author of this assistant");
    }
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
    const exampleInputs = [
      parse?.data?.exampleInput1 ?? "",
      parse?.data?.exampleInput2 ?? "",
      parse?.data?.exampleInput3 ?? "",
      parse?.data?.exampleInput4 ?? ""
    ].filter((input) => !!input);
    const deleteAvatar = parse.data.avatar === "null";
    let hash;
    if (parse.data.avatar && parse.data.avatar !== "null" && parse.data.avatar.size > 0) {
      let image;
      try {
        image = await sharp(await parse.data.avatar.arrayBuffer()).resize(512, 512, { fit: "inside" }).jpeg({ quality: 80 }).toBuffer();
      } catch (e) {
        const errors = [{ field: "avatar", message: e.message }];
        return fail(400, { error: true, errors });
      }
      const fileCursor = collections.bucket.find({ filename: assistant._id.toString() });
      let fileId = await fileCursor.next();
      while (fileId) {
        await collections.bucket.delete(fileId._id);
        fileId = await fileCursor.next();
      }
      hash = await uploadAvatar(new File([image], "avatar.jpg"), assistant._id);
    } else if (deleteAvatar) {
      const fileCursor = collections.bucket.find({ filename: assistant._id.toString() });
      let fileId = await fileCursor.next();
      while (fileId) {
        await collections.bucket.delete(fileId._id);
        fileId = await fileCursor.next();
      }
    }
    const { acknowledged } = await collections.assistants.updateOne(
      {
        _id: assistant._id
      },
      {
        $set: {
          name: parse.data.name,
          description: parse.data.description,
          modelId: parse.data.modelId,
          preprompt: parse.data.preprompt,
          exampleInputs,
          avatar: deleteAvatar ? void 0 : hash ?? assistant.avatar,
          updatedAt: /* @__PURE__ */ new Date()
        }
      }
    );
    if (acknowledged) {
      throw redirect(302, `${base}/settings/assistants/${assistant._id}`);
    } else {
      throw Error("Update failed");
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 17;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-df5a4a14.js')).default;
const server_id = "src/routes/settings/assistants/[assistantId]/edit/+page.server.ts";
const imports = ["_app/immutable/nodes/17.c414297f.js","_app/immutable/chunks/scheduler.6a9d17f6.js","_app/immutable/chunks/index.f8ec6462.js","_app/immutable/chunks/stores.7cb53fc7.js","_app/immutable/chunks/singletons.7e5ab6ef.js","_app/immutable/chunks/AssistantSettings.55c2c157.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/each.81050b20.js","_app/immutable/chunks/forms.15847325.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/navigation.b63c9ed8.js","_app/immutable/chunks/pen.34648ac3.js","_app/immutable/chunks/spread.84d39b6c.js","_app/immutable/chunks/IconLoading.fcfe275c.js","_app/immutable/chunks/settings.e8a11d43.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=17-00cd5d93.js.map
