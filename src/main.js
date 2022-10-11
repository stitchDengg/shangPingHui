import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router';
Vue.config.productionTip = false
// 使用Vue-router
Vue.use(VueRouter)


new Vue({
  render: h => h(App),
  // 注册路由：写法是kv一致省略v
  router,
}).$mount('#app')
