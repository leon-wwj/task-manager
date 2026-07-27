<template>
  <div>
    <h1>任务管理系统</h1>
    <p>已完成：{{ taskStore.completedCount }}</p>
    <TodoInput @addTask="handleAddTask"/>
    <TodoList :tasks="taskStore.filteredTasks" />
 <div>
<button 
  :class="{ active: taskStore.currentFilter === 'all' }"
  @click="taskStore.changeFilter('all')"
>
  全部
</button>

<button 
  :class="{ active: taskStore.currentFilter === 'completed' }"
  @click="taskStore.changeFilter('completed')"
>
  已完成
</button>

<button 
  :class="{ active: taskStore.currentFilter === 'uncompleted' }"
  @click="taskStore.changeFilter('uncompleted')"
>
  未完成
</button>
<button @click="taskStore.clearCompletedTasks()">清除已完成任务</button>
  </div>
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/Task.js'
import TodoInput from '@/components/TodoInput.vue'
import TodoList from '@/components/TodoList.vue'


const taskStore = useTaskStore()

function handleAddTask(title){

  taskStore.addTask(title)

}

 </script>

<style scoped>

h1 {
  text-align: center;
  margin-bottom: 20px;
}

button {
  padding: 5px 12px;
  border: 1px solid #d0d0d0;
  border-radius: 6px;
  background-color: #fafafa;
  color: #333;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  margin-right: 10px;
}

button:hover {
  background-color: #f0f0f0;
  border-color: #aaa;
}

</style>
