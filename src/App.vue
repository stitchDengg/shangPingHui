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
};
</script>

<style>
</style>
