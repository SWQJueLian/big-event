<script setup>
import BaseContainer from '@/components/BaseContainer.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { userUpdateUserInfoService } from '@/apis/user'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()

const formModel = ref({
  id: userStore.userInfo.id,
  username: userStore.userInfo.username,
  nickname: userStore.userInfo.nickname,
  email: userStore.userInfo.email
})

const formRef = ref()

const formrules = {
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 10, message: '昵称长度在2-10个字符之间', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ]
}

const submitForm = async () => {
  // 处理表单提交逻辑
  // console.log(formModel.value)
  await formRef.value.validate()
  await userUpdateUserInfoService(formModel.value)
  await userStore.getUserInfo()
  ElMessage.success('更新用户信息成功')
}
</script>

<template>
  <base-container title="基本资料">
    <template #default>
      <el-form
        ref="formRef"
        :model="formModel"
        :rules="formrules"
        label-width="100px"
      >
        <el-form-item label="登录名称">
          <el-input v-model="formModel.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="formModel.nickname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formModel.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </template>
  </base-container>
</template>

<style scoped></style>
