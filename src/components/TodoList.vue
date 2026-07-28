<template>

  <div>

    <TodoItem
      v-for="task in tasks"
      :key="task.id"
      :task="task"

      @toggle="handleToggle"
      @delete="handleDelete"
      @update="handleUpdate"

    />

  </div>

</template>


<script setup>

import TodoItem from './TodoItem.vue'


defineProps({

  tasks:{
    type:Array,
    required:true
  }

})


const emit = defineEmits([
  'toggle',
  'delete',
  'update'
])


function handleToggle(id){

  emit('toggle', id)

}


function handleDelete(id){

  emit('delete', id)

}


function handleUpdate(id,newTitle){

  emit(
    'update',
    id,
    newTitle
  )

}

</script>