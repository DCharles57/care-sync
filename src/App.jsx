import { useState } from 'react'

function App() {
  const [taskName, setTaskName] = useState('')
const [tasks, setTasks] = useState([])
  function handleSubmit(event) {
  event.preventDefault()

  if (!taskName.trim()) return

  setTasks([...tasks, taskName])
  setTaskName('')
}

  return (
    <main>
      <h1>CareSync</h1>
      <p>Shared care coordination for families.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="taskName">Care task</label>

        <input
          id="taskName"
          type="text"
          value={taskName}
          onChange={(event) => setTaskName(event.target.value)}
          placeholder="Example: Pick up medication"
        />

        <button type="submit">Add task</button>
      </form>
      <section>
  <h2>Care Tasks</h2>

  <ul>
    {tasks.map((task, index) => (
      <li key={index}>{task}</li>
    ))}
  </ul>
</section>
    </main>
  )
}

export default App