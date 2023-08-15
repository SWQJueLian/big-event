<script setup>
import BaseContainer from '@/components/BaseContainer.vue'
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
            <el-select>
              <el-option>大牛</el-option>
              <el-option>学习</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态">
            <el-select>
              <el-option>已发布</el-option>
              <el-option>草稿</el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <template #default>
              <el-button type="primary">搜索</el-button>
              <el-button>重置</el-button>
            </template>
          </el-form-item>
        </el-form>
        <!-- 中间表格 -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="标题"></el-table-column>
          <el-table-column label="分类"></el-table-column>
          <el-table-column label="发布时间"></el-table-column>
          <el-table-column label="状态"></el-table-column>
          <el-table-column label="操作"></el-table-column>
        </el-table>
      </template>
    </base-container>
  </div>
</template>

<style scoped></style>
