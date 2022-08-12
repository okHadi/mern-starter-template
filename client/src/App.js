import axios from "axios"
import React, { useState, useEffect } from "react"

function App() {
  const [name, setName] = useState("")
  const [home, setHome] = useState("")

  useEffect(() => {
    axios.get("http://localhost:8081/api/v1").then(function (response) {
      setHome(response.data)
    })
  }, [])

  async function postName(e) {
    e.preventDefault()
    try {
      await axios.post("http://localhost:8081/api/v1", {
        name
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="App">
      <form onSubmit={postName}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <button type="submit">Send Data</button>
      </form>
      {home}
    </div>
  )
}

export default App