<template>
  <div>
    <!-- 三级联动组件 已经注册为了全局组件，可以不再引入-->
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floorList in floorLists" :key="floorList.id" :floorList="floorList"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import ListContainer from "./ListContainer/index.vue";
import Recommend from "./Recommend/index.vue";
import Rank from "./Rank/index.vue";
import Like from "./Like/index.vue";
import Floor from "./Floor/index.vue";
import Brand from "./Brand/index.vue";
export default {
  name: "Home",
  components: { ListContainer, Recommend, Rank, Like, Floor, Brand },
  mounted() {
    this.$store.dispatch("getFloorList");
  },
  computed: {
    ...mapState({
      floorLists: (state) => state.home.floorList,
    }),
  },
};
</script>

<style lang="less" scoped>
</style>