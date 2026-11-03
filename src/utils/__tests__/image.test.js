import { describe, it, expect } from 'vitest'
import { fileToAvatar } from '@/utils/image'

describe('fileToAvatar', () => {
  it('没有文件时拒绝', async () => {
    await expect(fileToAvatar(null)).rejects.toThrow('没有选择文件')
  })

  it('非图片类型拒绝', async () => {
    const file = new File(['hello'], 'a.txt', { type: 'text/plain' })
    await expect(fileToAvatar(file)).rejects.toThrow('请选择图片文件')
  })

  it('超过 5MB 拒绝', async () => {
    const big = new File([new Uint8Array(5 * 1024 * 1024 + 1)], 'big.png', {
      type: 'image/png',
    })
    await expect(fileToAvatar(big)).rejects.toThrow('图片超过 5MB')
  })
})
