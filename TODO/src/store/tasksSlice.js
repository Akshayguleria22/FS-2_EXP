import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  draftTitle: '',
  tasks: [],
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTaskDraft: (state, action) => {
      state.draftTitle = action.payload
    },
    addTask: (state) => {
      const title = state.draftTitle.trim()

      if (!title) {
        return
      }

      state.tasks.unshift({
        id: crypto.randomUUID(),
        title,
        status: 'pending',
        createdAt: new Date().toISOString(),
      })

      state.draftTitle = ''
    },
    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload
      const task = state.tasks.find((item) => item.id === id)

      if (!task) {
        return
      }

      task.status = status
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
    },
  },
})

export const { setTaskDraft, addTask, updateTaskStatus, deleteTask } = tasksSlice.actions
export default tasksSlice.reducer
