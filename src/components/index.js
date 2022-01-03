import Echarts from './echarts'
/**
 * 初始化安装本地公共组件
 */
export default (app) => {
  app.use(Echarts)
}
