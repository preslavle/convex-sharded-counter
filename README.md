# Sharded Counter Component
A demo of building a sharded counter component on top of Convex. The component gives a simple counter API, which is implemented by sharding underneath. The sharding helps increase throughput by avoiding OCC errors.

To try it out
```
npm install
npx convex dev
npm run dev
```
