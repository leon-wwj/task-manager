import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTodoStore } from '@/stores/todo'
import { TODO_FILTER } from '@/constants'

describe('todo store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
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

  it('toggleTask 切换任务完成状态', () => {
    const store = useTodoStore()
    store.tasks = [{ id: 1, title: 'a', completed: false }]
    store.toggleTask(1)
    expect(store.tasks[0].completed).toBe(true)
    store.toggleTask(1)
    expect(store.tasks[0].completed).toBe(false)
  })
})
