<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 品牌面包屑 -->
            <li v-if="searchParams.categoryName" class="with-x">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">x</i>
            </li>
            <!-- 关键字面包屑 -->
            <li v-if="searchParams.keyword" class="with-x">
              {{ searchParams.keyword }}
              <i @click="removeKeyword">x</i>
            </li>
            <!-- 品牌面包屑 -->
            <li v-if="searchParams.trademark" class="with-x">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTrademark">x</i>
            </li>
            <!-- 平台售卖的属性值展示 -->
            <li v-for="(attrvalue, index) in searchParams.props" :key="index" class="with-x">
              {{ attrvalue.split(':')[1] }}
              <i @click="removeAttrvalue(attrvalue)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @getTrademarkName="getTrademarkName"
          @attrsInfo="attrsInfo"
        >
        </SearchSelector>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li 
                  style="cursor: pointer;"
                  :class="{active:isOne}"
                  @click="changeOrder('1')"
                >
                  <a>综合<span v-show="isOne" class="iconfont" :class="{'icon-jiantoushang':isAsc,'icon-jiantouxia':isDesc}"></span></a>
                </li>
                <li
                  style="cursor: pointer;"
                  :class="{active:isTwo}"
                  @click="changeOrder('2')"
                >
                  <a>价格<span v-show="isTwo" class="iconfont" :class="{'icon-jiantoushang':isAsc,'icon-jiantouxia':isDesc}"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"
                      ><img :src="good.defaultImg"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页 -->
          <Pagination></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination  from '@/components/Pagination';
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      // 传递给获取搜索列表接口的参数
      searchParams: {
        // 一级分类id
        category1Id: "",
        // 二级分类id
        category2Id: "",
        // 三级分类id
        category3Id: "",
        // 分类名
        categoryName: "",
        // 关键字
        keyword: "",
        // 排序：初始的时候是综合而且是降序
        order: "1:desc",
        // 页码
        pageNo: 1,
        // 一页展示的数据
        pageSize: 10,
        // 平台售卖的属性操作
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
    Pagination,
},
  mounted() {
    this.getSearchData();
  },
  // 在组件挂载之前执行一次
  beforeMount() {
    /*  this.searchParams.category1Id = this.$route.query.category1Id;
    this.searchParams.category2Id = this.$route.query.category2Id;
    this.searchParams.category3Id = this.$route.query.category3Id;
    this.searchParams.categoryName = this.$route.query.categoryName;
    this.searchParams.keyword = this.$route.params.keyword; */
    // 在服务器发请求之前，把接口需要的参数进行整理
    //Object.assign 新增语法，合并对象
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  computed: {
    // 从vuex获取gettes数据
    ...mapGetters(["goodList", "attrsList", "trademarkList"]),
    isOne(){
      return this.searchParams.order.indexOf('1') != -1;
    },
    isTwo(){
      return this.searchParams.order.indexOf('2') != -1;
    },
    jianTou(){
      if(this.searchParams.order.indexOf('desc') != -1){
        return '&#xe62d;';
      }else{
        return '&#xe62c;';
      }
    },
    isAsc(){
      return this.searchParams.order.indexOf('asc') != -1;
    },
    isDesc(){
      return this.searchParams.order.indexOf('desc') != -1;
    }

  },
  methods: {
    // 像服务器发请求根据search（根据参数不同的数据进行展示
    // 把这次请求封装成一个函数，需要的时候调用即可
    getSearchData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    // 删除分类的名字
    removeCategoryName() {
      // 把带给服务器的参数置空了，还需要给服务器发请求
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getSearchData();
      // 自己跳转自己改变url路径
      if (this.$route.params) {
        this.$router.push({
          name: "search",
          params: this.$route.params,
        });
      }
    },
    // 删除关键字
    removeKeyword() {
      this.searchParams.keyword = undefined;
      this.getSearchData();
      if (this.$route.query) {
        this.$router.push({
          name: "search",
          query: this.$route.query,
        });
      }
    },
    // 获取子组件传递的数据，并重新整理参数发请求。
    getTrademarkName(data) {
      this.searchParams.trademark = `${data.tmId}:${data.tmName}`;
      this.getSearchData();
    },
    // 删除品牌
    removeTrademark() {
      this.searchParams.trademark = undefined;
      this.getSearchData();
    },
    // 收集平台属性的回调
    attrsInfo(attrs, attrValue) {
      // console.log(arrts,attrvalue);
      // 整理参数格式
      let props = `${attrs.attrName}:${attrValue}`;
      // 数组去重
      if(this.searchParams.props.indexOf(props) == -1){
        // 将数据加入数组
        this.searchParams.props.push(props);
      }
      this.getSearchData();
    },
    // 移除商品属性
    removeAttrvalue(attrvalue){
      this.searchParams.props =  this.searchParams.props.filter((element) => {
        return element != attrvalue;
      })
      this.getSearchData();
    },
    // 改变排序顺序
    changeOrder(flag){
      let arr = this.searchParams.order.split(':');
      // 判断是否需要切换综合或者价格
      if(flag != arr[0]){
        arr[0] = flag;
      }
      arr[1] = arr[1] == 'desc'? 'asc' : 'desc';

      // 将数组拼接成字符串
      this.searchParams.order = arr.join('');
      // console.log(arr.join(':'));
      this.getSearchData();
    },
  },
  watch: {
    // 监听路由的变化，再次发起请求。
    $route: {
      handler() {
        Object.assign(this.searchParams, this.$route.query, this.$route.params);
        this.getSearchData();
        // 每一次请求完毕，应该把相应的1，2，3级路由置空，让他接受下一次的相映的1，2，3Id
        this.searchParams.category1Id = "";
        this.searchParams.category2Id = "";
        this.searchParams.category3Id = "";
      },
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

@font-face {
  font-family: 'iconfont';
  src: url('@/assets/iconfont.ttf') format('truetype');
}
</style>