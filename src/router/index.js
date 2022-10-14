import VueRouter from "vue-router";
import Vue from "vue";
import Home from '../pages/Home';
import Search from '../pages/Search'
import Login from '../pages/Login'
import Register from '../pages/Register'
// console.log(VueRouter);
let originPush = VueRouter.prototype.push;
let originRepalce = VueRouter.prototype.replace;
// 重写push和repalce方法(可以不用传递resolve,reject两个函数)
// 第一个参数，告诉原来的push方法，往哪儿跳（传递那些参数）
VueRouter.prototype.push = function(location,resolve,reject){
  if(resolve & reject){
    // call和apply的区别：相同点都可以调用函数语句都可以篡改函数的上下文
    // 不同点：call和apply传递参数，call传递参数用逗号隔开。apply方法，传递数组
    originPush.call(this,location,resolve,reject);
  }else{
    originPush.call(this,location,()=>{},()=>{});
  }
}

VueRouter.prototype.replace = function(location,resolve,reject){
  if(resolve & reject){
    // call和apply的区别：相同点都可以调用函数语句都可以篡改函数的上下文
    // 不同点：call和apply传递参数，call传递参数用逗号隔开。apply方法，传递数组
    originRepalce.call(this,location,resolve,reject);
  }else{
    originRepalce.call(this,location,()=>{},()=>{});
  }
}

  const router = new VueRouter({
  // 配置路由
  routes:[
    {
      path:'/home',
      component:Home,
      meta:{show:true}
    },
    {
      path:'/search/:keyword?',
      component:Search,
      meta:{show:true},
      name:'search',
      // 1.布尔值写法:params
      // props:true,
      // 2.对象写法:额外的给路由组件一些props
      // props:{a:1,b:2},
      // 3.函数写法：可以给params参数，也可以给query参数
      props($route){
        return {
          keyword:$route.params.keyword,
          key:$route.query.key
        }
      }
      
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