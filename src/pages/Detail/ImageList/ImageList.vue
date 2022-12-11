<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div 
        class="swiper-slide" 
        v-for="(skuImage,index) in skuImageList"
        :key="skuImage.id"
        @click="changeActive(index)"
      >
        <img v-lazy="skuImage.imgUrl" :class="{active:index == currentIndex}"/>
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import {thorottling,debounce} from '@/utils';
import Swiper, { Navigation, Pagination } from 'swiper';
export default {
  name: "ImageList",
  data() {
    return {
      currentIndex:0,
    }
  },
  props: {
    skuImageList: {
      type: Array,
      required: true, //必要性
      default() {
        return [{ imgUrl: "" }]; //默认值
      },
    },
  },
  watch: {
    //监听bannerList变化
    skuImageList: {
      handler(newValue, oldValue) {
        //console.log(newValue, oldValue);
        // 如果执行handler方法，代表这个组件实例上的参数已经有了
        // 当前这个函数只能保证有数据了，但是并不能保证v-for已经执行完毕
        this.$nextTick(() => {
          Swiper.use([Navigation, Pagination]);
          new Swiper(".swiper-container", {
            sliderPerView:3, //设置swiper展示数量
            sliderPerGroup:1,  //每次切换图片个数
            direction: "horizontal", // 垂直切换选项
            //loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
  methods:{
    changeActive:thorottling(function(index){
      this.currentIndex = index;
      // 通知兄弟组件的索引值
      this.$bus.$emit('getIndex',index);
    },200),

  }
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
/* 
      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      } */
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>