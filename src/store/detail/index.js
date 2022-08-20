import { reqDetail } from '@/api'
const state = {
  detailInfo: {}
}

const actions = {
  async reqDetail({ commit }, skuId) {
    const result = await reqDetail(skuId)
    // console.log(result);
    result.code === 200 && commit('REQDETAIL', result.data)
  }
}

const mutations = {
  REQDETAIL(state, detailInfo) {
    state.detailInfo = detailInfo
  }
}

const getters = {
  categoryView(state) {
    return state.detailInfo.categoryView
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}