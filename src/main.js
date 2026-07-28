import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { useTodoStore } from './stores/todo'
import { saveTodos } from '@/api/todoApi'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const todoStore = useTodoStore()

todoStore.$subscribe((_,state)=>{

  saveTodos(state.tasks)

})
app.mount('#app')
