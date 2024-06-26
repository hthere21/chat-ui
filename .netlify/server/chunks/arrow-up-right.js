import { c as create_ssr_component, b as spread, d as escape_object } from "./ssr.js";
const Arrow_up_right = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<svg${spread(
    [
      { viewBox: "0 0 32 32" },
      { width: "1.2em" },
      { height: "1.2em" },
      escape_object($$props)
    ],
    {}
  )}><!-- HTML_TAG_START -->${`<path fill="currentColor" d="M10 6v2h12.59L6 24.59L7.41 26L24 9.41V22h2V6H10z"/>`}<!-- HTML_TAG_END --></svg>`;
});
export {
  Arrow_up_right as A
};
