import request from '@/utils/request'

export const articleGetDataListService = () => {
  return request.get('/my/cate/list')
}

// 编辑分类
export const articleUpdateChannelService = (data) => {
  return request.put('/my/cate/info', data)
}

// 分类添加
export const articleAddChannelService = (cate_name, cate_alias) => {
  return request.post('/my/cate/add', {
    cate_name,
    cate_alias
  })
}

// 删除分类
export const articleDelChannelService = (id) => {
  return request.delete('/my/cate/del', {
    params: {
      id
    }
  })
}
