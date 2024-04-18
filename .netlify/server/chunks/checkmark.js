import { c as create_ssr_component, b as spread, d as escape_object } from "./ssr.js";
const Checkmark = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="m13 24l-9-9l1.414-1.414L13 21.171L26.586 7.586L28 9L13 24z"/>`}<!-- HTML_TAG_END --></svg>`;
});
export {
  Checkmark as C
};
