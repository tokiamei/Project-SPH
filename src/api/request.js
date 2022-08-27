// 对 axios 进行二次封装
import axios from "axios"
// 引入进度条
import nprogress from "nprogress"
// start：进度条开始
// done：进度条结束

// 引入进度条样式
import "nprogress/nprogress.css"


// 1.利用 axios 对象的 create 方法，去创建一个 axios 实例
// 2.request 就是 axios，不过需要配置一下
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求的时候，路径中会出现 api
    baseURL: "/api",
    // 代表请求超时时间 5s
    timeout: 5000
})

// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use( (config) => {
    // config: 配置对象，在对象中有一个很重要的属性：headers 请求头
    // 请求头加一个字段【userTempId】: 和后台老师商量好的
    if (localStorage.getItem('UUIDTOKEN')) {
      config.headers.userTempId = localStorage.getItem('UUIDTOKEN')
    }
    // 进度条开始
    nprogress.start()
    return config
})

// 响应拦截器
requests.interceptors.response.use(
    (res) => {
        // 进度条结束
        nprogress.done()
        return res.data
    },
    (error) => {
        return Promise.reject('😶‍🌫️😶‍🌫️😶😶', error)
    }
)

export default requests