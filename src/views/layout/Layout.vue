<script setup>
import { useUserStore } from '@/stores'

defineOptions({
  name: 'LayoutPage'
})
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'

const userStore = useUserStore()

// 初始化用户基本信息
userStore.getUserInfo()

const router = useRouter()

const handlerCommand = (command) => {
  // command 为下来菜单项目的指定的具体command属性
  // ElMessage.success(command)
  // 由于command直接按照路由来配置了，所以直接判断如果不是logout，都使用路由跳转
  if (command !== 'logout') {
    router.push(`/user/${command}`)
  } else {
    // 否则，弹出退出登录确认框，提示用户是否需要退出登录，因为有可能是误点了
    ElMessageBox.confirm(
      '您确定要退出登录吗？', // 提示内容
      '警告', // 消息标题
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning' // 消息框类型，用于自动添加相应的图标显示
      }
    )
      .then(() => {
        userStore.logout()
      })
      .catch(() => {})
  }
}
</script>

<template>
  <!--
  Container布局容器，这玩意就类似以前的bootstrap
  -->
  <el-container class="layout-container">
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <!--
      router: 路由模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 使用 default-active 来设置加载时的激活项
      :default-active="$route.path" 页面加载时默认激活菜单的 index， 设置成路由，就表示你当前路由是啥就是啥激活
      el-menu-item：主菜单
      el-sub-menu： 子菜单，用于桥套子菜单
      -->
      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        :default-active="$route.path"
        text-color="#fff"
        router
      >
        <!-- 因为开启了路由模式，所以index要设置成路由 -->
        <el-menu-item index="/article/channel">
          <el-icon>
            <Management />
          </el-icon>
          <span>文章分类</span>
        </el-menu-item>
        <el-menu-item index="/article/manage">
          <el-icon>
            <Promotion />
          </el-icon>
          <span>文章管理</span>
        </el-menu-item>
        <el-sub-menu index="/user">
          <template #title>
            <el-icon>
              <UserFilled />
            </el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/user/profile">
            <el-icon>
              <User />
            </el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon>
              <Crop />
            </el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          欢迎您：<strong>{{
            userStore.userInfo.nickname || userStore.userInfo.username
          }}</strong>
        </div>
        <el-dropdown placement="bottom-end" @command="handlerCommand">
          <!-- 默认插槽是下拉菜单的展示方式 -->
          <span class="el-dropdown__box">
            <el-avatar :src="userStore.userInfo.user_pic || avatar" />
            <el-icon><CaretBottom /></el-icon>
          </span>
          <!-- dropdown插槽是具体的下拉菜单项 -->
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User">
                基本资料
              </el-dropdown-item>
              <el-dropdown-item command="avatar" :icon="Crop">
                更换头像
              </el-dropdown-item>
              <el-dropdown-item command="password" :icon="EditPen">
                重置密码
              </el-dropdown-item>
              <el-dropdown-item command="logout" :icon="SwitchButton">
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>大事件 ©2023 Created by 黑马程序员</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #232323;

    &__logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 120px auto;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
