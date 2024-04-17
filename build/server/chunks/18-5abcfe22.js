import { b as base } from './paths-05fee424.js';
import { a as requiresUser, b as authCondition, s as sha256 } from './auth-1c371d85.js';
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

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 18;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-5cf66f27.js')).default;
const server_id = "src/routes/settings/assistants/new/+page.server.ts";
const imports = ["_app/immutable/nodes/18.fbbe1aa0.js","_app/immutable/chunks/scheduler.6a9d17f6.js","_app/immutable/chunks/index.f8ec6462.js","_app/immutable/chunks/AssistantSettings.d9badbd8.js","_app/immutable/chunks/preload-helper.a4192956.js","_app/immutable/chunks/each.81050b20.js","_app/immutable/chunks/forms.425d80cf.js","_app/immutable/chunks/parse.bee59afc.js","_app/immutable/chunks/singletons.dcb5d507.js","_app/immutable/chunks/navigation.bcbcd3d3.js","_app/immutable/chunks/pen.34648ac3.js","_app/immutable/chunks/spread.84d39b6c.js","_app/immutable/chunks/IconLoading.fcfe275c.js","_app/immutable/chunks/settings.053bb39b.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=18-5abcfe22.js.map
