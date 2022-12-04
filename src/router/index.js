import VueRouter from "vue-router";
import Vue from "vue";
import routes from './routes'
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
  routes,
  // 滚动行为配置
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  },
})

export default router