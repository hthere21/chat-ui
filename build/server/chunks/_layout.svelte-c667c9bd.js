import { c as create_ssr_component, d as subscribe, o as onDestroy, e as escape, a as add_attribute, v as validate_component, f as set_store_value, g as createEventDispatcher, h as each, i as spread, j as escape_object } from './ssr-6d44e1a8.js';
import { b as base } from './paths-05fee424.js';
import { p as page, n as navigating } from './stores-55a2d0d3.js';
import { b as PUBLIC_APP_NAME, c as PUBLIC_APP_ASSETS, d as PUBLIC_APP_DESCRIPTION, e as PUBLIC_ORIGIN, f as PUBLIC_APP_DISCLAIMER_MESSAGE } from './public-9ba38108.js';
import { e as error } from './errors-e2c54ae3.js';
import { b as browser } from './environment-03c3dd82.js';
import { C as Close } from './close-edcc7a1c.js';
import { L as Logo } from './Logo-40188589.js';
import { T as Trash_can } from './trash-can-7460ee1f.js';
import { t as titleUpdate } from './titleUpdate-5826afb0.js';
import { c as createSettingsStore, u as useSettingsStore } from './settings2-ba3250ac.js';
import './index2-7383a28b.js';
import './prod-ssr-7cc47430.js';

const Text_align_justify = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M6 6h20v2H6zm0 6h20v2H6zm0 6h20v2H6zm0 6h20v2H6z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const IconNew = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { classNames = "" } = $$props;
  if ($$props.classNames === void 0 && $$bindings.classNames && classNames !== void 0)
    $$bindings.classNames(classNames);
  return `<svg xmlns="http://www.w3.org/2000/svg"${add_attribute("class", classNames, 0)} width="1em" height="1em" fill="none" viewBox="0 0 32 32"><path fill="currentColor" fill-rule="evenodd" d="M3.143 20.286h4.286v2.142H3.143A2.143 2.143 0 0 1 1 20.287V3.143A2.143 2.143 0 0 1 3.143 1h17.143a2.143 2.143 0 0 1 2.142 2.143v4.286h-2.142V3.143H3.143v17.143Zm9.643-12.857v3.214H16v2.143h-3.214V16h-2.143v-3.214H7.429v-2.143h3.214V7.429h2.143Zm14.185 2.639 3.533 3.532a1.7 1.7 0 0 1 0 2.4L15.5 31H9.57v-5.928l15-15.004a1.7 1.7 0 0 1 2.4 0Zm-15.257 18.79h2.897l10.116-10.116-2.899-2.897L11.714 25.96v2.897ZM23.346 14.33l2.897 2.897 2.429-2.43-2.897-2.896-2.43 2.429Z" clip-rule="evenodd"></path></svg>`;
});
const MobileNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $navigating, $$unsubscribe_navigating;
  let $page, $$unsubscribe_page;
  $$unsubscribe_navigating = subscribe(navigating, (value) => $navigating = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { isOpen = false } = $$props;
  let { title } = $$props;
  let closeEl;
  let openEl;
  const dispatch = createEventDispatcher();
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  title = title ?? "New Chat";
  {
    if ($navigating) {
      dispatch("toggle", false);
    }
  }
  {
    if (isOpen && closeEl) {
      closeEl.focus();
    } else if (!isOpen && browser && document.activeElement === closeEl) {
      openEl.focus();
    }
  }
  $$unsubscribe_navigating();
  $$unsubscribe_page();
  return `<nav class="flex h-12 items-center justify-between border-b bg-gray-50 px-3 md:hidden dark:border-gray-800 dark:bg-gray-800/70"><button type="button" class="-ml-3 flex size-12 shrink-0 items-center justify-center text-lg" aria-label="Open menu"${add_attribute("this", openEl, 0)}>${validate_component(Text_align_justify, "CarbonTextAlignJustify").$$render($$result, {}, {}, {})}</button> <span class="truncate px-4">${escape(title)}</span> <a href="${escape(base, true) + "/"}" class="${[
    "-mr-3 flex size-12 shrink-0 items-center justify-center text-lg",
    !$page.params.id ? "invisible" : ""
  ].join(" ").trim()}">${validate_component(IconNew, "IconNew").$$render($$result, {}, {}, {})}</a></nav> <nav class="${"fixed inset-0 z-30 grid max-h-screen grid-cols-1 grid-rows-[auto,auto,1fr,auto] bg-white dark:bg-gray-900 " + escape(isOpen ? "block" : "hidden", true)}"><div class="flex h-12 items-center px-4"><button type="button" class="-mr-3 ml-auto flex size-12 items-center justify-center text-lg" aria-label="Close menu"${add_attribute("this", closeEl, 0)}>${validate_component(Close, "CarbonClose").$$render($$result, {}, {}, {})}</button></div> ${slots.default ? slots.default({}) : ``}</nav>`;
});
const Edit = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M2 26h28v2H2zM25.4 9c.8-.8.8-2 0-2.8l-3.6-3.6c-.8-.8-2-.8-2.8 0l-15 15V24h6.4l15-15zm-5-5L24 7.6l-3 3L17.4 7l3-3zM6 22v-3.6l10-10l3.6 3.6l-10 10H6z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const NavConversationItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { conv } = $$props;
  createEventDispatcher();
  if ($$props.conv === void 0 && $$bindings.conv && conv !== void 0)
    $$bindings.conv(conv);
  $$unsubscribe_page();
  return `<a data-sveltekit-noscroll href="${escape(base, true) + "/conversation/" + escape(conv.id, true)}" class="${"group flex h-10 flex-none items-center gap-1.5 rounded-lg pl-2.5 pr-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 " + escape(
    conv.id === $page.params.id ? "bg-gray-100 dark:bg-gray-700" : "",
    true
  )}"><div class="flex flex-1 items-center truncate">${``} ${conv.avatarHash ? `<img src="${escape(base, true) + "/settings/assistants/" + escape(conv.assistantId, true) + "/avatar.jpg?hash=" + escape(conv.avatarHash, true)}" alt="Assistant avatar" class="mr-1.5 inline size-4 flex-none rounded-full object-cover"> ${escape(conv.title.replace(/\p{Emoji}/gu, ""))}` : `${conv.assistantId ? `<div class="mr-1.5 flex size-4 flex-none items-center justify-center rounded-full bg-gray-300 text-xs font-bold uppercase text-gray-500"></div> ${escape(conv.title.replace(/\p{Emoji}/gu, ""))}` : `${escape(conv.title)}`}`}</div> ${`<button type="button" class="flex h-5 w-5 items-center justify-center rounded md:hidden md:group-hover:flex" title="Edit conversation title">${validate_component(Edit, "CarbonEdit").$$render(
    $$result,
    {
      class: "text-xs text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
    },
    {},
    {}
  )}</button> <button type="button" class="flex h-5 w-5 items-center justify-center rounded md:hidden md:group-hover:flex" title="Delete conversation">${validate_component(Trash_can, "CarbonTrashCan").$$render(
    $$result,
    {
      class: "text-xs text-gray-400  hover:text-gray-500 dark:hover:text-gray-300"
    },
    {},
    {}
  )}</button>`}</a>`;
});
const NavMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let groupedConversations;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { conversations = [] } = $$props;
  let { canLogin } = $$props;
  let { user } = $$props;
  const dateRanges = [
    /* @__PURE__ */ (/* @__PURE__ */ new Date()).setDate(
      /* @__PURE__ */ (/* @__PURE__ */ new Date()).getDate() - 1
    ),
    /* @__PURE__ */ (/* @__PURE__ */ new Date()).setDate(
      /* @__PURE__ */ (/* @__PURE__ */ new Date()).getDate() - 7
    ),
    /* @__PURE__ */ (/* @__PURE__ */ new Date()).setMonth(/* @__PURE__ */ (/* @__PURE__ */ new Date()).getMonth() - 1)
  ];
  const titles = {
    today: "Today",
    week: "This week",
    month: "This month",
    older: "Older"
  };
  const nModels = $page.data.models.filter((el) => !el.unlisted).length;
  if ($$props.conversations === void 0 && $$bindings.conversations && conversations !== void 0)
    $$bindings.conversations(conversations);
  if ($$props.canLogin === void 0 && $$bindings.canLogin && canLogin !== void 0)
    $$bindings.canLogin(canLogin);
  if ($$props.user === void 0 && $$bindings.user && user !== void 0)
    $$bindings.user(user);
  groupedConversations = {
    today: conversations.filter(({ updatedAt }) => updatedAt.getTime() > dateRanges[0]),
    week: conversations.filter(({ updatedAt }) => updatedAt.getTime() > dateRanges[1] && updatedAt.getTime() < dateRanges[0]),
    month: conversations.filter(({ updatedAt }) => updatedAt.getTime() > dateRanges[2] && updatedAt.getTime() < dateRanges[1]),
    older: conversations.filter(({ updatedAt }) => updatedAt.getTime() < dateRanges[2])
  };
  $$unsubscribe_page();
  return `<div class="sticky top-0 flex flex-none items-center justify-between px-3 py-3.5 max-sm:pt-0"><a class="flex items-center rounded-xl text-lg font-semibold" href="${escape(PUBLIC_ORIGIN, true) + escape(base, true) + "/"}">${validate_component(Logo, "Logo").$$render($$result, { classNames: "mr-1" }, {}, {})} ${escape(PUBLIC_APP_NAME)}
		SynthAI</a> <a${add_attribute("href", `${base}/`, 0)} class="flex rounded-lg border bg-white px-2 py-0.5 text-center shadow-sm hover:shadow-none dark:border-gray-600 dark:bg-gray-700" data-svelte-h="svelte-19nyx7z">New Chat</a></div> <div class="scrollbar-custom flex flex-col gap-1 overflow-y-auto rounded-r-xl from-gray-50 px-3 pb-3 pt-2 max-sm:bg-gradient-to-t md:bg-gradient-to-l dark:from-gray-800/30">${each(Object.entries(groupedConversations), ([group, convs]) => {
    return `${convs.length ? `<h4 class="mb-1.5 mt-4 pl-0.5 text-sm text-gray-400 first:mt-0 dark:text-gray-500">${escape(titles[group])}</h4> ${each(convs, (conv) => {
      return `${validate_component(NavConversationItem, "NavConversationItem").$$render($$result, { conv }, {}, {})}`;
    })}` : ``}`;
  })}</div> <div class="mt-0.5 flex flex-col gap-1 rounded-r-xl p-3 text-sm md:bg-gradient-to-l md:from-gray-50 md:dark:from-gray-800/30">${user?.username || user?.email ? `<form action="${escape(base, true) + "/logout"}" method="post" class="group flex items-center gap-1.5 rounded-lg pl-2.5 pr-2 hover:bg-gray-100 dark:hover:bg-gray-700"><span class="flex h-9 flex-none shrink items-center gap-1.5 truncate pr-2 text-gray-500 dark:text-gray-400">${escape(user?.username || user?.email)}</span> <button type="submit" class="ml-auto h-6 flex-none items-center gap-1.5 rounded-md border bg-white px-2 text-gray-700 shadow-sm group-hover:flex hover:shadow-none md:hidden dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400 dark:hover:text-gray-300" data-svelte-h="svelte-16fy7s">Sign Out</button></form>` : ``} ${canLogin ? `<form action="${escape(base, true) + "/login"}" method="POST" target="_parent" data-svelte-h="svelte-mo1hdo"><button type="submit" class="flex h-9 w-full flex-none items-center gap-1.5 rounded-lg pl-2.5 pr-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">Login</button></form>` : ``} <button type="button" class="flex h-9 flex-none items-center gap-1.5 rounded-lg pl-2.5 pr-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700" data-svelte-h="svelte-ymga0p">Theme</button> ${nModels > 1 ? `<a href="${escape(base, true) + "/models"}" class="flex h-9 flex-none items-center gap-1.5 rounded-lg pl-2.5 pr-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">Models
			<span class="ml-auto rounded-full border border-gray-300 px-2 py-0.5 text-xs text-gray-500 dark:border-gray-500 dark:text-gray-400">${escape(nModels)}</span></a>` : ``} ${$page.data.enableAssistants ? `<a href="${escape(base, true) + "/assistants"}" class="flex h-9 flex-none items-center gap-1.5 rounded-lg pl-2.5 pr-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700" data-svelte-h="svelte-6p74k5">Assistants
			<span class="ml-auto rounded-full border border-gray-300 px-2 py-0.5 text-xs text-gray-500 dark:border-gray-500 dark:text-gray-400">New</span></a>` : ``} <a href="${escape(base, true) + "/settings"}" class="flex h-9 flex-none items-center gap-1.5 rounded-lg pl-2.5 pr-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700" data-svelte-h="svelte-4sv8p6">Settings</a> ${``}</div>`;
});
const IconDazzled = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { classNames = "" } = $$props;
  if ($$props.classNames === void 0 && $$bindings.classNames && classNames !== void 0)
    $$bindings.classNames(classNames);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"${add_attribute("class", classNames, 0)} fill="none" viewBox="0 0 26 23"><path fill="url(#a)" d="M.93 10.65A10.17 10.17 0 0 1 11.11.48h4.67a9.45 9.45 0 0 1 0 18.89H4.53L1.62 22.2a.38.38 0 0 1-.69-.28V10.65Z"></path><path fill="#000" fill-rule="evenodd" d="M11.52 7.4a1.86 1.86 0 1 1-3.72 0 1.86 1.86 0 0 1 3.72 0Zm7.57 0a1.86 1.86 0 1 1-3.73 0 1.86 1.86 0 0 1 3.73 0ZM8.9 12.9a.55.55 0 0 0-.11.35.76.76 0 0 1-1.51 0c0-.95.67-1.94 1.76-1.94 1.09 0 1.76 1 1.76 1.94H9.3a.55.55 0 0 0-.12-.35c-.06-.07-.1-.08-.13-.08s-.08 0-.14.08Zm4.04 0a.55.55 0 0 0-.12.35h-1.51c0-.95.68-1.94 1.76-1.94 1.1 0 1.77 1 1.77 1.94h-1.51a.55.55 0 0 0-.12-.35c-.06-.07-.11-.08-.14-.08-.02 0-.07 0-.13.08Zm-1.89.79c-.02 0-.07-.01-.13-.08a.55.55 0 0 1-.12-.36h-1.5c0 .95.67 1.95 1.75 1.95 1.1 0 1.77-1 1.77-1.95h-1.51c0 .16-.06.28-.12.36-.06.07-.11.08-.14.08Zm4.04 0c-.03 0-.08-.01-.14-.08a.55.55 0 0 1-.12-.36h-1.5c0 .95.67 1.95 1.76 1.95 1.08 0 1.76-1 1.76-1.95h-1.51c0 .16-.06.28-.12.36-.06.07-.11.08-.13.08Zm1.76-.44c0-.16.05-.28.12-.35.06-.07.1-.08.13-.08s.08 0 .14.08c.06.07.11.2.11.35a.76.76 0 0 0 1.51 0c0-.95-.67-1.94-1.76-1.94-1.09 0-1.76 1-1.76 1.94h1.5Z" clip-rule="evenodd"></path><defs><radialGradient id="a" cx="0" cy="0" r="1" gradientTransform="matrix(0 31.37 -34.85 0 13.08 -9.02)" gradientUnits="userSpaceOnUse"><stop stop-color="#FFD21E"></stop><stop offset="1" stop-color="red"></stop></radialGradient></defs></svg>`;
});
const Toast = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { message = "" } = $$props;
  if ($$props.message === void 0 && $$bindings.message && message !== void 0)
    $$bindings.message(message);
  return `<div class="pointer-events-none fixed right-0 top-12 z-20 bg-gradient-to-bl from-red-500/20 via-red-500/0 to-red-500/0 pb-36 pl-36 pr-2 pt-2 md:top-0 md:pr-8 md:pt-5"><div class="pointer-events-auto flex items-center rounded-full bg-white/90 px-3 py-1 shadow-sm dark:bg-gray-900/80">${validate_component(IconDazzled, "IconDazzled").$$render($$result, { classNames: "text-2xl mr-2" }, {}, {})} <h2 class="font-semibold">${escape(message)}</h2></div></div>`;
});
const Portal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let el;
  onDestroy(() => {
  });
  return `<div class="contents" hidden${add_attribute("this", el, 0)}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width = "max-w-sm" } = $$props;
  let backdropEl;
  let modalEl;
  createEventDispatcher();
  onDestroy(() => {
    return;
  });
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  return `${validate_component(Portal, "Portal").$$render($$result, {}, {}, {
    default: () => {
      return ` <div role="presentation" tabindex="-1" class="fixed inset-0 z-40 flex items-center justify-center bg-black/80 p-8 backdrop-blur-sm dark:bg-black/50"${add_attribute("this", backdropEl, 0)}><div role="dialog" tabindex="-1" class="${"max-h-[90dvh] overflow-y-auto overflow-x-hidden rounded-2xl bg-white shadow-2xl outline-none sm:-mt-10 " + escape(width, true)}"${add_attribute("this", modalEl, 0)}>${slots.default ? slots.default({}) : ``}</div></div>`;
    }
  })}`;
});
const DisclaimerModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $$unsubscribe_settings;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const settings = useSettingsStore();
  $$unsubscribe_settings = subscribe(settings, (value) => value);
  $$unsubscribe_page();
  $$unsubscribe_settings();
  return `${validate_component(Modal, "Modal").$$render($$result, {}, {}, {
    default: () => {
      return `<div class="flex w-full flex-col items-center gap-6 bg-gradient-to-b from-primary-500/40 via-primary-500/10 to-primary-500/0 px-5 pb-8 pt-9 text-center sm:px-6"><h2 class="flex items-center text-2xl font-semibold text-gray-800">${validate_component(Logo, "Logo").$$render($$result, { classNames: "mr-1" }, {}, {})} ${escape(PUBLIC_APP_NAME)}</h2> <p class="text-lg font-semibold leading-snug text-gray-800" style="text-wrap: balance;">${escape(PUBLIC_APP_DESCRIPTION)}</p> <p class="text-sm text-gray-500">${escape(PUBLIC_APP_DISCLAIMER_MESSAGE)}</p> <div class="flex w-full flex-col items-center gap-2">${$page.data.guestMode || !$page.data.loginEnabled ? `<button class="${[
        "w-full justify-center rounded-full border-2 border-gray-300 bg-black px-5 py-2 text-lg font-semibold text-gray-100 transition-colors hover:bg-gray-900",
        ($page.data.loginEnabled ? "bg-white" : "") + " " + ($page.data.loginEnabled ? "text-gray-800" : "") + " " + ($page.data.loginEnabled ? "hover:bg-slate-100" : "")
      ].join(" ").trim()}">${$page.data.loginEnabled ? `Try as guest` : `Start chatting`}</button>` : ``} ${$page.data.loginEnabled ? `<form action="${escape(base, true) + "/login"}" target="_parent" method="POST" class="w-full"><button type="submit" class="flex w-full items-center justify-center whitespace-nowrap rounded-full border-2 border-black bg-black px-5 py-2 text-lg font-semibold text-gray-100 transition-colors hover:bg-gray-900">Sign in
						${``}</button></form>` : ``}</div></div>`;
    }
  })}`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let mobileNavTitle;
  let $page, $$unsubscribe_page;
  let $settings, $$unsubscribe_settings;
  let $titleUpdate, $$unsubscribe_titleUpdate;
  let $error, $$unsubscribe_error;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_titleUpdate = subscribe(titleUpdate, (value) => $titleUpdate = value);
  $$unsubscribe_error = subscribe(error, (value) => $error = value);
  let { data } = $$props;
  let isNavOpen = false;
  let errorToastTimeout;
  let currentError;
  async function onError() {
    if ($error && currentError && $error !== currentError) {
      clearTimeout(errorToastTimeout);
      currentError = null;
      await new Promise((resolve) => setTimeout(resolve, 300));
    }
    currentError = $error;
    errorToastTimeout = setTimeout(
      () => {
        set_store_value(error, $error = null, $error);
        currentError = null;
      },
      3e3
    );
  }
  onDestroy(() => {
    clearTimeout(errorToastTimeout);
  });
  const settings = createSettingsStore(data.settings);
  $$unsubscribe_settings = subscribe(settings, (value) => $settings = value);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  {
    if ($error)
      onError();
  }
  {
    if ($titleUpdate) {
      const convIdx = data.conversations.findIndex(({ id }) => id === $titleUpdate?.convId);
      if (convIdx != -1) {
        data.conversations[convIdx].title = $titleUpdate?.title ?? data.conversations[convIdx].title;
      }
      data.conversations = [...data.conversations];
      set_store_value(titleUpdate, $titleUpdate = null, $titleUpdate);
    }
  }
  mobileNavTitle = ["/models", "/assistants", "/privacy"].includes($page.route.id ?? "") ? "" : data.conversations.find((conv) => conv.id === $page.params.id)?.title;
  $$unsubscribe_page();
  $$unsubscribe_settings();
  $$unsubscribe_titleUpdate();
  $$unsubscribe_error();
  return `${$$result.head += `<!-- HEAD_svelte-lf23ke_START -->${$$result.title = `<title>${escape(PUBLIC_APP_NAME)}</title>`, ""}<meta name="description" content="The first open source alternative to ChatGPT. 💪"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@huggingface">${!$page.url.pathname.includes("/assistant/") && $page.route.id !== "/assistants" ? `<meta property="og:title"${add_attribute("content", PUBLIC_APP_NAME, 0)}> <meta property="og:type" content="website"> <meta property="og:url" content="${escape($page.url.origin, true) + escape(base, true)}"> <meta property="og:image" content="${escape($page.url.origin, true) + escape(base, true) + "/" + escape(PUBLIC_APP_ASSETS, true) + "/thumbnail.png"}"> <meta property="og:description"${add_attribute("content", PUBLIC_APP_DESCRIPTION, 0)}>` : ``}<link rel="icon" href="${escape($page.url.origin, true) + escape(base, true) + "/" + escape(PUBLIC_APP_ASSETS, true) + "/favicon.ico"}" sizes="32x32"><link rel="icon" href="${escape($page.url.origin, true) + escape(base, true) + "/" + escape(PUBLIC_APP_ASSETS, true) + "/icon.svg"}" type="image/svg+xml"><link rel="apple-touch-icon" href="${escape($page.url.origin, true) + escape(base, true) + "/" + escape(PUBLIC_APP_ASSETS, true) + "/apple-touch-icon.png"}"><link rel="manifest" href="${escape($page.url.origin, true) + escape(base, true) + "/" + escape(PUBLIC_APP_ASSETS, true) + "/manifest.json"}">${``}<!-- HEAD_svelte-lf23ke_END -->`, ""} ${!$settings.ethicsModalAccepted && $page.url.pathname !== `${base}/privacy` ? `${validate_component(DisclaimerModal, "DisclaimerModal").$$render($$result, {}, {}, {})}` : ``} <div class="grid h-full w-screen grid-cols-1 grid-rows-[auto,1fr] overflow-hidden text-smd md:grid-cols-[280px,1fr] md:grid-rows-[1fr] dark:text-gray-300">${validate_component(MobileNav, "MobileNav").$$render($$result, { isOpen: isNavOpen, title: mobileNavTitle }, {}, {
    default: () => {
      return `${validate_component(NavMenu, "NavMenu").$$render(
        $$result,
        {
          conversations: data.conversations,
          user: data.user,
          canLogin: data.user === void 0 && data.loginEnabled
        },
        {},
        {}
      )}`;
    }
  })} <nav class="grid max-h-screen grid-cols-1 grid-rows-[auto,1fr,auto] max-md:hidden">${validate_component(NavMenu, "NavMenu").$$render(
    $$result,
    {
      conversations: data.conversations,
      user: data.user,
      canLogin: data.user === void 0 && data.loginEnabled
    },
    {},
    {}
  )}</nav> ${currentError ? `${validate_component(Toast, "Toast").$$render($$result, { message: currentError }, {}, {})}` : ``} ${slots.default ? slots.default({}) : ``}</div>`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-c667c9bd.js.map
