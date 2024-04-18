import { j as json } from "../../../../../chunks/index.js";
import { c as collections, C as CONVERSATION_STATS_COLLECTION } from "../../../../../chunks/database.js";
async function POST() {
  for (const span of ["day", "week", "month"]) {
    computeStats({ dateField: "updatedAt", type: "conversation", span }).catch(console.error);
    computeStats({ dateField: "createdAt", type: "conversation", span }).catch(console.error);
    computeStats({ dateField: "createdAt", type: "message", span }).catch(console.error);
  }
  return json({}, { status: 202 });
}
async function computeStats(params) {
  const lastComputed = await collections.conversationStats.findOne(
    { "date.field": params.dateField, "date.span": params.span, type: params.type },
    { sort: { "date.at": -1 } }
  );
  const minDate = lastComputed ? lastComputed.date.at : /* @__PURE__ */ new Date(0);
  console.log("Computing stats for", params.type, params.span, params.dateField, "from", minDate);
  const dateField = params.type === "message" ? "messages." + params.dateField : params.dateField;
  const pipeline = [
    {
      $match: {
        [dateField]: { $gte: minDate }
      }
    },
    {
      $project: {
        [dateField]: 1,
        sessionId: 1,
        userId: 1
      }
    },
    ...params.type === "message" ? [
      {
        $unwind: "$messages"
      },
      {
        $match: {
          [dateField]: { $gte: minDate }
        }
      }
    ] : [],
    {
      $sort: {
        [dateField]: 1
      }
    },
    {
      $facet: {
        userId: [
          {
            $match: {
              userId: { $exists: true }
            }
          },
          {
            $group: {
              _id: {
                at: { $dateTrunc: { date: `$${dateField}`, unit: params.span } },
                userId: "$userId"
              }
            }
          },
          {
            $group: {
              _id: "$_id.at",
              count: { $sum: 1 }
            }
          },
          {
            $project: {
              _id: 0,
              date: {
                at: "$_id",
                field: params.dateField,
                span: params.span
              },
              distinct: "userId",
              count: 1
            }
          }
        ],
        sessionId: [
          {
            $match: {
              sessionId: { $exists: true }
            }
          },
          {
            $group: {
              _id: {
                at: { $dateTrunc: { date: `$${dateField}`, unit: params.span } },
                sessionId: "$sessionId"
              }
            }
          },
          {
            $group: {
              _id: "$_id.at",
              count: { $sum: 1 }
            }
          },
          {
            $project: {
              _id: 0,
              date: {
                at: "$_id",
                field: params.dateField,
                span: params.span
              },
              distinct: "sessionId",
              count: 1
            }
          }
        ],
        userOrSessionId: [
          {
            $group: {
              _id: {
                at: { $dateTrunc: { date: `$${dateField}`, unit: params.span } },
                userOrSessionId: { $ifNull: ["$userId", "$sessionId"] }
              }
            }
          },
          {
            $group: {
              _id: "$_id.at",
              count: { $sum: 1 }
            }
          },
          {
            $project: {
              _id: 0,
              date: {
                at: "$_id",
                field: params.dateField,
                span: params.span
              },
              distinct: "userOrSessionId",
              count: 1
            }
          }
        ],
        _id: [
          {
            $group: {
              _id: { $dateTrunc: { date: `$${dateField}`, unit: params.span } },
              count: { $sum: 1 }
            }
          },
          {
            $project: {
              _id: 0,
              date: {
                at: "$_id",
                field: params.dateField,
                span: params.span
              },
              distinct: "_id",
              count: 1
            }
          }
        ]
      }
    },
    {
      $project: {
        stats: {
          $concatArrays: ["$userId", "$sessionId", "$userOrSessionId", "$_id"]
        }
      }
    },
    {
      $unwind: "$stats"
    },
    {
      $replaceRoot: {
        newRoot: "$stats"
      }
    },
    {
      $set: {
        type: params.type
      }
    },
    {
      $merge: {
        into: CONVERSATION_STATS_COLLECTION,
        on: ["date.at", "type", "date.span", "date.field", "distinct"],
        whenMatched: "replace",
        whenNotMatched: "insert"
      }
    }
  ];
  await collections.conversations.aggregate(pipeline, { allowDiskUse: true }).next();
  console.log("Computed stats for", params.type, params.span, params.dateField);
}
export {
  POST
};
