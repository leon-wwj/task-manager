<template>
 <div>
<button 
  :class="{ active: todoStore.currentFilter === TODO_FILTER.ALL }"
  @click="todoStore.changeFilter(TODO_FILTER.ALL)"
>
  全部
</button>

<button 
  :class="{ active: todoStore.currentFilter === TODO_FILTER.COMPLETED }"
  @click="todoStore.changeFilter(TODO_FILTER.COMPLETED)"
>
  已完成
</button>

<button 
  :class="{ active: todoStore.currentFilter === TODO_FILTER.UNCOMPLETED }"
  @click="todoStore.changeFilter(TODO_FILTER.UNCOMPLETED)"
>
  未完成
</button>
<button @click="todoStore.clearCompletedTasks()">清除已完成任务</button>
  </div>
</template>


<script setup>
import { TODO_FILTER } from '@/constants'

import { useTodoStore } from '@/stores/todo'

const todoStore = useTodoStore()

</script>
<style scoped>

button{
  padding:6px 14px;
  margin-right:8px;
  border:1px solid #ddd;
  background:#fff;
  border-radius:6px;
  cursor:pointer;
  transition:0.2s;
}


button:hover{

  border-color:#999;

}


button.active{

  background:#776c6c;
  color:#fff;
  border-color:#4c3b3b;

}

</style>