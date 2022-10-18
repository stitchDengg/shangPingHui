<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 利用事件委托实现路由跳转 -->
            <div class="all-sort-list2" @click="goSearch">
              <!-- 一级分类 -->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
              >
                <h3 @mouseenter="changeIndex(index)" :class="{cur:currentIndex == index}" style="cursor:pointer">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-categoryId1="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                  <!-- router-link是组件性能差 -->
                  <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                </h3>
                <!-- 二级分类，三级分类 -->
                <div class="item-list clearfix" v-show="index == currentIndex">
                  <!-- 二级菜单 -->
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          style="cursor: pointer"
                          :data-categoryName="c2.categoryName"
                          :data-categoryId2="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                        <!-- <router-link to="/search">{{ c2.categoryName }}</router-link> -->
                      </dt>
                      <dd>
                        <!-- 三级菜单 -->
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            style="cursor: pointer"
                            :data-categoryName="c3.categoryName"
                            :data-categoryId3="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
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
import { throttle } from "lodash";
import { thorottling, debounce } from "@/utils";
export default {
  name: "TypeNav",
  data() {
    return {
      // 存储用户鼠标移到哪一个一级分类
      currentIndex: -1,
      show: true,
    };
  },
  mounted() {
    // 当组件挂载完毕,如果路由是search就将三级分类隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
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
    // 鼠标进入响应式改变currentIndex的值
    /*  changeIndex(index){
    // 正常情况：（用户慢慢的操作）：鼠标操作，每进一个一级分类h3，都会触发进入事件
    // 非正常情况：（用户操作的很快）：本身全部的一级分类都应该触发进入事
    // 件，但是经过测试只有部分事件触发，就是由于用户的行为过快，浏览器反应不过来。
    // 如果当前的回调当中，有大量的业务，有可能出现卡顿现象。
    // 防抖：前面的触发都会取消，最后一次执行在规定的时间才会触发，也就是说如果连续的快速触发，只会执行一次
    this.currentIndex = index;
  }, */
    changeIndex: thorottling(function (index) {
      this.currentIndex = index;
    }, 100),
    // 鼠标离开的时候currentIndex回到默认
    leaveIndex() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    // 三级联动路由跳转
    goSearch(e) {
      // 最好的解决方案就是编程式导航➕事件委托
      // 拿到当前点击的dom
      let element = e.target;
      // 节点有一个属性是dataset属性，可以获取自定义属性与属性值
      let { categoryname, categoryid1, categoryid2, categoryid3 } =
        element.dataset;
      // 如果是a标签
      if (categoryname) {
        // 一级分类，二级分类，三级分类
        // 整理路由挑战的参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (categoryid1) {
          // 一级分类
          query.category1Id = categoryid1;
        } else if (categoryid2) {
          // 二级分类
          query.category2Id = categoryid2;
        } else {
          // 三级分类
          query.category3Id = categoryid3;
        }
        // 整理完参数
        location.query = query;
        // 路由跳转
        // 判断 如果路由跳转的时候，带有params参数，稍带传递过去
        if(this.$route.params){
          location.params = this.$route.params;
          this.$router.push(location);
        }
      }
      // 如果标签身上有categoryname一定就是a标签
      /*  this.$router.push({
        name:'search',
      }) */
    },
    // 鼠标移入三级路由展示
    enterShow() {
      if (this.$route.path != "/home") {
        this.show = true;
      }
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
    
    // 过渡动画的样式
    // 进入的开始状态
    .sort-enter {
      height: 0;
    }
    // 过渡动画的结束状态
    .sort-enter-active{
      transition: all .5s linear 0s;
    }
    .sort-enter-to {
      height: 461px;
    }
  }
}
</style>