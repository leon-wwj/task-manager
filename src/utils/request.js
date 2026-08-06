import axios from 'axios'


const request = axios.create({

  baseURL:'http://localhost:3000',

  timeout:5000

})

request.interceptors.request.use(

  config=>{


    const token = localStorage.getItem('user')


    if(token){

      const user = JSON.parse(token)


      config.headers.Authorization =
      `Bearer ${user.token}`

    }


    return config

  },


  error=>{

    return Promise.reject(error)

  }

)

export default request