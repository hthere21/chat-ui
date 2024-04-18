import { c as create_ssr_component, f as subscribe, e as escape, v as validate_component, a as add_attribute, h as each } from "./ssr.js";
import "devalue";
import { b as base } from "./paths.js";
import { P as Pen } from "./pen.js";
import { U as Upload } from "./upload.js";
import { u as useSettingsStore } from "./settings2.js";
function getError(field, returnForm) {
  return returnForm?.errors.find((error) => error.field === field)?.message ?? "";
}
const AssistantSettings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $settings, $$unsubscribe_settings;
  let { form } = $$props;
  let { assistant = void 0 } = $$props;
  let { models = [] } = $$props;
  const settings = useSettingsStore();
  $$unsubscribe_settings = subscribe(settings, (value) => $settings = value);
  let inputMessage1 = assistant?.exampleInputs[0] ?? "";
  let inputMessage2 = assistant?.exampleInputs[1] ?? "";
  let inputMessage3 = assistant?.exampleInputs[2] ?? "";
  let inputMessage4 = assistant?.exampleInputs[3] ?? "";
  let deleteExistingAvatar = false;
  let loading = false;
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.assistant === void 0 && $$bindings.assistant && assistant !== void 0)
    $$bindings.assistant(assistant);
  if ($$props.models === void 0 && $$bindings.models && models !== void 0)
    $$bindings.models(models);
  $$unsubscribe_settings();
  return `<form method="POST" class="flex h-full flex-col" enctype="multipart/form-data">${assistant ? `<h2 class="text-xl font-semibold">Edit assistant (${escape(assistant?.name ?? "")})</h2> <p class="mb-6 text-sm text-gray-500" data-svelte-h="svelte-1jirery">Modifying an existing assistant will propagate those changes to all users.</p>` : `<h2 class="text-xl font-semibold" data-svelte-h="svelte-kn9trk">Create new assistant</h2> <p class="mb-6 text-sm text-gray-500" data-svelte-h="svelte-1851aq4">Create and share your own AI Assistant. All assistants are <span class="rounded-full border px-2 py-0.5 leading-none">public</span></p>`} <div class="mx-1 grid flex-1 grid-cols-2 gap-4 max-sm:grid-cols-1"><div class="flex flex-col gap-4"><div><span class="mb-1 block pb-2 text-sm font-semibold" data-svelte-h="svelte-86e3cm">Avatar</span> <input type="file" accept="image/*" name="avatar" id="avatar" class="hidden"> ${assistant?.avatar && !deleteExistingAvatar ? `<div class="group relative mx-auto h-12 w-12">${`${assistant?.avatar ? `<img src="${escape(base, true) + "/settings/assistants/" + escape(assistant._id, true) + "/avatar.jpg?hash=" + escape(assistant.avatar, true)}" alt="avatar" class="crop mx-auto h-12 w-12 cursor-pointer rounded-full object-cover">` : ``}`} <label for="avatar" class="invisible absolute bottom-0 h-12 w-12 rounded-full bg-black bg-opacity-50 p-1 group-hover:visible hover:visible">${validate_component(Pen, "CarbonPen").$$render(
    $$result,
    {
      class: "mx-auto my-auto h-full cursor-pointer text-center text-white"
    },
    {},
    {}
  )}</label></div> <div class="mx-auto w-max pt-1"><button type="button" class="mx-auto w-max text-center text-xs text-gray-600 hover:underline" data-svelte-h="svelte-6eh37n">Delete</button></div>` : `<div class="mb-1 flex w-max flex-row gap-4"><label for="avatar" class="btn flex h-8 rounded-lg border bg-white px-3 py-1 text-gray-500 shadow-sm transition-all hover:bg-gray-100">${validate_component(Upload, "CarbonUpload").$$render($$result, { class: "mr-2 text-xs " }, {}, {})} Upload</label></div>`} <p class="text-xs text-red-500">${escape(getError("avatar", form))}</p></div> <label><span class="mb-1 text-sm font-semibold" data-svelte-h="svelte-128iduy">Name</span> <input name="name" class="w-full rounded-lg border-2 border-gray-200 bg-gray-100 p-2" placeholder="My awesome model"${add_attribute("value", assistant?.name ?? "", 0)}> <p class="text-xs text-red-500">${escape(getError("name", form))}</p></label> <label><span class="mb-1 text-sm font-semibold" data-svelte-h="svelte-88x4jt">Description</span> <textarea name="description" class="w-full rounded-lg border-2 border-gray-200 bg-gray-100 p-2" placeholder="He knows everything about python">${escape(assistant?.description ?? "", false)}</textarea> <p class="text-xs text-red-500">${escape(getError("description", form))}</p></label> <label><span class="mb-1 text-sm font-semibold" data-svelte-h="svelte-1b5jpwy">Model</span> <select name="modelId" class="w-full rounded-lg border-2 border-gray-200 bg-gray-100 p-2">${each(models.filter((model) => !model.unlisted), (model) => {
    return `<option${add_attribute("value", model.id, 0)} ${(assistant ? assistant?.modelId === model.id : $settings.activeModel === model.id) ? "selected" : ""}>${escape(model.displayName)}</option>`;
  })}<p class="text-xs text-red-500">${escape(getError("modelId", form))}</p></select></label> <label><span class="mb-1 text-sm font-semibold" data-svelte-h="svelte-5kr6hq">User start messages</span> <div class="flex flex-col gap-2 md:max-h-32"><input name="exampleInput1" class="w-full rounded-lg border-2 border-gray-200 bg-gray-100 p-2"${add_attribute("value", inputMessage1, 0)}> ${!!inputMessage1 || !!inputMessage2 ? `<input name="exampleInput2" class="w-full rounded-lg border-2 border-gray-200 bg-gray-100 p-2"${add_attribute("value", inputMessage2, 0)}>` : ``} ${!!inputMessage2 || !!inputMessage3 ? `<input name="exampleInput3" class="w-full rounded-lg border-2 border-gray-200 bg-gray-100 p-2"${add_attribute("value", inputMessage3, 0)}>` : ``} ${!!inputMessage3 || !!inputMessage4 ? `<input name="exampleInput4" class="w-full rounded-lg border-2 border-gray-200 bg-gray-100 p-2"${add_attribute("value", inputMessage4, 0)}>` : ``}</div> <p class="text-xs text-red-500">${escape(getError("inputMessage1", form))}</p></label></div> <label class="flex flex-col"><span class="mb-1 text-sm font-semibold" data-svelte-h="svelte-gjd1si">Instructions (system prompt)</span> <textarea name="preprompt" class="min-h-[8lh] flex-1 rounded-lg border-2 border-gray-200 bg-gray-100 p-2 text-sm" placeholder="You'll act as...">${escape(assistant?.preprompt ?? "", false)}</textarea> <p class="text-xs text-red-500">${escape(getError("preprompt", form))}</p></label></div> <div class="mt-5 flex justify-end gap-2"><a${add_attribute(
    "href",
    assistant ? `${base}/settings/assistants/${assistant?._id}` : `${base}/settings`,
    0
  )} class="rounded-full bg-gray-200 px-8 py-2 font-semibold text-gray-600">Cancel</a> <button type="submit" ${""}${add_attribute("aria-disabled", loading, 0)} class="${[
    "rounded-full bg-black px-8 py-2 font-semibold md:px-20",
    "  text-white"
  ].join(" ").trim()}">${escape(assistant ? "Save" : "Create")} ${``}</button></div></form>`;
});
export {
  AssistantSettings as A
};
