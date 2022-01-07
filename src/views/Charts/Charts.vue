<template>
<div>
  <chart-section title="卢宇年度收入-支出柱状图">
    <echarts :init-options="initOptions" :options="options" />
  </chart-section>
</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import Echarts from "components/echarts/echarts";
import { buildBarChartOptions } from 'utils/chartHelper'
// import { unique } from 'utils/utils'
import ChartSection from "views/Charts/chartSection";
import data2021 from '../../../static/data2021.json'
import { MONTHS } from "utils/constant";

export default {
  name: "Charts",
  components: { Echarts, ChartSection },
  setup () {
    let options = ref({})
    onMounted(() => {
      renderChart()
    })

    function getDataByCategory (data, filter) {
      const res = data.filter(filter)
      return MONTHS.map(item => {
        const res2 = res.filter(one => {
          const name = `${dayjs(one.date).month() + 1 }月`
          return name === item
        })
        if (res2.length > 1) {
          return res2.reduce((pre, cur) => (pre * 1000 + cur.amount * 1000) / 1000, 0)
        } else if (res2.length === 1) {
          return res2[0].amount
        } else {
          return null
        }
      })
    }

    function getAllCategories (data, stack) {
      const categories = []
      data.forEach(item => {
        !categories.includes(item.category) && categories.push(item.category)
      })
      return categories.map(item => {
        return {
          name: item,
          type: 'bar',
          stack,
          data: getDataByCategory(data, one => one.category === item)
        }
      })
    }

    function renderChart () {
      const income = data2021.filter(item => item.type === '收入' && item.category === '兼职')
      const expend = data2021.filter(item => item.type === '支出' && item.tag === 'lu')
      const expendTogether = data2021
        .filter(item => item.type === '支出' && item.tag === 'together')
        .map(item => {
          item.amount = item.amount / 2
          return item
        })
      console.log(expendTogether);
      const series = [{
        name: '收入',
        type: 'bar',
        stack: '1',
        data: getDataByCategory(income, item => !item.remark)
      }, {
        name: '奖金',
        type: 'bar',
        stack: '1',
        data: getDataByCategory(income, item => item.remark)
      }]
      // 单独花费
      const expendArr = getAllCategories(expend, '2')
      expendArr.forEach(item => {
        series.push(item)
      })
      // 共同花费
      const expendTogetherArr = getAllCategories(expendTogether, '2')
      expendTogetherArr.forEach(item => {
        series.push(item)
      })
      options.value = {
        tooltip: {
          formatter (data) {
            // console.log(data);
          }
        },
        xAxis: [{
          data: MONTHS
        }],
        series
      };
    }
    return {
      options,
      initOptions: buildBarChartOptions()
    }
  }
};
</script>

<style scoped>

</style>