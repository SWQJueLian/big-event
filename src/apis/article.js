import request from '@/utils/request'

// 获取文章分类列表
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

// 获取文章列表
export const articleGetArticleListService = (data) => {
  return request.get('/my/article/list', {
    params: data
  })
}

// 删除文章
export const articleDelArticleService = (id) => {
  return request.delete('/my/article/info', { params: { id } })
}

// 获取文章详情
export const articleGetArticleDetailService = (id) => {
  return request.get('/my/article/info', {
    params: { id }
  })
}
