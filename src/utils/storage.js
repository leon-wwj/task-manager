import { defaultTasks } from '@/mock/tasks'

const TASK_KEY = 'tasks'
export function getTasks(){

 const tasks = localStorage.getItem(TASK_KEY)

 return tasks
 ? JSON.parse(tasks)
 : defaultTasks

}


export function saveTasks(tasks){

 localStorage.setItem(
  TASK_KEY,
  JSON.stringify(tasks)
 )

}