<script setup>
import BaseContainer from '@/components/BaseContainer.vue'
import { articleGetDataListService } from '@/apis/article'
import { ref } from 'vue'

// 定义data
const articleChannelList = ref([])

// 直接定义函数
const initArticleChannelList = async () => {
  const resp = await articleGetDataListService()
  articleChannelList.value = resp.data
}

// 等同于图created钩子函数中执行
initArticleChannelList()

const handleEdit = (row, index) => {
  console.log(row, index)
}
const handleDel = (row, index) => {
  console.log(row, index)
}
</script>

<template>
  <base-container title="文章分类">
    <template #right-extra>
      <el-button type="primary">添加分类</el-button>
    </template>
    <template #default>
      <!-- :data 指定表格数据， 是一个数组，里面是对象。-->
      <el-table :data="articleChannelList" style="width: 100%">
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
              @click="handleEdit(scope.row, scope.$index)"
              >编辑
            </el-button>
            <el-button type="danger" @click="handleDel(scope.row, scope.$index)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </base-container>
</template>

<style scoped></style>
