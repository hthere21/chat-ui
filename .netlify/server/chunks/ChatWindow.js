import { j as set_current_component, r as run_all, k as current_component, c as create_ssr_component, b as spread, d as escape_object, g as createEventDispatcher, e as escape, a as add_attribute, v as validate_component, f as subscribe, h as each, s as setContext, l as getContext, i as set_store_value, o as onDestroy, n as is_promise, p as noop } from "./ssr.js";
import { C as Close } from "./close.js";
import { C as Checkmark } from "./checkmark.js";
import { w as writable } from "./index2.js";
import { S as Switch } from "./Switch.js";
import { b as base } from "./paths.js";
import { p as page } from "./stores.js";
import { b as browser } from "./environment.js";
import { U as Upload } from "./upload.js";
import { marked } from "marked";
import markedKatex from "marked-katex-extension";
import { C as CopyToClipBoardBtn } from "./CopyToClipBoardBtn.js";
import { P as Pen } from "./pen.js";
import { e as PUBLIC_ANNOUNCEMENT_BANNERS, a as PUBLIC_APP_NAME, f as PUBLIC_VERSION } from "./public.js";
import { L as Logo } from "./Logo.js";
import { A as Arrow_up_right } from "./arrow-up-right.js";
import { u as useSettingsStore } from "./settings2.js";
import JSON5 from "json5";
const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
const Send_alt_filled = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M27.71 4.29a1 1 0 0 0-1.05-.23l-22 8a1 1 0 0 0 0 1.87l8.59 3.43L19.59 11L21 12.41l-6.37 6.37l3.44 8.59A1 1 0 0 0 19 28a1 1 0 0 0 .92-.66l8-22a1 1 0 0 0-.21-1.05Z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Export = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M26 24v4H6v-4H4v4l.008-.005A1.998 1.998 0 0 0 6 30h20a2 2 0 0 0 2-2v-4zM6 12l1.411 1.405L15 5.825V24h2V5.825l7.591 7.58L26 12L16 2L6 12z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Stop_filled_alt = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M24 6H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Caret_down = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="m24 12l-8 10l-8-10z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Loading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 24 24" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z" opacity=".5"/><path fill="currentColor" d="M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z"><animateTransform attributeName="transform" dur="1s" from="0 12 12" repeatCount="indefinite" to="360 12 12" type="rotate"/></path>`}<!-- HTML_TAG_END --></svg>`;
});
const ChatInput_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "pre.svelte-jxi03l,textarea.svelte-jxi03l{font-family:inherit;box-sizing:border-box;line-height:1.5}",
  map: null
};
const ChatInput = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let minHeight;
  let maxHeight;
  let { value = "" } = $$props;
  let { minRows = 1 } = $$props;
  let { maxRows = null } = $$props;
  let { placeholder = "" } = $$props;
  let { disabled = false } = $$props;
  let textareaElement;
  createEventDispatcher();
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.minRows === void 0 && $$bindings.minRows && minRows !== void 0)
    $$bindings.minRows(minRows);
  if ($$props.maxRows === void 0 && $$bindings.maxRows && maxRows !== void 0)
    $$bindings.maxRows(maxRows);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.disabled === void 0 && $$bindings.disabled && disabled !== void 0)
    $$bindings.disabled(disabled);
  $$result.css.add(css$1);
  minHeight = `${1 + minRows * 1.5}em`;
  maxHeight = maxRows ? `${1 + maxRows * 1.5}em` : `auto`;
  return ` <div class="relative min-w-0 flex-1"><pre class="scrollbar-custom invisible overflow-x-hidden overflow-y-scroll whitespace-pre-wrap break-words p-3 svelte-jxi03l" aria-hidden="true" style="${"min-height: " + escape(minHeight, true) + "; max-height: " + escape(maxHeight, true)}">${escape((value || " ") + "\n")}</pre> <textarea enterkeyhint="send" tabindex="0" rows="1" class="${[
    "scrollbar-custom absolute top-0 m-0 h-full w-full resize-none scroll-p-3 overflow-x-hidden overflow-y-scroll border-0 bg-transparent p-3 outline-none focus:ring-0 focus-visible:ring-0 svelte-jxi03l",
    disabled ? "text-gray-400" : ""
  ].join(" ").trim()}" ${disabled ? "disabled" : ""}${add_attribute("placeholder", placeholder, 0)}${add_attribute("this", textareaElement, 0)}>${escape(value || "")}</textarea> </div>`;
});
const StopGeneratingBtn = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { classNames = "" } = $$props;
  if ($$props.classNames === void 0 && $$bindings.classNames && classNames !== void 0)
    $$bindings.classNames(classNames);
  return `<button type="button" class="${"btn flex h-8 rounded-lg border bg-white px-3 py-1 shadow-sm transition-all hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 " + escape(classNames, true)}">${validate_component(Stop_filled_alt, "CarbonStopFilledAlt").$$render(
    $$result,
    {
      class: "-ml-1 mr-1 h-[1.25rem] w-[1.1875rem] text-gray-300"
    },
    {},
    {}
  )} Stop generating</button>`;
});
const webSearchParameters = writable({
  useSearch: false,
  nItems: 5
});
const Information = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M17 22v-8h-4v2h2v6h-3v2h8v-2h-3zM16 8a1.5 1.5 0 1 0 1.5 1.5A1.5 1.5 0 0 0 16 8z"/><path fill="currentColor" d="M16 30a14 14 0 1 1 14-14a14 14 0 0 1-14 14Zm0-26a12 12 0 1 0 12 12A12 12 0 0 0 16 4Z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const WebSearchToggle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $webSearchParameters, $$unsubscribe_webSearchParameters;
  $$unsubscribe_webSearchParameters = subscribe(webSearchParameters, (value) => $webSearchParameters = value);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="flex h-8 cursor-pointer select-none items-center gap-2 rounded-lg border bg-white p-1.5 shadow-sm hover:shadow-none dark:border-gray-800 dark:bg-gray-900"${add_attribute("aria-checked", $webSearchParameters.useSearch, 0)} aria-label="web search toggle" role="switch" tabindex="0">${validate_component(Switch, "Switch").$$render(
      $$result,
      {
        name: "useSearch",
        checked: $webSearchParameters.useSearch
      },
      {
        checked: ($$value) => {
          $webSearchParameters.useSearch = $$value;
          $$settled = false;
        }
      },
      {}
    )} <div class="whitespace-nowrap text-sm text-gray-800 dark:text-gray-200" data-svelte-h="svelte-llxlfy">Search web</div> <div class="group relative w-max">${validate_component(Information, "CarbonInformation").$$render($$result, { class: "text-xs text-gray-500" }, {}, {})} <div class="pointer-events-none absolute -top-20 left-1/2 w-max -translate-x-1/2 rounded-md bg-gray-100 p-2 opacity-0 transition-opacity group-hover:opacity-100 dark:bg-gray-800" data-svelte-h="svelte-1gdlxbg"><p class="max-w-sm text-sm text-gray-800 dark:text-gray-200">When enabled, the model will try to complement its answer with information queried from the
				web.</p></div></div></div>`;
  } while (!$$settled);
  $$unsubscribe_webSearchParameters();
  return $$rendered;
});
const FileDropzone_svelte_svelte_type_style_lang = "";
const Rotate_360 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path d="M25.95 7.65l.005-.004c-.092-.11-.197-.206-.293-.312c-.184-.205-.367-.41-.563-.603c-.139-.136-.286-.262-.43-.391c-.183-.165-.366-.329-.558-.482c-.16-.128-.325-.247-.49-.367c-.192-.14-.385-.277-.585-.406a13.513 13.513 0 0 0-.533-.324q-.308-.179-.625-.341c-.184-.094-.37-.185-.56-.27c-.222-.1-.449-.191-.678-.28c-.19-.072-.378-.145-.571-.208c-.246-.082-.498-.15-.75-.217c-.186-.049-.368-.102-.556-.143c-.29-.063-.587-.107-.883-.15c-.16-.023-.315-.056-.476-.073A12.933 12.933 0 0 0 6 7.703V4H4v8h8v-2H6.811A10.961 10.961 0 0 1 16 5a11.111 11.111 0 0 1 1.189.067c.136.015.268.042.403.061c.25.037.501.075.746.128c.16.035.315.08.472.121c.213.057.425.114.633.183c.164.054.325.116.486.178c.193.074.384.15.57.235c.162.072.32.15.477.23q.268.136.526.286c.153.09.305.18.453.276c.168.11.33.224.492.342c.14.102.282.203.417.312c.162.13.316.268.47.406c.123.11.248.217.365.332c.167.164.323.338.479.512A10.993 10.993 0 1 1 5 16H3a13 13 0 1 0 22.95-8.35z" fill="currentColor"/>`}<!-- HTML_TAG_END --></svg>`;
});
const RetryBtn = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { classNames = "" } = $$props;
  if ($$props.classNames === void 0 && $$bindings.classNames && classNames !== void 0)
    $$bindings.classNames(classNames);
  return `<button type="button" class="${"btn flex h-8 rounded-lg border bg-white px-3 py-1 text-gray-500 shadow-sm transition-all hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 " + escape(classNames, true)}">${validate_component(Rotate_360, "CarbonRotate360").$$render($$result, { class: "mr-2 text-xs " }, {}, {})} Retry</button>`;
});
const UploadBtn = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { classNames = "" } = $$props;
  let { files } = $$props;
  if ($$props.classNames === void 0 && $$bindings.classNames && classNames !== void 0)
    $$bindings.classNames(classNames);
  if ($$props.files === void 0 && $$bindings.files && files !== void 0)
    $$bindings.files(files);
  return `<button class="${"btn relative h-8 rounded-lg border bg-white px-3 py-1 text-sm text-gray-500 shadow-sm transition-all hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 " + escape(classNames, true)}"><input class="absolute w-full cursor-pointer opacity-0" type="file" accept="image/*"> ${validate_component(Upload, "CarbonUpload").$$render($$result, { class: "mr-2 text-xs " }, {}, {})} Upload image</button>`;
});
const file2base64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const dataUrl = reader.result;
      const base64 = dataUrl.split(",")[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
};
const Continue = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M10 28a1 1 0 0 1-1-1V5a1 1 0 0 1 1.501-.865l19 11a1 1 0 0 1 0 1.73l-19 11A.998.998 0 0 1 10 28zm1-21.266v18.532L27 16zM4 4h2v24H4z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const ContinueBtn = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { classNames = "" } = $$props;
  if ($$props.classNames === void 0 && $$bindings.classNames && classNames !== void 0)
    $$bindings.classNames(classNames);
  return `<button type="button" class="${"btn flex h-8 rounded-lg border bg-white px-3 py-1 text-gray-500 shadow-sm transition-all hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 " + escape(classNames, true)}">${validate_component(Continue, "CarbonContinue").$$render($$result, { class: "mr-2 text-xs " }, {}, {})} Continue</button>`;
});
const Gear_fill = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 16 16" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86a2.929 2.929 0 0 1 0 5.858z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const AssistantIntroduction = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { assistant } = $$props;
  createEventDispatcher();
  if ($$props.assistant === void 0 && $$bindings.assistant && assistant !== void 0)
    $$bindings.assistant(assistant);
  return `<div class="flex h-full w-full flex-col content-center items-center justify-center pb-52"><div class="relative mt-auto rounded-2xl bg-gray-100 text-gray-600 dark:border-gray-800 dark:bg-gray-800/60 dark:text-gray-300"><div class="flex min-w-[80dvw] items-center gap-4 p-4 pr-1 sm:min-w-[440px] md:p-8 md:pt-10 xl:gap-8">${assistant.avatar ? `<img${add_attribute("src", `${base}/settings/assistants/${assistant._id.toString()}/avatar.jpg?hash=${assistant.avatar}`, 0)} alt="avatar" class="size-16 flex-none rounded-full object-cover max-sm:self-start md:size-32">` : `<div class="flex size-12 flex-none items-center justify-center rounded-full bg-gray-300 object-cover text-xl font-bold uppercase text-gray-500 max-sm:self-start sm:text-4xl md:size-32 dark:bg-gray-600">${escape(assistant?.name[0])}</div>`} <div class="flex h-full flex-col gap-2 text-balance"><p class="-mb-1" data-svelte-h="svelte-xu0ykr">Assistant</p> <p class="text-xl font-bold sm:text-2xl">${escape(assistant.name)}</p> <p class="line-clamp-6 text-sm text-gray-500 dark:text-gray-400">${escape(assistant.description)}</p> ${assistant.createdByName ? `<p class="pt-2 text-sm text-gray-400 dark:text-gray-500">Created by <a class="hover:underline" href="${escape(base, true) + "/assistants?user=" + escape(assistant.createdByName, true)}">${escape(assistant.createdByName)}</a></p>` : ``}</div></div> <div class="absolute right-3 top-3 md:right-4 md:top-4"><a href="${escape(base, true) + "/settings/assistants/" + escape(assistant._id.toString(), true)}" class="flex items-center gap-1.5 rounded-full border bg-white py-1 pl-3 pr-2.5 text-xs text-gray-800 shadow-sm hover:shadow-inner md:text-sm dark:border-gray-700 dark:bg-gray-700 dark:text-gray-300/90 dark:hover:bg-gray-800">${validate_component(Gear_fill, "IconGear").$$render($$result, { class: "text-xxs" }, {}, {})}Settings</a></div></div> ${assistant.exampleInputs ? `<div class="mx-auto mt-auto w-full gap-8 sm:-mb-8"><div class="md:col-span-2 md:mt-6"><div class="${"grid grid-cols-1 gap-3 " + escape(
    assistant.exampleInputs.length > 1 ? "md:grid-cols-2" : "",
    true
  )}">${each(assistant.exampleInputs, (example) => {
    return `<button type="button" class="truncate whitespace-nowrap rounded-xl border bg-gray-50 px-3 py-2 text-left text-smd text-gray-600 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">${escape(example)} </button>`;
  })}</div></div></div>` : ``}</div>`;
});
const CodeBlock = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let highlightedCode;
  let { code = "" } = $$props;
  let { lang = "" } = $$props;
  if ($$props.code === void 0 && $$bindings.code && code !== void 0)
    $$bindings.code(code);
  if ($$props.lang === void 0 && $$bindings.lang && lang !== void 0)
    $$bindings.lang(lang);
  highlightedCode = "";
  return `<div class="group relative my-4 rounded-lg"> <pre class="scrollbar-custom overflow-auto px-5 scrollbar-thumb-gray-500 hover:scrollbar-thumb-gray-400 dark:scrollbar-thumb-white/10 dark:hover:scrollbar-thumb-white/20"><code class="${"language-" + escape(lang, true)}"><!-- HTML_TAG_START -->${highlightedCode || code.replaceAll("<", "&lt;")}<!-- HTML_TAG_END --></code></pre> ${validate_component(CopyToClipBoardBtn, "CopyToClipBoardBtn").$$render(
    $$result,
    {
      classNames: "absolute top-2 right-2 invisible opacity-0 group-hover:visible group-hover:opacity-100",
      value: code
    },
    {},
    {}
  )}</div>`;
});
const Download = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M26 24v4H6v-4H4v4a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-4zm0-10l-1.41-1.41L17 20.17V2h-2v18.17l-7.59-7.58L6 14l10 10l10-10z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Thumbs_up = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M26 12h-6V6a3.003 3.003 0 0 0-3-3h-2.133a2.01 2.01 0 0 0-1.98 1.717l-.845 5.917L8.465 16H2v14h21a7.008 7.008 0 0 0 7-7v-7a4.005 4.005 0 0 0-4-4ZM8 28H4V18h4Zm20-5a5.006 5.006 0 0 1-5 5H10V17.303l3.958-5.937l.91-6.366H17a1 1 0 0 1 1 1v8h8a2.002 2.002 0 0 1 2 2Z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Thumbs_down = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M30 16V9a7.008 7.008 0 0 0-7-7H2v14h6.465l3.577 5.366l.846 5.917A2.01 2.01 0 0 0 14.868 29H17a3.003 3.003 0 0 0 3-3v-6h6a4.005 4.005 0 0 0 4-4ZM8 14H4V4h4Zm20 2a2.002 2.002 0 0 1-2 2h-8v8a1 1 0 0 1-1 1h-2.133l-.91-6.366L10 14.697V4h13a5.006 5.006 0 0 1 5 5Z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Chevron_left = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M10 16L20 6l1.4 1.4l-8.6 8.6l8.6 8.6L20 26z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Chevron_right = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M22 16L12 26l-1.4-1.4l8.6-8.6l-8.6-8.6L12 6z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const PUBLIC_SEP_TOKEN = "</s>";
const Error_filled = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="none" d="M9 10.555L10.555 9L23 21.444L21.444 23z"/><path fill="currentColor" d="M16 2A13.914 13.914 0 0 0 2 16a13.914 13.914 0 0 0 14 14a13.914 13.914 0 0 0 14-14A13.914 13.914 0 0 0 16 2Zm5.445 21L9 10.556L10.556 9L23 21.445Z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const IconInternet = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { classNames = "" } = $$props;
  if ($$props.classNames === void 0 && $$bindings.classNames && classNames !== void 0)
    $$bindings.classNames(classNames);
  return `<svg${add_attribute("class", classNames, 0)} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 20 20">&gt;<path fill-rule="evenodd" d="M1.5 10a8.5 8.5 0 1 0 17 0a8.5 8.5 0 0 0-17 0m16 0a7.5 7.5 0 1 1-15 0a7.5 7.5 0 0 1 15 0" clip-rule="evenodd"></path><path fill-rule="evenodd" d="M6.5 10c0 4.396 1.442 8 3.5 8s3.5-3.604 3.5-8s-1.442-8-3.5-8s-3.5 3.604-3.5 8m6 0c0 3.889-1.245 7-2.5 7s-2.5-3.111-2.5-7S8.745 3 10 3s2.5 3.111 2.5 7" clip-rule="evenodd"></path><path d="m3.735 5.312l.67-.742c.107.096.221.19.343.281c1.318.988 3.398 1.59 5.665 1.59c1.933 0 3.737-.437 5.055-1.19a5.59 5.59 0 0 0 .857-.597l.65.76c-.298.255-.636.49-1.01.704c-1.477.845-3.452 1.323-5.552 1.323c-2.47 0-4.762-.663-6.265-1.79a5.81 5.81 0 0 1-.413-.34m0 9.389l.67.74c.107-.096.221-.19.343-.28c1.318-.988 3.398-1.59 5.665-1.59c1.933 0 3.737.436 5.055 1.19c.321.184.608.384.857.596l.65-.76a6.583 6.583 0 0 0-1.01-.704c-1.477-.844-3.452-1.322-5.552-1.322c-2.47 0-4.762.663-6.265 1.789c-.146.11-.284.223-.413.34M2 10.5v-1h16v1z"></path></svg>`;
});
const OpenWebSearchResults_svelte_svelte_type_style_lang = "";
const css = {
  code: "details.svelte-1escu1z summary.svelte-1escu1z::-webkit-details-marker{display:none}.loading-path.svelte-1escu1z.svelte-1escu1z{stroke-dasharray:61.45;animation:svelte-1escu1z-loading 2s linear infinite}@keyframes svelte-1escu1z-loading{to{stroke-dashoffset:122.9}}",
  map: null
};
const OpenWebSearchResults = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let sources;
  let error;
  let loading;
  let { classNames = "" } = $$props;
  let { webSearchMessages = [] } = $$props;
  if ($$props.classNames === void 0 && $$bindings.classNames && classNames !== void 0)
    $$bindings.classNames(classNames);
  if ($$props.webSearchMessages === void 0 && $$bindings.webSearchMessages && webSearchMessages !== void 0)
    $$bindings.webSearchMessages(webSearchMessages);
  $$result.css.add(css);
  sources = webSearchMessages.find((m) => m.sources)?.sources;
  error = webSearchMessages.find((m) => m.messageType === "error");
  loading = !sources && !error;
  return `<details class="${"flex w-fit rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 " + escape(classNames, true) + " max-w-full svelte-1escu1z"}"><summary class="grid min-w-72 select-none grid-cols-[40px,1fr] items-center gap-2.5 p-2 svelte-1escu1z"><div class="relative grid aspect-square place-content-center overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"><svg class="${"absolute inset-0 text-gray-300 transition-opacity dark:text-gray-700 " + escape(loading ? "opacity-100" : "opacity-0", true)}" width="40" height="40" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="loading-path svelte-1escu1z" d="M8 2.5H30C30 2.5 35.5 2.5 35.5 8V30C35.5 30 35.5 35.5 30 35.5H8C8 35.5 2.5 35.5 2.5 30V8C2.5 8 2.5 2.5 8 2.5Z" stroke="currentColor" stroke-width="1" stroke-linecap="round" id="shape"></path></svg> ${validate_component(IconInternet, "IconInternet").$$render(
    $$result,
    {
      classNames: "relative fill-current text-xl"
    },
    {},
    {}
  )}</div> <dl class="leading-4"><dd class="text-sm" data-svelte-h="svelte-1id4ivt">Web Search</dd><dt class="flex items-center gap-1 truncate whitespace-nowrap text-[.82rem] text-gray-400">${error ? `${escape(error.message)}` : `${sources ? `Completed` : `${escape(webSearchMessages[webSearchMessages.length - 1].message)}`}`}</dt></dl></summary> <div class="content px-5 pb-5 pt-4">${webSearchMessages.length === 0 ? `<div class="mx-auto w-fit">${validate_component(Loading, "EosIconsLoading").$$render($$result, { class: "mb-3 h-4 w-4" }, {}, {})}</div>` : `<ol>${each(webSearchMessages, (message) => {
    return `${message.messageType === "update" ? `<li class="group border-l pb-6 last:!border-transparent last:pb-0 dark:border-gray-800"><div class="flex items-start"><div class="${"-ml-1.5 h-3 w-3 flex-none rounded-full bg-gray-200 dark:bg-gray-600 " + escape(
      loading ? "group-last:animate-pulse group-last:bg-gray-300 group-last:dark:bg-gray-500" : "",
      true
    )}"></div> <h3 class="text-md -mt-1.5 pl-2.5 text-gray-800 dark:text-gray-100">${escape(message.message)} </h3></div> ${message.args ? `<p class="mt-1.5 pl-4 text-gray-500 dark:text-gray-400">${escape(message.args)} </p>` : ``} </li>` : `${message.messageType === "error" ? `<li class="group border-l pb-6 last:!border-transparent last:pb-0 dark:border-gray-800"><div class="flex items-start">${validate_component(Error_filled, "CarbonError").$$render(
      $$result,
      {
        class: "-ml-1.5 h-3 w-3 flex-none scale-110 text-red-700 dark:text-red-500"
      },
      {},
      {}
    )} <h3 class="text-md -mt-1.5 pl-2.5 text-red-700 dark:text-red-500">${escape(message.message)} </h3></div> ${message.args ? `<p class="mt-1.5 pl-4 text-gray-500 dark:text-gray-400">${escape(message.args)} </p>` : ``} </li>` : ``}`}`;
  })}</ol>`}</div> </details>`;
});
function useConvTreeStore() {
  return getContext("convTreeStore");
}
function createConvTreeStore() {
  const convTreeStore = writable({
    leaf: null,
    editing: null
  });
  setContext("convTreeStore", convTreeStore);
  return convTreeStore;
}
function unsanitizeMd(md) {
  return md.replaceAll("&lt;", "<");
}
const ChatMessage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let message;
  let tokens;
  let searchUpdates;
  let downloadLink;
  let webSearchSources;
  let editMode;
  let childrenToRender;
  let nChildren;
  let $convTreeStore, $$unsubscribe_convTreeStore;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  function sanitizeMd(md) {
    let ret = md.replace(/<\|[a-z]*$/, "").replace(/<\|[a-z]+\|$/, "").replace(/<$/, "").replaceAll(PUBLIC_SEP_TOKEN, " ").replaceAll(/<\|[a-z]+\|>/g, " ").replaceAll(/<br\s?\/?>/gi, "\n").replaceAll("<", "&lt;").trim();
    for (const stop of [...model.parameters?.stop ?? [], "<|endoftext|>"]) {
      if (ret.endsWith(stop)) {
        ret = ret.slice(0, -stop.length).trim();
      }
    }
    return ret;
  }
  let { model } = $$props;
  let { id } = $$props;
  let { messages } = $$props;
  let { loading = false } = $$props;
  let { isAuthor = true } = $$props;
  let { readOnly = false } = $$props;
  let { isTapped = false } = $$props;
  createEventDispatcher();
  let contentEl;
  let isCopied = false;
  let initialized = false;
  const renderer = new marked.Renderer();
  renderer.codespan = (code) => {
    return `<code>${code.replaceAll("&amp;", "&")}</code>`;
  };
  const { extensions, ...defaults } = marked.getDefaults();
  const options = {
    ...defaults,
    gfm: true,
    breaks: true,
    renderer
  };
  marked.use(markedKatex({ throwOnError: false }));
  let webSearchIsDone = true;
  let editContentEl;
  let editFormEl;
  const convTreeStore = useConvTreeStore();
  $$unsubscribe_convTreeStore = subscribe(convTreeStore, (value) => $convTreeStore = value);
  if ($$props.model === void 0 && $$bindings.model && model !== void 0)
    $$bindings.model(model);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.messages === void 0 && $$bindings.messages && messages !== void 0)
    $$bindings.messages(messages);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0)
    $$bindings.loading(loading);
  if ($$props.isAuthor === void 0 && $$bindings.isAuthor && isAuthor !== void 0)
    $$bindings.isAuthor(isAuthor);
  if ($$props.readOnly === void 0 && $$bindings.readOnly && readOnly !== void 0)
    $$bindings.readOnly(readOnly);
  if ($$props.isTapped === void 0 && $$bindings.isTapped && isTapped !== void 0)
    $$bindings.isTapped(isTapped);
  message = messages.find((m) => m.id === id) ?? {};
  tokens = marked.lexer(sanitizeMd(message.content));
  searchUpdates = message.updates?.filter(({ type }) => type === "webSearch") ?? [];
  webSearchIsDone = searchUpdates.length > 0 && searchUpdates[searchUpdates.length - 1].messageType === "sources";
  !message.content && (webSearchIsDone || searchUpdates && searchUpdates.length === 0);
  downloadLink = message.from === "user" ? `${$page.url.pathname}/message/${message.id}/prompt` : void 0;
  webSearchSources = searchUpdates && searchUpdates?.filter(({ messageType }) => messageType === "sources")?.[0]?.sources;
  {
    if (message.children?.length === 0)
      set_store_value(convTreeStore, $convTreeStore.leaf = message.id, $convTreeStore);
  }
  editMode = $convTreeStore.editing === message.id;
  {
    if (editMode) {
      tick();
    }
  }
  (message && message.children?.length === 0) ?? false;
  childrenToRender = 0;
  nChildren = message?.children?.length ?? 0;
  {
    {
      if (initialized) {
        childrenToRender = Math.max(0, nChildren - 1);
      } else {
        childrenToRender = 0;
        initialized = true;
      }
    }
  }
  $$unsubscribe_convTreeStore();
  $$unsubscribe_page();
  return `${message.from === "assistant" ? `<div class="group relative -mb-6 flex items-start justify-start gap-4 pb-4 leading-relaxed" role="presentation">${$page.data?.assistant?.avatar ? `<img src="${escape(base, true) + "/settings/assistants/" + escape($page.data.assistant._id, true) + "/avatar.jpg"}" alt="Avatar" class="mt-5 h-3 w-3 flex-none select-none rounded-full shadow-lg">` : `<img alt="" src="https://huggingface.co/avatars/2edb18bd0206c16b433841a47f53fa8e.svg" class="mt-5 h-3 w-3 flex-none select-none rounded-full shadow-lg">`} <div class="relative min-h-[calc(2rem+theme(spacing[3.5])*2)] min-w-[60px] break-words rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 px-5 py-3.5 text-gray-600 prose-pre:my-2 dark:border-gray-800 dark:from-gray-800/40 dark:text-gray-300">${searchUpdates && searchUpdates.length > 0 ? `${validate_component(OpenWebSearchResults, "OpenWebSearchResults").$$render(
    $$result,
    {
      classNames: tokens.length ? "mb-3.5" : "",
      webSearchMessages: searchUpdates
    },
    {},
    {}
  )}` : ``} <div class="prose max-w-none max-sm:prose-sm dark:prose-invert prose-headings:font-semibold prose-h1:text-lg prose-h2:text-base prose-h3:text-base prose-pre:bg-gray-800 dark:prose-pre:bg-gray-900"${add_attribute("this", contentEl, 0)}>${each(tokens, (token) => {
    return `${token.type === "code" ? `${validate_component(CodeBlock, "CodeBlock").$$render(
      $$result,
      {
        lang: token.lang,
        code: unsanitizeMd(token.text)
      },
      {},
      {}
    )}` : ` <!-- HTML_TAG_START -->${marked.parse(token.raw, options)}<!-- HTML_TAG_END -->`}`;
  })}</div>  ${webSearchSources?.length ? `<div class="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm"><div class="text-gray-400" data-svelte-h="svelte-3ao2gx">Sources:</div> ${each(webSearchSources, ({ link, title, hostname }) => {
    return `<a class="flex items-center gap-2 whitespace-nowrap rounded-lg border bg-white px-2 py-1.5 leading-none hover:border-gray-300 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"${add_attribute("href", link, 0)} target="_blank"><img class="h-3.5 w-3.5 rounded" src="${"https://www.google.com/s2/favicons?sz=64&domain_url=" + escape(hostname, true)}" alt="${escape(title, true) + " favicon"}"> <div>${escape(hostname.replace(/^www\./, ""))}</div> </a>`;
  })}</div>` : ``}</div> ${!loading && message.content ? `<div class="${"absolute bottom-1 right-0 -mb-4 flex max-md:transition-all md:bottom-0 md:group-hover:visible md:group-hover:opacity-100 " + escape(
    message.score ? "visible opacity-100" : "invisible max-md:-translate-y-4 max-md:opacity-0",
    true
  ) + " " + escape(
    isTapped || isCopied ? "max-md:visible max-md:translate-y-0 max-md:opacity-100" : "",
    true
  )}">${isAuthor ? `<button class="${"btn rounded-sm p-1 text-sm text-gray-400 focus:ring-0 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 " + escape(
    message.score && message.score > 0 ? "text-green-500 hover:text-green-500 dark:text-green-400 hover:dark:text-green-400" : "",
    true
  )}"${add_attribute("title", message.score === 1 ? "Remove +1" : "+1", 0)} type="button">${validate_component(Thumbs_up, "CarbonThumbsUp").$$render($$result, { class: "h-[1.14em] w-[1.14em]" }, {}, {})}</button> <button class="${"btn rounded-sm p-1 text-sm text-gray-400 focus:ring-0 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 " + escape(
    message.score && message.score < 0 ? "text-red-500 hover:text-red-500 dark:text-red-400 hover:dark:text-red-400" : "",
    true
  )}"${add_attribute("title", message.score === -1 ? "Remove -1" : "-1", 0)} type="button">${validate_component(Thumbs_down, "CarbonThumbsDown").$$render($$result, { class: "h-[1.14em] w-[1.14em]" }, {}, {})}</button>` : ``} <button class="btn rounded-sm p-1 text-sm text-gray-400 focus:ring-0 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300" title="Retry" type="button">${validate_component(Rotate_360, "CarbonRotate360").$$render($$result, {}, {}, {})}</button> ${validate_component(CopyToClipBoardBtn, "CopyToClipBoardBtn").$$render(
    $$result,
    {
      classNames: "ml-1.5 !rounded-sm !p-1 !text-sm !text-gray-400 focus:!ring-0 hover:!text-gray-500 dark:!text-gray-400 dark:hover:!text-gray-300 !border-none !shadow-none",
      value: message.content
    },
    {},
    {}
  )}</div>` : ``}</div> ${slots.childrenNav ? slots.childrenNav({}) : ``}` : ``} ${message.from === "user" ? `<div class="group relative w-full items-start justify-start gap-4 max-sm:text-sm" role="presentation"><div class="flex w-full flex-col">${message.files && message.files.length > 0 ? `<div class="mx-auto grid w-fit grid-cols-2 gap-5 px-5">${each(message.files, (file) => {
    return ` ${file.length === 64 ? `<img${add_attribute("src", $page.url.pathname + "/output/" + file, 0)} alt="input from user" class="my-2 aspect-auto max-h-48 rounded-lg shadow-lg">` : ` <img${add_attribute("src", "data:image/*;base64," + file, 0)} alt="input from user" class="my-2 aspect-auto max-h-48 rounded-lg shadow-lg">`}`;
  })}</div>` : ``} <div class="flex w-full flex-row flex-nowrap">${!editMode ? `<p class="disabled w-full appearance-none whitespace-break-spaces text-wrap break-words bg-inherit px-5 py-3.5 text-gray-500 dark:text-gray-400">${escape(message.content.trim())}</p>` : `<form class="flex w-full flex-col"${add_attribute("this", editFormEl, 0)}><textarea class="w-full whitespace-break-spaces break-words rounded-lg bg-gray-100 px-5 py-3.5 text-gray-500 *:h-max dark:bg-gray-800 dark:text-gray-400" required${add_attribute("this", editContentEl, 0)}>${escape(message.content.trim(), false)}</textarea> <div class="flex w-full flex-row flex-nowrap items-center justify-center gap-2 pt-2"><button type="submit" class="${"btn rounded-lg px-3 py-1.5 text-sm " + escape(
    loading ? "bg-gray-300 text-gray-400 dark:bg-gray-700 dark:text-gray-600" : "bg-gray-200 text-gray-600 focus:ring-0   hover:text-gray-800 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-gray-200",
    true
  )}" ${loading ? "disabled" : ""}>Submit</button> <button type="button" class="btn rounded-sm p-2 text-sm text-gray-400 focus:ring-0 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300" data-svelte-h="svelte-1kqwlmv">Cancel</button></div></form>`} ${!loading && !editMode ? `<div class="${"max-md:opacity-0' invisible absolute right-0 top-3.5 z-10 h-max max-md:-translate-y-4 max-md:transition-all md:bottom-0 md:group-hover:visible md:group-hover:opacity-100 " + escape(
    isTapped || isCopied ? "max-md:visible max-md:translate-y-0 max-md:opacity-100" : "",
    true
  )}"><div class="mx-auto flex flex-row flex-nowrap gap-2">${downloadLink ? `<a class="rounded-lg border border-gray-100 bg-gray-100 p-1 text-xs text-gray-400 group-hover:block hover:text-gray-500 max-sm:!hidden md:hidden dark:border-gray-800 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300" title="Download prompt and parameters" type="button" target="_blank"${add_attribute("href", downloadLink, 0)}>${validate_component(Download, "CarbonDownload").$$render($$result, {}, {}, {})}</a>` : ``} ${!readOnly ? `<button class="cursor-pointer rounded-lg border border-gray-100 bg-gray-100 p-1 text-xs text-gray-400 group-hover:block hover:text-gray-500 md:hidden lg:-right-2 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300" title="Branch" type="button">${validate_component(Pen, "CarbonPen").$$render($$result, {}, {}, {})}</button>` : ``}</div></div>` : ``}</div> ${slots.childrenNav ? slots.childrenNav({}) : ``}</div></div>` : ``} ${nChildren > 0 ? `${validate_component(ChatMessage, "svelte:self").$$render(
    $$result,
    {
      loading,
      messages,
      isAuthor,
      readOnly,
      model,
      id: messages.find((m) => m.id === id)?.children?.[childrenToRender]
    },
    {},
    {
      childrenNav: () => {
        return `${nChildren > 1 && $convTreeStore.editing === null ? `<div class="font-white z-10 -mt-1 ml-3.5 mr-auto flex h-6 w-fit select-none flex-row items-center justify-center gap-1 text-sm"><button class="inline text-lg font-thin text-gray-400 disabled:pointer-events-none disabled:opacity-25 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-200" ${childrenToRender === 0 || loading ? "disabled" : ""}>${validate_component(Chevron_left, "CarbonChevronLeft").$$render($$result, { class: "text-sm" }, {}, {})}</button> <span class="text-gray-400 dark:text-gray-500">${escape(childrenToRender + 1)} / ${escape(nChildren)}</span> <button class="inline text-lg font-thin text-gray-400 disabled:pointer-events-none disabled:opacity-25 hover:text-gray-800 dark:text-gray-500 dark:hover:text-gray-200" ${childrenToRender === nChildren - 1 || loading ? "disabled" : ""}>${validate_component(Chevron_right, "CarbonChevronRight").$$render($$result, { class: "text-sm" }, {}, {})}</button></div>` : ``}`;
      }
    }
  )}` : ``}`;
});
const IconChevron = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { classNames = "" } = $$props;
  if ($$props.classNames === void 0 && $$bindings.classNames && classNames !== void 0)
    $$bindings.classNames(classNames);
  return `<svg width="1em" height="1em" viewBox="0 0 15 6"${add_attribute("class", classNames, 0)} fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.67236 1L7.67236 7L13.6724 1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
});
const ScrollToBottomBtn = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { scrollNode } = $$props;
  let visible = false;
  let { class: className = "" } = $$props;
  let observer = null;
  function updateVisibility() {
    if (!scrollNode)
      return;
    visible = Math.ceil(scrollNode.scrollTop) + 200 < scrollNode.scrollHeight - scrollNode.clientHeight;
  }
  function destroy() {
    observer?.disconnect();
    scrollNode?.removeEventListener("scroll", updateVisibility);
  }
  onDestroy(destroy);
  if ($$props.scrollNode === void 0 && $$bindings.scrollNode && scrollNode !== void 0)
    $$bindings.scrollNode(scrollNode);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  {
    if (scrollNode) {
      destroy();
      if (window.ResizeObserver) {
        observer = new ResizeObserver(() => {
          updateVisibility();
        });
        observer.observe(scrollNode);
      }
      scrollNode.addEventListener("scroll", updateVisibility);
    }
  }
  return `${visible ? `<button class="${"btn absolute flex h-[41px] w-[41px] rounded-full border bg-white shadow-md transition-all hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:shadow-gray-950 dark:hover:bg-gray-600 " + escape(className, true)}">${validate_component(IconChevron, "IconChevron").$$render($$result, { classNames: "mt-[2px]" }, {}, {})}</button>` : ``}`;
});
const Blockchain = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M6 24H4V8h2ZM28 8h-2v16h2Zm-4-2V4H8v2Zm0 22v-2H8v2Z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const SystemPromptModal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { preprompt } = $$props;
  if ($$props.preprompt === void 0 && $$bindings.preprompt && preprompt !== void 0)
    $$bindings.preprompt(preprompt);
  return `<button type="button" class="mx-auto flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 px-3 py-1 text-xs text-gray-500 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700">${validate_component(Blockchain, "CarbonBlockchain").$$render($$result, { class: "text-xxs" }, {}, {})} Using Custom System Prompt</button> ${``}`;
});
const AnnouncementBanner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { classNames = "" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.classNames === void 0 && $$bindings.classNames && classNames !== void 0)
    $$bindings.classNames(classNames);
  return `<div class="${"flex items-center rounded-xl bg-gray-100 p-1 text-sm dark:bg-gray-800 " + escape(classNames, true)}"><span class="mr-2 inline-flex items-center rounded-lg bg-gradient-to-br from-primary-300 px-2 py-1 text-xxs font-medium uppercase leading-3 text-primary-700 dark:from-primary-900 dark:text-primary-400" data-svelte-h="svelte-182s06e">New</span> ${escape(title)} <div class="ml-auto shrink-0">${slots.default ? slots.default({}) : ``}</div></div>`;
});
const Earth = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2Zm5 3.106a12.014 12.014 0 0 1 2.916 1.899L23.503 8H21Zm-7.622 22.597A11.976 11.976 0 0 1 8.116 6.976L9.465 9h3.342l-1.5 4H7.28l-1.382 4.148L8.465 21h5l1.432 2.147ZM16 28c-.203 0-.402-.02-.603-.03l1.397-4.19a1.988 1.988 0 0 0-.233-1.741l-1.432-2.148A1.996 1.996 0 0 0 13.465 19h-3.93l-1.432-2.148L8.721 15H11v2h2v-2.819l2.936-7.83l-1.872-.702L13.557 7h-3.022l-.807-1.21A11.794 11.794 0 0 1 19 4.394V8a2.002 2.002 0 0 0 2 2h2.586A1.986 1.986 0 0 0 25 9.414l.14-.14l.282-.68A11.981 11.981 0 0 1 27.3 12h-4.701a1.993 1.993 0 0 0-1.972 1.665l-.597 3.441a1.99 1.99 0 0 0 .991 2.086l2.165 1.464l1.458 3.646A11.958 11.958 0 0 1 16 28Zm8.815-8.656L22.1 17.509l-.1-.06l.599-3.449h5.22a11.743 11.743 0 0 1-1.744 8.495Z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const ModelCardMetadata = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { model } = $$props;
  let { variant = "light" } = $$props;
  if ($$props.model === void 0 && $$bindings.model && model !== void 0)
    $$bindings.model(model);
  if ($$props.variant === void 0 && $$bindings.variant && variant !== void 0)
    $$bindings.variant(variant);
  return `<div class="${"flex items-center gap-5 rounded-xl bg-gray-100 px-3 py-2 text-xs sm:text-sm " + escape(
    variant === "dark" ? "text-gray-600 dark:bg-gray-800 dark:text-gray-300" : "text-gray-800 dark:bg-gray-100 dark:text-gray-600",
    true
  )}"><a${add_attribute("href", model.modelUrl || "https://huggingface.co/" + model.name, 0)} target="_blank" rel="noreferrer" class="flex items-center hover:underline">${validate_component(Arrow_up_right, "CarbonArrowUpRight").$$render(
    $$result,
    {
      class: "mr-1.5 shrink-0 text-xs text-gray-400"
    },
    {},
    {}
  )}
		Model
		<div class="max-sm:hidden" data-svelte-h="svelte-cuulvl"> page</div></a> ${model.datasetName || model.datasetUrl ? `<a${add_attribute("href", model.datasetUrl || "https://huggingface.co/datasets/" + model.datasetName, 0)} target="_blank" rel="noreferrer" class="flex items-center hover:underline">${validate_component(Arrow_up_right, "CarbonArrowUpRight").$$render(
    $$result,
    {
      class: "mr-1.5 shrink-0 text-xs text-gray-400"
    },
    {},
    {}
  )}
			Dataset
			<div class="max-sm:hidden" data-svelte-h="svelte-cuulvl"> page</div></a>` : ``} ${model.websiteUrl ? `<a${add_attribute("href", model.websiteUrl, 0)} target="_blank" class="ml-auto flex items-center hover:underline" rel="noreferrer">${validate_component(Earth, "CarbonEarth").$$render(
    $$result,
    {
      class: "mr-1.5 shrink-0 text-xs text-gray-400"
    },
    {},
    {}
  )}
			Website</a>` : ``}</div>`;
});
const findCurrentModel = (models, id) => models.find((m) => m.id === id) ?? models[0];
const ChatIntroduction = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentModelMetadata;
  let $settings, $$unsubscribe_settings;
  let { currentModel } = $$props;
  let { models } = $$props;
  const settings = useSettingsStore();
  $$unsubscribe_settings = subscribe(settings, (value) => $settings = value);
  const announcementBanners = JSON5.parse(PUBLIC_ANNOUNCEMENT_BANNERS);
  createEventDispatcher();
  if ($$props.currentModel === void 0 && $$bindings.currentModel && currentModel !== void 0)
    $$bindings.currentModel(currentModel);
  if ($$props.models === void 0 && $$bindings.models && models !== void 0)
    $$bindings.models(models);
  currentModelMetadata = findCurrentModel(models, $settings.activeModel);
  $$unsubscribe_settings();
  return `<div class="my-auto grid gap-8 lg:grid-cols-3"><div class="lg:col-span-1"><div><div class="mb-3 flex items-center text-2xl font-semibold">${validate_component(Logo, "Logo").$$render($$result, { classNames: "mr-1 flex-none" }, {}, {})} ${escape(PUBLIC_APP_NAME)} <div class="ml-3 flex h-6 items-center rounded-lg border border-gray-100 bg-gray-50 px-2 text-base text-gray-400 dark:border-gray-700/60 dark:bg-gray-800">v${escape(PUBLIC_VERSION)}</div></div> <p class="text-base text-gray-600 dark:text-gray-400">${escape("Making the community's best AI chat models available to everyone.")}</p></div></div> <div class="lg:col-span-2 lg:pl-24">${each(announcementBanners, (banner) => {
    return `${validate_component(AnnouncementBanner, "AnnouncementBanner").$$render($$result, { classNames: "mb-4", title: banner.title }, {}, {
      default: () => {
        return `<a target="_blank"${add_attribute("href", banner.linkHref, 0)} class="mr-2 flex items-center underline hover:no-underline">${escape(banner.linkTitle)}</a> `;
      }
    })}`;
  })} <div class="overflow-hidden rounded-xl border dark:border-gray-800"><div class="flex p-3"><div><div class="text-sm text-gray-600 dark:text-gray-400" data-svelte-h="svelte-15leidr">Current Model</div> <div class="flex items-center gap-1.5 font-semibold max-sm:text-smd">${currentModel.logoUrl ? `<img class="overflown aspect-square size-4 rounded border dark:border-gray-700"${add_attribute("src", currentModel.logoUrl, 0)} alt="">` : `<div class="size-4 rounded border border-transparent bg-gray-300 dark:bg-gray-800"></div>`} ${escape(currentModel.displayName)}</div></div> <a href="${escape(base, true) + "/settings/" + escape(currentModel.id, true)}" class="btn ml-auto flex h-7 w-7 self-start rounded-full bg-gray-100 p-1 text-xs hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-600">${validate_component(Gear_fill, "IconGear").$$render($$result, {}, {}, {})}</a></div> ${validate_component(ModelCardMetadata, "ModelCardMetadata").$$render($$result, { variant: "dark", model: currentModel }, {}, {})}</div></div> ${currentModelMetadata.promptExamples ? `<div class="lg:col-span-3 lg:mt-6"><p class="mb-3 text-gray-600 dark:text-gray-300" data-svelte-h="svelte-1kmik1w">Examples</p> <div class="grid gap-3 lg:grid-cols-3 lg:gap-5">${each(currentModelMetadata.promptExamples, (example) => {
    return `<button type="button" class="rounded-xl border bg-gray-50 p-3 text-gray-600 hover:bg-gray-100 max-xl:text-sm xl:p-3.5 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">${escape(example.title)} </button>`;
  })}</div></div>` : ``} <div class="h-40 sm:h-24"></div></div>`;
});
const ChatWindow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isReadOnly;
  let lastMessage;
  let lastIsError;
  let sources;
  let $$unsubscribe_convTreeStore;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { messages = [] } = $$props;
  let { loading = false } = $$props;
  let { pending = false } = $$props;
  let { shared = false } = $$props;
  let { currentModel } = $$props;
  let { models } = $$props;
  let { assistant = void 0 } = $$props;
  let { preprompt = void 0 } = $$props;
  let { files = [] } = $$props;
  let message;
  let isSharedRecently = false;
  createEventDispatcher();
  const convTreeStore = useConvTreeStore();
  $$unsubscribe_convTreeStore = subscribe(convTreeStore, (value) => value);
  onDestroy(() => {
  });
  let chatContainer;
  async function scrollToBottom() {
    await tick();
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
  if ($$props.messages === void 0 && $$bindings.messages && messages !== void 0)
    $$bindings.messages(messages);
  if ($$props.loading === void 0 && $$bindings.loading && loading !== void 0)
    $$bindings.loading(loading);
  if ($$props.pending === void 0 && $$bindings.pending && pending !== void 0)
    $$bindings.pending(pending);
  if ($$props.shared === void 0 && $$bindings.shared && shared !== void 0)
    $$bindings.shared(shared);
  if ($$props.currentModel === void 0 && $$bindings.currentModel && currentModel !== void 0)
    $$bindings.currentModel(currentModel);
  if ($$props.models === void 0 && $$bindings.models && models !== void 0)
    $$bindings.models(models);
  if ($$props.assistant === void 0 && $$bindings.assistant && assistant !== void 0)
    $$bindings.assistant(assistant);
  if ($$props.preprompt === void 0 && $$bindings.preprompt && preprompt !== void 0)
    $$bindings.preprompt(preprompt);
  if ($$props.files === void 0 && $$bindings.files && files !== void 0)
    $$bindings.files(files);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    isReadOnly = !models.some((model) => model.id === currentModel.id);
    $page.params.id && (isSharedRecently = false);
    lastMessage = browser;
    lastIsError = lastMessage && lastMessage.from === "user" && !loading;
    sources = files.map((file) => file2base64(file));
    {
      if (lastMessage && lastMessage.from === "user") {
        scrollToBottom();
      }
    }
    $$rendered = `<div class="relative min-h-0 min-w-0">${``} <div class="scrollbar-custom mr-1 h-full overflow-y-auto"${add_attribute("this", chatContainer, 0)}><div class="mx-auto flex h-full max-w-3xl flex-col gap-6 px-5 pt-6 sm:gap-8 xl:max-w-4xl">${$page.data?.assistant ? `<a class="mx-auto flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 py-1 pl-1 pr-3 text-sm text-gray-800 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700" href="${escape(base, true) + "/settings/assistants/" + escape($page.data.assistant._id, true)}">${$page.data?.assistant.avatar ? `<img src="${escape(base, true) + "/settings/assistants/" + escape($page.data?.assistant._id.toString(), true) + "/avatar.jpg?hash=$" + escape($page.data.assistant.avatar, true)}" alt="Avatar" class="size-5 rounded-full object-cover">` : `<div class="flex size-6 items-center justify-center rounded-full bg-gray-300 font-bold uppercase text-gray-500">${escape($page.data?.assistant.name[0])}</div>`} ${escape($page.data.assistant.name)}</a>` : `${preprompt && preprompt != currentModel.preprompt ? `${validate_component(SystemPromptModal, "SystemPromptModal").$$render($$result, { preprompt: preprompt ?? "" }, {}, {})}` : ``}`} ${messages.length > 0 ? `<div class="flex h-max flex-col gap-6 pb-52">${validate_component(ChatMessage, "ChatMessage").$$render(
      $$result,
      {
        loading,
        messages,
        id: messages[0].id,
        isAuthor: !shared,
        readOnly: isReadOnly,
        model: currentModel
      },
      {},
      {}
    )}</div>` : `${pending ? `${validate_component(ChatMessage, "ChatMessage").$$render(
      $$result,
      {
        loading: true,
        messages: [
          {
            id: "0-0-0-0-0",
            content: "",
            from: "assistant",
            children: []
          }
        ],
        id: "0-0-0-0-0",
        isAuthor: !shared,
        readOnly: isReadOnly,
        model: currentModel
      },
      {},
      {}
    )}` : `${!assistant ? `${validate_component(ChatIntroduction, "ChatIntroduction").$$render($$result, { models, currentModel }, {}, {})}` : `${validate_component(AssistantIntroduction, "AssistantIntroduction").$$render($$result, { assistant }, {}, {})}`}`}`}</div> ${validate_component(ScrollToBottomBtn, "ScrollToBottomBtn").$$render(
      $$result,
      {
        class: "bottom-36 right-4 max-md:hidden lg:right-10",
        scrollNode: chatContainer
      },
      {},
      {}
    )}</div> <div class="dark:via-gray-80 pointer-events-none absolute inset-x-0 bottom-0 z-0 mx-auto flex w-full max-w-3xl flex-col items-center justify-center bg-gradient-to-t from-white via-white/80 to-white/0 px-3.5 py-4 max-md:border-t max-md:bg-white sm:px-5 md:py-8 xl:max-w-4xl dark:border-gray-800 dark:from-gray-900 dark:to-gray-900/0 max-md:dark:bg-gray-900 [&>*]:pointer-events-auto">${sources.length ? `<div class="flex flex-row flex-wrap justify-center gap-2.5 max-md:pb-3">${each(sources, (source, index) => {
      return `${function(__value) {
        if (is_promise(__value)) {
          __value.then(null, noop);
          return ``;
        }
        return function(src) {
          return ` <div class="relative h-16 w-16 overflow-hidden rounded-lg shadow-lg"><img${add_attribute("src", `data:image/*;base64,${src}`, 0)} alt="input content" class="h-full w-full rounded-lg bg-gray-400 object-cover dark:bg-gray-900">  <button class="absolute left-1 top-1">${validate_component(Close, "CarbonClose").$$render(
            $$result,
            {
              class: "text-md font-black text-gray-300  hover:text-gray-100"
            },
            {},
            {}
          )} </button></div> `;
        }(__value);
      }(source)}`;
    })}</div>` : ``} <div class="w-full"><div class="flex w-full pb-3">${$page.data.settings?.searchEnabled && !assistant ? `${validate_component(WebSearchToggle, "WebSearchToggle").$$render($$result, {}, {}, {})}` : ``} ${loading ? `${validate_component(StopGeneratingBtn, "StopGeneratingBtn").$$render($$result, { classNames: "ml-auto" }, {}, {})}` : `${lastIsError ? `${validate_component(RetryBtn, "RetryBtn").$$render($$result, { classNames: "ml-auto" }, {}, {})}` : `<div class="ml-auto gap-2">${currentModel.multimodal ? `${validate_component(UploadBtn, "UploadBtn").$$render(
      $$result,
      { classNames: "ml-auto", files },
      {
        files: ($$value) => {
          files = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``} ${messages && lastMessage && lastMessage.interrupted && !isReadOnly ? `${validate_component(ContinueBtn, "ContinueBtn").$$render($$result, {}, {}, {})}` : ``}</div>`}`}</div> <form tabindex="-1" aria-label="file dropzone" class="${"relative flex w-full max-w-4xl flex-1 items-center rounded-xl border bg-gray-100 focus-within:border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:focus-within:border-gray-500 " + escape(isReadOnly ? "opacity-30" : "", true)}">${`<div class="flex w-full flex-1 border-none bg-transparent">${lastIsError ? `${validate_component(ChatInput, "ChatInput").$$render(
      $$result,
      {
        value: "Sorry, something went wrong. Please try again.",
        disabled: true
      },
      {},
      {}
    )}` : `${validate_component(ChatInput, "ChatInput").$$render(
      $$result,
      {
        placeholder: "Ask anything",
        maxRows: 6,
        disabled: isReadOnly || lastIsError,
        value: message
      },
      {
        value: ($$value) => {
          message = $$value;
          $$settled = false;
        }
      },
      {}
    )}`} ${loading ? `<button class="btn mx-1 my-1 inline-block h-[2.4rem] self-end rounded-lg bg-transparent p-1 px-[0.7rem] text-gray-400 disabled:opacity-60 enabled:hover:text-gray-700 md:hidden dark:disabled:opacity-40 enabled:dark:hover:text-gray-100">${validate_component(Stop_filled_alt, "CarbonStopFilledAlt").$$render($$result, {}, {}, {})}</button> <div class="mx-1 my-1 hidden h-[2.4rem] items-center p-1 px-[0.7rem] text-gray-400 disabled:opacity-60 enabled:hover:text-gray-700 md:flex dark:disabled:opacity-40 enabled:dark:hover:text-gray-100">${validate_component(Loading, "EosIconsLoading").$$render($$result, {}, {}, {})}</div>` : `<button class="btn mx-1 my-1 h-[2.4rem] self-end rounded-lg bg-transparent p-1 px-[0.7rem] text-gray-400 disabled:opacity-60 enabled:hover:text-gray-700 dark:disabled:opacity-40 enabled:dark:hover:text-gray-100" ${!message || isReadOnly ? "disabled" : ""} type="submit">${validate_component(Send_alt_filled, "CarbonSendAltFilled").$$render($$result, {}, {}, {})}</button>`}</div>`}</form> <div class="mt-2 flex justify-between self-stretch px-1 text-xs text-gray-400/90 max-md:mb-2 max-sm:gap-2"><p>Model:
					${!assistant ? `<a href="${escape(base, true) + "/settings/" + escape(currentModel.id, true)}" class="hover:underline">${escape(currentModel.displayName)}</a>` : (() => {
      let model = models.find((m) => m.id === assistant?.modelId);
      return ` <a href="${escape(base, true) + "/settings/assistants/" + escape(assistant._id, true)}" class="inline-flex items-center border-b hover:text-gray-600 dark:border-gray-700 dark:hover:text-gray-300">${escape(model?.displayName)}${validate_component(Caret_down, "CarbonCaretDown").$$render($$result, { class: "text-xxs" }, {}, {})}</a>`;
    })()} <span class="max-sm:hidden" data-svelte-h="svelte-bim2s3">·</span><br class="sm:hidden"> Generated content may
					be inaccurate or false.</p> ${messages.length ? `<button class="${[
      "flex flex-none items-center hover:text-gray-400 max-sm:rounded-lg max-sm:bg-gray-50 max-sm:px-2.5 dark:max-sm:bg-gray-800",
      !isSharedRecently ? "hover:underline" : ""
    ].join(" ").trim()}" type="button" ${isSharedRecently ? "disabled" : ""}>${isSharedRecently ? `${validate_component(Checkmark, "CarbonCheckmark").$$render(
      $$result,
      {
        class: "text-[.6rem] sm:mr-1.5 sm:text-green-600"
      },
      {},
      {}
    )} <div class="text-green-600 max-sm:hidden" data-svelte-h="svelte-15akfgj">Link copied to clipboard</div>` : `${validate_component(Export, "CarbonExport").$$render(
      $$result,
      {
        class: "text-[.6rem] sm:mr-1.5 sm:text-primary-500"
      },
      {},
      {}
    )} <div class="max-sm:hidden" data-svelte-h="svelte-1e7lyb4">Share this conversation</div>`}</button>` : ``}</div></div></div></div>`;
  } while (!$$settled);
  $$unsubscribe_convTreeStore();
  $$unsubscribe_page();
  return $$rendered;
});
export {
  ChatWindow as C,
  createConvTreeStore as c,
  findCurrentModel as f,
  webSearchParameters as w
};
