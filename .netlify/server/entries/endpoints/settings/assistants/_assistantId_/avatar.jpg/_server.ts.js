import { c as collections } from "../../../../../../chunks/database.js";
import { e as error } from "../../../../../../chunks/index.js";
import { ObjectId } from "mongodb";
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
export {
  GET
};
