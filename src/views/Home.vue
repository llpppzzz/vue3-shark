<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <el-button @click="openPage">跳转</el-button>
  </div>
</template>

<script>

export default {
  name: "Home",
  setup () {
    function openPage() {
      alert('123123')
    }
    return {
      openPage
    }
  }
}
</script>
