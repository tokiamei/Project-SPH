/* 这是统一管理项目接口的模块 */
// 当前这个模块：API 进行统一管理
import requests from "./request"

// mock 数据
import mockRequest from "./mockAjax"

/* ================================== 三级联动接口 ========================= */
// 对外暴露一个函数，只要外部调用这个函数，就向服务器发起 ajax 请求，获取三级菜单数据，当前这个函数只需要把服务器返回的数据返回即可
export const reqCategoryList = () => {
    return requests({
        url: "/product/getBaseCategoryList",
        method: "get"
    })
}

/* ==================================== 获取 ListContainer 数据 ========================= */
export const reqGetBannerList = () => mockRequest.get("/banner")

/* =================================== 获取 Floor 数据 ===================================== */
export const reqFloorList = () => mockRequest.get("/floor")


/* ================================ 搜索模块的请求 ======================================*/
export const reqGetSearchInfo = params => requests({
    url: "/list",
    method: "post",
    data: params
})

/* ================================ 详情模块的请求 ====================================== */

/*  获取详情数据 
    要传参数【商品的 ID】
*/
export const reqDetail = skuId => requests({
  url: `/item/${skuId}`,
  method: "get"
})

// 产品添加到购物车【获取更新某个产品的数量】
export const reqShopCart = (skuid, skuNum) => requests({
  url: `/cart/addToCart/${skuid}/${skuNum}`,
  method: 'post'
})


/* ============================== 购物车模块的请求 ================================= */
// 获取购物车列表信息
export const reqShopCartList = () => requests({
  url: '/cart/cartList',
  method: 'get'
})

// 删除购物车中某种商品
export const reqDeleteShop = skuid => requests({
  url: `/cart/deleteCart/${skuid}`,
  method: 'delete'
})

// 修改购物车中某种商品的选中状态
export const reqUpdateIsChecked = (skuId, isChecked) => requests({
  url: `/cart/checkCart/${skuId}/${isChecked}`,
  method: 'get'
})


/* ============================= 登陆注册模块的请求 ============================ */
// 请求验证码 '/api/user/passport/sendCode/{phone}
export const reqGetCode = phone => requests({
  url: `/user/passport/sendCode/${phone}`,
  method: 'get'
})

// 用户请求注册
export const reqUserRegister = params => requests({
  url: '/user/passport/register',
  method: 'post',
  data: params
})

// 用户请求登陆
export const reqLogin = params => requests({
  url: '/user/passport/login',
  method: 'post',
  data: params
})

// 获取用户信息 
export const reqUserInfo = () => requests({
  url: '/user/passport/auth/getUserInfo',
  method: 'get'
})