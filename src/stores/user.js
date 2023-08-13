import { defineStore } from 'pinia'
// eslint-disable-next-line no-unused-vars
import { ref } from 'vue'

export const useUserStore = defineStore(
  'User',
  () => {
    // 定义state
    const token = ref('')

    // 定义actions
    const setUserToken = (newToken) => {
      token.value = newToken
    }
    const deleteUserToken = () => {
      token.value = ''
    }
    return {
      token,
      setUserToken,
      deleteUserToken
    }
  },
  {
    persist: true
  }
)
