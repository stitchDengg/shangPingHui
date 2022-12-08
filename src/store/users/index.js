import {reqGetCode,reqLogin,reqGetUserInfo} from '@/api';
import { Promise } from 'core-js';
const state = {
  checkCode:'',
  token:'',
  userInfo:{},
};
const actions = {
  // 注册业务
  async getCode({commit},phone){
    let res = await reqGetCode(phone);
    if(res.code == 200){
      commit('GETCODE',res.data)
    }else{
      return Promise.reject(new Error('获取验证码失败'))
    }
  },
  // 登陆业务
  async userLogin({commit},data){
    let res = await reqLogin(data);
    if(res.code == 200){
      // 服务器下发token，用户唯一标识符
      // 将来通过带token来找服务器要用户信息进行展示
      commit('USERLOGIN',res.data.token);
      localStorage.setItem('token',res.data.token);
      return 'ok';
    }else{
      alert(res.message);
      return Promise.reject(new Error('获取信息失败'));
    }
  },
  // 获取用户信息
  async getUserInfo({commit}){
    let res =  await reqGetUserInfo();
    if(res.code == 200){
      console.log(res.data);
      commit('GETUSERINFO',res.data);
      return 'ok';
    }else{
      return Promise.reject(new Error('获取用户信息失败'));
    }
  }
};
const mutations = {
  GETCODE(state,value){
    state.checkCode = value;
  },
  USERLOGIN(state,value){
    state.token = value;
  },
  GETUSERINFO(state,value){
    state.userInfo = value;
  }
};
const getters = {
  
};

export default {
  state,
  actions,
  mutations,
  getters
}