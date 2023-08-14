<script setup>
import BaseContainer from '@/components/BaseContainer.vue'
import {
  articleDelChannelService,
  articleGetDataListService
} from '@/apis/article'
import { ref } from 'vue'
import EditDialog from '@/views/article/components/EditDialog.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 定义data
const articleChannelList = ref([])
const isLoading = ref(true) // 控制数据加载loading标记位

// 直接定义函数
const initArticleChannelList = async () => {
  isLoading.value = true
  const resp = await articleGetDataListService()
  articleChannelList.value = resp.data
  // 初始化完成后将loading设置位false，取消loading效果。
  isLoading.value = false
}

// 等同于图created钩子函数中执行
initArticleChannelList()

const dialog = ref()

const handlerEdit = (row) => {
  // console.log(row, index)
  dialog.value.openDialog('编辑分类', row)
}
const handlerDel = async (row) => {
  await ElMessageBox.confirm('确定要删除?', 'Warning', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  const resp = await articleDelChannelService(row.id)
  console.log('删除分类：', resp)
  ElMessage.success('删除成功')
  // 重新加载列表
  initArticleChannelList()
}

const handlerAddChannel = () => {
  dialog.value.openDialog('添加分类')
}
</script>

<template>
  <div>
    <EditDialog
      ref="dialog"
      @updateData="initArticleChannelList()"
    ></EditDialog>
    <base-container title="文章分类">
      <template #right-extra>
        <el-button @click="handlerAddChannel" type="primary"
          >添加分类</el-button
        >
      </template>
      <template #default>
        <!-- :data 指定表格数据， 是一个数组，里面是对象。-->
        <el-table
          v-loading="isLoading"
          :data="articleChannelList"
          style="width: 100%"
        >
          <!--
          label: 指定表头名
          prop: 指定列渲染的数据是来源自:data中指定的哪一项数据
          wdith：指定列宽度
           -->
          <el-table-column type="index" label="序号" width="100" />
          <el-table-column prop="cate_name" label="分类名" width="180" />
          <el-table-column prop="cate_alias" label="分类别名" />
          <el-table-column label="操作">
            <!-- 自定义列模板
             通过 slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据，用法参考 demo。
              row: 是当前行数据，column是当前列， $index是第几行
             -->
            <template #default="scope">
              <el-button
                type="primary"
                @click="handlerEdit(scope.row, scope.$index)"
                >编辑
              </el-button>
              <el-button
                type="danger"
                @click="handlerDel(scope.row, scope.$index)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </base-container>
  </div>
</template>

<style scoped></style>
