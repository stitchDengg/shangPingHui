// 当前这个模块：所有的api进行统一的管理
import requests from './request';
import Mockrequests from "./mockAjax"
// 三级联动的接口
// /api/product/getBaseCategoryList get  无参数
// 发请求返回promise对象
export const reqCategoryList = () => requests({url:'/product/getBaseCategoryList',method:'get'});

// 获取banner（轮播首页轮播图接口）
export const reqGetBannerList = () => Mockrequests({url:'/banner',method:'get'});

// 获取floor接口
export const reqGetFloorList = () => Mockrequests({url:'/floor',method:'get'});


// 获取搜索模块数据 //地址/api/list post  有参数
/* {
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
} */
// 当前这个接口，给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo = (params) => requests({url:'/list',method:'post',data:params})

// 获取商品详情 URl：/api/item/{ skuId } get
export const reqGoodsInfo = (skuId) => requests({url:`/item/${skuId}`,method:'get'});

//将产品添加到购物车中:/api/cart/addToCart/{ skuId }/{ skuNum }（获取更新某一个产品的个数）
export const reqAddOrUpdateShopCat =  (skuId,skuNum) => requests({url:`/cart/addToCart/${ skuId }/${skuNum }`,method:'post'});


// 获取购物车列表
///api/cart/cartList GET
export const reqGetCarList = () => requests({url:'/cart/cartList',method:'get'});

// 删除购物车
// /api/cart/deleteCart/{skuId}
export const reqDeleteCartById = skuId => requests({url:`cart/deleteCart/${skuId}`,method:'DELETE'});

// 切换购物车列表选定状态
// /api/cart/checkCart/{skuID}/{isChecked} GET
export const reqUpdateCartById = (skuId,isChecked) => requests({url:`cart/checkCart/${skuId}/${isChecked}`,method:'get'});

// 获取验证码
// /api/user/passport/sendCode/{phone}
export const reqGetCode = phone => requests({url:`user/passport/sendCode/${phone}`,method:'get'});

// 用户注册
export const register = (phone,password,code) => requests({
  url:'user/passport/register',
  method:'post',
  data:{
    phone,
    password,
    code
  }
})

// 登陆 
///api/user/passport/login
export const reqLogin = (data) => requests({
  url:'user/passport/login',
  method:'post',
  data
})

//获取用户信息
// /api/user/passport/auth/getUserInfo
export const reqGetUserInfo = () => requests({
  url:'user/passport/auth/getUserInfo',
  method:'get'
})

// 退出登陆
// /api/user/passport/logout
export const reqLogout = () => requests({url:'/user/passport/logout',method:'get'});

// 获取用户地址信息
// /api/user/userAddress/auth/findUserAddressList
export const reqAddressInfo = () => requests({url:'user/userAddress/auth/findUserAddressList',method:'get'});

// 获取订单交易页面信息
///api/order/auth/trade
export const reqOrderInfo = () => requests({url:'order/auth/trade',method:'get'});