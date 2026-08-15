<template>

  <div class="login">

    <h1>登录</h1>


    <input
      v-model="username"
      placeholder="请输入用户名"
    />


    <button @click="handleLogin">
      登录
    </button>


  </div>

</template>


<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'


const username = ref('')


const router = useRouter()


const userStore = useUserStore()



function handleLogin(){

 if(!username.value.trim()){

  return

 }


 userStore.login({

  username:username.value

 })


 router.push('/')

}

</script>

<style scoped>

.login {
  max-width: 360px;
  margin: 120px auto;
  padding: 32px;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.login h1 {
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
}

.login input {
  width: 100%;
  padding: 10px 14px;
  margin-bottom: 16px;
  border: 1px solid #d8d8dc;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.15s;
}

.login input:focus {
  border-color: #1d1d1f;
}

.login input::placeholder {
  color: #aaa;
}

.login button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background: #1d1d1f;
  color: #fff;
  font-size: 14px;
  transition: background 0.15s;
}

.login button:hover {
  background: #333;
}

</style>