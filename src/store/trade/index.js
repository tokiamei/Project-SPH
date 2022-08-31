import { reqAddressInfo, reqOrderInfo } from '@/api'

const state = {
  addressInfo: {},
  orderInfo: {}
}

const actions = {
  // 获得用户地址信息
  async addressInfo({ commit }) {
    const result = await reqAddressInfo()
    if (result.code == 200) {
      commit('ADDRESSINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('获取用户地址失败'))
    }
  },
  // 获取用户订单信息
  async getOrderInfo({ commit }) {
    const result = await reqOrderInfo()
    if (result.code == 200) {
      commit('GETORDERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('请求用户订单信息失败'))
    }
  }
}

const mutations = {
  ADDRESSINFO(state, addressInfo) {
    state.addressInfo = addressInfo
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo
  }
}

const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}