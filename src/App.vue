<script setup>
import { useUserStore } from '@/stores'

const userStore = useUserStore()
</script>

<template>
  <div>
    <router-view></router-view>
    <p>用户Token: {{ userStore.token }}</p>
  </div>
  <button @click="userStore.setUserToken('hahahahahasdadasdsadas')">
    设置token
  </button>
</template>

<style scoped></style>
