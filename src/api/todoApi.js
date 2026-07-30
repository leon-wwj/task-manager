import { getTasks, saveTasks } from '@/utils/storage'


export function fetchTodos(){

  return getTasks()

}


export function saveTodos(tasks){

  saveTasks(tasks)

}export function createTodo(task){

  return new Promise(resolve => {

    setTimeout(()=>{

      resolve(task)

    },500)

  })

}
export function deleteTodo(id){

  return new Promise(resolve => {
    setTimeout(()=>{
      resolve(id)
    }, 500)
  })
}
export function updateTodo(task){

  return new Promise(resolve => {

    setTimeout(() => {

      resolve(task)

    },500)

  })

}