// search模块的小仓库
// state仓库存储数据的地方
import {reqGetSearchInfo} from '@/api'
const state = {
  searchList:{},
};

// actions 处理action,书写自己的业务逻辑，也可以处理异步
const actions = {
  // 获取search模块的数据
  async getSearchList({commit},params){
    // 当前这个reqGetSearchInfo传递参数的时候至少传递一个空对象
    let res =  await reqGetSearchInfo(params);
    if(res.code === 200){
      commit("GETSESRCHLIST",res.data);
    }
  }
};
// mutations:修改state的唯一手段
const mutations = {
  GETSESRCHLIST(state,searchList){
    state.searchList = searchList;
  }
};
// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
  goodList(state){
    return state.searchList.goodsList || [];
  },
  attrsList(state){
    return state.searchList.attrsList || [];
  },
  trademarkList(state){
    return state.searchList.trademarkList || [];
  },
  total(){
    return state.searchList.total;
  }
};
export default{
  state,
  actions,
  mutations,
  getters,
}