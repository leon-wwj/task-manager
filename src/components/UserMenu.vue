<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const AVATARS = ['🧑‍💻', '🎯', '🌱', '⭐', '🚀', '☕']

const router = useRouter()
const userStore = useUserStore()

const open = ref(false)
const editingName = ref(false)
const draftName = ref('')
const rootEl = ref(null)
const nameInput = ref(null)

// 没选过头像时，用用户名首字母兜底
const avatarText = computed(() => {
  if (userStore.avatar) return userStore.avatar
  return userStore.username ? userStore.username.charAt(0).toUpperCase() : '👤'
})

function toggle() {
  open.value = !open.value
  if (!open.value) cancelEditName()
}

function startEditName() {
  draftName.value = userStore.username
  editingName.value = true
  nextTick(() => nameInput.value?.focus())
}

function cancelEditName() {
  editingName.value = false
  draftName.value = ''
}

function saveName() {
  if (!userStore.updateUsername(draftName.value)) return
  cancelEditName()
}

function pickAvatar(emoji) {
  userStore.setAvatar(emoji)
}

function handleLogout() {
  userStore.logout()
  open.value = false
  router.push('/login')
}

// 点空白处关闭
function onDocumentClick(event) {
  if (open.value && rootEl.value && !rootEl.value.contains(event.target)) {
    open.value = false
    cancelEditName()
  }
}

// Esc 关闭
function onKeydown(event) {
  if (event.key === 'Escape') {
    open.value = false
    cancelEditName()
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div ref="rootEl" class="user-menu">
    <button
      type="button"
      class="trigger"
      :aria-expanded="open"
      @click.stop="toggle"
    >
      <span class="avatar">{{ avatarText }}</span>
      <span class="name">{{ userStore.username }}</span>
      <span class="caret">▾</span>
    </button>

    <div v-if="open" class="panel" @click.stop>
      <form v-if="editingName" class="edit-name" @submit.prevent="saveName">
        <input
          ref="nameInput"
          v-model="draftName"
          type="text"
          maxlength="12"
          placeholder="新用户名"
        />
        <div class="edit-actions">
          <button type="submit" class="primary">保存</button>
          <button type="button" @click="cancelEditName">取消</button>
        </div>
      </form>

      <button v-else type="button" class="item" @click="startEditName">
        修改用户名
      </button>

      <div class="avatar-picker">
        <div class="label">头像</div>
        <div class="avatars">
          <button
            v-for="emoji in AVATARS"
            :key="emoji"
            type="button"
            class="avatar-option"
            :class="{ active: userStore.avatar === emoji }"
            :aria-label="`选择头像 ${emoji}`"
            @click="pickAvatar(emoji)"
          >
            {{ emoji }}
          </button>
        </div>
      </div>

      <div class="divider"></div>

      <button type="button" class="item danger" @click="handleLogout">
        退出登录
      </button>
    </div>
  </div>
</template>

<style scoped>
.user-menu {
  position: relative;
}

.trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 10px 4px 4px;
  border: 1px solid transparent;
  border-radius: 999px;
  background: transparent;
  color: #1d1d1f;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}

.trigger:hover {
  background: #f5f5f7;
  border-color: #e5e5e5;
}

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #1d1d1f;
  color: #fff;
  font-size: 14px;
  line-height: 1;
}

.name {
  font-size: 14px;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.caret {
  font-size: 10px;
  color: #999;
}

.panel {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  z-index: 20;
  width: 220px;
  padding: 8px;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.item {
  width: 100%;
  padding: 9px 10px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #333;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s;
}

.item:hover {
  background: #f5f5f7;
}

.item.danger {
  color: #d33;
}

.item.danger:hover {
  background: #fdf0f0;
}

.edit-name input {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #d8d8dc;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
}

.edit-name input:focus {
  border-color: #1d1d1f;
}

.edit-actions {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}

.edit-actions button {
  flex: 1;
  padding: 7px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  background: #fff;
  font-size: 13px;
  cursor: pointer;
}

.edit-actions button.primary {
  background: #1d1d1f;
  border-color: #1d1d1f;
  color: #fff;
}

.avatar-picker {
  padding: 10px;
}

.label {
  margin-bottom: 8px;
  color: #999;
  font-size: 12px;
}

.avatars {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.avatar-option {
  width: 32px;
  height: 32px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  background: #fff;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
}

.avatar-option:hover {
  background: #f5f5f7;
}

.avatar-option.active {
  border-color: #1d1d1f;
  background: #f2f2f4;
}

.divider {
  height: 1px;
  margin: 6px 4px;
  background: #eee;
}
</style>
