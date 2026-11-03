import { defineStore } from 'pinia'
import { 
 setItem,
 getItem,
 removeItem
} from '@/utils/storage'

import {
 USER_KEY,
 MOCK_TOKEN
} from '@/constants'

export const useUserStore = defineStore('user',{


  state:()=>({

    username:'',

    avatar:'',

    token:''

  }),
getters:{

  isLogin(state){

    return !!state.token

  }

},

  actions:{


    // 统一的落盘入口：用户名 / 头像 / token 一起写，避免漏字段
    persist(){

      setItem(USER_KEY,{

        username:this.username,

        token:this.token,

        avatar:this.avatar

      })


    },


    login(userInfo){


      this.username=userInfo.username

      this.token=MOCK_TOKEN

      this.persist()


    },


    // 修改用户名（空名拒绝，保持原值）
    updateUsername(newName){

      const name=String(newName).trim()

      if(!name) return false

      this.username=name

      this.persist()

      return true

    },


    // 切换头像（emoji 字符串）
    setAvatar(emoji){

      this.avatar=emoji

      this.persist()

    },


    logout(){


      this.username=''

      this.token=''

      this.avatar=''


      removeItem(USER_KEY)


    },


    restoreUser(){


      const user=getItem(USER_KEY)


      if(user){

        this.username=user.username

        this.token=user.token

        this.avatar=user.avatar || ''

      }


    }


  }


})
