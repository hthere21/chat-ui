const MONGODB_URL = "mongodb+srv://hai215:Qa080206@cluster0.bo9wmxy.mongodb.net/";
const MONGODB_DB_NAME = "chat-ui";
const MONGODB_DIRECT_CONNECTION = "false";
const COOKIE_NAME = "hf-chat";
const HF_TOKEN = "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";
const HF_API_ROOT = "https://api-inference.huggingface.co/models";
const OPENAI_API_KEY = "";
const SEARXNG_QUERY_URL = "";
const WEBSEARCH_ALLOWLIST = "[]";
const WEBSEARCH_BLOCKLIST = "[]";
const OPENID_CONFIG = '{\n  "PROVIDER_URL": "",\n  "CLIENT_ID": "",\n  "CLIENT_SECRET": "",\n  "SCOPES": ""\n}';
const OPENID_CLIENT_ID = "";
const OPENID_CLIENT_SECRET = "";
const OPENID_SCOPES = "openid profile";
const OPENID_PROVIDER_URL = "https://huggingface.co";
const OPENID_TOLERANCE = "";
const OPENID_RESOURCE = "";
const TEXT_EMBEDDING_MODELS = '[\n  {\n    "name": "Xenova/gte-small",\n    "displayName": "Xenova/gte-small",\n    "description": "Local embedding model running on the server.",\n    "chunkCharLength": 512,\n    "endpoints": [\n      { "type": "transformersjs" }\n    ]\n  }\n]';
const MODELS = '[\n    {\n      "name": "mistralai/Mistral-7B-Instruct-v0.1",\n      "displayName": "mistralai/Mistral-7B-Instruct-v0.1",\n      "description": "Mistral 7B is a new Apache 2.0 model, released by Mistral AI that outperforms Llama2 13B in benchmarks.",\n      "websiteUrl": "https://mistral.ai/news/announcing-mistral-7b/",\n      "preprompt": "",\n      "chatPromptTemplate" : "<s>{{#each messages}}{{#ifUser}}[INST] {{#if @first}}{{#if @root.preprompt}}{{@root.preprompt}}\\n{{/if}}{{/if}}{{content}} [/INST]{{/ifUser}}{{#ifAssistant}}{{content}}</s>{{/ifAssistant}}{{/each}}",\n      "parameters": {\n        "temperature": 0.1,\n        "top_p": 0.95,\n        "repetition_penalty": 1.2,\n        "top_k": 50,\n        "truncate": 3072,\n        "max_new_tokens": 1024,\n        "stop": ["</s>"]\n      },\n      "promptExamples": [\n        {\n          "title": "Write an email from bullet list",\n          "prompt": "As a restaurant owner, write a professional email to the supplier to get these products every week: \\n\\n- Wine (x10)\\n- Eggs (x24)\\n- Bread (x12)"\n        }, {\n          "title": "Code a snake game",\n          "prompt": "Code a basic snake game in python, give explanations for each step."\n        }, {\n          "title": "Assist in a task",\n          "prompt": "How do I make a delicious lemon cheesecake?"\n        }\n      ]\n    }\n]';
const OLD_MODELS = "[]";
const EXPOSE_API = "true";
const ENABLE_ASSISTANTS = "false";
const ALTERNATIVE_REDIRECT_URLS = "[]";
const ALLOWED_USER_EMAILS = "[]";

export { ALTERNATIVE_REDIRECT_URLS as A, COOKIE_NAME as C, EXPOSE_API as E, HF_TOKEN as H, MONGODB_URL as M, OPENID_CONFIG as O, SEARXNG_QUERY_URL as S, TEXT_EMBEDDING_MODELS as T, WEBSEARCH_ALLOWLIST as W, ENABLE_ASSISTANTS as a, ALLOWED_USER_EMAILS as b, WEBSEARCH_BLOCKLIST as c, MONGODB_DIRECT_CONNECTION as d, MONGODB_DB_NAME as e, OPENID_CLIENT_ID as f, OPENID_CLIENT_SECRET as g, OPENID_PROVIDER_URL as h, OPENID_SCOPES as i, OPENID_TOLERANCE as j, OPENID_RESOURCE as k, OPENAI_API_KEY as l, MODELS as m, OLD_MODELS as n, HF_API_ROOT as o };
//# sourceMappingURL=private-f03b1afd.js.map
