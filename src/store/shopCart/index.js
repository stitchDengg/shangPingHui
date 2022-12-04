import { reqGetCarList, reqDeleteCartById } from '@/api'

const state = {
  cartList: [],
};
const actions = {
  // 获得购物车列表
  async getCarList({ commit }) {
    let res = await reqGetCarList();
    console.log(res);
    if (res.code == 200) {
      commit('GETCARLIST', res.data);
    }
  },
  // 删除购物车某一个产品
  async DeleteCartById({ commit }, skuId) {
    let res = await reqDeleteCartById(skuId);
    if (res.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('请求失败'));
    }
  },
}
const mutations = {
  GETCARLIST(state, cartList) {
    state.cartList = cartList;
  }
};
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  },
};
export default {
  state,
  actions,
  mutations,
  getters
}