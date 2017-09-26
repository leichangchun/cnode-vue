import Vue from 'vue'
import Vuex from 'vuex'

const ADD_USER_INFO = 'ADD_USER_INFO'
const CLEAR_USER_INFO = 'CLEAR_USER_INFO'

// 注入到vue实例
Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    userinfo: {

    }
  },
  getters: { // 第一个参数为state暴露对象，第二个参数为getters暴露对象
    isLogin (state) {  // 派生出登录状态
      return 'loginname' in state.userinfo
    },
    name (state, getters) {
      return getters.isLogin ? state.userinfo.loginname : ''
    },
    url (state, getters) {
      return getters.isLogin ? state.userinfo.avatarurl : ''
    }
  },
  mutations: {
    [ADD_USER_INFO] (state, payload) {
      state.userinfo = payload
      window.sessionStorage.setItem('userinfo', JSON.stringify(payload))   // 刷新页面后 vuex的状态清空 ， 所以写入本地
    },
    [CLEAR_USER_INFO] (state) {
      state.userinfo = {}
      window.sessionStorage.removeItem('userinfo')
    }
  }
})
export default store
