import { useState } from "react"

function App() {

  const [input, setInput] = useState(null)

  const handleInput = (e) => {
    console.log(e.target.value)
    setInput(e.target.value)
  }

  return (
    <div>
      find countries <input onChange={handleInput}/>
    </div>
  )
}

export default App
