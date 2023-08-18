// 用户相关api
import request from '@/utils/request'

// 用户注册
export const userRegisterService = (username, password, repassword) => {
  return request.post('/api/reg', {
    username,
    password,
    repassword
  })
}

// 用户登录
export const userLoginService = (username, password) => {
  return request.post('/api/login', {
    username,
    password
  })
}

// 用户信息获取
export const userBasicInfoService = () => {
  return request.get('/my/userinfo')
}

// 更新用户基本资料
export const userUpdateUserInfoService = (data) => {
  return request.put('/my/userinfo', data)
}
