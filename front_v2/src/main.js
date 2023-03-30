import Vue from 'vue'
import App from './App.vue'
// 导入路由
import router from './router'

Vue.use

// 按需导入elemntui组件
import '@/plugin/ElementUI'

Vue.config.productionTip = false

const vm = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

export default vm;