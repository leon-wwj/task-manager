<template>
  <div>
    <h1>任务管理系统</h1>
    <p>已完成：{{ taskStore.completedCount }}</p>
    <input v-model="newTask" placeholder="[请输入任务内容]"@keydown.enter="addTask"/>
    <div><button @click="addTask">[添加]</button></div>
    <TaskItem v-for="task in taskStore.filteredTasks" 
    :key="task.id" 
    :title="task.title"
    :completed="task.completed" 
  @toggle="taskStore.toggleTask(task.id)"
  @delete="taskStore.deleteTask(task.id)"
  @update="taskStore.updateTask(task.id, $event)"/>
 </div>
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
</template>

<script setup>
import TaskItem from '@/components/TaskItem.vue'
import { ref,watch } from 'vue'
import { useTaskStore } from '@/stores/task.js'

const taskStore = useTaskStore()
const newTask = ref('')

function addTask() {
  if (!newTask.value.trim()) return

  taskStore.addTask(newTask.value)

  newTask.value = ''
}
watch(
  () => taskStore.tasks,
  (newValue) => {
    localStorage.setItem('tasks', JSON.stringify(newValue))
  },
  { deep: true }
)
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
