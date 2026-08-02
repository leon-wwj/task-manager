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

.sidebar{

  width:120px;

  min-height:calc(100vh - 60px);

  padding:16px 10px;

  background:#fafafa;

  border-right:1px solid #eee;

}


nav{

  display:flex;

  flex-direction:column;

  gap:8px;

}


a{

  padding:8px 10px;

  color:#555;

  text-decoration:none;

  border-radius:6px;

  font-size:14px;

}


a:hover{

  background:#f0f0f0;

}


.router-link-active{

  background:#eaeaea;

  color:#222;

  font-weight:600;

}


</style>