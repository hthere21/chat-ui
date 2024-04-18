import { c as create_ssr_component, a as add_attribute, e as escape, o as onDestroy, v as validate_component } from "./ssr.js";
const IconCopy = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { classNames = "" } = $$props;
  if ($$props.classNames === void 0 && $$bindings.classNames && classNames !== void 0)
    $$bindings.classNames(classNames);
  return `<svg${add_attribute("class", classNames, 0)} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" focusable="false" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path d="M28,10V28H10V10H28m0-2H10a2,2,0,0,0-2,2V28a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V10a2,2,0,0,0-2-2Z" transform="translate(0)"></path><path d="M4,18H2V4A2,2,0,0,1,4,2H18V4H4Z" transform="translate(0)"></path><rect fill="none" width="32" height="32"></rect></svg>`;
});
const Tooltip = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { classNames = "" } = $$props;
  let { label = "Copied" } = $$props;
  let { position = "left-1/2 top-full transform -translate-x-1/2 translate-y-2" } = $$props;
  if ($$props.classNames === void 0 && $$bindings.classNames && classNames !== void 0)
    $$bindings.classNames(classNames);
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.position === void 0 && $$bindings.position && position !== void 0)
    $$bindings.position(position);
  return `<div class="${"pointer-events-none absolute rounded bg-black px-2 py-1 font-normal leading-tight text-white shadow transition-opacity " + escape(position, true) + " " + escape(classNames, true)}"><div class="absolute bottom-full left-1/2 h-0 w-0 -translate-x-1/2 transform border-4 border-t-0 border-black" style="border-left-color: transparent; border-right-color: transparent; "></div> ${escape(label)}</div>`;
});
const CopyToClipBoardBtn = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { classNames = "" } = $$props;
  let { value } = $$props;
  onDestroy(() => {
  });
  if ($$props.classNames === void 0 && $$bindings.classNames && classNames !== void 0)
    $$bindings.classNames(classNames);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  return `<button class="${"btn rounded-lg border border-gray-200 px-2 py-2 text-sm shadow-sm transition-all hover:border-gray-300 active:shadow-inner dark:border-gray-700 dark:hover:border-gray-500 " + escape(classNames, true)}"${add_attribute("title", "Copy to clipboard", 0)} type="button"><div class="relative">${slots.default ? slots.default({}) : ` ${validate_component(IconCopy, "IconCopy").$$render($$result, {}, {}, {})} `} ${validate_component(Tooltip, "Tooltip").$$render(
    $$result,
    {
      classNames: "opacity-0"
    },
    {},
    {}
  )}</div></button>`;
});
export {
  CopyToClipBoardBtn as C
};
