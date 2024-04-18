import { c as create_ssr_component, a as add_attribute } from "./ssr.js";
const Switch = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { checked } = $$props;
  let { name } = $$props;
  if ($$props.checked === void 0 && $$bindings.checked && checked !== void 0)
    $$bindings.checked(checked);
  if ($$props.name === void 0 && $$bindings.name && name !== void 0)
    $$bindings.name(name);
  return `<input type="checkbox"${add_attribute("name", name, 0)} class="peer pointer-events-none absolute opacity-0"${add_attribute("checked", checked, 1)}> <div${add_attribute("aria-checked", checked, 0)} aria-roledescription="switch" aria-label="switch" role="switch" tabindex="0" class="relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full bg-gray-300 p-1 shadow-inner ring-gray-400 transition-all peer-checked:bg-blue-600 peer-focus-visible:ring peer-focus-visible:ring-offset-1 hover:bg-gray-400 dark:bg-gray-600 peer-checked:[&>div]:translate-x-3.5"><div class="h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-all"></div></div>`;
});
export {
  Switch as S
};
