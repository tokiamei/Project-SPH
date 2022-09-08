/* 存放路由组件配置的模块 */
// 引入路由组件【非动态引入】
// import Home from "@/pages/Home"

// 路由懒加载--动态加载路由
const foo = () => {
  console.log('*****');
  return import('@/pages/Home')
}

export default [
  {
    name: "home",
    path: "/home",
    // component: Home,
    component: foo,
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
    component: () => import('@/pages/Search'),
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
    component: () => import('@/pages/Login'),
    meta: { showFooter: false }
  },
  // 注册组件
  {
    name: 'register',
    path: "/register",
    component: () => import('@/pages/Register'),
    meta: { showFooter: false }
  },
  // 详情组件
  {
    name: "detail",
    path: "/detail/:skuid",
    component: () => import('@/pages/Detail'),
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
    meta: { showFooter: true },
    // 想进入交易路由，必须从购物车来，不然从哪来回哪去
    beforeEnter: (to, from, next) => {
      if (from.path == '/shopCart') {
        next()
      } else {
        // 从哪来，回哪去
        next(false)
      }
    }
  },
  // 支付组件
  {
    name: 'pay',
    path: '/pay',
    component: () => import('@/pages/Pay'),
    meta: { showFooter: true },
    // 这里也需要路由独享守卫，必须从交易页面过来，才能进入支付组件
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  // 支付成功路由
  {
    name: 'paySucess',
    path: '/paySucess',
    component: () => import('@/pages/PaySuccess'),
    meta: { showFooter: true }
  },
  // 个人中心路由
  {
    name: 'center',
    path: '/center',
    component: () => import('@/pages/Center'),
    meta: { showFooter: true },
    // 二级路由
    children: [
      {
        name: 'myOrder',
        path: 'myOrder',
        component: () => import('@/pages/Center/MyOrder')
      },
      {
        name: 'groupOrder',
        path: 'groupOrder',
        component: () => import('@/pages/Center/GroupOrder')
      },
      // 重定向
      {
        path: '/center',
        redirect: '/center/myOrder',
      }
    ]
  }

]