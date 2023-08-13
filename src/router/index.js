import {
  createRouter,
  createWebHistory,
  createWebHashHistory
} from 'vue-router'

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
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
