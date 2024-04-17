import { c as create_ssr_component, d as subscribe, e as escape, v as validate_component } from './ssr-6d44e1a8.js';
import { b as PUBLIC_APP_NAME } from './public-9ba38108.js';
import { f as findCurrentModel, C as ChatWindow } from './ChatWindow-2c5424ea.js';
import { u as useSettingsStore } from './settings2-ba3250ac.js';
import './close-edcc7a1c.js';
import './checkmark-dd505776.js';
import './index2-7383a28b.js';
import './Switch-c8ebd005.js';
import './paths-05fee424.js';
import './stores-55a2d0d3.js';
import './environment-03c3dd82.js';
import './prod-ssr-7cc47430.js';
import './upload-2c316ae2.js';
import 'marked';
import './CopyToClipBoardBtn-6f6980c7.js';
import './pen-285ea73c.js';
import './Logo-40188589.js';
import './arrow-up-right-24f24e5a.js';
import 'json5';

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

export { Page as default };
//# sourceMappingURL=_page.svelte-8dc68078.js.map
