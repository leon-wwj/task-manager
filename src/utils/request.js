import axios from 'axios'
import { getItem } from '@/utils/storage'
import { USER_KEY } from '@/constants'

const request = axios.create({

  baseURL:'http://localhost:3000',

  timeout:5000

})

request.interceptors.request.use(

config=>{

 const user = getItem(USER_KEY)


 if(user?.token){

   config.headers.Authorization =
   `Bearer ${user.token}`

 }


 return config

},

error=>{

 return Promise.reject(error)

}

)

request.interceptors.response.use(

response=>{

  return response

},


error=>{

  return Promise.reject(error)

}

)

export default request