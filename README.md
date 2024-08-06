# Sharded Counter Component
A demo of building a sharded counter component on top of Convex. The component is implemented in /sharded_counter. The component gives a simple counter API, which is implemented by sharding underneath. The sharding helps increase throughput by avoiding OCC errors. You can configure the default number of shards or overwrite the number of shards for a given key.

To try it out
```
npm install
npx convex dev
npm run dev
```

The go to Convex dashboard and run `startIncrementLoops` at various concurrency and notice the overall throughput and conflict rate.
