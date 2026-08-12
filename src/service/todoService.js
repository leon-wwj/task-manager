import {
  getTodoList,
  createTodo,
  deleteTodo,
  updateTodo
} from '@/api/todo'


export async function fetchTodos() {

  const res = await getTodoList()

  return res.data

}


export async function addTodo(data) {

  const res = await createTodo(data)

  return res.data

}


export async function removeTodo(id) {

  await deleteTodo(id)

  return id

}


export async function editTodo(data) {

  const res = await updateTodo(data)

  return res.data

}