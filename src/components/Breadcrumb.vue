<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item class="bold" :to="{ path: '/' }">物料信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>

export default {
  name: 'Breadcrumb',
  data() {
    return {
      list: this.tabList,
      index: this.tabIndex,
    };
  },
  computed: {
    item() {
      // if(this.list.hasOwnProperty(this.index)) {
      //   return this.list[this.index].title
      // } else {
      //   return ''
      // }
      return this.tabList[this.tabIndex].title
    }
  },
  props: ["tabList", "tabIndex","tabValue"],
  methods: {
    emit(){
      console.log('click')
      this.$emit('clickHome');
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.breadcrumb{
  height: 50px;
  padding-left: 15px;
  margin-bottom: 55px;
  display: flex;
  align-items: center;
  vertical-align: middle;
  border-top: 1px solid black;
  border-bottom: 1px solid black; 
  .bold{
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
