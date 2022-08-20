<template>
  <!-- 分页器 -- 全局组件 -->
  <div class="pagination">
    <button 
      :disabled="pageNo === 1" 
      @click="sendPage(pageNo-1)"
    >上一页</button>
    <!-- 这个 1 需要 start > 2 时再显示 -->
    <button v-show="pageIterator[0] >= 2" @click="sendPage(1)">1</button>
    <!-- 这个 ... 需要 start > 3 时显示 -->
    <button v-show="pageIterator[0] >= 3">···</button>

    <!-- 中间的迭代器【最中间的页码】 -->
    <button 
      v-for="(page, index) in pageIterator" 
      :key="index"
      @click="sendPage(page)"
      :class="{ active: pageNo === page }"
    >
    {{page}}
    </button>

    <!-- 和上面的操作方式一样 -->
    <button v-show="pageIterator[pageIterator.length-1] <= 29">···</button>
    <button 
      v-show="pageIterator[pageIterator.length-1] <= 30" 
      @click="sendPage(totalPage)"
    >
    {{totalPage}}
    </button>
    <button @click="sendPage(pageNo+1)" :disabled="pageNo === totalPage">下一页</button>
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: [ 'pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    totalPage() {
      /* 向上取整 */
      return Math.ceil(this.total/this.pageSize)
    },
    /* 页码【是个数组】 */
    pageIterator() {
      const { pageNo, continues, totalPage } = this
      // console.log(continues, typeof continues); // number
      /* 先定义起始页和结束页的 index */
      let start = 0, end = 0
      /* 先判断最大页数有没有超过连续页数 */
      if (totalPage < continues) {
        /* 如果最大页数 < 连续页数 */
        start = 1
        end = totalPage
      } else {
        /* 先考虑正常情况: 最大页数 > 连续页数 */
        start = pageNo - Math.floor(continues/2)
        end = pageNo + Math.floor(continues/2)
        /* 再考虑特例: start < 1 */
        if (start < 1) {
          start = 1
          end = continues
        }
        /* 还要考虑: end > totalPage */
        if (end > totalPage) {
          start = totalPage - continues + 1
          end = totalPage
        }
      }
      /* 创建一个用来遍历的数字数组 */
      const arr = []
      for (let i = start; i <= end; i++) {
        arr.push(i)
      }
      return arr
    }
  },
  methods: {
    /* 点击发送点击的页码给父组件 */
    sendPage(pageNo) {
      this.$emit('getPageNo', pageNo)
    }
  }
}
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    .active {
      background-color: skyblue;
    }
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>