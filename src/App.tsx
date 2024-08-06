import './App.css'
import { api } from "../convex/_generated/api";
import { useMutation, useQuery } from 'convex/react';

function App() {
  const count = useQuery(api.counter.get, { key: "global" });
  const increment = useMutation(api.counter.increment);

  return (
    <>
      <h1>Sharded Counter</h1>
      <div className="card">
        <button onClick={() => increment({ key: "global" })}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
