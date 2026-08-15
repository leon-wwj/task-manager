<template>

  <aside class="sidebar">

    <nav>

      <router-link to="/">
        首页
      </router-link>


      <router-link to="/todo">
        Todo任务
      </router-link>
      <button @click="handleLogout">
        退出登录
      </button>

    </nav>

  </aside>

</template>


<script setup>

import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'


const router = useRouter()

const userStore = useUserStore()



function handleLogout(){

  userStore.logout()

  router.push('/login')

}

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


button {

  margin-top: 8px;

  padding: 10px 14px;

  border: none;

  background: none;

  color: #999;

  font-size: 14px;

  text-align: left;

  border-radius: 8px;

  cursor: pointer;

  transition: background 0.15s, color 0.15s;

}


button:hover {

  background: #f2f2f4;

  color: #d33;

}

</style>