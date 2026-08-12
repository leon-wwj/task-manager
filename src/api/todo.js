import request from '@/utils/request'

export function getTodoList() {

  return request.get('/todos')

}


export function createTodo(task) {

  return request.post('/todos', task)

}


export function deleteTodo(id) {

  return request.delete(`/todos/${id}`)

}


export function updateTodo(task) {

  return request.put(`/todos/${task.id}`, task)

}