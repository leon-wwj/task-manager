import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTodoStore } from '@/stores/todo'
import { TODO_FILTER } from '@/constants'
import { editTodo } from '@/service/todoService'

// 服务层隔离：单元测试只验证 store 自身的状态流转，不打真实请求
vi.mock('@/service/todoService', () => ({
  fetchTodos: vi.fn(),
  addTodo: vi.fn(),
  removeTodo: vi.fn(),
  editTodo: vi.fn(),
}))

describe('todo store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('completedCount 统计已完成任务数', () => {
    const store = useTodoStore()
    store.tasks = [
      { id: 1, title: 'a', completed: true },
      { id: 2, title: 'b', completed: false },
      { id: 3, title: 'c', completed: true },
    ]
    expect(store.completedCount).toBe(2)
  })

  it('filteredTasks 默认返回全部任务', () => {
    const store = useTodoStore()
    store.tasks = [
      { id: 1, title: 'a', completed: true },
      { id: 2, title: 'b', completed: false },
    ]
    expect(store.filteredTasks).toHaveLength(2)
  })

  it('filteredTasks 按 COMPLETED 筛选', () => {
    const store = useTodoStore()
    store.tasks = [
      { id: 1, title: 'a', completed: true },
      { id: 2, title: 'b', completed: false },
    ]
    store.currentFilter = TODO_FILTER.COMPLETED
    expect(store.filteredTasks).toEqual([store.tasks[0]])
  })

  it('filteredTasks 按 UNCOMPLETED 筛选', () => {
    const store = useTodoStore()
    store.tasks = [
      { id: 1, title: 'a', completed: true },
      { id: 2, title: 'b', completed: false },
    ]
    store.currentFilter = TODO_FILTER.UNCOMPLETED
    expect(store.filteredTasks).toEqual([store.tasks[1]])
  })

  it('changeFilter 切换筛选条件', () => {
    const store = useTodoStore()
    store.changeFilter(TODO_FILTER.COMPLETED)
    expect(store.currentFilter).toBe(TODO_FILTER.COMPLETED)
  })

  it('toggleTask 切换完成状态并同步到存储', async () => {
    const store = useTodoStore()
    store.tasks = [{ id: 1, title: 'a', completed: false }]
    editTodo.mockResolvedValue({ id: 1, title: 'a', completed: true })

    await store.toggleTask(1)

    expect(store.tasks[0].completed).toBe(true)
    expect(editTodo).toHaveBeenCalledWith({ id: 1, title: 'a', completed: true })
  })

  it('toggleTask 再点一次可切回未完成', async () => {
    const store = useTodoStore()
    store.tasks = [{ id: 1, title: 'a', completed: true }]
    editTodo.mockResolvedValue({ id: 1, title: 'a', completed: false })

    await store.toggleTask(1)

    expect(store.tasks[0].completed).toBe(false)
  })

  it('toggleTask 存储失败时回滚状态', async () => {
    const store = useTodoStore()
    store.tasks = [{ id: 1, title: 'a', completed: false }]
    editTodo.mockRejectedValue(new Error('upstream down'))
    const silence = vi.spyOn(console, 'error').mockImplementation(() => {})

    await store.toggleTask(1)

    expect(store.tasks[0].completed).toBe(false)
    silence.mockRestore()
  })

  it('toggleTask 遇到不存在的 id 不报错', async () => {
    const store = useTodoStore()
    store.tasks = []

    await store.toggleTask(999)

    expect(editTodo).not.toHaveBeenCalled()
  })
})
