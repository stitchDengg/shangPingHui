// 节流函数
function thorottling(fun, delay) {
  let clock = true;
  return function () {
    let args = arguments;
    let that = this;
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

export {thorottling,debounce}