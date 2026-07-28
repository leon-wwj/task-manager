import { defineStore } from 'pinia'
import { fetchTodos } from '@/api/todoApi'

export const useTodoStore = defineStore('todo', {
 state: () => ({
  tasks: fetchTodos(),
  currentFilter: 'all'
}), 

  getters: {
     completedCount(state) {
    return state.tasks.filter(task => task.completed).length
    },
   filteredTasks(state) {
  switch (state.currentFilter) {
    case 'completed':
      return state.tasks.filter(task => task.completed)

    case 'uncompleted':
      return state.tasks.filter(task => !task.completed)

    default:
      return state.tasks
  }
}
  },
  actions: {
        changeFilter(filterType) {
      this.currentFilter = filterType
    },
     toggleTask(id) {
  const task = this.tasks.find(task => task.id === id)
  if (task) {
    task.completed = !task.completed
  }
},

 addTask (title) {
    this.tasks.push({
      id: Date.now(),
      title: title,
      completed: false
    })
 
},

 deleteTask (id) {
  this.tasks = this.tasks.filter(task => task.id !== id)
},
clearCompletedTasks() {
  this.tasks = this.tasks.filter(task => !task.completed)
},
updateTask(id, newTitle) {
  const task = this.tasks.find(task => task.id === id)
  if (task) {
    task.title = newTitle
  }
}}
})