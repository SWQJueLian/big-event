<script setup>
import { ref } from 'vue'
import {
  articleAddChannelService,
  articleUpdateChannelService
} from '@/apis/article'
import { ElMessage } from 'element-plus'

const dialogVisible = ref(false)

const custtitle = ref('')

const rowData = ref({
  id: '',
  cate_name: '',
  cate_alias: ''
})

const openDialog = (title, data) => {
  custtitle.value = title
  dialogVisible.value = true
  rowData.value = { ...data } // 没有传就代表是添加分类，那么就给一个空对象，不然会报错
}

const emits = defineEmits(['updateData'])

const handlerConfirm = async () => {
  // 有ID就代表是编辑模式，没有就是添加
  if (rowData.value.id) {
    // 发送编辑请求
    const resp = await articleUpdateChannelService(rowData.value)
    console.log('编辑分类', resp)
  } else {
    // 发送添加请求
    const resp = await articleAddChannelService(
      rowData.value.cate_name,
      rowData.value.cate_alias
    )
    console.log('添加分类', resp)
  }
  // 关闭对话框
  dialogVisible.value = false
  ElMessage.success(rowData.value.id ? '更新成功' : '新增成功')
  emits('updateData')
}

defineExpose({
  openDialog
})
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="custtitle" width="30%">
    <template #default>
      {{ rowData }}
      <el-form :model="rowData" label-width="100px">
        <el-form-item label="分类名称：">
          <el-input v-model="rowData.cate_name" />
        </el-form-item>
        <el-form-item label="分类别名：">
          <el-input v-model="rowData.cate_alias" />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handlerConfirm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped></style>
