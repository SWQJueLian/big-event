<script setup>
import BaseContainer from '@/components/BaseContainer.vue'
import {
  articleGetDataListService,
  articleGetArticleListService,
  articleDelArticleService
} from '@/apis/article'

import { ref } from 'vue'
import { ElMessage } from 'element-plus'

import * as dayjs from 'dayjs'

// 文章分类数据
const articleChannelList = ref([])

// 文章详情数据
const articleDataList = ref([])

// 初始化查询参数对象
const queryParams = ref({
  pagenum: 1, // 当前页
  pagesize: 5, // 每页多少条数据
  cate_id: '',
  state: ''
})

// 记录当前搜索条件下的总页数
const totalPage = ref()

const initArticleData = async () => {
  // 获取文章详情
  const resp2 = await articleGetArticleListService(queryParams.value)
  // console.log('文章列表数据：', resp2)
  articleDataList.value = resp2.data
  totalPage.value = resp2.total
}

const initArticleChannelData = async () => {
  // 初始化文章分类数据
  const resp = await articleGetDataListService()
  articleChannelList.value = resp.data
  // console.log('初始化文章分类数据:', resp)
}

// 初始化文章数据
initArticleData()
initArticleChannelData()

// 编辑文章处理事件
const handlerEditAricle = (row) => {
  console.log(row)
}

// 删除文章处理事件
const handlerDelAricle = async ({ id }) => {
  console.log(id)
  await articleDelArticleService(id)
  initArticleData()
  ElMessage.success('删除文章成功')
}

// 重置搜索条件
const resetSearch = () => {
  // 置空搜索条件
  queryParams.value.cate_id = ''
  queryParams.value.state = ''
  // 重新载入数据
  initArticleData()
}

// page-size 改变时触发
const handleSizeChange = (val) => {
  // console.log(val)
  // 改变每页多少条数据时，必须将当前页重置为1
  queryParams.value.pagesize = val
  queryParams.value.pagenum = 1
  initArticleData()
}

// current-page 改变时触发
const handleCurrentChange = (val) => {
  console.log(val)
  // 改变了第几页，重新加载数据
  queryParams.value.pagenum = val
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
          <el-table-column prop="pub_date" label="发布时间">
            <template #default="scope">
              {{ dayjs(scope.row.pub_date).format('YYYY-MM-DD HH:mm:ss') }}
            </template>
          </el-table-column>
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
        <!--底部分页条-->
        <!--
        page-size: 页数选择器选项
        background：是否给分页按钮添加背景色
        @size-change：page-size 改变时触发
        @current-change：current-page 改变时触发
        layout: 组件布局，子组件名用逗号分隔，比如：prev, pager, next, jumper, total
        -->
        <el-pagination
          style="margin-top: 20px"
          v-model:current-page="queryParams.pagenum"
          v-model:page-size="queryParams.pagesize"
          :page-sizes="[1, 3, 5, 10, 15, 25, 50]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </template>
    </base-container>
  </div>
</template>

<style scoped></style>
