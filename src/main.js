import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { useTaskStore } from './stores/task'
import { saveTasks } from './utils/storage'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const taskStore = useTaskStore()

taskStore.$subscribe((_,state)=>{

  saveTasks(state.tasks)

})
app.mount('#app')
