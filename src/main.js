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

// 引入 MockServe.js -- mock 数据
import "@/mock/mockServe"

// 引入 Swiper 样式
import "swiper/css/swiper.css"

// 引入所有 API【这是为了不使用 Vuex，把请求放在组件里发送】
import * as API from '@/api'

// 引入 element-UI 
import { Button, MessageBox } from 'element-ui'

// 引入自定义插件
import myPlugin from '@/plugins/myPlugin'
// 引入校验插件【只需要执行一下即可】
import '@/plugins/validate'

// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
import girl from '@/assets/images/girl.gif'
// 使用图片懒加载插件
Vue.use(VueLazyload, {
  loading: girl
})

// 使用自定义插件
Vue.use(myPlugin, {
  name: 'upper'
})

// 使用全局组件，第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)

// 另一种使用方式
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;


// 取消生产模式提醒
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  // 写着行代码的时候组件身上会多个 store 属性
  store,
  beforeCreate() {
    Vue.prototype.$bus = this,
    Vue.prototype.$API = API
  }
}).$mount('#app')