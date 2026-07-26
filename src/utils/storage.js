const TASK_KEY = 'tasks'


export function getTasks(){

 const tasks = localStorage.getItem(TASK_KEY)

 return tasks
 ? JSON.parse(tasks)
 : [
    {
      id:1,
      title:'学习 Vue',
      completed:false
    },
    {
      id:2,
      title:'完成项目',
      completed:true
    },
    {
      id:3,
      title:'学习 Pinia',
      completed:false
    }
 ]

}


export function saveTasks(tasks){

 localStorage.setItem(
  TASK_KEY,
  JSON.stringify(tasks)
 )

}