import Vue from 'vue'

import ElementUI from "element-ui"; // 引入 element 组件
import "element-ui/lib/theme-chalk/index.css"; // 加上 element 样式

import router from "./router"
import App from './App.vue';

Vue.use(ElementUI); // 在 Vue 里使用 Element

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
