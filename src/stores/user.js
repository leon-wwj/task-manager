import { defineStore } from 'pinia'
import { setItem,getItem,removeItem } from '../utils/storage'


export const useUserStore = defineStore('user',{


  state:()=>({

    username:'',

    token:''

  }),


  actions:{


    login(userInfo){


      this.username=userInfo.username

      this.token='mock-token'


      setItem('user',{

        username:this.username,

        token:this.token

      })


    },


    logout(){


      this.username=''

      this.token=''


      removeItem('user')


    },


    restoreUser(){


      const user=getItem('user')


      if(user){

        this.username=user.username

        this.token=user.token

      }


    }


  }


})