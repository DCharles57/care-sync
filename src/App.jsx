import { useEffect, useState } from 'react'

function App() {
  const [taskName, setTaskName] = useState('')
  const [caregiver, setCaregiver] = useState('')
  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem('careSyncTasks')
  return savedTasks ? JSON.parse(savedTasks) : []
})
useEffect(() => {
  localStorage.setItem('careSyncTasks', JSON.stringify(tasks))
}, [tasks])
  function handleSubmit(event) {
    event.preventDefault()

    if (!taskName.trim() || !caregiver.trim()) return

    const newTask = {
      id: Date.now(),
      taskName,
      caregiver,
      completed: false,
    }

    setTasks([...tasks, newTask])
    setTaskName('')
    setCaregiver('')
  }

  function toggleComplete(id) {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    )

    setTasks(updatedTasks)
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
<label htmlFor="caregiver">Assign caregiver</label>

<input
  id="caregiver"
  type="text"
  value={caregiver}
  onChange={(event) => setCaregiver(event.target.value)}
  placeholder="Example: C1 or Mom"
/>
        <button type="submit">Add task</button>
      </form>
      <section>
  <h2>Care Tasks</h2>

  <ul>
   {tasks.map((task) => (
  <li key={task.id}>
    <strong>
      {task.completed ? '✅ ' : ''}
      {task.taskName}
    </strong>

    <span> — Assigned to: {task.caregiver}</span>

    <button onClick={() => toggleComplete(task.id)}>
      {task.completed ? 'Mark incomplete' : 'Mark complete'}
    </button>
  </li>
))}
  </ul>
</section>
    </main>
  )

}
export default App