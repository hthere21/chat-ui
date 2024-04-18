import { M as MONGODB_URL, b as MONGODB_DIRECT_CONNECTION, c as MONGODB_DB_NAME } from "./private.js";
import { MongoClient, GridFSBucket } from "mongodb";
const client = new MongoClient(MONGODB_URL, {
  directConnection: MONGODB_DIRECT_CONNECTION === "true"
});
client.connect().catch(console.error);
const db = client.db(MONGODB_DB_NAME + "");
const CONVERSATION_STATS_COLLECTION = "conversations.stats";
const conversations = db.collection("conversations");
const conversationStats = db.collection(CONVERSATION_STATS_COLLECTION);
const assistants = db.collection("assistants");
const reports = db.collection("reports");
const sharedConversations = db.collection("sharedConversations");
const abortedGenerations = db.collection("abortedGenerations");
const settings = db.collection("settings");
const users = db.collection("users");
const sessions = db.collection("sessions");
const messageEvents = db.collection("messageEvents");
const bucket = new GridFSBucket(db, { bucketName: "files" });
const collections = {
  conversations,
  conversationStats,
  assistants,
  reports,
  sharedConversations,
  abortedGenerations,
  settings,
  users,
  sessions,
  messageEvents,
  bucket
};
client.on("open", () => {
  conversations.createIndex(
    { sessionId: 1, updatedAt: -1 },
    { partialFilterExpression: { sessionId: { $exists: true } } }
  ).catch(console.error);
  conversations.createIndex(
    { userId: 1, updatedAt: -1 },
    { partialFilterExpression: { userId: { $exists: true } } }
  ).catch(console.error);
  conversations.createIndex(
    { "message.id": 1, "message.ancestors": 1 },
    { partialFilterExpression: { userId: { $exists: true } } }
  ).catch(console.error);
  conversations.createIndex({ updatedAt: 1 }).catch(console.error);
  conversations.createIndex({ createdAt: 1 }).catch(console.error);
  conversations.createIndex({ "messages.createdAt": 1 }, { sparse: true }).catch(console.error);
  conversationStats.createIndex(
    {
      type: 1,
      "date.field": 1,
      "date.span": 1,
      "date.at": 1,
      distinct: 1
    },
    { unique: true }
  ).catch(console.error);
  conversationStats.createIndex({
    type: 1,
    "date.field": 1,
    "date.at": 1
  }).catch(console.error);
  abortedGenerations.createIndex({ updatedAt: 1 }, { expireAfterSeconds: 30 }).catch(console.error);
  abortedGenerations.createIndex({ conversationId: 1 }, { unique: true }).catch(console.error);
  sharedConversations.createIndex({ hash: 1 }, { unique: true }).catch(console.error);
  settings.createIndex({ sessionId: 1 }, { unique: true, sparse: true }).catch(console.error);
  settings.createIndex({ userId: 1 }, { unique: true, sparse: true }).catch(console.error);
  settings.createIndex({ assistants: 1 }).catch(console.error);
  users.createIndex({ hfUserId: 1 }, { unique: true }).catch(console.error);
  users.createIndex({ sessionId: 1 }, { unique: true, sparse: true }).catch(console.error);
  users.createIndex({ username: 1 }).catch(console.error);
  messageEvents.createIndex({ createdAt: 1 }, { expireAfterSeconds: 60 }).catch(console.error);
  sessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }).catch(console.error);
  sessions.createIndex({ sessionId: 1 }, { unique: true }).catch(console.error);
  assistants.createIndex({ createdById: 1, userCount: -1 }).catch(console.error);
  assistants.createIndex({ userCount: 1 }).catch(console.error);
  assistants.createIndex({ featured: 1, userCount: -1 }).catch(console.error);
  assistants.createIndex({ modelId: 1, userCount: -1 }).catch(console.error);
  reports.createIndex({ assistantId: 1 }).catch(console.error);
  reports.createIndex({ createdBy: 1, assistantId: 1 }).catch(console.error);
});
export {
  CONVERSATION_STATS_COLLECTION as C,
  collections as c
};
