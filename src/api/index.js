// 当前这个模块：所有的api进行统一的管理
import requests from './request';

// 三级联动的接口
// /api/product/getBaseCategoryList get  无参数
// 发请求返回promise对象
export const reqCategoryList = () => requests({url:'/product/getBaseCategoryList',method:'get'});


