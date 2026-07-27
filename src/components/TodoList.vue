<template>

  <div>

    <TodoItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"
    />

  </div>

</template>


<script setup>

import TodoItem from './TodoItem.vue'


defineProps({

  tasks: {
    type: Array,
    required: true
  }

})

</script>