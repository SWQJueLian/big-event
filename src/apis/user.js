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

// 更新用户头像
export const userUpdateUserAvatarService = (avatar) => {
  return request.patch('/my/update/avatar', { avatar })
}

// 修改用户密码
export const userRestUserPasswordService = (old_pwd, new_pwd, re_pwd) => {
  return request.patch('/my/updatepwd', {
    old_pwd,
    new_pwd,
    re_pwd
  })
}
