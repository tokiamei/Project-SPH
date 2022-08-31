/* 配置路由 */

// 引入 Vue 和 VueRouter
import Vue from "vue"
import VueRouter from "vue-router"
import routes from './routes'
import store from '@/store'
// 使用插件
Vue.use(VueRouter)

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

const router = new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
      // return 期望滚动到哪个的位置 y = 0 表示滚动条在最上方
      return { y: 0 }
    } 
})

/* 
  全局前置守卫
  to: 要跳转到那个路由的信息
  from: 获取从哪个路由来的信息
  next: 放行函数 next()【直接调用】
  next('/login') 允许进入哪个组件
*/
router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  const name = store.state.user.userInfo.name
  if (token) {
    // 说明用户已经登陆了，如果他还想去 login【不让去】
    if (to.path == '/login') {
      next('/home')
    } else {
      // 判断是否有用户信息
      if (name) {
        next()
      } else {
        try {
          await store.dispatch('userInfo')
          next()
        } catch (error) {
          // 有 token 还请求用户信息失败，原因只能是 token 失效，这时候强制用户退出登录
          await store.dispatch('logOut')
          next('/login')
        }
      }
    }
  } else {
    next()
  }
})

export default router
