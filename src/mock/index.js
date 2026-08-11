import MockAdapter from 'axios-mock-adapter'
import request from '@/utils/request'

import { mockGetTodos } from './todoMock'


const mock = new MockAdapter(request)


mock.onGet('/todos')
.reply(async()=>{

  const res = await mockGetTodos()

  return [
    200,
    res
  ]

})