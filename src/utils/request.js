import axios from 'axios'
import { getItem } from '@/utils/storage'
import { USER_KEY } from '@/constants'

// 环境变量指定后端地址；本地默认 json-server，线上（Vercel）不设置则留空触发降级
const request = axios.create({

  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',

  timeout: 5000

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