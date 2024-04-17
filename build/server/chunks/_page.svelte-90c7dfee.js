import { c as create_ssr_component, d as subscribe, a as add_attribute, e as escape } from './ssr-6d44e1a8.js';
import { b as base } from './paths-05fee424.js';
import { a as afterNavigate } from './navigation-770d2ea1.js';
import { u as useSettingsStore } from './settings2-ba3250ac.js';
import { b as PUBLIC_APP_NAME } from './public-9ba38108.js';
import { p as page } from './stores-55a2d0d3.js';
import './index2-7383a28b.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $$unsubscribe_settings;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  let previousPage = base;
  afterNavigate(({ from }) => {
    if (!from?.url.pathname.includes("settings")) {
      previousPage = from?.url.toString() || previousPage;
    }
  });
  const settings = useSettingsStore();
  $$unsubscribe_settings = subscribe(settings, (value) => value);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_page();
  $$unsubscribe_settings();
  return `${$$result.head += `<!-- HEAD_svelte-f5y8vl_START --><meta property="og:title"${add_attribute("content", data.assistant.name + " - " + PUBLIC_APP_NAME, 0)}><meta property="og:type" content="link"><meta property="og:description"${add_attribute("content", `Use the ${data.assistant.name} assistant inside of ${PUBLIC_APP_NAME}`, 0)}><meta property="og:image" content="${escape($page.url.origin, true) + escape(base, true) + "/assistant/" + escape(data.assistant._id, true) + "/thumbnail.png"}"><meta property="og:url"${add_attribute("content", $page.url.href, 0)}><meta name="twitter:card" content="summary_large_image"><!-- HEAD_svelte-f5y8vl_END -->`, ""} <div class="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm dark:bg-black/50"><dialog open class="z-10 flex flex-col content-center items-center gap-x-10 gap-y-3 overflow-hidden rounded-2xl bg-white p-4 pt-6 text-center shadow-2xl outline-none max-sm:w-[85dvw] max-sm:px-6 md:w-96 md:grid-cols-3 md:grid-rows-[auto,1fr] md:p-8">${data.assistant.avatar ? `<img class="size-16 flex-none rounded-full object-cover sm:size-24" src="${escape(base, true) + "/settings/assistants/" + escape(data.assistant._id, true) + "/avatar.jpg?hash=" + escape(data.assistant.avatar, true)}" alt="avatar">` : `<div class="flex size-16 flex-none items-center justify-center rounded-full bg-gray-300 text-2xl font-bold uppercase text-gray-500 sm:size-24">${escape(data.assistant.name[0])}</div>`} <h1 class="text-balance text-xl font-bold">${escape(data.assistant.name)}</h1> ${data.assistant.description ? `<h3 class="line-clamp-6 text-balance text-sm text-gray-500">${escape(data.assistant.description)}</h3>` : ``} ${data.assistant.createdByName ? `<p class="mt-2 text-sm text-gray-500">Created by <a class="hover:underline" href="${escape(base, true) + "/assistants?user=" + escape(data.assistant.createdByName, true)}">${escape(data.assistant.createdByName)}</a></p>` : ``} <button class="mt-4 w-full rounded-full bg-gray-200 px-4 py-2 font-semibold text-gray-700" data-svelte-h="svelte-1c2du3v">Cancel</button> <form method="POST" action="${escape(base, true) + "/settings/assistants/" + escape(data.assistant._id, true) + "?/subscribe"}" class="w-full"><button type="submit" class="w-full rounded-full bg-black px-4 py-3 font-semibold text-white" data-svelte-h="svelte-1me4cd7">Start chatting</button></form></dialog></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-90c7dfee.js.map
