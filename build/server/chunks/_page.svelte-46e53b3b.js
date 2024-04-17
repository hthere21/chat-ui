import { c as create_ssr_component, d as subscribe, a as add_attribute, e as escape, v as validate_component, i as spread, j as escape_object } from './ssr-6d44e1a8.js';
import { b as base } from './paths-05fee424.js';
import { p as page } from './stores-55a2d0d3.js';
import { u as useSettingsStore } from './settings2-ba3250ac.js';
import { P as Pen } from './pen-285ea73c.js';
import { T as Trash_can } from './trash-can-7460ee1f.js';
import { L as Link } from './link-0a42285c.js';
import { C as CopyToClipBoardBtn } from './CopyToClipBoardBtn-6f6980c7.js';
import './index2-7383a28b.js';

const Copy_file = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="m27.4 14.7l-6.1-6.1C21 8.2 20.5 8 20 8h-8c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V16.1c0-.5-.2-1-.6-1.4zM20 10l5.9 6H20v-6zm-8 18V10h6v6c0 1.1.9 2 2 2h6v10H12z"/><path fill="currentColor" d="M6 18H4V4c0-1.1.9-2 2-2h14v2H6v14z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Flag = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M6 30H4V2h24l-5.8 9l5.8 9H6Zm0-12h18.33l-4.53-7l4.53-7H6Z"/>`}<!-- HTML_TAG_END --></svg>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let assistant;
  let isActive;
  let shareUrl;
  let $page, $$unsubscribe_page;
  let $settings, $$unsubscribe_settings;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  const settings = useSettingsStore();
  $$unsubscribe_settings = subscribe(settings, (value) => $settings = value);
  const prefix = `${$page.url.origin}${base}`;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  assistant = data.assistants.find((el) => el._id.toString() === $page.params.assistantId);
  isActive = $settings.activeModel === $page.params.assistantId;
  shareUrl = `${prefix}/assistant/${assistant?._id}`;
  $$unsubscribe_page();
  $$unsubscribe_settings();
  return `${``} <div class="flex h-full flex-col gap-2"><div class="flex gap-6">${assistant?.avatar ? ` <img${add_attribute("src", `${base}/settings/assistants/${assistant?._id}/avatar.jpg?hash=${assistant?.avatar}`, 0)} alt="Avatar" class="size-16 flex-none rounded-full object-cover sm:size-24">` : `<div class="flex size-16 flex-none items-center justify-center rounded-full bg-gray-300 text-4xl font-semibold uppercase text-gray-500 sm:size-24">${escape(assistant?.name[0])}</div>`} <div class="flex-1"><div class="mb-1.5"><h1 class="mr-2 inline text-xl font-semibold">${escape(assistant?.name)}</h1> <span class="rounded-full border px-2 py-0.5 text-sm leading-none text-gray-500" data-svelte-h="svelte-5eljtm">public</span></div> ${assistant?.description ? `<p class="mb-2 line-clamp-2 text-sm text-gray-500">${escape(assistant.description)}</p>` : ``} <p class="text-sm text-gray-500">Model: <span class="font-semibold">${escape(assistant?.modelId)}</span> <span class="text-gray-300" data-svelte-h="svelte-sg33ca">•</span> Created by
				<a class="underline" href="${escape(base, true) + "/assistants?user=" + escape(assistant?.createdByName, true)}">${escape(assistant?.createdByName)}</a></p> <div class="flex items-center gap-4 whitespace-nowrap text-sm text-gray-500 hover:*:text-gray-800"><button class="${escape(
    isActive ? "bg-gray-100 text-gray-800" : "bg-black !text-white",
    true
  ) + " my-2 flex w-fit items-center rounded-full px-3 py-1 text-base"}" ${isActive ? "disabled" : ""} name="Activate model">${escape(isActive ? "Active" : "Activate")}</button> ${assistant?.createdByMe ? `<a href="${escape(base, true) + "/settings/assistants/" + escape(assistant?._id, true) + "/edit"}" class="underline">${validate_component(Pen, "CarbonPen").$$render($$result, { class: "mr-1.5 inline text-xs" }, {}, {})}Edit</a> <form method="POST" action="?/delete"><button type="submit" class="flex items-center underline">${validate_component(Trash_can, "CarbonTrash").$$render($$result, { class: "mr-1.5 inline text-xs" }, {}, {})}Delete</button></form>` : `<form method="POST" action="?/unsubscribe"><button type="submit" class="underline">${validate_component(Trash_can, "CarbonTrash").$$render($$result, { class: "mr-1.5 inline text-xs" }, {}, {})}Remove</button></form> <form method="POST" action="?/edit" class="hidden"><button type="submit" class="underline">${validate_component(Copy_file, "CarbonCopy").$$render($$result, { class: "mr-1.5 inline text-xs" }, {}, {})}Duplicate</button></form> ${!assistant?.reported ? `<button type="button" class="underline">${validate_component(Flag, "CarbonFlag").$$render($$result, { class: "mr-1.5 inline text-xs" }, {}, {})}Report</button>` : `<button type="button" disabled class="text-gray-700">${validate_component(Flag, "CarbonFlag").$$render($$result, { class: "mr-1.5 inline text-xs" }, {}, {})}Reported</button>`}`}</div></div></div> <div><h2 class="text-lg font-semibold" data-svelte-h="svelte-1lkz0q3">Direct URL</h2> <p class="pb-2 text-sm text-gray-500" data-svelte-h="svelte-158t6mh">Share this link for people to use your assistant.</p> <div class="flex flex-row gap-2 rounded-lg border-2 border-gray-200 bg-gray-100 py-2 pl-3 pr-1.5"><input disabled class="flex-1 truncate bg-inherit"${add_attribute("value", shareUrl, 0)}> ${validate_component(CopyToClipBoardBtn, "CopyToClipBoardBtn").$$render(
    $$result,
    {
      value: shareUrl,
      classNames: "!border-none !shadow-none !py-0 !px-1 !rounded-md"
    },
    {},
    {
      default: () => {
        return `<div class="flex items-center gap-1.5 text-gray-500 hover:underline">${validate_component(Link, "CarbonLink").$$render($$result, {}, {}, {})}Copy</div>`;
      }
    }
  )}</div></div> <h2 class="mt-4 text-lg font-semibold" data-svelte-h="svelte-uhil65">System Instructions</h2> <textarea disabled class="min-h-[8lh] w-full flex-1 rounded-lg border-2 border-gray-200 bg-gray-100 p-2 disabled:cursor-not-allowed 2xl:min-h-[12lh]">${escape(assistant?.preprompt, false)}</textarea></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-46e53b3b.js.map
