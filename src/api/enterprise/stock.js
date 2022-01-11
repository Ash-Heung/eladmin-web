import request from '@/utils/request'

export function queryList(data) {
  return queryList({
    url: '/eds/stock/queryList',
    method: 'get',
    data
  })
}

export function queryOne(id) {
  return request({
    url: '/eds/stock/queryOne',
    method: 'get',
    data: id
  })
}

export default { queryList, queryOne }
