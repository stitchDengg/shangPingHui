import VueRouter from "vue-router";
import Vue from "vue";
import Home from '../pages/Home';
import Search from '../pages/Search'
import Login from '../pages/Login'
import Register from '../pages/Register'
const router = new VueRouter({
  // 配置路由
  routes:[
    {
      path:'/home',
      component:Home,
      meta:{show:true}
    },
    {
      path:'/search',
      component:Search,
      meta:{show:true},
      name:'search'
    },
    {
      path:'/login',
      component:Login,
      meta:{show:false}
    },
    {
      path:'/register',
      component:Register,
      meta:{show:false}
    },
    // 重定向，在项目跑起来的时候，访问/的时候，立马让他定向到首页
    {
      path:'*',
      redirect:'/home'
    },
  ]
})

export default router