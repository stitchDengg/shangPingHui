// 路由配置信息
import Home from '../pages/Home';
import Search from '../pages/Search'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Detail from '../pages/Detail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
export default [
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
    name:'login',
    path:'/login',
    component:Login,
    meta:{show:false}
  },
  {
    path:'/register',
    component:Register,
    meta:{show:false}
  },
  { 
    name:'detail',
    path:'/detail/:skuId',
    component:Detail,
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
    component:AddCartSuccess,
    meta:{show:true}
  },
  // 购物车
  {
    name:'shopCart',
    path:'/shopCart',
    component:ShopCart,
    meta:{show:true}
  },
  // 交易页面
  {
    name:'trade',
    path:'/trade',
    component:Trade,
    meta:{show:true}
  },
  // 支付页面
  {
    name:'pay',
    path:'/pay',
    component:Pay,
    meta:{show:true}
  },
  // 重定向，在项目跑起来的时候，访问/的时候，立马让他定向到首页
  {
    path:'*',
    redirect:'/home'
  },
]