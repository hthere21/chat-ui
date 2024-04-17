import { m as models } from './models-0e908230.js';
import './private-f03b1afd.js';
import 'handlebars';
import 'zod';
import '@huggingface/inference';
import '@xenova/transformers';
import 'json5';

async function GET() {
  const res = models.map((model) => ({
    id: model.id,
    name: model.name,
    websiteUrl: model.websiteUrl,
    modelUrl: model.modelUrl,
    datasetName: model.datasetName,
    datasetUrl: model.datasetUrl,
    displayName: model.displayName,
    description: model.description,
    logoUrl: model.logoUrl,
    promptExamples: model.promptExamples,
    preprompt: model.preprompt,
    multimodal: model.multimodal,
    unlisted: model.unlisted
  }));
  return Response.json(res);
}

export { GET };
//# sourceMappingURL=_server.ts-c5ded9a7.js.map
