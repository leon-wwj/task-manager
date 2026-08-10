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

    token:''

  }),
getters:{

  isLogin(state){

    return !!state.token

  }

},

  actions:{


    login(userInfo){


      this.username=userInfo.username

      this.token=MOCK_TOKEN


      setItem(USER_KEY,{

        username:this.username,

        token:this.token

      })


    },


    logout(){


      this.username=''

      this.token=''


      removeItem(USER_KEY)


    },


    restoreUser(){


      const user=getItem(USER_KEY)


      if(user){

        this.username=user.username

        this.token=user.token

      }


    }


  }


})