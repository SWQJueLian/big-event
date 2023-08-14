import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

const router = createRouter({
  // history： 用于指定路由模式，
  //    createWebHistory  就是history模式
  //    createWebHashHistory  就是hash模式

  // vite 的配置 import.meta.env.BASE_URL 是路由的基准地址，默认是 ’/‘
  // 参考vite官方说明：https://vitejs.dev/guide/build.html#public-base-path
  // 如果将来你部署的域名路径是：http://xxx/my-path/user
  // 在 vite.config.ts 添加配置  base: my-path，，那么路由就会加上 my-path 前缀了
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue')
    },
    {
      path: '/',
      component: () => import('@/views/layout/Layout.vue'),
      redirect: '/article/manage', // 重定向到文章管理
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/article/ArticleManager.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/article/ArticleChannelManager.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/user/UserProfile.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/user/UserPassword.vue')
        }
      ]
    }
  ]
})

const notNeedLoginUrls = ['/login']
// 路由全局前置守卫
router.beforeEach((to) => {
  // store实例不能放在外面，此时pinia还没初始化，会报错....
  const userStore = useUserStore()
  // 由于项目基本上全部都要登录才能访问，所以定义一个不需要登录的素组路由
  // 判断去往的路由是否包含在这个不需要登录的路由数组里面
  if (!notNeedLoginUrls.includes(to.path)) {
    if (!userStore.token) {
      return '/login'
    } else {
      // 这里else不用写的，只是为了学习加深记忆
      return true
    }
  } else {
    // 如果什么都没有，undefined 或返回 true，则导航是有效的，并调用下一个导航守卫
    // 也就是直接放行了
    return true
  }
})

export default router
