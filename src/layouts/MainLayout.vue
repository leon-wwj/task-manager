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

.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.body {
  display: flex;
  flex: 1;
}

main {
  flex: 1;
  padding: 24px;
  background: #f5f5f7;
}

</style>
