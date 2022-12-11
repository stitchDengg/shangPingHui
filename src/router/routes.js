// 路由配置信息
// 一级路由

export default [
  {
    path:'/home',
    component:() => import('../pages/Home'),
    meta:{show:true}
  },
  {
    path:'/search/:keyword?',
    component:() => import('../pages/Search'),
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
    name:'login',
    path:'/login',
    component:() => import('../pages/Login'),
    meta:{show:false}
  },
  {
    path:'/register',
    component:() => import('../pages/Register'),
    meta:{show:false}
  },
  { 
    name:'detail',
    path:'/detail/:skuId',
    component:() => import('../pages/Detail'),
    meta:{show:true},
    props($route){
      return {
        skuid:$route.params.skuId
      }
    }
  },
  // 添加购物车成功
  {
    name:'AddCartSuccess',
    path:'/AddCartSuccess',
    component:() => import('../pages/AddCartSuccess'),
    meta:{show:true}
  },
  // 购物车
  {
    name:'shopCart',
    path:'/shopCart',
    component:() => import('../pages/ShopCart'),
    meta:{show:true}
  },
  // 交易页面
  {
    name:'trade',
    path:'/trade',
    component:() => import('../pages/Trade'),
    meta:{show:true},
    beforeEnter: (to, from, next) => {
      // 如果是从购物车到交易页面，就放行
      if(from.path == '/shopCart'){
        next();
      }else{
        // 不然就停留在当前
        next(false);
      }
    }
  },
  // 支付页面
  {
    name:'pay',
    path:'/pay',
    component:() => import('../pages/Pay'),
    meta:{show:true},
    beforeEnter: (to, from, next) => {
      // 如果是从交易到交易支付页面，就放行
      if(from.path == '/trade'){
        next();
      }else{
        // 不然就停留在当前
        next(false);
      }
    }
  },
  // 支付成功页面
  {
    name:'paySuccess',
    path:'/paySuccess',
    component:() => import('../pages/PaySuccess'),
    meta:{show:true}
  },
  // 个人中心
  {
    name:'center',
    path:'/center',
    component:() => import('../pages/Center'),
    meta:{show:true},
    //二级路由
    children:[
      {
        name:'myOrder',
        path:'myOrder',
        component:() => import('../pages/Center/MyOrder'),
      },
      {
        name:'groupOrder',
        path:'groupOrder',
        component:() => import('../pages/Center/GroupOrder'),
      },
      // 默认路由
      {
        path:'/center',
        redirect:'/center/myOrder'
      }
    ]
  },
  // 重定向，在项目跑起来的时候，访问/的时候，立马让他定向到首页
  {
    path:'*',
    redirect:'/home'
  },
]