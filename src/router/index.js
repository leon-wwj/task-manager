import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'


const routes = [
{
  path:'/',
  component:()=>import('../layouts/MainLayout.vue'),

  children:[
      {
      path:'',
      name:'Home',
      component:()=>import('../views/HomeView.vue'),
      meta:{
        title:'首页'
      }
    },

    {
      path:'todo',
      name:'Todo',
      component:()=>import('../views/TodoView.vue'),
      meta:{
        title:'Todo任务'
      }
    }

  ]
},

  {
    path:'/login',
    name:'Login',
    component:()=>import('../views/LoginView.vue'),
     meta:{
   title:'登录'
 }
},

  {
  path:'/:pathMatch(.*)*',
  name:'NotFound',
  component:()=>import('../views/NotFoundView.vue')
}

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes 
})

router.beforeEach((to)=>{


  const userStore = useUserStore()


  if(
    to.path !== '/login'
    &&
    !userStore.token
  ){

    return '/login'

  }


})

export default router