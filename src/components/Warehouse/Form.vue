<template>
  <div class="Form">
    <div class="row" v-for="row in formData">
      <div class="col" :class="{'col-1': inputData.type=='textarea'}" v-for="inputData in row">
        <div class="title">{{inputData.title}}</div>
        <el-select v-model="inputData.value" v-if="inputData.type=='select'">
          <el-option
            v-for="item in inputData.options"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-input v-model="inputData.value" v-else-if="inputData.type=='input'" 
          :disabled="inputData.hasOwnProperty('disabled') ? inputData.disabled: false"></el-input>
        <el-input type="textarea" :rows="2" v-model="inputData.value" v-else-if="inputData.type=='textarea'"></el-input>
        <el-date-picker
          v-else-if="inputData.type=='date'"
          v-model="inputData.value"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Form',
  data() {
    return {
      list: this.tabList,
      index: this.tabIndex,
      // data: this.FormData,
      data: [],
    };
  },
  watch: {
    formData: {
      handler: function(newVal, oldVal) {
        this.$emit('formData', newVal)
      },
      deep: true,
    },
  },
  props: ["formData"],
  methods: {
    emit(){
      // console.log('click')
      this.$emit('clickHome');
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.Form{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  margin: 0 5% 0 20px;
  .row{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
  .col{
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 300px;
      margin: 15px 0;
      &.col-1{
        width: 100%;
      }
      .el-select, .el-input, .el-textarea{
          flex: 1;
      }
      .title {
        width: 80px;
        white-space: nowrap;
        text-align: left;
      }
      
    }
    .col-2{
      justify-content: flex-end;
    }
  // height: 50px;
  
  .input-group {
    display: flex;
    flex-direction: column;
    .inputs {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 15px;
    }
    .bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      min-width: 150px;
      flex: 1;
      .title {
        min-width: 60px;
        font-size: 15px;
        margin: 0 10px 0 25px;
        text-align: left;
      }
    }
  }
  .buttons{
    display: flex;
    flex-direction: row;
    align-items: center;
    align-self: flex-start;
    & > div, button{
      margin-bottom: 15px;
    }
  }
  .adv-search {
    margin-left: 25px;
    cursor: pointer;
    white-space: nowrap;
  }
  .search-btn {
    margin: 0 20px;
  }

}
</style>
