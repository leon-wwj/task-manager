import {
  getTodoList as getTodosApi,
  createTodo as createTodoApi,
  deleteTodo as deleteTodoApi,
  updateTodo as updateTodoApi
} from '@/api/todo'



export async function fetchTodos(){

  const res = await getTodosApi()

  return res.data

}



export async function addTodo(data){

  const res = await createTodoApi(data)

  return res

}



export async function removeTodo(id){

  const res = await deleteTodoApi(id)

  return res

}



export async function editTodo(task){

  const res = await updateTodoApi(task)

  return res

}