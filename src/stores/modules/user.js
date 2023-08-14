import { defineStore } from 'pinia'
// eslint-disable-next-line no-unused-vars
import { ref } from 'vue'
import { userBasicInfoService } from '@/apis/user'

export const useUserStore = defineStore(
  'User',
  () => {
    // 定义state

    // 用户登录token
    const token = ref('')

    // 用户信息对象
    const userInfo = ref({})

    // 定义actions

    // 设置用户token
    const setUserToken = (newToken) => {
      token.value = newToken
    }

    // 删除用户token
    const deleteUserToken = () => {
      token.value = ''
    }

    // 获取用户基本信息
    const getUserInfo = async () => {
      // 发送请求获取用户基本信息
      const resp = await userBasicInfoService()
      console.log(resp)
      userInfo.value = resp.data
    }

    // 登出
    const logout = () => {
      userInfo.value = {}
      token.value = ''
    }

    return {
      token,
      setUserToken,
      deleteUserToken,
      getUserInfo,
      userInfo,
      logout
    }
  },
  {
    persist: true
  }
)
