import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router';
// 三级联动组件
import TypeNav from '@/components/TypeNav';
// 引入mock虚拟的数据
import '@/mock/mockServe';
// 引入swiper样式
import '../node_modules/swiper/swiper-bundle.min.css';
import Swiper,{Navigation,Pagination} from "swiper";
Swiper.use({Navigation,Pagination});
// 注册为全局组件（第一个参数，全局组件的名字）
Vue.component('TypeNav',TypeNav);
Vue.config.productionTip = false;
// 引入仓库
import store from '@/store'
// 使用Vue-router
Vue.use(VueRouter)

// 统一接受接口api文件夹里面全部的请求函数
import * as API from '@/api';
// 将所有的请求函数挂载到Vue的原型对象上
Vue.prototype.$api = API;

// element-ui 按需引入
import { MessageBox } from 'element-ui';
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

const loadimage = require('./assets/奥特曼.png')

// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  // 懒加载默认图片
  loading:loadimage,
})


new Vue({
  render: h => h(App),
  // 注册路由：写法是kv一致省略v
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
  }
}).$mount('#app')
