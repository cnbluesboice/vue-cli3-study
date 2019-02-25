import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "./api/index.js"

// 初始化css
import "./assets/css/base.css"

// 引入element-ui
import 'element-ui/lib/theme-chalk/index.css'
import elementUI from "element-ui"
Vue.use(elementUI)





Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
