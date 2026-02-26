import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addTask,
  deleteTask,
  setTaskDraft,
  updateTaskStatus,
} from './store/tasksSlice'
import './App.css'

function App() {
  const dispatch = useDispatch()
  const tasks = useSelector((state) => state.tasks.tasks)
  const newTaskTitle = useSelector((state) => state.tasks.draftTitle)

  const stats = useMemo(() => {
    const pending = tasks.filter((task) => task.status === 'pending').length
    const inProgress = tasks.filter((task) => task.status === 'in-progress').length
    const completed = tasks.filter((task) => task.status === 'completed').length

    return {
      total: tasks.length,
      pending,
      inProgress,
      completed,
    }
  }, [tasks])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!newTaskTitle.trim()) {
      return
    }

    dispatch(addTask())
  }

  const statusLabelMap = {
    pending: 'Pending',
    'in-progress': 'In Progress',
    completed: 'Completed',
  }

  return (
    <main className="todo-app">
      <header className="todo-header">
        <h1>Task Manager</h1>
        <p>Plan work clearly, track status, and keep your day focused.</p>
      </header>

      <section className="stats-grid" aria-label="Task statistics">
        <article className="stat-card">
          <span>Total</span>
          <strong>{stats.total}</strong>
        </article>
        <article className="stat-card">
          <span>Pending</span>
          <strong>{stats.pending}</strong>
        </article>
        <article className="stat-card">
          <span>In Progress</span>
          <strong>{stats.inProgress}</strong>
        </article>
        <article className="stat-card">
          <span>Completed</span>
          <strong>{stats.completed}</strong>
        </article>
      </section>

      <section className="panel">
        <h2>Add New Task</h2>
        <form className="task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(event) => dispatch(setTaskDraft(event.target.value))}
            placeholder="Enter task title"
            aria-label="Task title"
          />
          <button type="submit">Add Task</button>
        </form>
      </section>

      <section className="panel">
        <div className="panel-title-row">
          <h2>Tasks</h2>
          <span className="tasks-count">{tasks.length} items</span>
        </div>

        {tasks.length === 0 ? (
          <p className="empty-state">No tasks yet. Add your first task to get started.</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className="task-item">
                <div className="task-main">
                  <p className="task-title">{task.title}</p>
                  <p className="task-meta">
                    Created {new Date(task.createdAt).toLocaleDateString()} · {statusLabelMap[task.status]}
                  </p>
                </div>

                <div className="task-actions">
                  <select
                    value={task.status}
                    onChange={(event) =>
                      dispatch(
                        updateTaskStatus({
                          id: task.id,
                          status: event.target.value,
                        }),
                      )
                    }
                    aria-label={`Change status for ${task.title}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <button
                    type="button"
                    className="danger"
                    onClick={() => dispatch(deleteTask(task.id))}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}

export default App
