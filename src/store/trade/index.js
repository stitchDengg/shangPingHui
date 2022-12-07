import { reqAddressInfo , reqOrderInfo} from '@/api';
const state = {
  addrssInfo:[],
  orderInfo:{},
};
const actions = {
  // 获取用户地址信息
  async getUserAddress({commit}){
    let res = await reqAddressInfo();
    if(res.code == 200){
      console.log(res);
      commit('GETUSERADDRESS',res.data);
      return 'ok';
    }else{
      return Promise.reject(new Error('获取地址信息失败'));
    }
  },
   // 获取订单页面信息
   async getOrderInfo({commit}){
    let res = await reqOrderInfo();
    if(res.code == 200){
      console.log(res);
      commit('GETORDERINFO',res.data);
      return 'ok';
    }else{
      return Promise.reject(new Error('获取订单信息失败'));
    }
  }
};
const mutations = {
  GETUSERADDRESS(state,data){
    state.addrssInfo = data;
  },
  GETORDERINFO(state,data){
    state.orderInfo = data;
  },
};
const getters = {

};

export default {
  state,
  actions,
  mutations,
  getters
}