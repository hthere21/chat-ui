import { c as collections } from './database-f81a56a9.js';
import { e as error } from './index-0087e825.js';
import { ObjectId } from 'mongodb';
import './private-f03b1afd.js';

const GET = async ({ params }) => {
  const assistant = await collections.assistants.findOne({
    _id: new ObjectId(params.assistantId)
  });
  if (!assistant) {
    throw error(404, "No assistant found");
  }
  if (!assistant.avatar) {
    throw error(404, "No avatar found");
  }
  const fileId = collections.bucket.find({ filename: assistant._id.toString() });
  const content = await fileId.next().then(async (file) => {
    if (!file?._id) {
      throw error(404, "Avatar not found");
    }
    const fileStream = collections.bucket.openDownloadStream(file?._id);
    const fileBuffer = await new Promise((resolve, reject) => {
      const chunks = [];
      fileStream.on("data", (chunk) => chunks.push(chunk));
      fileStream.on("error", reject);
      fileStream.on("end", () => resolve(Buffer.concat(chunks)));
    });
    return fileBuffer;
  });
  return new Response(content, {
    headers: {
      "Content-Type": "image/jpeg"
    }
  });
};

export { GET };
//# sourceMappingURL=_server.ts-35632005.js.map
