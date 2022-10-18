// home模块的小仓库
// state仓库存储数据的地方
import {reqCategoryList} from "@/api"
import {reqGetBannerList} from "@/api"
const state = {
  // 默认初试值别瞎写，服务器返回的是数组，起始值就是数组
  categoryList:[],
  bannerList:[],
};

// actions 处理action,书写自己的业务逻辑，也可以处理异步
const actions = {
  // 通过api里面的接口，像服务器发请求，获取服务器里的数据
  async categoryList({commit}){
    // 使用aiwit返回promies对象的值
    let res = await reqCategoryList();
    if(res.code == 200){
      let arr = []
      for(let i = 0;i < 16; i ++){
        arr.push(res.data[i]);
      }
      commit('CATEGORYLIST',arr)
    }
  },
  // 向mock发布请求，获取banner数据
  async getBannerList({commit}){
    let res = await reqGetBannerList();
    console.log(res);
    if(res.code === 200){
      commit("GETBANNERLIST",res.data);
    }
  }
};
// mutations:修改state的唯一手段
const mutations = {
  CATEGORYLIST(state,categoryList){
    state.categoryList = categoryList;
  },
  GETBANNERLIST(state,bannerList){
    state.bannerList = bannerList;
  }
};
// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {};
export default{
  state,
  actions,
  mutations,
  getters,
}