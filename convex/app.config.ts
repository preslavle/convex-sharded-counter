import { defineApp } from "convex/server";
import shardedCounter from "../sharded_counter/component.config";

const app = defineApp();

app.install(shardedCounter, { args: { default_shard_count: 10 } });

export default app;