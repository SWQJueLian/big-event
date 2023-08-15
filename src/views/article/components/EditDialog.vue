<script setup>
import { ref } from 'vue'
import {
  articleAddChannelService,
  articleUpdateChannelService
} from '@/apis/article'
import { ElMessage } from 'element-plus'

// 是否显示dialog框
const dialogVisible = ref(false)

// 自定义标题
const custtitle = ref('')

// 表单绑定数据对象
const rowData = ref({
  id: '',
  cate_name: '',
  cate_alias: ''
})

// 表单校验规则
const fromRules = {
  cate_name: [
    { required: true, message: '请输入分类名称', tirgger: 'blur' },
    { pattern: /^\S{4,20}$/, message: '请输入4-20位非空字符', tirgger: 'blur' }
  ],

  cate_alias: [
    { required: true, message: '请输入分类别名', tirgger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{2,20}$/,
      message: '请输入2-15位字母或数字字符',
      tirgger: 'blur'
    }
  ]
}

// 对外exposed的方法，用于父组件调用并显示对话框
const openDialog = (title, data) => {
  custtitle.value = title
  dialogVisible.value = true
  rowData.value = { ...data } // 没有传就代表是添加分类，那么就给一个空对象，不然会报错
}

const emits = defineEmits(['updateData'])

// 点击“确定”按钮处理函数
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

// 对外暴露定义
defineExpose({
  openDialog
})
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="custtitle" width="30%">
    <template #default>
      {{ rowData }}
      <el-form :model="rowData" :rules="fromRules" label-width="100px">
        <el-form-item label="分类名称：" prop="cate_name">
          <el-input v-model="rowData.cate_name" />
        </el-form-item>
        <el-form-item label="分类别名：" prop="cate_alias">
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
