import { defineComponent } from "convex/server";
import { v } from "convex/values";

export default defineComponent("shardedCounter", {
  args: { default_shard_count: v.number() },
});
