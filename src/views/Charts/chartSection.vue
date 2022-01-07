<template>
<div class="chart-section">
  <div class="chart-section-title">{{title}}</div>
  <slot></slot>
</div>
</template>

<script>
export default {
  name: "chartSection",
  props: {
    title: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss">
.chart-section {
  &-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
  }
}
</style>