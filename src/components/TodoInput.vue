<template>
  <div>
    <input 
      v-model="taskTitle"
      placeholder="请输入任务"
    />

    <button @click="add">
      添加
    </button>
  </div>
</template>


<script setup>
import { ref } from 'vue'


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