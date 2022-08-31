<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.skuId">
          <li class="cart-list-con1">
            <input type="checkbox" 
              name="chk_list" 
              :checked="cart.isChecked == 1"
              @change="updateIsChecked(cart.skuId, cart.isChecked)"
            >
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a class="mins" @click="changeNum(cart.skuId, -1, cart.skuNum)">-</a>
            <input autocomplete="off" 
              type="text" 
              :value="cart.skuNum" 
              minnum="1" 
              class="itxt"
              @change="changeNum(cart.skuId, $event.target.value, cart.skuNum)"
            >
            <a class="plus" @click="changeNum(cart.skuId, 1, cart.skuNum)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteShop(cart.skuId)">删除</a>
            <br>
            <a>移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input 
        class="chooseAll" 
        type="checkbox" 
        :checked="isAllChecked"
        @change="updateAllChecked"
      >
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllChecked">删除选中的商品</a>
        <a>移到我的关注</a>
        <a>清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalCost}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" @click="$router.push('/trade')">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
import { mapGetters } from 'vuex'
  export default {
    name: 'ShopCart',
    mounted() {
      this.getData()
    },
    computed: {
      ...mapGetters([ 'cartList' ]),
      cartInfoList() {
        return this.cartList.cartInfoList || []
      },
      // 计算勾选了的产品总价
      totalCost() {
        let price = 0
        this.cartInfoList.forEach((item) => {
          if(item.isChecked == 1) {
            price += item.skuNum * item.skuPrice
          }
        })
        return price
      },
      // 判断底部复选框是否勾选【全部产品都选中，才会勾选】
      isAllChecked() {
        if (this.cartInfoList.length == 0) return false
        return this.cartInfoList.every(item => item.isChecked == 1)
      }
    },
    methods: {
      getData() {
        this.$store.dispatch('reqShopCartListInfo')
      },
      // 修改商品状态
      changeNum: throttle(async function(id, type, num) {
        try {
          // 利用正则限制非法输入
          const reg = /^[-1-9][0-9]{0,3}$/
          // 如果商品数量小于等于 0 或者 改变量为 0 或者是非法输入，直接返回
          if (!reg.test(type) || type == 0 || num  < -type) return 
          // 如果商品存在的数量和减小的值相等，就把这个商品删掉【并把页面渲染完毕】
          if (num == -type) {
            await this.deleteShop(id)
            this.getData()
          } else {
            await this.$store.dispatch('reqShopCartInfo', {
              skuid: id,
              skuNum: type
            })
            this.getData()
          }
         
        } catch (error) {
          console.log('修改商品数量失败', error);
        }
      }, 1000), // 节流【一秒钟只让点一次】
      // 删除商品
      async deleteShop(skuid) {
        try {
          await this.$store.dispatch('deleteShop', skuid)
          this.getData()
        } catch (error) {
          console.log(error);
        }
      },
      // 修改选中商品的状态 isChecked 属性
      async updateIsChecked(skuId, isChecked) {
        try {
          switch (isChecked) {
            case 0:
              isChecked = '1'
              break;
            case 1:
              isChecked = '0'
              break;
          }
          await this.$store.dispatch('updateIsChecked', { skuId, isChecked })
          this.getData()
        } catch (error) {
          console.log('修改状态失败', error);
        }
      },
      // 删除所有选中的产品【用 Promise.all() 来确定返回是否成功】
      deleteAllChecked() {
        const PromiseAll = []
        this.cartInfoList.forEach((item) => {
          if (item.isChecked == 1) {
            PromiseAll.push(this.deleteShop(item.skuId))
          }
        })
        Promise.all(PromiseAll).then(
          result => console.log('删除全部选中商品成功'),
          error => console.log('删除全部选中商品失败', error)
        )

      },
      // 点击全选，全部选中，再点击一次，全部不选中
      updateAllChecked() {
        const PromiseAll = []
        if (this.isAllChecked) {
          this.cartInfoList.forEach(item => {
            PromiseAll.push(this.updateIsChecked(item.skuId, item.isChecked))
          })
        } else {
          this.cartInfoList.forEach(item => {
            // && 不能把 '0' 转化为 0
            (item.isChecked == 0) && PromiseAll.push(this.updateIsChecked(item.skuId, item.isChecked))
          })
        }
        Promise.all(PromiseAll).then(
          result => console.log('修改全选成功'),
          error => console.log('修改全选失败', error)
        )
        this.getData()
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>