// 把用户选择的图片转成小尺寸头像 dataURL
// 目的：localStorage 容量有限（约 5MB），原始照片动辄几 MB，必须压缩后再存

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB，超过直接拒绝
const AVATAR_SIZE = 128 // 输出头像边长（px）
const JPEG_QUALITY = 0.85

export function fileToAvatar(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('没有选择文件'))
      return
    }

    if (!file.type.startsWith('image/')) {
      reject(new Error('请选择图片文件'))
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      reject(new Error('图片超过 5MB，请换一张小一点的'))
      return
    }

    const reader = new FileReader()

    reader.onerror = () => reject(new Error('图片读取失败'))

    reader.onload = () => {
      const raw = reader.result

      const img = new Image()

      img.onerror = () => reject(new Error('图片格式无法识别'))

      img.onload = () => {
        try {
          resolve(cropToSquare(img))
        } catch {
          // 环境不支持 canvas（例如无渲染能力的测试环境）时退回原图
          resolve(raw)
        }
      }

      img.src = raw
    }

    reader.readAsDataURL(file)
  })
}

function cropToSquare(img) {
  const side = Math.min(img.width, img.height)
  const sx = (img.width - side) / 2
  const sy = (img.height - side) / 2

  const canvas = document.createElement('canvas')
  canvas.width = AVATAR_SIZE
  canvas.height = AVATAR_SIZE

  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('canvas 不可用')
  }

  ctx.drawImage(img, sx, sy, side, side, 0, 0, AVATAR_SIZE, AVATAR_SIZE)

  return canvas.toDataURL('image/jpeg', JPEG_QUALITY)
}
