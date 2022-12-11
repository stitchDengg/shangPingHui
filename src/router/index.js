import VueRouter from "vue-router";
import Vue from "vue";
import routes from './routes'
import store from '@/store'
// console.log(VueRouter);
let originPush = VueRouter.prototype.push;
let originRepalce = VueRouter.prototype.replace;
// 重写push和repalce方法(可以不用传递resolve,reject两个函数)
// 第一个参数，告诉原来的push方法，往哪儿跳（传递那些参数）
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve & reject) {
    // call和apply的区别：相同点都可以调用函数语句都可以篡改函数的上下文
    // 不同点：call和apply传递参数，call传递参数用逗号隔开。apply方法，传递数组
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => { }, () => { });
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve & reject) {
    // call和apply的区别：相同点都可以调用函数语句都可以篡改函数的上下文
    // 不同点：call和apply传递参数，call传递参数用逗号隔开。apply方法，传递数组
    originRepalce.call(this, location, resolve, reject);
  } else {
    originRepalce.call(this, location, () => { }, () => { });
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


// 全局守卫，前置守卫（在路由跳转之前进行判断）
router.beforeEach((to, from, next) => {
  let token = store.state.users.token || localStorage.getItem('token');
  let name = store.state.users.userInfo.name;
  if (token) {
    //用户已经登陆,还想去login休想
    if (to.path == '/login') {
      //跳转到home
      next('/home');
    } else {
      console.log('已经登陆了');
      if (name) {
        next();
      } else {
         // 如果没有用户信息，则重新获取用户数据
          store.dispatch('getUserInfo').then(res => {
            console.log(res);
            next();
          }).catch(e => {
            //token失效了
            localStorage.clear();
            next('/login');
          });
      }
    }
  } else {
    // 未登陆
    //不能去个人中心 交易相关等页面
    //去的不是这些页面 则需要放行
    let toPath = to.path;
    if(toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1){
      // 把未登陆想去而没有去成的信息存储于地址栏中
      next('/login?redirect='+toPath);
    }else{
      console.log(12331231);
      next();
    }
  }
});

export default router;