import request from '@/utils/request'

export const articleGetDataListService = () => {
  return request.get('/my/cate/list')
}
