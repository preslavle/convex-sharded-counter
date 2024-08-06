import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  counters: defineTable({
    key: v.string(),
    shard: v.number(),
    value: v.number(),
  }).index("by_key_and_shard", ["key", "shard"]),
  configs: defineTable({
    key: v.string(),
    num_shards: v.number(),
  }).index("by_key", ["key"]),
});
