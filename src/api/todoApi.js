import { getTasks, saveTasks } from '@/utils/storage'


export function fetchTodos(){

  return getTasks()

}


export function saveTodos(tasks){

  saveTasks(tasks)

}