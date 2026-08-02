<template>

 <div class="layout">


  <AppHeader />


  <div class="body">

    <AppSidebar />


    <main>

      <router-view />

    </main>

  </div>


</div>
</template>


<script setup>

import AppHeader from '../components/AppHeader.vue'
import AppSidebar from '../components/AppSidebar.vue'

</script>

<style scoped>

.body{

  display:flex;

}


main{

  flex:1;

  padding:20px;

}

</style>