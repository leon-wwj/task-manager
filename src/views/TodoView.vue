<template>
  <div>
    <h1>任务管理系统</h1>
    <p>已完成：{{ todoStore.completedCount }}</p>
    <TodoInput @addTask="handleAddTask"/>
    <TodoList :tasks="todoStore.filteredTasks"
      @toggle="todoStore.toggleTask"
      @delete="todoStore.deleteTask"
      @update="handleUpdate" />
 <div>
<button 
  :class="{ active: todoStore.currentFilter === 'all' }"
  @click="todoStore.changeFilter('all')"
>
  全部
</button>

<button 
  :class="{ active: todoStore.currentFilter === 'completed' }"
  @click="todoStore.changeFilter('completed')"
>
  已完成
</button>

<button 
  :class="{ active: todoStore.currentFilter === 'uncompleted' }"
  @click="todoStore.changeFilter('uncompleted')"
>
  未完成
</button>
<button @click="todoStore.clearCompletedTasks()">清除已完成任务</button>
  </div>
  </div>
</template>

<script setup>
import { useTodoStore } from '@/stores/todo.js'
import TodoInput from '@/components/TodoInput.vue'
import TodoList from '@/components/TodoList.vue'


const todoStore = useTodoStore()

function handleAddTask(title){

  todoStore.addTask(title)

}
function handleUpdate(id,newTitle){

  todoStore.updateTask(
    id,
    newTitle
  )

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
