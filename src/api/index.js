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