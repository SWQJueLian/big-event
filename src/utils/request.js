// 单独封装请求axios
import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'

// 请求基础url
const baseurl = 'http://big-event-vue-api-t.itheima.net'

// axios实例
const axiosInstance = axios.create({
  baseURL: baseurl,
  timeout: 10000
})

// 添加拦截器
// 添加请求拦截器
axiosInstance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 统一在请求前添加token
    config.headers['Authorization'] = useUserStore().token
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    // 添加统一处理非200状态码错误提示
    // console.log(response)
    const data = response.data
    // 后端返回的code字段非0表示不正常
    if (response.status === 200 && data.code === 0) {
      return data // (axios会多包装一层data，提前在响应前拦截并返回，减少后面需要resp.data.data之类的调用...)
    } else {
      ElMessage.error(data.message)
      return Promise.reject(data.message)
    }
  },
  function (error) {
    // 对响应错误做点什么
    ElMessage(error.response.data.message || '服务器异常')
    return Promise.reject(error)
  }
)

// 导出默认
export default axiosInstance
export { baseurl }
