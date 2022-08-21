<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="slide in list"
        :key="slide.id"
      >
        <img :src="slide.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper"
export default {
    /* 将轮播图注册为全局组件 */
    name: "Carousel",
    props: ["list"],
    mounted() {
      //#region 
      /* 第一次写 Swiper 的时候：在 mounted 中书写是不可以的，但是为什么现在这里就可以了？
          在第一次书写轮播图的时候，是在当前组件内部发请求、动态渲染结构【前台至少服务器数据需要回来】，因此当年的写法在这里不需要
          现在的这种写法为什么可以：因为请求是在父组件中发的，父组件通过 props 传递回来，而且结构都已经有了的情况下执行 mounted就没问题
      */
      /*     new Swiper (
          this.$refs.mySwiper02,
      {
      //     // direction: 'vertical', // 垂直切换选项
          loop: true, // 循环模式选项
          autoplay: true,
          
          // 如果需要分页器
          pagination: {
          el: '.swiper-pagination',
          clickable: true
          },
          
          // 如果需要前进后退按钮
          navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          },
          
          // 如果需要滚动条
          scrollbar: {
          el: '.swiper-scrollbar',
          },
      }) */
      //#endregion
    },
    watch: {
      floor: {
        immediate: true,
        handler() {
        // console.log("======")
          this.$nextTick(() => {
            new Swiper (
              // console.log("5555"),
              this.$refs.mySwiper,
              {
          //     // direction: 'vertical', // 垂直切换选项
              loop: true, // 循环模式选项
              autoplay: true,
              
              // 如果需要分页器
              pagination: {
                  el: '.swiper-pagination',
                  clickable: true
              },
              
              // 如果需要前进后退按钮
              navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
              },
              
              // 如果需要滚动条
              scrollbar: {
                  el: '.swiper-scrollbar',
              }
            })
          // console.log("111")
          })
        }
      }
    }
};
</script>

<style scoped></style>
