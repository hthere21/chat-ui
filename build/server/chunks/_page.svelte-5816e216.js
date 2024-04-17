import { c as create_ssr_component, d as subscribe, f as set_store_value, e as escape, a as add_attribute, v as validate_component } from './ssr-6d44e1a8.js';
import { p as page } from './stores-55a2d0d3.js';
import { b as base } from './paths-05fee424.js';
import { u as useSettingsStore } from './settings2-ba3250ac.js';
import { C as CopyToClipBoardBtn } from './CopyToClipBoardBtn-6f6980c7.js';
import { A as Arrow_up_right } from './arrow-up-right-24f24e5a.js';
import { L as Link } from './link-0a42285c.js';
import './index2-7383a28b.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let hasCustomPreprompt;
  let isActive;
  let model;
  let $page, $$unsubscribe_page;
  let $settings, $$unsubscribe_settings;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const settings = useSettingsStore();
  $$unsubscribe_settings = subscribe(settings, (value) => $settings = value);
  {
    if ($settings.customPrompts[$page.params.model] === void 0) {
      set_store_value(
        settings,
        $settings.customPrompts = {
          ...$settings.customPrompts,
          [$page.params.model]: $page.data.models.find((el) => el.id === $page.params.model)?.preprompt || ""
        },
        $settings
      );
    }
  }
  hasCustomPreprompt = $settings.customPrompts[$page.params.model] !== $page.data.models.find((el) => el.id === $page.params.model)?.preprompt;
  isActive = $settings.activeModel === $page.params.model;
  model = $page.data.models.find((el) => el.id === $page.params.model);
  $$unsubscribe_page();
  $$unsubscribe_settings();
  return `<div class="flex flex-col items-start"><div class="mb-5 flex flex-col gap-1.5"><h2 class="text-lg font-semibold md:text-xl">${escape($page.params.model)}</h2> ${model.description ? `<p class="whitespace-pre-wrap text-gray-600">${escape(model.description)}</p>` : ``}</div> <div class="flex flex-wrap items-center gap-2 md:gap-4">${model.modelUrl ? `<a${add_attribute("href", model.modelUrl || "https://huggingface.co/" + model.name, 0)} target="_blank" rel="noreferrer" class="flex items-center truncate underline underline-offset-2">${validate_component(Arrow_up_right, "CarbonArrowUpRight").$$render($$result, { class: "mr-1.5 shrink-0 text-xs " }, {}, {})}
				Model page</a>` : ``} ${model.datasetName || model.datasetUrl ? `<a${add_attribute("href", model.datasetUrl || "https://huggingface.co/datasets/" + model.datasetName, 0)} target="_blank" rel="noreferrer" class="flex items-center truncate underline underline-offset-2">${validate_component(Arrow_up_right, "CarbonArrowUpRight").$$render($$result, { class: "mr-1.5 shrink-0 text-xs " }, {}, {})}
				Dataset page</a>` : ``} ${model.websiteUrl ? `<a${add_attribute("href", model.websiteUrl, 0)} target="_blank" class="flex items-center truncate underline underline-offset-2" rel="noreferrer">${validate_component(Arrow_up_right, "CarbonArrowUpRight").$$render($$result, { class: "mr-1.5 shrink-0 text-xs " }, {}, {})}
				Model website</a>` : ``} ${validate_component(CopyToClipBoardBtn, "CopyToClipBoardBtn").$$render(
    $$result,
    {
      value: $page.url.origin + base + "?model=" + model.id,
      classNames: "!border-none !shadow-none !py-0 !px-1 !rounded-md"
    },
    {},
    {
      default: () => {
        return `<div class="flex items-center gap-1.5 hover:underline">${validate_component(Link, "CarbonLink").$$render($$result, {}, {}, {})}Copy direct link to model</div>`;
      }
    }
  )}</div> <button class="${escape(isActive ? "bg-gray-100" : "bg-black text-white", true) + " my-8 flex items-center rounded-full px-3 py-1"}" ${isActive ? "disabled" : ""} name="Activate model">${escape(isActive ? "Active model" : "Activate")}</button> <div class="flex w-full flex-col gap-2"><div class="flex w-full flex-row content-between"><h3 class="mb-1.5 text-lg font-semibold text-gray-800" data-svelte-h="svelte-164tosc">System Prompt</h3> ${hasCustomPreprompt ? `<button class="ml-auto underline decoration-gray-300 hover:decoration-gray-700" data-svelte-h="svelte-1ehlk8p">Reset</button>` : ``}</div> <textarea rows="10" class="w-full resize-none rounded-md border-2 bg-gray-100 p-2">${escape($settings.customPrompts[$page.params.model] || "")}</textarea></div></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-5816e216.js.map
