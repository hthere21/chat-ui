import { c as create_ssr_component, f as subscribe, e as escape, v as validate_component } from "../../chunks/ssr.js";
import { a as PUBLIC_APP_NAME } from "../../chunks/public.js";
import { f as findCurrentModel, C as ChatWindow } from "../../chunks/ChatWindow.js";
import { u as useSettingsStore } from "../../chunks/settings2.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $settings, $$unsubscribe_settings;
  let { data } = $$props;
  let loading = false;
  let files = [];
  const settings = useSettingsStore();
  $$unsubscribe_settings = subscribe(settings, (value) => $settings = value);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-1o4lg8n_START -->${$$result.title = `<title>${escape(PUBLIC_APP_NAME)}</title>`, ""}<!-- HEAD_svelte-1o4lg8n_END -->`, ""} ${validate_component(ChatWindow, "ChatWindow").$$render(
      $$result,
      {
        loading,
        assistant: data.assistant,
        currentModel: findCurrentModel([...data.models, ...data.oldModels], $settings.activeModel),
        models: data.models,
        files
      },
      {
        files: ($$value) => {
          files = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  $$unsubscribe_settings();
  return $$rendered;
});
export {
  Page as default
};
