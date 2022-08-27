import { reqShopCartList } from '@/api'

const state = {
  shopCartList: []
}

const actions = {
  async reqShopCartListInfo({ commit }) {
    const result = await reqShopCartList()
    console.log(result.data);
    if (result.code == 200) {
      commit('SHOPCARTLIST', result.data)
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