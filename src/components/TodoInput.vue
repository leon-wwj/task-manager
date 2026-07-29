<template>
  <div>
    <input 
      v-model="taskTitle"
      placeholder="请输入任务"
    />

    <button @click="add" :disabled="todoStore.loading">
       {{ todoStore.loading ? '添加中...' : '添加' }}
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