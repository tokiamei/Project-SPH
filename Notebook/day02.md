
# 1.为什么编程式路由跳转到当前路由（参数不变），多次执行会抛出 NavigationDuplicated 的警告错误？

-- 路由跳转有两种形式：声明式导航、编程式导航
-- 声明式导航没有这类问题，因为 bue-router 底层已经处理好了

## 1.1、为什么编程式导航进行路由跳转的时候，就有这种警告错误呢 ？
"vue-router": "^3.5.3": 最新的 vue-router 引入了 promise
push 方法会返回 promise 对象

## 1.2、通过给 push 方法传递响应的成功、失败的回调函数，可以捕获到当前错误，可以解决。

```js
this.$router.push({
        name: "search",
        params: {
        keyWord: this.keyWord,
        },
        query: {
        k: this.keyWord.toUpperCase()
        }
    }, 
    () => {}, 
    () => {})
```
- 但是这种方法治标不治本，将来在的组件中 push | replace，编程序导航还是会有类似错误。

## 1.3、重写 push & replace 函数
this：当前组件实例（search）
this.$router 属性：当前的这个属性，值是 VueRouter 构造函数的一个实例，当在入口文件注册路由的时候，给组件实例添加 $router | $route 属性
push：VueRouter 类原型的一个方法


# 2、Home 模块组件拆分
-- 先把静态组件完成
-- 拆分出静态组件
-- 获取服务器的数据进行展示
-- 动态业务

# 3、三级联动组件完成

---由于三级联动，在 Home、Search、Detail 中都有，把三级联动注册为全局组件。
好处：只需要注册一次，就可以在项目任意地方使用

# 4、完成其余静态组件
HTML + CSS + 图片资源 ---信息【结构、样式、图片资源】

# 5、POSTMAN 测试接口

--`http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList`接口可以使用
-- 如果服务器返回的数据 code 字段 200，代表服务器返回数据成功
-- 整个项目，接口前缀都有 /api 字样

# 6、axios 二次封装

XMLHttpRequest、fetch、JQ、axios

## 6.1、为什么要二次封装 axios ？

请求拦截器：可以在发请求之前处理一些业务
响应拦截器：服务器数据返回后，处理一些事情

## 6.2、在项目中经常有 API 文件夹【axios】（在 src 下）
接口当中：路径都带有 `/api`
baseURL: "/api" -- 简化路径的书写

## 6.3、记不住查文档

# 7、接口统一管理

项目很小：完全可以在组件的生命周期函数中发请求
项目大：axios.get("xxx")

## 7.1、跨域问题

跨域：协议、域名、端口号有一个不同，都称之为跨域
JSONP、CROS、代理

## 8、nprogress 进度条的使用
start：进度条开始
done：进度条结束
进度条颜色可以修改，需要修改 CSS 样式

## 9、vues 状态管理库

### 9.1、vuex 是什么 ？
vuex 是官方提供的一个插件，状态管理库，集中式管理项目中组件共用的数据。

切记，并不是全部项目都需要 Vuex，如果项目很小，完全不需要 Vuex，如果项目很大，组件很多、数据很多，数据维护很费劲，Vuex

state：仓库存储数据的地方
mutations：修改 state 的唯一手段
actions：处理 actions，可以书写自己的业务逻辑，也可以处理异步
getters：可以理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
modules

## 9.2、vuex 基本使用

## 9.3、vuex 实现模块式开发

如果项目过大，组建过多，接口也很多，数据也很多，可以让 Vuex 实现模块式开发
模拟 state 存储数据
{
    count: 1
}