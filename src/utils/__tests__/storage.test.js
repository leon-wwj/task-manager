import { describe, it, expect, beforeEach } from 'vitest'
import { setItem, getItem, removeItem } from '@/utils/storage'

describe('storage 工具', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('setItem 后 getItem 能取回相同数据', () => {
    const data = { name: 'leo', token: 'mock-token' }
    setItem('test-key', data)
    expect(getItem('test-key')).toEqual(data)
  })

  it('getItem 读取不存在的 key 返回 null', () => {
    expect(getItem('not-exist')).toBeNull()
  })

  it('removeItem 删除后 getItem 返回 null', () => {
    setItem('test-key', { a: 1 })
    removeItem('test-key')
    expect(getItem('test-key')).toBeNull()
  })
})
