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