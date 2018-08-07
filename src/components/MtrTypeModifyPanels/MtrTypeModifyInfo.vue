<template>
  <div class="Mtr-type-modify-info">
    <div class="row">
      <div class="col" v-for="col in inputBoxData">
        <div class="label">{{col.label}}</div>
        <el-input
          :placeholder="col.holder"
          v-model="col.model"
          clearable>
        </el-input>
      </div>
    </div>
    <div class="row">
      <div class="col" v-for="col in selectData">
        <div class="label">{{col.label}}</div>
        <el-select v-model="col.value" placeholder="请选择">
          <el-option
            v-for="item in col.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="col col-2">
        <el-button type="primary">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MtrTypeModifyInfo',
  data() {
    return {
      info: this.data,
      inputBoxData: [{
        label: '分类编码',
        model: '',
        holder: '请输入分类编码',
      }, {
        label: '分类名称',
        model: '',
        holder: '请输入分类名称',
      }],
      selectData: [{
        value: '',
        label: '物料类别',
        options: [{label: '选项1', value: 'option1'}, {label: '选项2', value: 'option2'}, {label: '选项3', value: 'option3'}]
      }],
    }
  },
  props: ["data"],
}
</script>

<style lang="less" scoped>
.Mtr-type-modify-info {
  display: flex;
  flex-direction: column;
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .col{
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 400px;
      margin: 15px 0;
      .label {
        font-size: 14px;
        width: 120px;
        white-space: nowrap;
      }
      .el-select{
        width: 100%;
        padding-left: 0px;
      }
    }
    .col-2{
      justify-content: flex-end;
    }
  }
}
</style>


