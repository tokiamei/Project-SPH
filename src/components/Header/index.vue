<template>
  <div>
    <header class="header">
      <!-- 头部的第一行 -->
      <div class="top">
        <div class="container">
          <div class="loginList">
            <p>尚品汇欢迎您！</p>
            <p v-if="!userName">
              <span>请</span>
              <router-link to="/login">登录</router-link>
              <router-link class="register" to="/register">免费注册</router-link>
            </p>
            <p v-else>
              <a>{{userName}}</a>
              <a class="register" @click="logOut">退出登录</a>
            </p>
          </div>
          <div class="typeList">
            <router-link to="/center/myOrder">我的订单</router-link>
            <router-link to="/shopCart">我的购物车</router-link>
            <a>我的尚品汇</a>
            <a>尚品汇会员</a>
            <a>企业采购</a>
            <a>关注尚品汇</a>
            <a>合作招商</a>
            <a>商家后台</a>
          </div>
        </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
        <h1 class="logoArea">
          <router-link class="logo" to="/home">
            <img src="./images/logo.png" alt="" />
          </router-link>
        </h1>
        <div class="searchArea">
          <form class="searchForm">
            <input
              type="text"
              id="autocomplete"
              class="input-error input-xxlarge"
              v-model="keyword"
            />
            <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">
              搜索
            </button>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      keyword: ""  
    }
  },
  methods: {
    goSearch() {
      //#region 
      // 模板字符串写法
      // this.$router.push( `/search/${this.keyWord}?k=${this.keyWord.toUpperCase()}` )
      // 对象写法
      /* this.$router.push({
        name: "search",
        params: {
          keyWord: this.keyWord,
        },
        query: {
          k: this.keyWord.toUpperCase()
        }
      }) */
      // 面试题 1：路由传递参数（对象写法）path 是否可以结合 params 一起使用 ？
      // 不可以
      /* this.$router.push({
        path: "/search",
        params: {
          keyWord: this.keyWord,
        },
        query: {
          k: this.keyWord.toUpperCase()
        }
      }) */

      // 面试题 2. 如何指定 params 参数可不传 ？
      /* this.$router.push({
        name: "search",
        query: {
          k: this.keyWord.toUpperCase()
        }
      }) */

      // 面试题 3.params 参数可以传递也可不传递，但是如果传递是空值，如何解决 ？
      /* this.$router.push({
        name: "search",
        params: {
          keyWord: "" || undefined
        },
        query: {
          k: this.keyWord.toUpperCase()
        }
      }) */

      // 4. 路由组件能不能传递 props 数据 ？
      // 不需要走判断了 this.$route.query = {} 也会为 true
      //#endregion
      this.$router.push({
          name: "search",
          params: {
            keyword: this.keyword||undefined,
          },
          query: this.$route.query||undefined
      })
      // 点击我的订单订单跳转到个人中心/我的订单组件
    },
    // 用户退出登录
    async logOut() {
      try {
        await this.$store.dispatch('logOut')
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    /* 通过全局事件总线清楚关键字 */
    this.$bus.$on('clearKeyword', () => this.keyword = '')
  },
  computed: {
    ...mapGetters([ 'userName' ])
  }
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
