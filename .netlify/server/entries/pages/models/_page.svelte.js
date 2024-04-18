import { c as create_ssr_component, f as subscribe, e as escape, h as each, a as add_attribute } from "../../../chunks/ssr.js";
import { a as PUBLIC_APP_NAME } from "../../../chunks/public.js";
import { b as base } from "../../../chunks/paths.js";
import { p as page } from "../../../chunks/stores.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-14r98d6_START -->${``}<!-- HEAD_svelte-14r98d6_END -->`, ""} <div class="scrollbar-custom mr-1 h-full overflow-y-auto py-12 max-sm:pt-8 md:py-24"><div class="pt-42 mx-auto flex flex-col px-5 xl:w-[60rem] 2xl:w-[64rem]"><div class="flex items-center"><h1 class="text-2xl font-bold" data-svelte-h="svelte-nnglr6">Models</h1> ${``}</div> <h3 class="text-gray-500">All models available on ${escape(PUBLIC_APP_NAME)}</h3> <dl class="mt-8 grid grid-cols-1 gap-3 sm:gap-5 xl:grid-cols-2">${each(data.models.filter((el) => !el.unlisted), (model, index) => {
    return `<a href="${escape(base, true) + "/?model=" + escape(model.id, true)}" class="relative flex flex-col gap-2 overflow-hidden rounded-xl border bg-gray-50/50 px-6 py-5 shadow hover:bg-gray-50 hover:shadow-inner dark:border-gray-800/70 dark:bg-gray-950/20 dark:hover:bg-gray-950/40"><div class="flex items-center justify-between">${model.logoUrl ? `<img class="overflown aspect-square size-6 rounded border dark:border-gray-700"${add_attribute("src", model.logoUrl, 0)} alt="">` : `<div class="size-6 rounded border border-transparent bg-gray-300 dark:bg-gray-800"></div>`} ${index === 0 ? `<div class="rounded-full border border-gray-300 px-2 py-0.5 text-xs text-gray-500 dark:border-gray-500 dark:text-gray-400" data-svelte-h="svelte-1uygmhn">Default
							</div>` : ``}</div> <dt class="flex items-center gap-2 font-semibold">${escape(model.displayName)}</dt> <dd class="text-sm text-gray-500 dark:text-gray-400">${escape(model.description || "-")}</dd> </a>`;
  })}</dl></div></div>`;
});
export {
  Page as default
};
