import { c as create_ssr_component, v as validate_component } from './ssr-6d44e1a8.js';
import { A as AssistantSettings } from './AssistantSettings-7b9c3e6b.js';
import './paths-05fee424.js';
import './pen-285ea73c.js';
import './upload-2c316ae2.js';
import './settings2-ba3250ac.js';
import './index2-7383a28b.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { form } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(AssistantSettings, "AssistantSettings").$$render(
      $$result,
      { models: data.models, form },
      {
        form: ($$value) => {
          form = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-5cf66f27.js.map
