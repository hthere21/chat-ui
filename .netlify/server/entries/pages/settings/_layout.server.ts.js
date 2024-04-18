import { c as collections } from "../../../chunks/database.js";
const load = async ({ locals, parent }) => {
  const { assistants } = await parent();
  let reportsByUser = [];
  const createdBy = locals.user?._id ?? locals.sessionId;
  if (createdBy) {
    const reports = await collections.reports.find({ createdBy }, { projection: { _id: 0, assistantId: 1 } }).toArray();
    reportsByUser = reports.map((r) => r.assistantId.toString());
  }
  return {
    assistants: assistants.map((el) => ({
      ...el,
      reported: reportsByUser.includes(el._id)
    }))
  };
};
export {
  load
};
