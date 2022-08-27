/* 这是统一管理项目接口的模块 */
// 当前这个模块：API 进行统一管理
import requests from "./request"

import mockRequest from "./mockAjax"

// 三级联动接口
// /api/product/getBaseCategoryList get 无参数
// 发请求：axios 发请求的返回结果是 Promise 对象

/* export const reqCategoryList = () =>  requests({
    url: "/product/getBaseCategoryList",
    method: "get"
}) */

// 对外暴露一个函数，只要外部调用这个函数，就向服务器发起 ajax 请求，获取三级菜单数据，当前这个函数只需要把服务器返回的数据返回即可
export const reqCategoryList = () => {
    return requests({
        url: "/product/getBaseCategoryList",
        method: "get"
    })
}

// 获取 ListContainer 数据
export const reqGetBannerList = () => mockRequest.get("/banner")

// 获取 Floor 数据
export const reqFloorList = () => mockRequest.get("/floor")


/* 获取搜索数据
   地址：/api/list
   请求方式：post
   参数：需要带参数
*/
export const reqGetSearchInfo = (params) => requests({
    url: "/list",
    method: "post",
    data: params
})

/*  获取详情数据 
    要传参数【商品的 ID】
*/
export const reqDetail = (skuId) => requests({
  url: `/item/${skuId}`,
  method: "get"
})

// 产品添加到购物车【获取更新某个产品的数量】
export const reqShopCart = (skuid, skuNum) => requests({
  url: `/cart/addToCart/${skuid}/${skuNum}`,
  method: 'post'
})

// 获取购物车列表信息
export const reqShopCartList = () => requests({
  url: '/cart/cartList',
  method: 'get'
})