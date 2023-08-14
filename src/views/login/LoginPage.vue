<script setup>
import { User, Lock, Key } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue'

const isRegister = ref(true)

// 整个from表单的绑定数据对象
const fromModel = reactive({
  username: '',
  password: '',
  repassword: ''
})
// 表单的校验规则
// 更多高级校验规则用法：https://github.com/yiminghe/async-validator
const fromRules = reactive({
  username: [
    // 非空校验， required: true
    { required: true, message: '请输入用户名', trigger: 'blur' },
    // 长度校验
    { min: 5, max: 20, message: '用户名长度5-20位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    // 正则校验
    { pattern: /^\S{6,20}$/, message: '密码位6-20位非空字符', trigger: 'blur' }
  ],
  repassword: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    // 正则校验
    {
      pattern: /^\S{6,20}$/,
      message: '密码为6-20位非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        // rule: 当前校验规则
        // value: 当前表单的值
        // callback： 回调函数，不管是否校验成功，都必须调用callback
        if (value !== fromModel.password) {
          callback(new Error('两次输入的密码不一致！'))
        } else {
          callback()
        }
      }
    }
  ]
})
</script>

<template>
  <el-row class="login-page">
    <el-col :span="10" class="bg"></el-col>
    <el-col :span="6" :offset="4" class="form">
      <el-form
        :model="fromModel"
        :rules="fromRules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="fromModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="fromModel.password"
            :prefix-icon="Key"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="fromModel.repassword"
            :prefix-icon="Key"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space>
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <el-form ref="form" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item>
          <el-input :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space
            >登录
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
