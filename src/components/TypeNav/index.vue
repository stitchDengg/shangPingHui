<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <div class="sort">
          <div class="all-sort-list2">
            <!-- 一级分类 -->
            <div
              class="item"
              v-for="(c1, index) in categoryList"
              :key="c1.categoryId"
              :class="{ cur: currentIndex == index }"
            >
              <h3 @mouseenter="changeIndex(index)">
                <a href="">{{ c1.categoryName }}</a>
              </h3>
              <!-- 二级分类，三级分类 -->
              <div class="item-list clearfix" v-show="index == currentIndex">
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a href="">{{ c2.categoryName }}</a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a href="">{{ c3.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 把loadsh全部功能引入
import {throttle} from  "lodash";
export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移到哪一个一级分类
      currentIndex: -1,
    };
  },
  mounted() {
    // 组件挂载完毕，通知vuex发请求,存储与仓库当中
    this.$store.dispatch("categoryList");
  },

  computed: {
    ...mapState({
      // 对象的写法，右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      // categotyList:state => state.home.categoryList,
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
    // ...mapState('home',['categoryList'])
  },

  methods: {
    // 防抖函数，确保连续的事件只会执行最后一次
    debounce(fun, delay) {
      console.log('denghao');
      let timer = null;
      return function debounced() {
        // 确保this指向不变
        let that = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
          fun.call(that, ...args);
        }, delay);
      };
    },
    // 节流函数
    thorottling(fun, delay) {
      let clock = true;
      return function () {
        let args = arguments;
        // let that = this;
        if (clock) {
          fun.call(...args);
          clock = false;
        }
        setTimeout(() => {
          clock = true;
        }, delay);
      };
    },
    // 鼠标进入响应式改变currentIndex的值
    /*  changeIndex(index){
    // 正常情况：（用户慢慢的操作）：鼠标操作，每进一个一级分类h3，都会触发进入事件
    // 非正常情况：（用户操作的很快）：本身全部的一级分类都应该触发进入事
    // 件，但是经过测试只有部分事件触发，就是由于用户的行为过快，浏览器反应不过来。
    // 如果当前的回调当中，有大量的业务，有可能出现卡顿现象。
    // 防抖：前面的触发都会取消，最后一次执行在规定的时间才会触发，也就是说如果连续的快速触发，只会执行一次
    this.currentIndex = index;
  }, */
   /*  changeIndex: this.thorottling(function (index) {
      this.currentIndex = index;
    }, 1000), */
    changeIndex:throttle(function(index){
      this.currentIndex = index;
      console.log(123);
    },100),
    // 鼠标离开的时候currentIndex回到默认
    leaveIndex() {
      this.currentIndex = -1;
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          // 触碰list就出现
          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
  }
}
</style>