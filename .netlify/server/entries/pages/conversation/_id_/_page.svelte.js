import { c as create_ssr_component, f as subscribe, i as set_store_value, e as escape, v as validate_component } from "../../../../chunks/ssr.js";
import { c as createConvTreeStore, f as findCurrentModel, w as webSearchParameters, C as ChatWindow } from "../../../../chunks/ChatWindow.js";
import { w as writable } from "../../../../chunks/index2.js";
import { p as page } from "../../../../chunks/stores.js";
import { e as error } from "../../../../chunks/errors.js";
import { t as titleUpdate } from "../../../../chunks/titleUpdate.js";
const isAborted = writable(false);
const pendingMessage = writable();
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let title;
  let $page, $$unsubscribe_page;
  let $convTreeStore, $$unsubscribe_convTreeStore;
  let $isAborted, $$unsubscribe_isAborted;
  let $$unsubscribe_pendingMessage;
  let $$unsubscribe_error;
  let $$unsubscribe_titleUpdate;
  let $$unsubscribe_webSearchParameters;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_isAborted = subscribe(isAborted, (value) => $isAborted = value);
  $$unsubscribe_pendingMessage = subscribe(pendingMessage, (value) => value);
  $$unsubscribe_error = subscribe(error, (value) => value);
  $$unsubscribe_titleUpdate = subscribe(titleUpdate, (value) => value);
  $$unsubscribe_webSearchParameters = subscribe(webSearchParameters, (value) => value);
  let { data } = $$props;
  let messages = data.messages;
  let lastLoadedMessages = data.messages;
  let loading = false;
  let pending = false;
  let files = [];
  const convTreeStore = createConvTreeStore();
  $$unsubscribe_convTreeStore = subscribe(convTreeStore, (value) => $convTreeStore = value);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (data.messages !== lastLoadedMessages) {
        messages = data.messages;
        lastLoadedMessages = data.messages;
      }
    }
    {
      $page.params.id, set_store_value(isAborted, $isAborted = true, $isAborted), loading = false, set_store_value(convTreeStore, $convTreeStore.editing = null, $convTreeStore);
    }
    title = data.conversations.find((conv) => conv.id === $page.params.id)?.title ?? data.title;
    $$rendered = `${$$result.head += `<!-- HEAD_svelte-626amo_START -->${$$result.title = `<title>${escape(title)}</title>`, ""}<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71HotJqlAn" crossorigin="anonymous"><!-- HEAD_svelte-626amo_END -->`, ""} ${validate_component(ChatWindow, "ChatWindow").$$render(
      $$result,
      {
        loading,
        pending,
        messages,
        shared: data.shared,
        preprompt: data.preprompt,
        models: data.models,
        currentModel: findCurrentModel([...data.models, ...data.oldModels], data.model),
        assistant: data.assistant,
        files
      },
      {
        files: ($$value) => {
          files = $$value;
          $$settled = false;
        }
      },
      {}
    )}`;
  } while (!$$settled);
  $$unsubscribe_page();
  $$unsubscribe_convTreeStore();
  $$unsubscribe_isAborted();
  $$unsubscribe_pendingMessage();
  $$unsubscribe_error();
  $$unsubscribe_titleUpdate();
  $$unsubscribe_webSearchParameters();
  return $$rendered;
});
export {
  Page as default
};
