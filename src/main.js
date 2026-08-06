import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { useTodoStore } from './stores/todo'
import { saveTodos } from '@/api/todo'

import App from './App.vue'
import router from './router'
import {useUserStore} from './stores/user'

const app = createApp(App)

app.use(createPinia())
const userStore = useUserStore()
userStore.restoreUser()
app.use(router)

const todoStore = useTodoStore()

todoStore.$subscribe((_,state)=>{

  saveTodos(state.tasks)

})
app.mount('#app')
