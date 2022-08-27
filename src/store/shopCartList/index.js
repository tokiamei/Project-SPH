import { reqShopCartList, reqDeleteShop } from '@/api'

const state = {
  shopCartList: []
}

const actions = {
  async reqShopCartListInfo({ commit }) {
    const result = await reqShopCartList()
    // console.log(result.data);
    if (result.code == 200) {
      commit('SHOPCARTLIST', result.data)
    }
  },
  async deleteShop({ commit }, skuid) {
    let result = await reqDeleteShop(skuid)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  }
}

const mutations = {
  SHOPCARTLIST(state, shopCartList) {
    state.shopCartList = shopCartList
  }
}

const getters = {
  cartList(state) {
    // console.log('+++', state);
    return state.shopCartList[0] || {}
  }
}

export default {
  state, 
  actions,
  mutations,
  getters
}