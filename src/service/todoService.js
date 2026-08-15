import {
  getTodoList,
  createTodo,
  deleteTodo,
  updateTodo
} from '@/api/todo'
import { getItem, setItem } from '@/utils/storage'
import { TODO_KEY } from '@/constants'

// 是否使用本地存储模式（部署到静态托管、没有后端时自动启用）
const useLocalStorage = import.meta.env.VITE_USE_LOCAL_STORAGE === 'true'

function readLocalTodos() {
  return getItem(TODO_KEY) || []
}

function writeLocalTodos(todos) {
  setItem(TODO_KEY, todos)
}

export async function fetchTodos() {
  if (useLocalStorage) {
    return readLocalTodos()
  }

  const res = await getTodoList()
  return res.data
}

export async function addTodo(data) {
  if (useLocalStorage) {
    const todos = readLocalTodos()
    todos.push(data)
    writeLocalTodos(todos)
    return data
  }

  const res = await createTodo(data)
  return res.data
}

export async function removeTodo(id) {
  if (useLocalStorage) {
    writeLocalTodos(readLocalTodos().filter(todo => todo.id !== id))
    return id
  }

  await deleteTodo(id)
  return id
}

export async function editTodo(data) {
  if (useLocalStorage) {
    const todos = readLocalTodos().map(todo =>
      todo.id === data.id ? { ...todo, ...data } : todo
    )
    writeLocalTodos(todos)
    return data
  }

  const res = await updateTodo(data)
  return res.data
}
