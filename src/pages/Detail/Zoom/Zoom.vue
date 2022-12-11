<template>
  <div class="spec-preview">
    <img v-lazy="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img v-lazy = imgObj.imgUrl ref="big"/>
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  data() {
    return {
      currentIndex:0,
    }
  },
  props: {
    skuImageList:{
      type:Array,
      required:true, //必要性
      default(){
        return [{imgUrl:''}]//默认值
      }
    }
  },
  mounted()
  {
    this.$bus.$on('getIndex',index => {
      // console.log(index);
      this.currentIndex = index;
    })
  },
  computed:{
    imgObj(){
      return this.skuImageList[this.currentIndex] || {};
    }
  },
  methods:{
    // 监听鼠标移动事件，用于控制放大器的方向
    handler(e){
      // 获取遮罩层dom
      let mask = this.$refs.mask;
      // 获取放大框的dom
      let big = this.$refs.big;
      // 计算css的left和top值
      let left = e.offsetX - mask.offsetWidth / 2;
      let top = e.offsetY - mask.offsetHeight/ 2;
      // 约束范围
      if(left < 0) left = 0;
      if(left > mask.offsetWidth) left = mask.offsetWidth;
      if(top < 0) top = 0;
      if(top > mask.offsetHeight) top = mask.offsetHeight;
      // 修改css属性值
      mask.style.left = left + 'px';
      mask.style.top = top + 'px';

      // 修改big的样式
      big.style.left = -2 * left + 'px';
      big.style.top = -2 * top + 'px';
    }
  }
};
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

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>