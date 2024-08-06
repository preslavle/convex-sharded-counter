import { v } from "convex/values";
import { action, app, mutation, query } from "./_generated/server";
import { api } from "./_generated/api";

export const get = query({
  args: { key: v.string() },
  handler: async (ctx, { key }) => {
    return await ctx.runQuery(app.sharded_counter.counter.get, { key });
  },
});

export const increment = mutation({
    args: { key: v.string() },
    handler: async (ctx, { key }) => {
      await ctx.runMutation(app.sharded_counter.counter.increment, { key });
    },  
});

export const incrementLoop = action({
  args: { key: v.string(), duration_secs: v.number() },
  returns: v.object({successes: v.number(), failures: v.number()}),
  handler: async (ctx, { key, duration_secs }) => {
    const start = new Date();
    let successes = 0;
    let failures = 0;
    while (new Date().valueOf() - start.valueOf() < duration_secs * 1000) {
      try {
        await ctx.runMutation(app.sharded_counter.counter.increment, { key });
        successes += 1;
      } catch(e) {
        failures += 1;
      }
    }
    return {
      successes,
      failures
    };
  },
});

export const startIncrementLoops = action({
  args: { key: v.string(), duration_secs: v.number(), concurrency: v.number() },
  returns: v.object({successes: v.number(), failures: v.array(v.number())}),
  handler: async (ctx, { key, duration_secs, concurrency }) => {
    const actions = [];
    for (let i = 0; i < concurrency; i++) {
      actions.push(ctx.runAction(api.counter.incrementLoop, { key, duration_secs } ));
    }
    const results : Array<{
      successes: number;
      failures: number;
    }> = await Promise.all(actions);
    let successes = 0;
    const failures = [];
    for (const result of results) {
      successes += result.successes;
      failures.push(result.failures);
    }
    return {
      successes, failures
    }
  },
});
