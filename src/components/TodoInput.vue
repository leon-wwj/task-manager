<template>
  <div>
    <input 
      v-model="taskTitle"
      placeholder="请输入任务"
    />

    <button @click="add" :disabled="todoStore.loading">
       {{ todoStore.loading ? '处理中...' : '添加' }}
    </button>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todo.js'

const todoStore = useTodoStore()


const taskTitle = ref('')


const emit = defineEmits([
  'addTask'
])


function add(){

  if(!taskTitle.value.trim()){
    return
  }

  emit(
    'addTask',
    taskTitle.value
  )

  taskTitle.value = ''

}

</script>

<style scoped>

div {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #d8d8dc;
  border-radius: 8px;
  background: #fff;
  font-size: 14px;
  color: #1d1d1f;
  outline: none;
  transition: border-color 0.15s;
}

input:focus {
  border-color: #1d1d1f;
}

input::placeholder {
  color: #aaa;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: #1d1d1f;
  color: #fff;
  font-size: 14px;
  transition: background 0.15s, opacity 0.15s;
}

button:hover:not(:disabled) {
  background: #333;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

</style>