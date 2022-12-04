// 获取接口
import {reqGoodsInfo, reqAddOrUpdateShopCat} from '@/api';
import {getUuid} from '@/utils';
const state = {
  goodsInfo:{},
  // 游客的临时身份
  uuid_token:getUuid(),
};


const actions = {
  // 得到商品信息
  async getGoodsInfo({commit},skuid){
    let res = await reqGoodsInfo(skuid);
    commit('GETGOODINFO',res.data)
  },

  // 将产品添加到购物车中
  async addOrUpdateShopCat({commit},{skuid,skuNum}){
    let res = await reqAddOrUpdateShopCat(skuid,skuNum);
    if(res.code == 200){
      return 'ok';
    }else{
      return Promise.reject(new Error('faile'));
    }
  }
}

const mutations = {
  GETGOODINFO(state,data){
    state.goodsInfo = data;
  }
}

const getters = {
  categoryView(state){
    // 为了防止页面渲染的时候还没有请求到数据导致undefined报错 必须传一个空对象过去
    return state.goodsInfo.categoryView || {};
  },
  price(state){
    return state.goodsInfo.price || {};
  },
  skuInfo(state){
    return state.goodsInfo.skuInfo || {};
  },
  spuSaleAttrList(state){
    return state.goodsInfo.spuSaleAttrList || {};
  },
}

export default {
  state,
  actions,
  mutations,
  getters
}