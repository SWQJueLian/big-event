<script setup>
import BaseContainer from '@/components/BaseContainer.vue'
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { userUpdateUserAvatarService } from '@/apis/user'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'

const imageUrl = ref()

const onChangeImg = (rawFile) => {
  console.log('上传图片：', rawFile)
  // 这行代码是参考element plus中的示例的
  // rawFile是上的文件信息对象，里面的raw是文件file对象，上传图片的时候需要使用。
  // imageUrl.value = URL.createObjectURL(rawFile.raw)
  // 赋值给fromModel
  // fromModel.value.cover_img = rawFile.raw

  // 将文件转换为 Base64 字符串
  const reader = new FileReader()
  reader.readAsDataURL(rawFile.raw)
  reader.onload = (e) => {
    const base64String = e.target.result
    // 在这里可以使用 base64String 进行需要的操作，比如显示到页面上或发送给服务器
    console.log('Base64:', base64String)
    // 用blob或者bas64都可以显示图片
    imageUrl.value = base64String
  }
}

const uploadRef = ref()

const onSelectBtnClick = () => {
  uploadRef.value.$el.querySelector('input[name=file]').click()
}

const onSubmitAvatar = async () => {
  isLoading.value = true
  await userUpdateUserAvatarService(imageUrl.value)
  ElMessage.success('更新头像成功')
  // 更新pinia中的用户头像数据
  useUserStore().userInfo.user_pic = imageUrl.value
  isLoading.value = false
}

const isLoading = ref(false)
</script>

<template>
  <base-container title="用户头像">
    <el-upload
      ref="uploadRef"
      :auto-upload="false"
      class="avatar-uploader"
      :show-file-list="false"
      :on-change="onChangeImg"
    >
      <!-- 有imageUrl才显示图片，否则显示+号-->
      <el-image fit="cover" v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <div style="padding-top: 30px">
      <el-button size="large" type="primary" @click="onSelectBtnClick"
        >选择文件</el-button
      >
      <el-button
        size="large"
        :disabled="!imageUrl"
        :loading="isLoading"
        type="success"
        @click="onSubmitAvatar"
        >更新头像</el-button
      >
    </div>
  </base-container>
</template>

<style lang="scss" scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

:deep(.avatar-uploader .el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

:deep(.avatar-uploader .el-upload:hover) {
  border-color: var(--el-color-primary);
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 350px;
  height: 350px;
  text-align: center;
}
</style>
