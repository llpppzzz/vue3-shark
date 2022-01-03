<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <el-button @click="openPage">2021年度账单</el-button>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: "Home",
  setup () {
    const router = useRouter()
    function openPage() {
      router.push('Charts')
    }
    return {
      openPage
    }
  }
}
</script>
