/* 
  用户注册与登陆的模块
*/
import { reqGetCode, reqUserRegister, reqLogin, reqUserInfo, reqLogOut } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'

const state = {
  token: getToken(),
  userInfo: {}
}

const actions = {
  // 请求验证码【验证码无需存储到 state 中】
  async getCode({ commit }, phone) {
      const result = await reqGetCode(phone)
      if (result.code == 200) {
        return result.data
      } else {
        return Promise.reject(new Error('请求验证码失败'))
      } 
  },
  // 用户注册
  async userRegister({ commit }, params) {
      const result = await reqUserRegister(params)
      // 返回是否注册成功
      if (result.code == 200) {
        return 'ok'
      } else {
        return Promise.reject('注册失败')
      }
  },
  // 用户登陆
  async userLogin({ commit }, params) {
    const result = await reqLogin(params)
    if (result.code == 200) {
      commit('USERLOGIN', result.data.token)
      setToken(result.data.token)
      return 'ok'
    }
    else return Promise.reject('登陆失败')
  },
  // 获取用户信息
  async userInfo({ commit }) {
    const result = await reqUserInfo()
    // console.log(result);
    if (result.code == 200) {
      commit('USERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('请求用户信息失败'))
    }
  },
  // 用户退出登陆
  async logOut({ commit }) {
    const result = await reqLogOut()
    if (result.code == 200) {
      commit('LOGOUT')
      return 'ok'
    } else {
      return Promise.reject(new Error('用户退出登陆失败'))
    }
  }
}

const mutations = {
  USERLOGIN(state, token) {
    state.token = token
  },
  USERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  LOGOUT(state) {
    state.token = ''
    state.userInfo = {}
    removeToken()
  }
}

const getters = {
  userName(state) {
    return state.userInfo.name
  }
}

export default {
  state, 
  actions,
  mutations,
  getters
}