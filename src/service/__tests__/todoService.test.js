import { describe, it, expect, beforeEach, vi } from 'vitest'
import { TODO_KEY } from '@/constants'

// todoService 在模块加载时就读取该环境变量，所以必须先 stub 再导入
vi.stubEnv('VITE_USE_LOCAL_STORAGE', 'true')

const { fetchTodos, addTodo, removeTodo, editTodo } = await import('@/service/todoService')

describe('todoService（localStorage 模式）', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('新增后可读回', async () => {
    await addTodo({ id: 1, title: 'a', completed: false })
    expect(await fetchTodos()).toEqual([{ id: 1, title: 'a', completed: false }])
  })

  it('更新任务会写回存储', async () => {
    await addTodo({ id: 1, title: 'a', completed: false })

    await editTodo({ id: 1, title: 'a', completed: true })

    const tasks = await fetchTodos()
    expect(tasks[0].completed).toBe(true)
  })

  it('删除任务后列表为空', async () => {
    await addTodo({ id: 1, title: 'a', completed: false })

    await removeTodo(1)

    expect(await fetchTodos()).toEqual([])
  })

  it('数据落在 localStorage 的 tasks 键下（刷新不丢）', async () => {
    await addTodo({ id: 2, title: 'b', completed: false })

    expect(JSON.parse(localStorage.getItem(TODO_KEY))).toHaveLength(1)
  })

  it('存储为空时返回空数组而不是 null', async () => {
    expect(await fetchTodos()).toEqual([])
  })
})
