import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from "./router"

// 引入 store 仓库
import store from "./store"

// 三级联动组件--全局组件【分类组件】
import TypeNav from "@/components/TypeNav"
// 轮播图组件--全局组件
import Carousel from "@/components/Carousel"
// 分页器组件--全局组件
import Pagination from '@/components/Pagination'
// 使用全局组件，第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

// 引入 MockServe.js -- mock 数据
import "@/mock/mockServe"

// 引入 Swiper 样式
import "swiper/css/swiper.css"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  // 写着行代码的时候组件身上会多个 store 属性
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')