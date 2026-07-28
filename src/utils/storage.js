import { defaultTasks } from '@/mock/tasks'
import { TODO_KEY } from '@/constants'

export function getTasks(){

 const tasks = localStorage.getItem(TODO_KEY)

 return tasks
 ? JSON.parse(tasks)
 : defaultTasks

}


export function saveTasks(tasks){

 localStorage.setItem(
  TODO_KEY,
  JSON.stringify(tasks)
)

}