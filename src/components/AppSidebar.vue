<template>

  <aside class="sidebar">

    <nav>

      <router-link to="/">
        首页
      </router-link>


      <router-link to="/todo">
        Todo任务
      </router-link>

    </nav>

  </aside>

</template>


<script setup>

</script>


<style scoped>

.sidebar {

  width: 200px;

  padding: 20px 12px;

  background: #fff;

  border-right: 1px solid #e5e5e5;

}


nav {

  display: flex;

  flex-direction: column;

  gap: 4px;

}


a {

  padding: 10px 14px;

  color: #555;

  text-decoration: none;

  border-radius: 8px;

  font-size: 14px;

  transition: background 0.15s, color 0.15s;

}


a:hover {

  background: #f2f2f4;

  color: #1d1d1f;

}


.router-link-active {

  background: #1d1d1f;

  color: #fff;

  font-weight: 500;

}


.router-link-active:hover {

  background: #1d1d1f;

  color: #fff;

}

</style>
