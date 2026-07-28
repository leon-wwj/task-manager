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
  padding: 10px;
  border: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.task-item:hover {
  background-color: #f5f5f5;
}

.task-item input {
  padding: 6px 10px;
  border: 1px solid #999;
  border-radius: 5px;
  outline: none;
  font-size: 14px;
}

.task-item input:focus {
  border-color: #999;
}

.task-item button {
  padding: 5px 10px;
  border: 1px solid #aaa;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
}

.task-item button:hover {
  background-color: #eee;
}
</style >