import Vue from "vue"
import Vuex from "vuex"


// 使用 vuex
Vue.use(Vuex)

// 引入组件小仓库
import home from "./home"
import search from "./search"
import detail from "./detail"
import shopCartList from './shopCartList'
import user from './user'
import trade from './trade'

// 对外暴露 Store 类的一个实例
export default new Vuex.Store({
    // 实现 Vuex 仓库模块化管理数据
    modules: {
        home,
        search,
        detail,
        shopCartList,
        user,
        trade
    }
})