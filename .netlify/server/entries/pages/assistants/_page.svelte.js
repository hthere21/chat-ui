import { c as create_ssr_component, b as spread, d as escape_object, e as escape, a as add_attribute, v as validate_component, f as subscribe, h as each } from "../../../chunks/ssr.js";
import { b as base } from "../../../chunks/paths.js";
import { p as page } from "../../../chunks/stores.js";
import { A as Add } from "../../../chunks/add.js";
import { C as Close } from "../../../chunks/close.js";
const Earth_americas_filled = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2ZM4 16a11.915 11.915 0 0 1 .7-4H10l5 4l-2.8 3.693A1 1 0 0 0 12.293 21L15 24v3.95A12.01 12.01 0 0 1 4 16Zm17.435 10.685l2.546-7.7a1 1 0 0 0-.367-.985L15 11l2-2h5.28a1 1 0 0 0 .948-.684l.495-1.486a11.974 11.974 0 0 1-2.288 19.855Z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const User_multiple = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M30 30h-2v-5a5.006 5.006 0 0 0-5-5v-2a7.008 7.008 0 0 1 7 7zm-8 0h-2v-5a5.006 5.006 0 0 0-5-5H9a5.006 5.006 0 0 0-5 5v5H2v-5a7.008 7.008 0 0 1 7-7h6a7.008 7.008 0 0 1 7 7zM20 2v2a5 5 0 0 1 0 10v2a7 7 0 0 0 0-14zm-8 2a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7z"/>`}<!-- HTML_TAG_END --></svg>`;
});
function getHref(url, modifications) {
  const newUrl = new URL(url);
  const { newKeys, existingKeys } = modifications;
  if (existingKeys) {
    const { behaviour, keys } = existingKeys;
    if (behaviour === "delete") {
      for (const key of keys) {
        newUrl.searchParams.delete(key);
      }
    } else {
      const keysToPreserve = keys;
      for (const key of [...newUrl.searchParams.keys()]) {
        if (!keysToPreserve.includes(key)) {
          newUrl.searchParams.delete(key);
        }
      }
    }
  }
  if (newKeys) {
    for (const [key, val] of Object.entries(newKeys)) {
      if (val) {
        newUrl.searchParams.set(key, val);
      } else {
        newUrl.searchParams.delete(key);
      }
    }
  }
  return newUrl.toString();
}
const Caret_left = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="m20 24l-10-8l10-8z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Caret_right = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="m12 8l10 8l-10 8z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const PaginationArrow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { href } = $$props;
  let { direction } = $$props;
  let { isDisabled = false } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.direction === void 0 && $$bindings.direction && direction !== void 0)
    $$bindings.direction(direction);
  if ($$props.isDisabled === void 0 && $$bindings.isDisabled && isDisabled !== void 0)
    $$bindings.isDisabled(isDisabled);
  return `<a class="${"flex items-center rounded-lg px-2.5 py-1 hover:bg-gray-50 dark:hover:bg-gray-800 " + escape(isDisabled ? "pointer-events-none opacity-50" : "", true)}"${add_attribute("href", href, 0)}>${direction === "previous" ? `${validate_component(Caret_left, "CarbonCaretLeft").$$render($$result, { classNames: "mr-1.5" }, {}, {})}
		Previous` : `Next
		${validate_component(Caret_right, "CarbonCaretRight").$$render($$result, { classNames: "ml-1.5" }, {}, {})}`}</a>`;
});
const Pagination = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let numTotalPages;
  let pageIndex;
  let pageIndexes;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { classNames = "" } = $$props;
  let { numItemsPerPage } = $$props;
  let { numTotalItems } = $$props;
  const ELLIPSIS_IDX = -1;
  function getPageIndexes(pageIdx, nTotalPages) {
    let pageIdxs = [];
    const NUM_EXTRA_BUTTONS = 2;
    const minIdx = 0;
    const maxIdx = nTotalPages - 1;
    pageIdxs = [pageIdx];
    for (let i = 1; i < NUM_EXTRA_BUTTONS + 1; i++) {
      const newPageIdx = pageIdx + i;
      if (newPageIdx > maxIdx) {
        continue;
      }
      pageIdxs.push(newPageIdx);
    }
    if (maxIdx - pageIdxs[pageIdxs.length - 1] > 1) {
      pageIdxs.push(...[ELLIPSIS_IDX, maxIdx]);
    } else if (maxIdx - pageIdxs[pageIdxs.length - 1] === 1) {
      pageIdxs.push(maxIdx);
    }
    for (let i = 1; i < NUM_EXTRA_BUTTONS + 1; i++) {
      const newPageIdx = pageIdx - i;
      if (newPageIdx < minIdx) {
        continue;
      }
      pageIdxs.unshift(newPageIdx);
    }
    if (pageIdxs[0] - minIdx > 1) {
      pageIdxs.unshift(...[minIdx, ELLIPSIS_IDX]);
    } else if (pageIdxs[0] - minIdx === 1) {
      pageIdxs.unshift(minIdx);
    }
    return pageIdxs;
  }
  if ($$props.classNames === void 0 && $$bindings.classNames && classNames !== void 0)
    $$bindings.classNames(classNames);
  if ($$props.numItemsPerPage === void 0 && $$bindings.numItemsPerPage && numItemsPerPage !== void 0)
    $$bindings.numItemsPerPage(numItemsPerPage);
  if ($$props.numTotalItems === void 0 && $$bindings.numTotalItems && numTotalItems !== void 0)
    $$bindings.numTotalItems(numTotalItems);
  numTotalPages = Math.ceil(numTotalItems / numItemsPerPage);
  pageIndex = parseInt($page.url.searchParams.get("p") ?? "0");
  pageIndexes = getPageIndexes(pageIndex, numTotalPages);
  $$unsubscribe_page();
  return `${numTotalPages > 1 ? `<nav><ul class="${"flex select-none items-center justify-between space-x-2 text-gray-700 sm:justify-center dark:text-gray-300 " + escape(classNames, true)}"><li>${validate_component(PaginationArrow, "PaginationArrow").$$render(
    $$result,
    {
      href: getHref($page.url, {
        newKeys: { p: (pageIndex - 1).toString() }
      }),
      direction: "previous",
      isDisabled: pageIndex - 1 < 0
    },
    {},
    {}
  )}</li> ${each(pageIndexes, (pageIdx) => {
    return `<li class="hidden sm:block"><a class="${[
      "rounded-lg px-2.5 py-1 " + escape(
        pageIndex === pageIdx ? "bg-gray-50 font-semibold ring-1 ring-inset ring-gray-200 dark:bg-gray-800 dark:text-yellow-500 dark:ring-gray-700" : "",
        true
      ),
      pageIdx === ELLIPSIS_IDX || pageIndex === pageIdx ? "pointer-events-none" : ""
    ].join(" ").trim()}"${add_attribute("href", getHref($page.url, { newKeys: { p: pageIdx.toString() } }), 0)}>${escape(pageIdx === ELLIPSIS_IDX ? "..." : pageIdx + 1)}</a> </li>`;
  })} <li>${validate_component(PaginationArrow, "PaginationArrow").$$render(
    $$result,
    {
      href: getHref($page.url, {
        newKeys: { p: (pageIndex + 1).toString() }
      }),
      direction: "next",
      isDisabled: pageIndex + 1 >= numTotalPages
    },
    {},
    {}
  )}</li></ul></nav>` : ``}`;
});
function formatUserCount(userCount) {
  const userCountRanges = [
    { min: 0, max: 1, label: "1" },
    { min: 2, max: 9, label: "1-10" },
    { min: 10, max: 49, label: "10+" },
    { min: 50, max: 99, label: "50+" },
    { min: 100, max: 299, label: "100+" },
    { min: 300, max: 499, label: "300+" },
    { min: 500, max: 999, label: "500+" },
    { min: 1e3, max: 2999, label: "1k+" },
    { min: 3e3, max: 4999, label: "3k+" },
    { min: 5e3, max: 9999, label: "5k+" },
    { min: 1e4, max: Infinity, label: "10k+" }
  ];
  const range = userCountRanges.find(({ min, max }) => userCount >= min && userCount <= max);
  return range?.label ?? "";
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let assistantsCreator;
  let createdByMe;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  assistantsCreator = $page.url.searchParams.get("user");
  createdByMe = data.user?.username && data.user.username === assistantsCreator;
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-10l5qpo_START -->${``}<!-- HEAD_svelte-10l5qpo_END -->`, ""} <div class="scrollbar-custom mr-1 h-full overflow-y-auto py-12 max-sm:pt-8 md:py-24"><div class="pt-42 mx-auto flex flex-col px-5 xl:w-[60rem] 2xl:w-[64rem]"><div class="flex items-center"><h1 class="text-2xl font-bold" data-svelte-h="svelte-648qij">Assistants</h1> ${``}</div> <h3 class="text-gray-500" data-svelte-h="svelte-1wb8a6q">Popular assistants made by the community</h3> <div class="mt-6 flex justify-between gap-2 max-sm:flex-col sm:items-center"><select class="mt-1 h-[34px] rounded-lg border border-gray-300 bg-gray-50 px-2 text-sm text-gray-900 focus:border-blue-700 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"><option value="" data-svelte-h="svelte-s2c3t7">All models</option>${each(data.models.filter((model) => !model.unlisted), (model) => {
    return `<option${add_attribute("value", model.name, 0)}>${escape(model.name)}</option>`;
  })}</select> <a${add_attribute("href", `${base}/settings/assistants/new`, 0)} class="flex items-center gap-1 whitespace-nowrap rounded-lg border bg-white py-1 pl-1.5 pr-2.5 shadow-sm hover:bg-gray-50 hover:shadow-none dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-700">${validate_component(Add, "CarbonAdd").$$render($$result, {}, {}, {})}Create New assistant</a></div> <div class="mt-7 flex items-center gap-x-2 text-sm">${assistantsCreator && !createdByMe ? `<div class="flex items-center gap-1.5 rounded-full border border-gray-300 bg-gray-50 px-3 py-1 dark:border-gray-600 dark:bg-gray-700 dark:text-white">${escape(assistantsCreator)}&#39;s Assistants
					<a${add_attribute(
    "href",
    getHref($page.url, {
      existingKeys: {
        behaviour: "delete",
        keys: ["user", "modelId", "p"]
      }
    }),
    0
  )} class="group">${validate_component(Close, "CarbonClose").$$render(
    $$result,
    {
      class: "text-xs group-hover:text-gray-800 dark:group-hover:text-gray-300"
    },
    {},
    {}
  )}</a></div> ${``}` : `<a${add_attribute(
    "href",
    getHref($page.url, {
      existingKeys: {
        behaviour: "delete",
        keys: ["user", "modelId", "p"]
      }
    }),
    0
  )} class="${"flex items-center gap-1.5 rounded-full border px-3 py-1 " + escape(
    !assistantsCreator ? "border-gray-300 bg-gray-50  dark:border-gray-600 dark:bg-gray-700 dark:text-white" : "border-transparent text-gray-400 hover:text-gray-800 dark:hover:text-gray-300",
    true
  )}">${validate_component(Earth_americas_filled, "CarbonEarthAmerica").$$render($$result, { class: "text-xs" }, {}, {})}
					Community</a> ${data.user?.username ? `<a${add_attribute(
    "href",
    getHref($page.url, {
      newKeys: { user: data.user.username },
      existingKeys: {
        behaviour: "delete",
        keys: ["modelId", "p"]
      }
    }),
    0
  )} class="${"flex items-center gap-1.5 rounded-full border px-3 py-1 " + escape(
    assistantsCreator && createdByMe ? "border-gray-300 bg-gray-50  dark:border-gray-600 dark:bg-gray-700 dark:text-white" : "border-transparent text-gray-400 hover:text-gray-800 dark:hover:text-gray-300",
    true
  )}">${escape(data.user.username)}</a>` : ``}`}</div> <div class="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">${data.assistants.length ? each(data.assistants, (assistant) => {
    return `<a href="${escape(base, true) + "/assistant/" + escape(assistant._id, true)}" class="relative flex flex-col items-center justify-center overflow-hidden text-balance rounded-xl border bg-gray-50/50 px-4 py-6 text-center shadow hover:bg-gray-50 hover:shadow-inner max-sm:px-4 sm:h-64 sm:pb-4 xl:pt-8 dark:border-gray-800/70 dark:bg-gray-950/20 dark:hover:bg-gray-950/40">${assistant.userCount && assistant.userCount > 1 ? `<div class="absolute right-3 top-3 flex items-center gap-1 text-xs text-gray-400" title="Number of users">${validate_component(User_multiple, "CarbonUserMultiple").$$render($$result, { class: "text-xxs" }, {}, {})}${escape(formatUserCount(assistant.userCount))} </div>` : ``} ${assistant.avatar ? `<img src="${escape(base, true) + "/settings/assistants/" + escape(assistant._id, true) + "/avatar.jpg"}" alt="Avatar" class="mb-2 aspect-square size-12 flex-none rounded-full object-cover sm:mb-6 sm:size-20">` : `<div class="mb-2 flex aspect-square size-12 flex-none items-center justify-center rounded-full bg-gray-300 text-2xl font-bold uppercase text-gray-500 sm:mb-6 sm:size-20 dark:bg-gray-800">${escape(assistant.name[0])} </div>`} <h3 class="mb-2 line-clamp-2 max-w-full break-words text-center text-[.8rem] font-semibold leading-snug sm:text-sm">${escape(assistant.name)}</h3> <p class="line-clamp-4 text-xs text-gray-700 sm:line-clamp-2 dark:text-gray-400">${escape(assistant.description)}</p> ${assistant.createdByName ? `<p class="mt-auto pt-2 text-xs text-gray-400 dark:text-gray-500">Created by <a class="hover:underline" href="${escape(base, true) + "/assistants?user=" + escape(assistant.createdByName, true)}">${escape(assistant.createdByName)}</a> </p>` : ``} </a>`;
  }) : `No assistants found`}</div> ${validate_component(Pagination, "Pagination").$$render(
    $$result,
    {
      classNames: "w-full flex justify-center mt-14 mb-4",
      numItemsPerPage: data.numItemsPerPage,
      numTotalItems: data.numTotalItems
    },
    {},
    {}
  )}</div></div>`;
});
export {
  Page as default
};
