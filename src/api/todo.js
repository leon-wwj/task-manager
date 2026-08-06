import { getTasks, saveTasks } from '@/utils/todoStorage'
import request from '@/utils/request'


export function getTodoList(){

  return new Promise(resolve=>{

    setTimeout(()=>{

      resolve({
        data:getTasks()
      })

    },500)

  })

}


export function saveTodos(tasks){

  saveTasks(tasks)

}
export function createTodo(task){

  return new Promise(resolve=>{

    setTimeout(()=>{

      saveTasks([
        ...getTasks(),
        task
      ])

      resolve(task)

    },500)

  })

}
export function deleteTodo(id){

  return new Promise(resolve=>{

    setTimeout(()=>{

      const tasks = getTasks()

      const newTasks = tasks.filter(
        task => task.id !== id
      )

      saveTasks(newTasks)

      resolve(id)

    },500)

  })

}
export function updateTodo(task){

  return new Promise(resolve=>{

    setTimeout(()=>{

      const tasks = getTasks()


      const newTasks = tasks.map(item =>

        item.id === task.id
        ? task
        : item

      )


      saveTasks(newTasks)


      resolve(task)


    },500)

  })

}