<template>
  <div class="echarts" ref="chartEl"></div>
</template>

<script>
/**
 * echart vue组件封装。
 * 内部处理echart.js的依赖加载。
 * 解决echart 重绘的问题。
 * @example
 *   chart(:options="options")
 */
import {ref, watch, nextTick, onMounted, onUnmounted} from 'vue';
import { isEmpty } from 'utils/utils'
import * as echarts from 'echarts'

const MOUSE_EVENTS = [
  'click'
]

export default {
  name: 'Echarts',
  props: {
    options: Object,
    initOptions: Object,
    theme: {
      type: [String, Object],
      default: 'customTheme'
    }
  },
  emits: ['ready', 'click', 'chartclick'],
  setup (props, context) {
    const chartInstance = ref(null)
    const chartEl = ref(null)

    function init () {
      const chart = echarts.init(chartEl.value)
      const empty = isEmpty(props.initOptions)
      if (props.initOptions && !empty) {
        chart.setOption(props.initOptions)
      }
      chart.setOption(props.options)

      MOUSE_EVENTS.forEach(event => {
        chart.off(event) // 防止重复注册同一事件
        chart.on(event, params => {
          context.emit(event, params)

          // 考虑往后兼容
          context.emit('chart' + event, params)
        })
      })

      chartInstance.value = chart
      context.emit('ready', chartInstance)
    }
    onMounted(() => {
      if (!chartInstance.value && props.options) {
        nextTick(() => {
          init()
        })
      }
    })
    watch(props.options, (options) => {
      if (!chartInstance.value) {
        nextTick(() => {
          !isEmpty(options) && init()
        })
      } else {
        nextTick(() => {
          const empty = isEmpty(props.initOptions)
          if (props.initOptions && !empty) {
            chartInstance.value.setOption(props.initOptions, true)
          }
          chartInstance.value.setOption(props.options)
        })
      }
    }, {immediate: true})
    onUnmounted(() => {
      if (chartInstance.value) {
        chartInstance.value.dispose()
        chartInstance.value = null
      }
    })
    return {
      chartEl
    }
  }
};
</script>

<style lang="scss">
.echarts {
  width: 100%;
  height: 350px;
}
</style>
