import { v4 as uuidv4 } from 'uuid';
// 节流函数 确保事件只在会在特定时间执行一次
function thorottling(fun, delay) {
  let clock = true;
  return function () {
    let that = this;
    let args = arguments;
    if (clock) {
      fun.call(that,...args);
      clock = false;
    }
    setTimeout(() => {
      clock = true;
    }, delay);
  };
};

 //防抖函数，确保连续的事件只会执行最后一次
function debounce(fun, delay) {
  console.log('denghao');
  let timer = null;
  return function debounced() {
    // 确保this指向不变
    let that = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fun.call(that, ...args);
    }, delay);
  };
}

// 生成一个随机的字符串，且每次执行不能发生变化
function getUuid(){
  // 先从本地存储获取（如果有，就从本地获取）
  let uuid_token = localStorage.getItem('UUIDTOKEN');
  // 如果没有，就生成
  if(!uuid_token){
    // 生成游客临时身份
    uuid_token = uuidv4();
    localStorage.setItem('UUIDTOKEN',uuid_token);
  }
  return uuid_token;
}
export {thorottling,debounce,getUuid}