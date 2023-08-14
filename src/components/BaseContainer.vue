<script setup>
const props = defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>

<template>
  <div class="base-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ props.title }}</span>
          <!-- 提供右部自定义插槽 -->
          <slot name="right-extra"></slot>
        </div>
      </template>
      <div>
        <!-- 默认插槽， 提供主体显示内容 -->
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.base-container {
  display: flex;
  min-width: 100%;
  min-height: 100%;
  box-sizing: border-box;

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text {
    font-size: 14px;
  }

  .box-card {
    min-width: 100%;
  }
}
</style>
