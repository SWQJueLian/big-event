<script setup>
import { ref } from 'vue'
import {
  articleGetArticleDetailService,
  articleGetDataListService
} from '@/apis/article'

import { Plus } from '@element-plus/icons-vue'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

// 控制是否显示抽屉
const openDrawer = ref(false)

//  抽屉的title
const cust_title = ref('')

// 表单model对象
const defaultObj = {
  title: '',
  cate_id: '',
  content: '',
  cover_img: '',
  state: ''
}
const fromModel = ref(defaultObj)

const fromRules = ref({
  title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
  cate_id: [{ required: true, message: '请输入文章标题', trigger: 'blur' }]
})

const open = async (title, rowData) => {
  openDrawer.value = true
  cust_title.value = title

  // 如果是编辑文章，需要请求获取文章详情
  if (rowData) {
    fromModel.value = { ...fromModel.value, ...rowData }
    const resp = await articleGetArticleDetailService(rowData.id)
    console.log(resp)
    fromModel.value = { ...fromModel.value, ...resp.data }
  } else {
    // 如果是发布新文章，则将fromModel重置，因为会在编辑和发布之间切换
    fromModel.value = { ...defaultObj }
  }

  // 图片预览也需要清空
  imageUrl.value = ''
}

const articleChannelList = ref([])

const initArticleChannelData = async () => {
  // 初始化文章分类数据
  const resp = await articleGetDataListService()
  articleChannelList.value = resp.data
  // console.log('初始化文章分类数据:', resp)
}

// 编辑和新增文章都需要获取文章分类
initArticleChannelData()

const imageUrl = ref('')
const onChangeImg = (rawFile) => {
  console.log('上传图片：', rawFile)
  // 这行代码是参考element plus中的示例的
  // rawFile是上的文件信息对象，里面的raw是文件file对象，上传图片的时候需要使用。
  imageUrl.value = URL.createObjectURL(rawFile.raw)
  // 赋值给fromModel
  fromModel.value.cover_img = rawFile.raw
}
defineExpose({
  open
})
</script>

<template>
  <el-drawer v-model="openDrawer" size="70%" :title="cust_title">
    <template #default>
      <!-- 由于还有一个预览功能，课程上是没有说的，这里就再提供插槽对外定制预览，否则是适合编辑和添加功能的-->
      <slot name="content">
        <el-form :model="fromModel" :rules="fromRules">
          <el-form-item label="文章标题：" prop="title">
            <el-input v-model="fromModel.title" />
          </el-form-item>
          <el-form-item label="文章分类：" prop="cate_id">
            <el-select v-model="fromModel.cate_id">
              <el-option
                v-for="item in articleChannelList"
                :value="item.id"
                :label="item.cate_name"
                :key="item.id"
                >{{ item.cate_name }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item label="文章封面：">
            <template #default>
              <!--
              :auto-upload="false"  控制是否自动上传。
              -->
              <el-upload
                :auto-upload="false"
                class="avatar-uploader"
                :show-file-list="false"
                :on-change="onChangeImg"
              >
                <!-- 有imageUrl才显示图片，否则显示+号-->
                <el-image
                  fit="cover"
                  v-if="imageUrl"
                  :src="imageUrl"
                  class="avatar"
                />
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
              </el-upload>
            </template>
          </el-form-item>
          <el-form-item label="文章内容：">
            <template #default>
              <div class="editor">
                <quill-editor
                  theme="snow"
                  v-model:content="fromModel.content"
                  contentType="html"
                >
                </quill-editor>
              </div>
            </template>
          </el-form-item>
        </el-form>
      </slot>
    </template>
  </el-drawer>
</template>

<style lang="scss" scoped>
.editor {
  width: 100%;
  :deep(.ql-editor) {
    min-height: 300px;
  }
}

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
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
