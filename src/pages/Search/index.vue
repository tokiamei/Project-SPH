<template>
  <div>
    <!-- 这是 Search 模块 -->
    <TypeNav />
    <!--list-content-->
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" 
            v-show="searchParams.categoryName"
            >{{searchParams.categoryName}}
            <i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" 
            v-show="searchParams.keyword"
            >{{searchParams.keyword}}
            <i @click="removeKeyowrd">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" 
            v-show="searchParams.trademark"
            >{{ (searchParams.trademark || '').split(':')[1] }}
            <i @click="removeTrademark">×</i>
            </li>
            <!-- 品牌下面属性的面包屑  因为 props 是一个数组，所以需要 v-for 遍历 -->
            <li class="with-x" 
            v-for="(prop, index) in searchParams.props"
            :key="index"
            >{{ prop.split(':')[1] }}
            <i @click="removeProp(index)">×</i>
            </li>
          </ul>
        </div>
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 两种排序【综合 与 价格】，处于的排序有高亮效果 -->
                <li :class="{ active: isOne }" @click="changeOrder(1)">
                  <a>综合
                    <span v-show="isOne" 
                     class="iconfont" 
                     :class="{ 'icon-cc-arrow-circle-down': isDown, 'icon-cc-arrow-circle-up': isUp }">
                    </span>
                  </a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder(2)">
                  <a>价格
                    <span v-show="isTwo" 
                     class="iconfont" 
                     :class="{ 'icon-cc-arrow-circle-down': isDown, 'icon-cc-arrow-circle-up': isUp }">
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售的产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{good.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a :title="good.title">
                      {{good.title}}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a class="sui-btn btn-bordered">收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <!-- 先传一些假数据调试一下看看 -->
          <Pagination 
            :pageNo="searchParams.pageNo" 
            :pageSize="searchParams.pageSize" 
            :total="total" 
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex"
import SearchSelector from "./SearchSelector"
export default {
  components: { SearchSelector },
  data () {
    return {
      searchParams: {
        // 一级 id
        category1Id: undefined, 
        // 二级 id
        category2Id: undefined, 
        // 三级 id
        category3Id: undefined, 
        // 分类名字
        categoryName: undefined,
        // 关键字
        keyword: undefined,
        // 排序: 初始状态应该是: 综合|降序
        order: '1:desc',
        // 分页器参数，代表当前第几页
        pageNo: 1,
        // 每页展示数据的个数
        pageSize: 3,
        props: [],
        trademark: undefined
      }
    }
  },
  // 当组件挂载完毕之前执行一次【先于 mounted 之前】
  beforeMount() {
    this.searchParams = { ...this.searchParams, ...this.$route.query, ...this.$route.params }
  },
  // 组件挂载完毕执行一次【仅仅执行一次】
  mounted() {
    this.getData()
  },
  computed: {
    ...mapGetters(['goodsList']),
    /* isOne 如果为真，则综合高亮，否则，综合不高亮 */
    isOne() {
      return this.searchParams.order.includes(1)
    },
    /* isTwo 如果为真，则价格高亮，否则，价格不高亮 */
    isTwo() {
      return this.searchParams.order.includes(2)
    },
    /* isDown 表示是否降序 */
    isDown() {
      return this.searchParams.order.includes('desc')
    },
    /* isUp 表示是否升序 */
    isUp() {
      return this.searchParams.order.includes('asc')
    },
    /* 获取 search 模块展示产品一共多少数据 */
    ...mapState({
      total: state => state.search.searchList.total
    })
  },
  methods: {
    /* 
      向服务器发请求获取 search 模块数据【根据参数不同返回不同的数据进行展示】
      把这次请求封装成一个函数：当需要调用的时候，调用即可
    */
    getData() {
      this.$store.dispatch("getSearchInfo", this.searchParams)
    },
    removeCategoryName() {
      this.clearCategoryId()
      /* 
        带给服务器的参数说明写的是可有可无，如果属性值为空字符串，还是会把它带给服务器
        但是如果把相应字段变为 undefined，这个字段就不会传递给服务器
      */
      this.searchParams.categoryName = undefined
      this.getData()
      /* 地址栏也需要改：进行路由跳转 */
      this.$router.push({ name: 'search', params: this.$route.params })
    },
    removeKeyowrd() {
      this.searchParams.keyword = undefined
      this.getData()
      this.$bus.$emit('clearKeyword')
      this.$router.push({ name: 'search', query: this.$route.query })
    },
    clearCategoryId() {
      /* 清空分类 Id */
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
    },
    trademarkInfo(trademark) {
      /* 整理品牌字段参数："ID:品牌名称"" */
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      /* 再次发请求拿数据 */
      this.getData()
    },
    removeTrademark() {
      // this.searchParams.trademark = ''
      this.searchParams.trademark = undefined // OK
      this.getData()
    },
    attrInfo(attr, attrValue) {
      // console.log(attr, attrValue);
      let prop = `${attr.attrId}:${attrValue}:${attr.attrName}`
      /* 如果 props 中已经有了此元素就不 push 并且不发请求 */
      this.searchParams.props.indexOf(prop) === -1 && this.searchParams.props.push(prop) && this.getData()
      
    },
    /* 移除 prop */
    removeProp(index) {
      /* 这么写是不对的，这样就把 props 删光了 */
      // this.searchParams.props = []
      /* 取出最上面的元素即可 */
      this.searchParams.props.splice(index, 1)
      this.getData()
    },
    /* 点击切换，flag 表示是点击的是综合还是价格 */
    changeOrder(flag) {
      /* 先看点击的是什么，原来是什么，比如点击价格，原来是价格吗，如果是就改变顺序，不是就改变高亮 */
      if (this.searchParams.order.split(':')[0] == flag) {
        /* 再判断原来是升序还是降序 */
        if (this.searchParams.order.split(':')[1] === 'desc') {
          this.searchParams.order = `${flag}:asc`
          console.log(this.searchParams.order);
        } else {
          this.searchParams.order = `${flag}:desc`
        }
      /* 改变高亮 */
      } else {
        this.searchParams.order = `${flag}:${this.searchParams.order.split(':')[1]}`
        
      }
      /* 修改完参数还要再发一次请求 */
      this.getData()
    },
    /* 自定义事件，找分页器子组件拿页码 */
    getPageNo(pageNo) {
      /* 整理参数，请求数据 */
      this.searchParams.pageNo = pageNo
      this.getData()
    }
  },
  watch: {
    $route() {
      // console.log('我监听到路由的变化了');
      /* 监听路由发生变化 */
      this.searchParams = { ...this.searchParams, ...this.$route.query, ...this.$route.params }
      /* 再次发起 ajax 请求 */
      this.getData()
      // console.log(this.searchParams);
      /* 请求完清空分类 id
          让它接收下一次的 id 赋值
          而分类的名字不需要清理
      */
      this.clearCategoryId()
    }
  }
};
</script>

<style scoped lang="less">
.main {
  margin: 10px 0;
  .py-container {
    width: 1200px;
    margin: 0 auto;
    .bread {
      margin-bottom: 5px;
      overflow: hidden;
      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;
        li {
          display: inline-block;
          line-height: 18px;
          a {
            color: #666;
            text-decoration: none;
            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }
      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;
        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;
          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }
          &:hover {
            color: #28a3ef;
          }
        }
      }
    }
    .details {
      margin-bottom: 5px;
      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;
        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;
            li {
              float: left;
              line-height: 18px;
              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }
              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .goods-list {
        margin: 20px 0;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;
            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;
                a {
                  color: #666;
                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }
              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: -5px;
                  }
                }
              }
              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                a {
                  color: #333;
                  text-decoration: none;
                }
              }
              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }
              .operate {
                padding: 12px 15px;
                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }
                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;
                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }
                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;
                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;
        .sui-pagination {
          margin: 18px 0;
          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;
            li {
              line-height: 18px;
              display: inline-block;
              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }
              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }
              &.prev {
                a {
                  background-color: #fafafa;
                }
              }
              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }
              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }
              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }
          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;
      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }
      .hot-list {
        padding: 15px;
        ul {
          display: flex;
          li {
            width: 25%;
            height: 100%;
            .list-wrap {
              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }
              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }
              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }
              .price {
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: -5px;
                  }
                }
              }
              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
</style>
