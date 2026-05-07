import { useState } from 'react'

function Home() {
  const [count, setCount] = useState(0)

  return (
    <>
      <p className="text-3xl">Test</p>
      <button
        type="button"
        className="bg-green-300 rounded px-2 py-1 cursor-pointer"
        onClick={() => setCount(count => count + 1)}
      >
        Count is {count}
      </button>
    </>
  )
}

export default Home
