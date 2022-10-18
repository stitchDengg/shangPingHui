<template>
  <div>
    <!-- 头部组件 -->
    <Header></Header>
    <!-- 路由组件出口 -->
    <router-view></router-view>


    <!-- 在Home，Search显示，在登陆注册隐藏 -->
    <!-- 尾部组件 -->
    <FooterVue v-show="$route.meta.show"></FooterVue>
  </div>
</template>

<script>
import Header from "./components/Header";
import FooterVue from "./components/Footer";
export default {
  name: "App",
  components: {
    Header,
    FooterVue,
  },
  mounted(){
      // 只执行一次
     // 派发一个action｜｜获取商品分类的三级列表的数据
    // 组件挂载完毕，通知vuex发请求,存储与仓库当中
    this.$store.dispatch("categoryList");
  }
};
</script>

<style>
</style>
