import { defineStore } from 'pinia'
import {fetchTodos,createTodo,removeTodo,updateTodo} from '@/api/todoApi'


export const useTodoStore = defineStore('todo', {
 state: () => ({
  tasks: fetchTodos(),
  currentFilter: 'all',
  loading:false
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

async addTask(title){

  this.loading = true

  try{

    const newTask = {
      id: Date.now(),
      title:title,
      completed: false
    }

    const result = await createTodo(newTask)

    this.tasks.push(result)

  }catch(error){

    console.error(error)

  }finally{

    this.loading = false

  }

},
async deleteTask(id){

  this.loading = true

  try{

    const deletedId = await removeTodo(id)

    this.tasks = this.tasks.filter(
      task => task.id !== deletedId
    )

  }catch(error){

    console.error(error)

  }finally{

    this.loading = false

  }

},
clearCompletedTasks() {
  this.tasks = this.tasks.filter(task => !task.completed)
},
async updateTask(id, newTitle){

  const task = this.tasks.find(task => task.id === id)

  if (!task) return

  this.loading = true

  try{

    const updatedTask = {
      ...task,
      title: newTitle
    }

    const result = await updateTodo(updatedTask)

    task.title = result.title

  }catch(error){

    console.error(error)

  }finally{

    this.loading = false

  }

}
}}
)