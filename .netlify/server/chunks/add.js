import { c as create_ssr_component, b as spread, d as escape_object } from "./ssr.js";
const Add = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M17 15V8h-2v7H8v2h7v7h2v-7h7v-2z"/>`}<!-- HTML_TAG_END --></svg>`;
});
export {
  Add as A
};
