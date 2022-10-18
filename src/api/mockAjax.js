// 对于axios进行二次封装
import axios from "axios";
import { Promise } from "core-js";
// 引入进度条
import nProgress from "nprogress";
// 引入进度条样式
import "nprogress/nprogress.css"
// start方法代表进度条开始 done方法代表进度条结束


// 1.利用axios对象的方法create创建一个axios实例
// 2.request就是axios，只不过稍微配置一下
const Mockrequests = axios.create({
  // 配置对象

  // 基础路径
  baseURL:'/mock',
  // 代表请求发送的时间超过5s没回应就代表失败了
  timeout:5000,
});


// 请求拦截器:在请求发送之前，请求拦截器可以检测到，可以在请求发送之前做一些事情
Mockrequests.interceptors.request.use((config) => {
  // config:配置对象，对象理由有一个属性，header请求头
    // 进度条开始动
  nProgress.start();
  return config;
})


// 响应拦截器
Mockrequests.interceptors.response.use(res => {
  // 服务器成功的回调函数：服务器响应数据回来以后可以监测到，可以做一些事情
  // 进度条结束
  nProgress.done();
  return res.data;
},err => {
  // 服务器失败的回调函数
  console.log(err);
  return Promise.reject(new Error('faile'));
})

export default Mockrequests;