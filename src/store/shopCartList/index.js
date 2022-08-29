import { reqShopCartList, reqDeleteShop, reqUpdateIsChecked } from '@/api'

const state = {
  shopCartList: []
}

const actions = {
  // 请求购物车列表信息
  async reqShopCartListInfo({ commit }) {
    const result = await reqShopCartList()
    // console.log(result.data);
    if (result.code == 200) {
      commit('SHOPCARTLIST', result.data)
    }
  },
  // 请求删除商品
  async deleteShop({ commit }, skuid) {
    let result = await reqDeleteShop(skuid)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  async updateIsChecked({ commit }, { skuId, isChecked }) {
    await reqUpdateIsChecked(skuId, isChecked)
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