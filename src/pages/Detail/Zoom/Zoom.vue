<template>
  <div class="spec-preview">
    <img :src="skuImageList[currentIndex].imgUrl" />
    <div class="event"></div>
    <div class="big">
      <img :src="skuImageList[0].imgUrl"/>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
       currentIndex: 0 
      }
    },
    name: "Zoom",
    props: {
      // 这里是为了解决报错，父给的数据可能是 undefined，并且 数组第 0 项还可能是 undefined
      skuImageList: {
        default: () => [ {} ]
      }
    },
    mounted() {
      this.$bus.$on('getIndex', (index) => {
        this.currentIndex = index
      })
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>