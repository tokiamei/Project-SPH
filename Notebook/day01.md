# day01笔记

## 1.vue-cli 脚手架
node + webpack + 淘宝镜像

node_modules 文件夹：项目依赖文件夹

public 文件夹：一般放置一些静态资源（图片），需要注意，放在 public 文件夹中的静态资源，webpack 进行打包的时候，会原封不动打包到 dist 文件夹中
src 文件夹（程序员源代码文件夹）：
    assets 文件夹：一般也是放置静态资源（一般放置多个组件公用的静态资源），需要注意，放置在 asstes 文件夹里面的静态资源，在 webpack 打包的时候，webpack 会把静态资源当做一个模板，打包到 JS 文件里面

    components 文件夹：一般放置的是非路由组件（全局组件）

    APP.vue：唯一的根组件，Vue 当中的组件（.vue）
    main.js：程序入口文件，也是整个程序最先执行的文件

babel.config.js：配置文件（babel 相关）

package.json 文件：认为项目【身份证】，记录项目叫做什么、项目中有哪些依赖、项目怎么运行

package-lock.json：缓存行文件

README.md：说明性文件

## 2.项目其他配置

### 2.1 项目运行起来的时候，让浏览器自动打开
-- package.json

```json
    "scripts": {
    "serve": "vue-cli-service serve --open --host=localhost",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
```

### 2.2 eslint校验功能关闭
-- 在根目录下，创建一个 vue.config,js
`lintOnSave: false`

### 2.3 src 文件夹简写方法，配置别名

## 3.路由分析

## 4.完成非路由组件 header 与 footer 的业务
在开发项目的时候：
1. 书写静态页面（HTML+CSS）
2. 拆分组件
3. 获取服务器的数据动态展示
4. 完成响应的动态业务逻辑

注意：创建组件的时候，组件结构 + 组件的样式 + 图片资源

### 4.1、使用组件步骤
创建 引入 注册 使用

## 5、路由组件搭建
路由组件四个：Home、Search、Login、Register

-components 文件夹：放置的非路由组件（也放共用全局组件）
-pages|views 文件夹：放置路由组件

### 5.1、配置路由
路由一般放在 router 文件夹中
index.js

### 5.2、总结
> 路由组件和非路由组件的区别 ？

1. 文件存放的位置不同
  - 路由组件 -- pages 文件夹
  - 非路由组件 -- components 文件夹
2. 路由组件需要在入口文件 main.js 中引入并使用
3. 注册完路由，不管路由组件、还是非路由组件身上都有 $route 和 $router 属性

> $route 与 \$router 区别

- $route：一般用于获取路由信息【路径、query、params 参数等】
- $router：一般进行编程式导航进行路由跳转【push|replace】

### 5.3、路由的跳转

路由的跳转有两种形式：
1. 声明式导航 router-link，可以进行路由的跳转
2. 编程式导航 push|replace，可以进行路由跳转

声明式导航能做的，编程式导航都能做，编程式导航能做一些声明式导航做不了的（包括一些其他的业务逻辑）

## 6、Footer 组件的显示与隐藏

Footer 组件：
- 在 Home、Search 显示
- 在 Login、Register 隐藏

### 6.1、我们可以根据组件身上的 $route 获取当前路由的信息，通过路由路径判断 Footer 的显示与隐藏

```js
    computed: {
        isShow() {
          return (this.$route.path === "/home" || this.$route.path === "/search") ? true : false
        }
  }
```

### 6.2、配置路由 meta 属性

配置路由的时候，可以给路由添加路由元信息【meta】，路由需要配置对象，key 不能乱写

## 7、路由传参

### 7.1、路由跳转的几种方式
- 声明式导航：router-link（必须有 to 属性），可以实现路由的跳转
- 编程式导航：利用的是组件实例的 $router.push | replace 方法，可以实现路由的跳转（可以书写一些自己业务）

### 7.2、路由传参，参数有几种写法 ？
params 参数：属于路径当中的一部分，需要注意，在配置路由的时候，需要占位
query 参数：不属于路径当中的一部分，类似于 ajax 中的 queryString /home?k=v&kv=, 不需要占位

## 8、路由传参相关面试题

1. 路由传递参数（对象写法）path 是否可以结合 params 一起使用 ？
答：路由传参的时候，对象写法可以是 name, path 形式，但是需要注意的是，path 这种写法不能与 params 参数一起使用 

2. 如何指定 params 参数可不传 ？
比如：配置路由的时候，占位了（params 参数），但是路由跳转的时候就不传值
路径就会出现问题
`http://localhost:8080/#/?k=QWE`
search 没了
答：如果指定 params 参数可以传递、可以不传递，在配置路由的时候，在站位的后面加一个**问号**【问号就代表着 params 可以传递，也可以不传递】

3. params 参数可以传递也可不传递，但是如果传递是空值，如何解决 ？
答：使用 undefined 解决：params 参数可以传递、不传递（空的字符串）

4. 路由组件能不能传递 props 数据 ？
答：可以
第一种：
布尔值写法：`props: true`（params）