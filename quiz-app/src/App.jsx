import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Quiz Challenge</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count * (10 * 2))}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
          Questions about computing
      </p>
    </>
  )
}

export default App
