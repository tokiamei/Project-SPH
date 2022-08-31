/* 存放路由组件配置的模块 */
// 引入路由组件
import Home from "@/pages/Home"
import Search from "@/pages/Search"
import Login from "@/pages/Login"
import Register from "@/pages/Register"
import Detail from "@/pages/Detail"

export default [
  {
    name: "home",
    path: "/home",
    component: Home,
    meta: { showFooter: true }
  },
  // 重定向，在项目跑起来的时候，访问 / ，立马让他定位到首页
  {
    path: "*",
    redirect: "/home"
  },
  // 搜索组件
  {
    name: "search",
    path: "/search/:keyword?",
    component: Search,
    meta: { showFooter: true },
    //#region 
      /* 利用 props 传递参数 */
      // 布尔值写法
      // props: true

      // 对象写法
      // props: { a: 1, b: 2 }

      // 函数写法
      // props($route) {
      //     return {
      //         keyWord: $route.params.keyWord,
      //         k: $route.query.k
      //     }
      // }
      //#endregion
  },
  // 登陆组件
  {
    name: 'login',
    path: "/login",
    component: Login,
    meta: { showFooter: false }
  },
  // 注册组件
  {
    name: 'register',
    path: "/register",
    component: Register,
    meta: { showFooter: false }
  },
  // 详情组件
  {
    name: "detail",
    path: "/detail/:skuid",
    component: Detail,
    meta: { showFooter: true }
  },
  // 购物成功路由组件
  {
    name: "addCartSucess",
    path: '/addCartSucess',
    component: () => import('@/pages/AddCartSuccess'),
    meta: { showFooter: true }
  },
  // 购物车路由组件
  {
    name: 'shopCart',
    path: '/shopCart',
    component: () => import('@/pages/ShopCart'),
    meta: { showFooter: true }
  },
  // 交易组件
  {
    name: 'trade',
    path: '/trade',
    component: () => import('@/pages/Trade'),
    meta: { showFooter: true }
  }

]