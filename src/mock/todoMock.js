import { getTasks, saveTasks } from '@/utils/todoStorage'


export function mockGetTodos(){

  return new Promise(resolve=>{

    setTimeout(()=>{

      resolve({
        data:getTasks()
      })

    },500)

  })

}



export function mockCreateTodo(task){

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



export function mockDeleteTodo(id){

  return new Promise(resolve=>{

    setTimeout(()=>{

      const tasks = getTasks()

      const newTasks = tasks.filter(
        task=>task.id!==id
      )

      saveTasks(newTasks)

      resolve(id)

    },500)

  })

}



export function mockUpdateTodo(task){

  return new Promise(resolve=>{

    setTimeout(()=>{

      const tasks=getTasks()


      const newTasks=tasks.map(item=>

        item.id===task.id
        ? task
        : item

      )


      saveTasks(newTasks)

      resolve(task)


    },500)

  })

}