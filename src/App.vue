<template>
  <div>
    <!-- <h1 v-upper>呵呵</h1> -->
    <Header/>
    <!-- 路由组件的出口位置 -->
    <router-view></router-view>
    <!-- 在 Home、Search 显示，在登录、注册隐藏 -->
    <Footer v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
import Header from "./components/Header"
import Footer from "./components/Footer"
export default {
  name: "App",
  components: { Header, Footer },
  mounted() {
    // console.log("我是根组件")
    // 派发一个 action||获取shangpin分裂的三级列表数据
    // 本来是放在 TypeNav 中的，但是考虑到子组件会重复销魂产生，会发很多次请求，没这个必要，而 APP 的 mounted 只会执行一次，所以放在 App 组件
    this.$store.dispatch("CategoryList")
  }
}
</script>

<style scoped>

</style>