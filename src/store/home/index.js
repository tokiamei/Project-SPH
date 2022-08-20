// 引入 二次封装的 axios 函数
import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api"

// home 模块的小仓库
const state = {
    // home 模块的仓库
    categoryList: [],
    // 轮播图的数据
    bannerList: [],
    floorList: []
}
const actions = {
    async CategoryList({commit}) {
        // console.log('===')
        const result = await reqCategoryList()
        // console.log(result)
        // 如果状态码等于 200，就 commit
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data)
        }
    },
    async getBannerList({commit}) {
        const result = await reqGetBannerList()
        // console.log(result) // OK
        if (result.code === 200) {
            commit("GETBANNERLIST", result.data)
        }
    },
    async getFloorList({commit}) {
        let result = await reqFloorList()
        // console.log(result)
        if (result.code === 200) {
            commit("GETFLOORLIST", result.data)
        }
    }
}
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
    
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}