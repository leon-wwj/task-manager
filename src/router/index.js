import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/TodoView.vue'

const routes = [

  {
    path:'/login',
    name:'Login',
    component:()=>import('../views/LoginView.vue')
  },

  {
    path:'/todo',
    name:'Todo',
    component:()=>import('../views/TodoView.vue')
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ],
})

export default router