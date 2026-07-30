import { defineStore } from 'pinia'
import {fetchTodos,createTodo,deleteTodo,updateTodo} from '@/api/todoApi'
import { handleError } from '@/utils/error'
import { TODO_FILTER } from '@/constants'

export const useTodoStore = defineStore('todo', {
 state: () => ({
  tasks: fetchTodos(),
  currentFilter: TODO_FILTER.ALL,
  loading:false
}), 

  getters: {
     completedCount(state) {
    return state.tasks.filter(task => task.completed).length
    },
   filteredTasks(state) {
  switch (state.currentFilter) {
    case TODO_FILTER.COMPLETED:
      return state.tasks.filter(task => task.completed)

    case TODO_FILTER.UNCOMPLETED:
      return state.tasks.filter(task => !task.completed)

    default:
      return state.tasks
  }
}
  },
  actions: {
    // 筛选
    changeFilter(filter) {
      this.currentFilter = filter
    },
    // 任务状态
     toggleTask(id) {
  const task = this.tasks.find(task => task.id === id)
  if (task) {
    task.completed = !task.completed
  }
},
// CRUD
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

   handleError(error)

  }finally{

    this.loading = false

  }

},
async deleteTask(id){

  this.loading = true

  try{

    const deletedId = await deleteTodo(id)

    this.tasks = this.tasks.filter(
      task => task.id !== deletedId
    )

  }catch(error){

    handleError(error)

  }finally{

    this.loading = false

  }

},
// 清理
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

   handleError(error)

  }finally{

    this.loading = false

  }

}
}}
)