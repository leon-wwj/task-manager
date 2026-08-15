<template>
  <div>
    <h1>任务管理系统</h1>
    <p>已完成：{{ todoStore.completedCount }}</p>
    <TodoInput @addTask="handleAddTask"/>
    <TodoList :tasks="todoStore.filteredTasks"
      @toggle="todoStore.toggleTask"
      @delete="todoStore.deleteTask"
      @update="handleUpdate" />
    <TodoFilter />
  </div>
</template>

<script setup>
import { useTodoStore } from '@/stores/todo.js'
import TodoInput from '@/components/TodoInput.vue'
import TodoList from '@/components/TodoList.vue'
import TodoFilter from '@/components/TodoFilter.vue'
import { onMounted } from 'vue'


const todoStore = useTodoStore()
onMounted(()=>{

  todoStore.loadTasks()

})

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

div {
  max-width: 720px;
  margin: 0 auto;
  padding: 8px 0;
}

h1 {
  text-align: center;
  margin-bottom: 6px;
  font-size: 24px;
  font-weight: 600;
}

p {
  text-align: center;
  color: #999;
  font-size: 13px;
  margin-bottom: 24px;
}

</style>
