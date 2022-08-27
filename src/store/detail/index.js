import { reqDetail, reqShopCart } from '@/api'
// 封装游客身份模块 uuid ---> 生成一个随机的字符串【不能在变】
import { getUUID } from '@/utils/uuidToken'
const state = {
  detailInfo: {},
  uuidToken: getUUID()
}

const actions = {
  async reqDetailInfo({ commit }, skuId) {
    const result = await reqDetail(skuId)
    // console.log(result);
    result.code === 200 && commit('REQDETAILINFO', result.data)
  },
  async reqShopCartInfo({ commit }, { skuid, skuNum }) {
    const result = await reqShopCart(skuid, skuNum)
    // 加入购物车成功
    if (result.code == 200) {
      return 'OK'
    } else {
      // 加入购物车失败
      return Promise.reject(new Error('Fail'))
    }
  }
}

const mutations = {
  REQDETAILINFO(state, detailInfo) {
    state.detailInfo = detailInfo
  }
}

const getters = {
  // 导航路径
  categoryView(state) {
    // 这里为什么要加一个或空对象 ?
    // 因为不加的话控制台会报错，因为这个返回结果可能是 undefined，undefined.[] 肯定就报错了
    return state.detailInfo.categoryView || {}
  },
  // 简化产品信息数据
  skuInfo(state) {
    return state.detailInfo.skuInfo || {}
  },
  // 产品售卖属性的变化
  spuSaleAttrList(state) {
    return state.detailInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}