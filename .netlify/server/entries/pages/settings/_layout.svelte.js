import { c as create_ssr_component, b as spread, d as escape_object, f as subscribe, v as validate_component, h as each, a as add_attribute, e as escape } from "../../../chunks/ssr.js";
import { b as base } from "../../../chunks/paths.js";
import { a as afterNavigate } from "../../../chunks/navigation.js";
import { p as page } from "../../../chunks/stores.js";
import { u as useSettingsStore } from "../../../chunks/settings2.js";
import { C as Close } from "../../../chunks/close.js";
import { C as Checkmark } from "../../../chunks/checkmark.js";
import { A as Add } from "../../../chunks/add.js";
const ArrowUpRight = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M10 6v2h12.59L6 24.59L7.41 26L24 9.41V22h2V6H10z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const User = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M16 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7zm10 28h-2v-5a5 5 0 0 0-5-5h-6a5 5 0 0 0-5 5v5H6v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $settings, $$unsubscribe_settings;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let previousPage = base;
  let assistantsSection;
  afterNavigate(({ from }) => {
    if (!from?.url.pathname.includes("settings")) {
      previousPage = from?.url.toString() || previousPage;
    }
  });
  const settings = useSettingsStore();
  $$unsubscribe_settings = subscribe(settings, (value) => $settings = value);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_page();
  $$unsubscribe_settings();
  return `<div class="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm dark:bg-black/50"><dialog open class="xl: z-10 grid h-[95dvh] w-[90dvw] grid-cols-1 content-start gap-x-8 overflow-hidden rounded-2xl bg-white p-4 shadow-2xl outline-none sm:h-[80dvh] md:grid-cols-3 md:grid-rows-[auto,1fr] md:p-8 xl:w-[1200px] 2xl:h-[70dvh]"><div class="col-span-1 mb-4 flex items-center justify-between md:col-span-3"><h2 class="text-xl font-bold" data-svelte-h="svelte-n7oby1">Settings</h2> <button class="btn rounded-lg">${validate_component(Close, "CarbonClose").$$render(
    $$result,
    {
      class: "text-xl text-gray-900 hover:text-black"
    },
    {},
    {}
  )}</button></div> <div class="col-span-1 flex flex-col overflow-y-auto whitespace-nowrap max-md:-mx-4 max-md:h-[245px] max-md:border max-md:border-b-2 md:pr-6"><h3 class="pb-3 pl-3 pt-2 text-[.8rem] text-gray-800 sm:pl-1" data-svelte-h="svelte-165v8hs">Models</h3> ${each(data.models.filter((el) => !el.unlisted), (model) => {
    return `<a href="${escape(base, true) + "/settings/" + escape(model.id, true)}" class="${"group flex h-10 flex-none items-center gap-2 pl-3 pr-2 text-sm text-gray-500 hover:bg-gray-100 md:rounded-xl " + escape(
      model.id === $page.params.model ? "!bg-gray-100 !text-gray-800" : "",
      true
    )}"><div class="truncate">${escape(model.displayName)}</div> ${model.id === $settings.activeModel ? `<div class="ml-auto rounded-lg bg-black px-2 py-1.5 text-xs font-semibold leading-none text-white" data-svelte-h="svelte-w9dxal">Active
						</div>` : ``} </a>`;
  })}  ${data.enableAssistants ? `<h3 class="pb-3 pl-3 pt-5 text-[.8rem] text-gray-800 sm:pl-1"${add_attribute("this", assistantsSection, 0)} data-svelte-h="svelte-1amgeip">Assistants</h3> ${!data.loginEnabled || data.loginEnabled && !!data.user ? `<a href="${escape(base, true) + "/settings/assistants/new"}" class="${"group flex h-10 flex-none items-center gap-2 pl-3 pr-2 text-sm text-gray-500 hover:bg-gray-100 md:rounded-xl " + escape(
    $page.url.pathname === `${base}/settings/assistants/new` ? "!bg-gray-100 !text-gray-800" : "",
    true
  )}">${validate_component(Add, "CarbonAdd").$$render($$result, {}, {}, {})} <div class="truncate" data-svelte-h="svelte-1d46d2z">Create new assistant</div></a>` : ``} ${each(data.assistants, (assistant) => {
    return `<a href="${escape(base, true) + "/settings/assistants/" + escape(assistant._id.toString(), true)}" class="${"group flex h-10 flex-none items-center gap-2 pl-2 pr-2 text-sm text-gray-500 hover:bg-gray-100 md:rounded-xl " + escape(
      assistant._id.toString() === $page.params.assistantId ? "!bg-gray-100 !text-gray-800" : "",
      true
    )}">${assistant.avatar ? `<img src="${escape(base, true) + "/settings/assistants/" + escape(assistant._id.toString(), true) + "/avatar.jpg?hash=" + escape(assistant.avatar, true)}" alt="Avatar" class="h-6 w-6 rounded-full object-cover">` : `<div class="flex size-6 items-center justify-center rounded-full bg-gray-300 font-bold uppercase text-gray-500">${escape(assistant.name[0])} </div>`} <div class="truncate">${escape(assistant.name)}</div> ${assistant._id.toString() === $settings.activeModel ? `<div class="ml-auto rounded-lg bg-black px-2 py-1.5 text-xs font-semibold leading-none text-white" data-svelte-h="svelte-1eyowv1">Active
							</div>` : ``} </a>`;
  })} <a href="${escape(base, true) + "/assistants"}" class="group flex h-10 flex-none items-center gap-2 pl-3 pr-2 text-sm text-gray-500 hover:bg-gray-100 md:rounded-xl">${validate_component(ArrowUpRight, "CarbonArrowUpRight").$$render($$result, { class: "mr-1.5 shrink-0 text-xs " }, {}, {})} <div class="truncate" data-svelte-h="svelte-3higaq">Browse Assistants</div></a>` : ``} <a href="${escape(base, true) + "/settings"}" class="${"group mt-auto flex h-10 flex-none items-center gap-2 pl-3 pr-2 text-sm text-gray-500 hover:bg-gray-100 max-md:order-first md:rounded-xl " + escape(
    $page.url.pathname === `${base}/settings` ? "!bg-gray-100 !text-gray-800" : "",
    true
  )}">${validate_component(User, "UserIcon").$$render($$result, { class: "text-sm" }, {}, {})}
				Application Settings</a></div> <div class="col-span-1 overflow-y-auto px-4 max-md:-mx-4 max-md:pt-6 md:col-span-2">${slots.default ? slots.default({}) : ``}</div> ${$settings.recentlySaved ? `<div class="absolute bottom-4 right-4 m-2 flex items-center gap-1.5 rounded-full border border-gray-300 bg-gray-200 px-3 py-1 text-black">${validate_component(Checkmark, "CarbonCheckmark").$$render($$result, { class: "text-green-500" }, {}, {})}
				Saved</div>` : ``}</dialog></div>`;
});
export {
  Layout as default
};
