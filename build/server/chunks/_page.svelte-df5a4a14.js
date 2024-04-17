import { c as create_ssr_component, d as subscribe, v as validate_component } from './ssr-6d44e1a8.js';
import { p as page } from './stores-55a2d0d3.js';
import { A as AssistantSettings } from './AssistantSettings-7b9c3e6b.js';
import './paths-05fee424.js';
import './pen-285ea73c.js';
import './upload-2c316ae2.js';
import './settings2-ba3250ac.js';
import './index2-7383a28b.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let assistant;
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
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
    assistant = data.assistants.find((el) => el._id.toString() === $page.params.assistantId);
    $$rendered = `${validate_component(AssistantSettings, "AssistantSettings").$$render(
      $$result,
      { assistant, models: data.models, form },
      {
        form: ($$value) => {
          form = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-df5a4a14.js.map
