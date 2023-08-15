<script setup>
import BaseContainer from '@/components/BaseContainer.vue'
import {
  articleGetDataListService,
  articleGetArticleListService
} from '@/apis/article'

import { ref } from 'vue'

// 文章分类数据
const articleChannelList = ref([])

// 文章详情数据
const articleDataList = ref([])

// 初始化查询参数对象
const queryParams = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

const initArticleData = async () => {
  // 获取文章详情
  const resp2 = await articleGetArticleListService(queryParams.value)
  articleDataList.value = resp2.data
}

const initArticleChannelData = async () => {
  // 初始化文章分类数据
  const resp = await articleGetDataListService()
  articleChannelList.value = resp.data
  console.log('初始化文章分类数据:', resp)
}

// 初始化文章数据
initArticleData()
initArticleChannelData()

// 编辑文章处理事件
const handlerEditAricle = (row) => {
  console.log(row)
}
// 删除文章处理事件
const handlerDelAricle = (row) => {
  console.log(row)
}

// 重置搜索条件
const resetSearch = () => {
  // 置空搜索条件
  queryParams.value.cate_id = ''
  queryParams.value.state = ''
  // 重新载入数据
  initArticleData()
}
</script>

<template>
  <div>
    <base-container title="文章管理">
      <template #right-extra>
        <el-button type="primary">发布文章</el-button>
      </template>
      <template #default>
        <!-- 顶部表单 -->
        <el-form inline>
          <el-form-item label="文章分类">
            <el-select v-model="queryParams.cate_id">
              <el-option
                v-for="item in articleChannelList"
                :value="item.id"
                :label="item.cate_name"
                :key="item.id"
                >{{ item.cate_name }}</el-option
              >
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态">
            <el-select v-model="queryParams.state">
              <el-option value="已发布" label="已发布">已发布</el-option>
              <el-option value="草稿" label="草稿">草稿</el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <template #default>
              <el-button @click="initArticleData()" type="primary"
                >搜索</el-button
              >
              <el-button @click="resetSearch">重置</el-button>
            </template>
          </el-form-item>
        </el-form>
        <!-- 中间表格 -->
        <el-table :data="articleDataList" style="width: 100%">
          <el-table-column prop="title" label="标题"></el-table-column>
          <el-table-column prop="cate_name" label="分类"></el-table-column>
          <el-table-column prop="pub_date" label="发布时间"></el-table-column>
          <el-table-column prop="state" label="状态"></el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button @click="handlerEditAricle(scope.row)" type="primary"
                >编辑</el-button
              >
              <el-button @click="handlerDelAricle(scope.row)" type="danger"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </base-container>
  </div>
</template>

<style scoped></style>
