<template>
  <div class="Mtr-plan">
    <div class="lower">
      <div class="row" v-for="row in rows">
        <div class="col" v-for="col in row">
          <div class="label">{{col.label}}</div>
          <div class="inputbar">
            <el-select v-if="col.hasOwnProperty('options')" v-model="col.value" placeholder="请选择">
              <el-option
                v-for="item in col.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input v-else v-model="col.value" placeholder="请输入"></el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MtrPurchaseAndStore',
  data() {
    return {
      info: this.data,
      rows: [
        [{label: '是否独立需求', value: '', options: [{label: '选项1', value: 'option1'} , {label: '选项2', value: 'option2'}, {label: '选项3', value: 'option3'}]}, {label: '订货提前期（天）', value: ''},],
        [{label: '补货政策', value: '', options: [{label: '选项1', value: 'option1'} , {label: '选项2', value: 'option2'}, {label: '选项3', value: 'option3'}]}, {label: '补货周期（天）', value: ''},],
        [{label: '最大库存量', value: ''}, {label: '安全库存量', value: ''},],
        [{label: '订货批量', value: ''},],
        [{label: '批量政策', value: '', options: [{label: '选项1', value: 'option1'} , {label: '选项2', value: 'option2'}, {label: '选项3', value: 'option3'}]}, {label: '批量周期（天）', value: ''},],
        [{label: '默认计划单位', value: ''},],
      ]
    }
  },
  props: ["data"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.Mtr-plan {
  height: 100%;
  display: flex;
  flex-direction: column;
  .lower{
    display: flex;
    flex-direction: column;
  }
  .row{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: '66%';
      .col{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 400px;
        margin: 15px 0;
        .label{
          font-size: 14px;
          width: 120px;
          white-space: nowrap;
        }
        .inputbar{
          width: 250px;
          margin-right: 15px;
          .el-select{
            width: 100%;
          }
        }
      }
      .col-2{
        width: 100%;
        .inputbar{
          margin-right: 20%;
          flex: 1;
        }
        .el-table{
          max-width: 600px;
        }
      }
    }
  i{
    font-size: 20px;
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>
