<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button 
      v-if="pageNo >= 4" 
      @click="$emit('getPageNo',1)"
      :class="{active:pageNo == 1}"
    >
      1
    </button>
    <button v-if="startNumAndEndNum.start > 2" >...</button>
    
    <!-- 中间部分 -->
    <template v-for="(page, index) in startNumAndEndNum.end">
      <button 
        :key="index" 
        v-if="page >= startNumAndEndNum.start"
        @click="$emit('getPageNo',page)"
        :class="{active:pageNo == page}"
      >
        {{ page }}
      </button>
    </template>

    <!-- 下 -->
    <button v-if="startNumAndEndNum.end <= totalPage - Math.floor(continues / 2)">...</button>
    <button 
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('getPageNo',totalPage)"
      :class="{active:pageNo == totalPage}"
    >
      {{ totalPage }}
    </button>
    <button @click="$emit('getPageNo',pageNo + 1)" :disabled="pageNo == totalPage">下一页</button>
    <button style="margin-left: 30px">共{{ total }}条</button>
    <!-- pageStart:{{startNumAndEndNum.start}}------------pageEnd:{{startNumAndEndNum.end}} -->
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 总共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出连续的页码的起始数字与结束数字【连续的页码数至少是5】
    startNumAndEndNum() {
      const { pageNo, continues, totalPage } = this;
      // 定义两个变量存储起始数字与结束数字
      let start = 0,end = 0;
      // 连续的页码数是5（就是至少五页），如果出现不正常的现象（页码数不够五页)
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        // 正常现象，总页数肯定大于5
        let temp = Math.floor(continues / 2);
        start = pageNo - temp;
        end = pageNo + temp;
        // 把出现不正常的现象纠正（start数字出现0或负数）
        if (start < 1) {
          start = 1;
          end = continues;
        }
        // 把出现不正常的现象纠正（end数字出现大于页码数）
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - continues + 1;
        }
      }
      return { start, end };
    },
  },
  methods:{
  }
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>