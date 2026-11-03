import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/stores/user'
import { USER_KEY, MOCK_TOKEN } from '@/constants'

describe('user store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it('登录后写入 token 并持久化用户名', () => {
    const store = useUserStore()
    store.login({ username: 'leo' })

    expect(store.isLogin).toBe(true)
    expect(JSON.parse(localStorage.getItem(USER_KEY)).username).toBe('leo')
  })

  it('updateUsername 更新并持久化（自动去空格）', () => {
    const store = useUserStore()
    store.login({ username: 'leo' })

    expect(store.updateUsername('  neo  ')).toBe(true)
    expect(store.username).toBe('neo')
    expect(JSON.parse(localStorage.getItem(USER_KEY)).username).toBe('neo')
  })

  it('updateUsername 空名拒绝，保持原值', () => {
    const store = useUserStore()
    store.login({ username: 'leo' })

    expect(store.updateUsername('   ')).toBe(false)
    expect(store.username).toBe('leo')
  })

  it('setAvatar 持久化头像', () => {
    const store = useUserStore()
    store.login({ username: 'leo' })
    store.setAvatar('🎯')

    expect(store.avatar).toBe('🎯')
    expect(JSON.parse(localStorage.getItem(USER_KEY)).avatar).toBe('🎯')
  })

  it('restoreUser 恢复用户名、token 与头像', () => {
    localStorage.setItem(
      USER_KEY,
      JSON.stringify({ username: 'neo', token: MOCK_TOKEN, avatar: '🌱' }),
    )

    const store = useUserStore()
    store.restoreUser()

    expect(store.username).toBe('neo')
    expect(store.isLogin).toBe(true)
    expect(store.avatar).toBe('🌱')
  })

  it('旧数据没有头像字段时恢复为空字符串', () => {
    localStorage.setItem(
      USER_KEY,
      JSON.stringify({ username: 'neo', token: MOCK_TOKEN }),
    )

    const store = useUserStore()
    store.restoreUser()

    expect(store.avatar).toBe('')
  })

  it('logout 清空状态与本地存储', () => {
    const store = useUserStore()
    store.login({ username: 'leo' })
    store.setAvatar('🚀')

    store.logout()

    expect(store.isLogin).toBe(false)
    expect(store.username).toBe('')
    expect(store.avatar).toBe('')
    expect(localStorage.getItem(USER_KEY)).toBeNull()
  })
})
