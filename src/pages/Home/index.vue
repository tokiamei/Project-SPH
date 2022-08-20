<template>
  <div>
    <!-- 三级联动组件已经注册为全局组件，不需要再 import -->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="floor in floorList" :key="floor.id" :floor="floor"/>
    <Brand/>
  </div>
</template>

<script>
// 引入仓库中的数据
import { mapState } from "vuex"
// 引入其余的组件
import ListContainer from "@/pages/Home/ListContainer"
import Recommend from "@/pages/Home/Recommend"
import Rank from "@/pages/Home/Rank"
import Like from "@/pages/Home/Like"
import Floor from "@/pages/Home/Floor"
import Brand from "@/pages/Home/Brand"
export default {
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  mounted() {
    // 在 Home 组件中派发 actions
    this.$store.dispatch("getFloorList")
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  }
}
</script>

<style>

</style>