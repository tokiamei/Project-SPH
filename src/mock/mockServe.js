// 先引入 mockjs 模块
import Mock from "mockjs"
// webpack 默认对外暴露的：图片、JSON 数据格式
import banner from "./banner.json"
import floor from "./floor.json"

// mock 数据：第一个参数请求地址    第二个参数：请求数据
Mock.mock("/mock/banner", { code: 200, data: banner})
Mock.mock("/mock/floor", { code: 200, data: floor})
