<template>
  <div @click="!isEditing && emit('toggle',task.id)" class="task-item">
    <button @click.stop="emit('delete',task.id)">[删除]</button>
    <button @click.stop="startEdit">编辑</button>
    <input 
    v-if="isEditing"
    v-model="editText"/>
    <button @click.stop="saveEdit">保存</button>
    <span v-if="task.completed">✅</span>
    <span v-else>❌</span>
    {{ task.title }}
  </div>

</template>

<script setup>
import { ref } from 'vue'
 const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['toggle','delete','update']) 
const isEditing = ref(false)

const editText = ref('')

function startEdit(){

  isEditing.value = true

  editText.value = props.task.title

}
function saveEdit(){

  emit('update',props.task.id, editText.value)

  isEditing.value = false

}
</script>
<style scoped>
.task-item {
  padding: 12px 16px;
  border: 1px solid #e5e5e5;
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  transition: box-shadow 0.15s, border-color 0.15s;
}

.task-item:hover {
  border-color: #d0d0d4;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.task-item input {
  padding: 6px 10px;
  border: 1px solid #d8d8dc;
  border-radius: 6px;
  outline: none;
  font-size: 14px;
}

.task-item input:focus {
  border-color: #1d1d1f;
}

.task-item button {
  padding: 5px 12px;
  border: 1px solid #e5e5e5;
  border-radius: 6px;
  background: #fff;
  color: #666;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.task-item button:hover {
  background: #f5f5f7;
  border-color: #ccc;
  color: #1d1d1f;
}
</style >