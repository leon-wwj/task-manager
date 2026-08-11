import {
 mockGetTodos,
 mockCreateTodo,
 mockDeleteTodo,
 mockUpdateTodo
} from '@/mock/todoMock'


import request from '@/utils/request'


export function getTodoList(){

  return request.get('/todos')

}
export function createTodo(task){

  return mockCreateTodo(task)

}



export function deleteTodo(id){

  return mockDeleteTodo(id)

}



export function updateTodo(task){

  return mockUpdateTodo(task)

}