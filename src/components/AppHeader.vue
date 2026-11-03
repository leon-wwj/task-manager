<template>

  <header>

    <span class="brand">后台管理系统</span>

    <UserMenu />

  </header>

</template>


<script setup>

import UserMenu from './UserMenu.vue'

</script>


<style scoped>

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 10px 24px;
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
}

.brand {
  font-size: 16px;
  font-weight: 600;
  color: #1d1d1f;
  letter-spacing: 0.5px;
}

</style>
