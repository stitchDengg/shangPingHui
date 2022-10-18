import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router';
// 三级联动组件
import TypeNav from '@/components/TypeNav';
// 引入mock虚拟的数据
import '@/mock/mockServe'
// 注册为全局组件（第一个参数，全局组件的名字）
Vue.component('TypeNav',TypeNav);
Vue.config.productionTip = false;
// 引入仓库
import store from '@/store'
// 使用Vue-router
Vue.use(VueRouter)


new Vue({
  render: h => h(App),
  // 注册路由：写法是kv一致省略v
  router,
  store,
}).$mount('#app')
