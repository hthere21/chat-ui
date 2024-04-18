import { H as HF_TOKEN, j as OPENAI_API_KEY, T as TEXT_EMBEDDING_MODELS, k as MODELS, l as OLD_MODELS, m as HF_API_ROOT } from "./private.js";
import Handlebars from "handlebars";
import { z } from "zod";
import { textGenerationStream } from "@huggingface/inference";
import { pipeline } from "@xenova/transformers";
import JSON5 from "json5";
Handlebars.registerHelper("ifUser", function(options) {
  if (this.from == "user")
    return options.fn(this);
});
Handlebars.registerHelper(
  "ifAssistant",
  function(options) {
    if (this.from == "assistant")
      return options.fn(this);
  }
);
function compileTemplate(input, model) {
  const template = Handlebars.compile(input, {
    knownHelpers: { ifUser: true, ifAssistant: true },
    knownHelpersOnly: true,
    noEscape: true,
    strict: true,
    preventIndent: true
  });
  return function render(inputs, options) {
    return template({ ...model, ...inputs }, options);
  };
}
async function buildPrompt({
  messages,
  model,
  preprompt,
  continueMessage
}) {
  const filteredMessages = messages.filter((m) => m.from !== "system");
  let prompt = model.chatPromptRender({ messages: filteredMessages, preprompt }).split(" ").slice(-(model.parameters?.truncate ?? 0)).join(" ");
  if (continueMessage && model.parameters?.stop) {
    prompt = model.parameters.stop.reduce((acc, curr) => {
      if (acc.endsWith(curr)) {
        return acc.slice(0, acc.length - curr.length);
      }
      return acc;
    }, prompt.trimEnd());
  }
  return prompt;
}
const endpointTgiParametersSchema = z.object({
  weight: z.number().int().positive().default(1),
  model: z.any(),
  type: z.literal("tgi"),
  url: z.string().url(),
  accessToken: z.string().default(HF_TOKEN),
  authorization: z.string().optional()
});
function endpointTgi(input) {
  const { url, accessToken, model, authorization } = endpointTgiParametersSchema.parse(input);
  return async ({ messages, preprompt, continueMessage }) => {
    const prompt = await buildPrompt({
      messages,
      preprompt,
      model,
      continueMessage
    });
    return textGenerationStream(
      {
        parameters: { ...model.parameters, return_full_text: false },
        model: url,
        inputs: prompt,
        accessToken
      },
      {
        use_cache: false,
        fetch: async (endpointUrl, info) => {
          if (info && authorization && !accessToken) {
            info.headers = {
              ...info.headers,
              Authorization: authorization
            };
          }
          return fetch(endpointUrl, info);
        }
      }
    );
  };
}
const endpointAwsParametersSchema = z.object({
  weight: z.number().int().positive().default(1),
  model: z.any(),
  type: z.literal("aws"),
  url: z.string().url(),
  accessKey: z.string().min(1),
  secretKey: z.string().min(1),
  sessionToken: z.string().optional(),
  service: z.union([z.literal("sagemaker"), z.literal("lambda")]).default("sagemaker"),
  region: z.string().optional()
});
async function endpointAws(input) {
  let AwsClient;
  try {
    AwsClient = (await import("aws4fetch")).AwsClient;
  } catch (e) {
    throw new Error("Failed to import aws4fetch");
  }
  const { url, accessKey, secretKey, sessionToken, model, region, service } = endpointAwsParametersSchema.parse(input);
  const aws = new AwsClient({
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
    sessionToken,
    service,
    region
  });
  return async ({ messages, preprompt, continueMessage }) => {
    const prompt = await buildPrompt({
      messages,
      continueMessage,
      preprompt,
      model
    });
    return textGenerationStream(
      {
        parameters: { ...model.parameters, return_full_text: false },
        model: url,
        inputs: prompt
      },
      {
        use_cache: false,
        fetch: aws.fetch.bind(aws)
      }
    );
  };
}
async function* openAICompletionToTextGenerationStream(completionStream) {
  let generatedText = "";
  let tokenId = 0;
  for await (const completion of completionStream) {
    const { choices } = completion;
    const text = choices[0]?.text ?? "";
    const last = choices[0]?.finish_reason === "stop";
    if (text) {
      generatedText = generatedText + text;
    }
    const output = {
      token: {
        id: tokenId++,
        text,
        logprob: 0,
        special: last
      },
      generated_text: last ? generatedText : null,
      details: null
    };
    yield output;
  }
}
async function* openAIChatToTextGenerationStream(completionStream) {
  let generatedText = "";
  let tokenId = 0;
  for await (const completion of completionStream) {
    const { choices } = completion;
    const content = choices[0]?.delta?.content ?? "";
    const last = choices[0]?.finish_reason === "stop";
    if (content) {
      generatedText = generatedText + content;
    }
    const output = {
      token: {
        id: tokenId++,
        text: content ?? "",
        logprob: 0,
        special: last
      },
      generated_text: last ? generatedText : null,
      details: null
    };
    yield output;
  }
}
const endpointOAIParametersSchema = z.object({
  weight: z.number().int().positive().default(1),
  model: z.any(),
  type: z.literal("openai"),
  baseURL: z.string().url().default("https://api.openai.com/v1"),
  apiKey: z.string().default(OPENAI_API_KEY),
  completion: z.union([z.literal("completions"), z.literal("chat_completions")]).default("chat_completions"),
  defaultHeaders: z.record(z.string()).optional(),
  defaultQuery: z.record(z.string()).optional()
});
async function endpointOai(input) {
  const { baseURL, apiKey, completion, model, defaultHeaders, defaultQuery } = endpointOAIParametersSchema.parse(input);
  let OpenAI;
  try {
    OpenAI = (await import("openai")).OpenAI;
  } catch (e) {
    throw new Error("Failed to import OpenAI", { cause: e });
  }
  const openai = new OpenAI({
    apiKey: apiKey ?? "sk-",
    baseURL,
    defaultHeaders,
    defaultQuery
  });
  if (completion === "completions") {
    return async ({ messages, preprompt, continueMessage }) => {
      const prompt = await buildPrompt({
        messages,
        continueMessage,
        preprompt,
        model
      });
      return openAICompletionToTextGenerationStream(
        await openai.completions.create({
          model: model.id ?? model.name,
          prompt,
          stream: true,
          max_tokens: model.parameters?.max_new_tokens,
          stop: model.parameters?.stop,
          temperature: model.parameters?.temperature,
          top_p: model.parameters?.top_p,
          frequency_penalty: model.parameters?.repetition_penalty
        })
      );
    };
  } else if (completion === "chat_completions") {
    return async ({ messages, preprompt }) => {
      let messagesOpenAI = messages.map((message) => ({
        role: message.from,
        content: message.content
      }));
      if (messagesOpenAI?.[0]?.role !== "system") {
        messagesOpenAI = [{ role: "system", content: preprompt ?? "" }, ...messagesOpenAI];
      }
      return openAIChatToTextGenerationStream(
        await openai.chat.completions.create({
          model: model.id ?? model.name,
          messages: messagesOpenAI,
          stream: true,
          max_tokens: model.parameters?.max_new_tokens,
          stop: model.parameters?.stop,
          temperature: model.parameters?.temperature,
          top_p: model.parameters?.top_p,
          frequency_penalty: model.parameters?.repetition_penalty
        })
      );
    };
  } else {
    throw new Error("Invalid completion type");
  }
}
const endpointLlamacppParametersSchema = z.object({
  weight: z.number().int().positive().default(1),
  model: z.any(),
  type: z.literal("llamacpp"),
  url: z.string().url().default("http://127.0.0.1:8080"),
  accessToken: z.string().min(1).default(HF_TOKEN)
});
function endpointLlamacpp(input) {
  const { url, model } = endpointLlamacppParametersSchema.parse(input);
  return async ({ messages, preprompt, continueMessage }) => {
    const prompt = await buildPrompt({
      messages,
      continueMessage,
      preprompt,
      model
    });
    const r = await fetch(`${url}/completion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt,
        stream: true,
        temperature: model.parameters.temperature,
        top_p: model.parameters.top_p,
        top_k: model.parameters.top_k,
        stop: model.parameters.stop,
        repeat_penalty: model.parameters.repetition_penalty,
        n_predict: model.parameters.max_new_tokens
      })
    });
    if (!r.ok) {
      throw new Error(`Failed to generate text: ${await r.text()}`);
    }
    const encoder = new TextDecoderStream();
    const reader = r.body?.pipeThrough(encoder).getReader();
    return async function* () {
      let stop = false;
      let generatedText = "";
      let tokenId = 0;
      while (!stop) {
        const out = await reader?.read() ?? { done: false, value: void 0 };
        if (out.done) {
          reader?.cancel();
          return;
        }
        if (!out.value) {
          return;
        }
        if (out.value.startsWith("data: ")) {
          let data = null;
          try {
            data = JSON.parse(out.value.slice(6));
          } catch (e) {
            return;
          }
          if (data.content || data.stop) {
            generatedText += data.content;
            const output = {
              token: {
                id: tokenId++,
                text: data.content ?? "",
                logprob: 0,
                special: false
              },
              generated_text: data.stop ? generatedText : null,
              details: null
            };
            if (data.stop) {
              stop = true;
              reader?.cancel();
            }
            yield output;
          }
        }
      }
    }();
  };
}
const endpointOllamaParametersSchema = z.object({
  weight: z.number().int().positive().default(1),
  model: z.any(),
  type: z.literal("ollama"),
  url: z.string().url().default("http://127.0.0.1:11434"),
  ollamaName: z.string().min(1).optional()
});
function endpointOllama(input) {
  const { url, model, ollamaName } = endpointOllamaParametersSchema.parse(input);
  return async ({ messages, preprompt, continueMessage }) => {
    const prompt = await buildPrompt({
      messages,
      continueMessage,
      preprompt,
      model
    });
    const r = await fetch(`${url}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt,
        model: ollamaName ?? model.name,
        raw: true,
        options: {
          top_p: model.parameters.top_p,
          top_k: model.parameters.top_k,
          temperature: model.parameters.temperature,
          repeat_penalty: model.parameters.repetition_penalty,
          stop: model.parameters.stop,
          num_predict: model.parameters.max_new_tokens
        }
      })
    });
    if (!r.ok) {
      throw new Error(`Failed to generate text: ${await r.text()}`);
    }
    const encoder = new TextDecoderStream();
    const reader = r.body?.pipeThrough(encoder).getReader();
    return async function* () {
      let generatedText = "";
      let tokenId = 0;
      let stop = false;
      while (!stop) {
        const out = await reader?.read() ?? { done: false, value: void 0 };
        if (out.done) {
          reader?.cancel();
          return;
        }
        if (!out.value) {
          return;
        }
        let data = null;
        try {
          data = JSON.parse(out.value);
        } catch (e) {
          return;
        }
        if (!data.done) {
          generatedText += data.response;
          yield {
            token: {
              id: tokenId++,
              text: data.response ?? "",
              logprob: 0,
              special: false
            },
            generated_text: null,
            details: null
          };
        } else {
          stop = true;
          yield {
            token: {
              id: tokenId++,
              text: data.response ?? "",
              logprob: 0,
              special: true
            },
            generated_text: generatedText,
            details: null
          };
        }
      }
    }();
  };
}
const endpoints = {
  tgi: endpointTgi,
  aws: endpointAws,
  openai: endpointOai,
  llamacpp: endpointLlamacpp,
  ollama: endpointOllama
};
const endpointSchema = z.discriminatedUnion("type", [
  endpointAwsParametersSchema,
  endpointOAIParametersSchema,
  endpointTgiParametersSchema,
  endpointLlamacppParametersSchema,
  endpointOllamaParametersSchema
]);
function sum(nums) {
  return nums.reduce((a, b) => a + b, 0);
}
function chunk(arr, chunkSize) {
  if (isNaN(chunkSize) || chunkSize < 1) {
    throw new RangeError("Invalid chunk size: " + chunkSize);
  }
  if (!arr.length) {
    return [];
  }
  if (arr.length <= chunkSize) {
    return [arr];
  }
  return range(Math.ceil(arr.length / chunkSize)).map((i) => {
    return arr.slice(i * chunkSize, (i + 1) * chunkSize);
  });
}
function range(n, b) {
  return b ? Array(b - n).fill(0).map((_, i) => n + i) : Array(n).fill(0).map((_, i) => i);
}
const embeddingEndpointTeiParametersSchema = z.object({
  weight: z.number().int().positive().default(1),
  model: z.any(),
  type: z.literal("tei"),
  url: z.string().url(),
  authorization: z.string().optional()
});
const getModelInfoByUrl = async (url, authorization) => {
  const { origin } = new URL(url);
  const response = await fetch(`${origin}/info`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...authorization ? { Authorization: authorization } : {}
    }
  });
  const json = await response.json();
  return json;
};
async function embeddingEndpointTei(input) {
  const { url, model, authorization } = embeddingEndpointTeiParametersSchema.parse(input);
  const { max_client_batch_size, max_batch_tokens } = await getModelInfoByUrl(url);
  const maxBatchSize = Math.min(
    max_client_batch_size,
    Math.floor(max_batch_tokens / model.chunkCharLength)
  );
  return async ({ inputs }) => {
    const { origin } = new URL(url);
    const batchesInputs = chunk(inputs, maxBatchSize);
    const batchesResults = await Promise.all(
      batchesInputs.map(async (batchInputs) => {
        const response = await fetch(`${origin}/embed`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...authorization ? { Authorization: authorization } : {}
          },
          body: JSON.stringify({ inputs: batchInputs, normalize: true, truncate: true })
        });
        const embeddings = await response.json();
        return embeddings;
      })
    );
    const flatAllEmbeddings = batchesResults.flat();
    return flatAllEmbeddings;
  };
}
const embeddingEndpointTransformersJSParametersSchema = z.object({
  weight: z.number().int().positive().default(1),
  model: z.any(),
  type: z.literal("transformersjs")
});
class TransformersJSModelsSingleton {
  static async getInstance(modelName) {
    const modelPipelineInstance = this.instances.find(([name]) => name === modelName);
    if (modelPipelineInstance) {
      const [, modelPipeline] = modelPipelineInstance;
      return modelPipeline;
    }
    const newModelPipeline = pipeline("feature-extraction", modelName);
    this.instances.push([modelName, newModelPipeline]);
    return newModelPipeline;
  }
}
TransformersJSModelsSingleton.instances = [];
async function calculateEmbedding(modelName, inputs) {
  const extractor = await TransformersJSModelsSingleton.getInstance(modelName);
  const output = await extractor(inputs, { pooling: "mean", normalize: true });
  return output.tolist();
}
function embeddingEndpointTransformersJS(input) {
  const { model } = embeddingEndpointTransformersJSParametersSchema.parse(input);
  return async ({ inputs }) => {
    return calculateEmbedding(model.name, inputs);
  };
}
const embeddingEndpointSchema = z.discriminatedUnion("type", [
  embeddingEndpointTeiParametersSchema,
  embeddingEndpointTransformersJSParametersSchema
]);
const embeddingEndpoints = {
  tei: embeddingEndpointTei,
  transformersjs: embeddingEndpointTransformersJS
};
const modelConfig$1 = z.object({
  /** Used as an identifier in DB */
  id: z.string().optional(),
  /** Used to link to the model page, and for inference */
  name: z.string().min(1),
  displayName: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  websiteUrl: z.string().url().optional(),
  modelUrl: z.string().url().optional(),
  endpoints: z.array(embeddingEndpointSchema).nonempty(),
  chunkCharLength: z.number().positive(),
  preQuery: z.string().default(""),
  prePassage: z.string().default("")
});
const rawEmbeddingModelJSON = TEXT_EMBEDDING_MODELS;
const embeddingModelsRaw = z.array(modelConfig$1).parse(JSON5.parse(rawEmbeddingModelJSON));
const processEmbeddingModel = async (m) => ({
  ...m,
  id: m.id || m.name
});
const addEndpoint$1 = (m) => ({
  ...m,
  getEndpoint: async () => {
    if (!m.endpoints) {
      return embeddingEndpointTransformersJS({
        type: "transformersjs",
        weight: 1,
        model: m
      });
    }
    const totalWeight = sum(m.endpoints.map((e) => e.weight));
    let random = Math.random() * totalWeight;
    for (const endpoint of m.endpoints) {
      if (random < endpoint.weight) {
        const args = { ...endpoint, model: m };
        switch (args.type) {
          case "tei":
            return embeddingEndpoints.tei(args);
          case "transformersjs":
            return embeddingEndpoints.transformersjs(args);
        }
      }
      random -= endpoint.weight;
    }
    throw new Error(`Failed to select embedding endpoint`);
  }
});
const embeddingModels = await Promise.all(
  embeddingModelsRaw.map((e) => processEmbeddingModel(e).then(addEndpoint$1))
);
const defaultEmbeddingModel = embeddingModels[0];
const validateEmbeddingModel = (_models, key) => {
  return z.enum([_models[0][key], ..._models.slice(1).map((m) => m[key])]);
};
const validateEmbeddingModelByName = (_models) => {
  return validateEmbeddingModel(_models, "name");
};
const modelConfig = z.object({
  /** Used as an identifier in DB */
  id: z.string().optional(),
  /** Used to link to the model page, and for inference */
  name: z.string().default(""),
  displayName: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  logoUrl: z.string().url().optional(),
  websiteUrl: z.string().url().optional(),
  modelUrl: z.string().url().optional(),
  datasetName: z.string().min(1).optional(),
  datasetUrl: z.string().url().optional(),
  userMessageToken: z.string().default(""),
  userMessageEndToken: z.string().default(""),
  assistantMessageToken: z.string().default(""),
  assistantMessageEndToken: z.string().default(""),
  messageEndToken: z.string().default(""),
  preprompt: z.string().default(""),
  prepromptUrl: z.string().url().optional(),
  chatPromptTemplate: z.string().default(
    "{{preprompt}}{{#each messages}}{{#ifUser}}{{@root.userMessageToken}}{{content}}{{@root.userMessageEndToken}}{{/ifUser}}{{#ifAssistant}}{{@root.assistantMessageToken}}{{content}}{{@root.assistantMessageEndToken}}{{/ifAssistant}}{{/each}}{{assistantMessageToken}}"
  ),
  promptExamples: z.array(
    z.object({
      title: z.string().min(1),
      prompt: z.string().min(1)
    })
  ).optional(),
  endpoints: z.array(endpointSchema).optional(),
  parameters: z.object({
    temperature: z.number().min(0).max(1).optional(),
    truncate: z.number().int().positive().optional(),
    max_new_tokens: z.number().int().positive().optional(),
    stop: z.array(z.string()).optional(),
    top_p: z.number().positive().optional(),
    top_k: z.number().positive().optional(),
    repetition_penalty: z.number().min(-2).max(2).optional()
  }).passthrough().optional(),
  multimodal: z.boolean().default(false),
  unlisted: z.boolean().default(false),
  embeddingModel: validateEmbeddingModelByName(embeddingModels).optional()
});
const modelsRaw = z.array(modelConfig).parse(JSON5.parse(MODELS));
const processModel = async (m) => ({
  ...m,
  userMessageEndToken: m?.userMessageEndToken || m?.messageEndToken,
  assistantMessageEndToken: m?.assistantMessageEndToken || m?.messageEndToken,
  chatPromptRender: compileTemplate(m.chatPromptTemplate, m),
  id: m.id || m.name,
  displayName: m.displayName || m.name,
  preprompt: m.prepromptUrl ? await fetch(m.prepromptUrl).then((r) => r.text()) : m.preprompt,
  parameters: { ...m.parameters, stop_sequences: m.parameters?.stop }
});
const addEndpoint = (m) => ({
  ...m,
  getEndpoint: async () => {
    if (!m.endpoints) {
      return endpointTgi({
        type: "tgi",
        url: `${HF_API_ROOT}/${m.name}`,
        accessToken: HF_TOKEN,
        weight: 1,
        model: m
      });
    }
    const totalWeight = sum(m.endpoints.map((e) => e.weight));
    let random = Math.random() * totalWeight;
    for (const endpoint of m.endpoints) {
      if (random < endpoint.weight) {
        const args = { ...endpoint, model: m };
        switch (args.type) {
          case "tgi":
            return endpoints.tgi(args);
          case "aws":
            return await endpoints.aws(args);
          case "openai":
            return await endpoints.openai(args);
          case "llamacpp":
            return endpoints.llamacpp(args);
          case "ollama":
            return endpoints.ollama(args);
          default:
            return endpoints.tgi(args);
        }
      }
      random -= endpoint.weight;
    }
    throw new Error(`Failed to select endpoint`);
  }
});
const models = await Promise.all(modelsRaw.map((e) => processModel(e).then(addEndpoint)));
const defaultModel = models[0];
const oldModels = z.array(
  z.object({
    id: z.string().optional(),
    name: z.string().min(1),
    displayName: z.string().min(1).optional()
  })
).parse(JSON5.parse(OLD_MODELS)).map((m) => ({ ...m, id: m.id || m.name, displayName: m.displayName || m.name }));
const validateModel = (_models) => {
  return z.enum([_models[0].id, ..._models.slice(1).map((m) => m.id)]);
};
const smallModel = defaultModel;
export {
  defaultModel as a,
  buildPrompt as b,
  chunk as c,
  defaultEmbeddingModel as d,
  embeddingModels as e,
  models as m,
  oldModels as o,
  smallModel as s,
  validateModel as v
};
