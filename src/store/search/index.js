// search 模块的小仓库
// 引入 api 接口
import { reqGetSearchInfo } from "@/api"
const state = {
    searchList: {}
}
const actions = {
    // 获取 search 模块数据
    /* 当前这个 reqGetSearchInfo 这个函数在调用获取服务器数据的时候，至少传递一个参数【空对象】
       params 参数：是用户在派发 actions 的时候，第二个参数传递过来的
    */
    async getSearchInfo({commit}, params = {}) {
        let result = await reqGetSearchInfo(params)
        // console.log(result.data)
        if (result.code == 200) {
            commit("GETSEARCHINFO", result.data)
        }
    }
}
const mutations = {
    GETSEARCHINFO(state, searchList) {
        state.searchList = searchList
        // console.log(searchList);
    }
}
// 计算属性
// 项目当中的 getters 主要的作用是：简化仓库中的数据
const getters = {
    goodsList(state) {
        // console.log(state.searchList)
        // console.log(state.searchList.goodsList)
        return state.searchList.goodsList||[]
    },
    attrsList(state) {
        return state.searchList.attrsList||[]
    },
    trademarkList(state) {
        return state.searchList.trademarkList||[]
    }
}

export default {
    // namespaced:true,
    state,
    actions,
    mutations,
    getters
}