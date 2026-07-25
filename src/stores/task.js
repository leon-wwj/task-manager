import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', {
 state: () => ({
  tasks: JSON.parse(localStorage.getItem('tasks')) || [
    {
      id: 1,
      title: '学习 Vue',
      completed: false
    },
    {
      id: 2,
      title: '完成项目',
      completed: true
    },
    {
      id: 3,
      title: '学习 Pinia',
      completed: false
    }
  ],
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