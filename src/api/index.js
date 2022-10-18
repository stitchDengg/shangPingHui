// 当前这个模块：所有的api进行统一的管理
import requests from './request';
import Mockrequests from "./mockAjax"
// 三级联动的接口
// /api/product/getBaseCategoryList get  无参数
// 发请求返回promise对象
export const reqCategoryList = () => requests({url:'/product/getBaseCategoryList',method:'get'});

// 获取banner（轮播首页轮播图接口）
export const reqGetBannerList = () => Mockrequests({url:'/banner',method:'get'});

