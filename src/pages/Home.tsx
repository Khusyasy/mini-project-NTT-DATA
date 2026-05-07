import { useCountStore } from '../stores/count'

function Home() {
  const count = useCountStore((state) => state.count)
  const increment = useCountStore((state) => state.increment)
  const decrement = useCountStore((state) => state.decrement)
  const reset = useCountStore((state) => state.reset)


  return (
    <>
      <p className="text-3xl">Test</p>
      <p>Count is: {count}</p>
      <button
        type="button"
        className="bg-red-300 rounded px-2 py-1 cursor-pointer"
        onClick={decrement}
      >
        -
      </button>
      <button
        type="button"
        className="bg-green-300 rounded px-2 py-1 cursor-pointer"
        onClick={increment}
      >
        +
      </button>
      <button
        type="button"
        className="bg-blue-300 rounded px-2 py-1 cursor-pointer"
        onClick={reset}
      >
        Reset
      </button>
    </>
  )
}

export default Home
