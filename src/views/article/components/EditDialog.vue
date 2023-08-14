<script setup>
import { ref } from 'vue'

const dialogVisible = ref(false)

const custtitle = ref('')

const rowData = ref({})

const openDialog = (title, data) => {
  custtitle.value = title
  dialogVisible.value = true
  rowData.value = data || {} // 没有传就代表是添加分类，那么就给一个空对象，不然会报错
}

defineExpose({
  openDialog
})
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="custtitle" width="30%">
    <template #default>
      <!--{{ rowData }}-->
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
        <el-button type="primary" @click="dialogVisible = false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped></style>
