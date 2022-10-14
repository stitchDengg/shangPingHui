<template>
  <div>我是搜索
    <h1>query:{{$route.query.key}}----------{{a}}----{{b}}</h1>
    <h1>params:{{$route.params}}</h1>
    <h1>{{k}}</h1>
    <h1></h1>
  </div>
</template>

<script>
  export default {
    name:'Search',
    props:['k','a','b','keyword']
  }
</script>

<style lang="less" scoped>

</style>