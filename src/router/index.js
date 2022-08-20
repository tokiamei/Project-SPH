/* 配置路由 */

// 引入 Vue 和 VueRouter
import Vue from "vue"
import VueRouter from "vue-router"

// 使用插件
Vue.use(VueRouter)

import routes from './routes'

// 先把 VueRouter 原型对象的 push，先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

// 重写 push | replace
// 第一个参数：告诉原来 push 函数，你要往哪里跳（传递哪些参数）
/* 
  call 和 apply 区别
  相同点，都可以调用函数一次，都可以篡改函数的上下文一次
  不同点：call 和 apply 传递参数：call 传递参数用逗号隔开，apply 方法执行，传递数组
*/

VueRouter.prototype.push = function(location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}

VueRouter.prototype.replace = function(location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, resolve, reject)
    } else {
        originReplace.call(this, () => {}, () => {})
    }
}

export default new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
      // return 期望滚动到哪个的位置 y = 0 表示滚动条在最上方
      return { y: 0 }
    } 
})
