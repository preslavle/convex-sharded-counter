import { v } from "convex/values";
import { componentArg, mutation, query } from "./_generated/server";

export const get = query({
  args: { key: v.string() },
  handler: async (ctx, { key }) => {
    let result = 0;
    const counters = ctx.db
      .query("counters")
      .withIndex("by_key_and_shard", (q) => q.eq("key", key));
    for await (const counter of counters) {
      result += counter.value;
    }
    return result;
  },
});

export const increment = mutation({
    args: { key: v.string() },
    handler: async (ctx, { key }) => {
      const config = await ctx.db.query("configs").withIndex("by_key", (q) => q.eq("key", key)).first();
      const shard_count = config?.num_shards ?? componentArg(ctx, "default_shard_count");
      const shard = Math.floor(Math.random() * shard_count);
      const counter = await ctx.db
          .query("counters")
          .withIndex("by_key_and_shard", (q) => q.eq("key", key).eq("shard", shard))
          .first();
      if (counter !== null) {
        ctx.db.patch(counter._id, { value: counter.value + 1})
      } else {
        ctx.db.insert("counters", { key, shard, value: 1 })
      }
    },  
});
