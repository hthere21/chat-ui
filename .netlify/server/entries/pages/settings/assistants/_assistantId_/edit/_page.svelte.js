import { c as create_ssr_component, f as subscribe, v as validate_component } from "../../../../../../chunks/ssr.js";
import { p as page } from "../../../../../../chunks/stores.js";
import { A as AssistantSettings } from "../../../../../../chunks/AssistantSettings.js";
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
export {
  Page as default
};
