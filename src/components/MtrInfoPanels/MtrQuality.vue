<template>
  <div class="Mtr-quality">
    <div class="lower">
      <div class="row" v-for="row in rows.slice(0, 1)">
        <div class="col col2" v-for="col in row">
          <div class="label">{{col.label}}</div>
          <div class="radiobar">
            <el-radio-group v-if="col.hasOwnProperty('options')" v-model="col.modelgroup">
              <el-radio
                :key="item.value"
                v-for="item in col.options"
                :label="item.value">
                {{item.label}}
              </el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <div class="row" v-for="row in rows.slice(1)">
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
  name: 'MtrQuality',
  data() {
    return {
      info: this.data,
      rows: [
        [{label: '检验方式', value:'', modelgroup: 1, options: [{label: '不检验', value: '1'}, {label: '抽样检验', value: '2'}, {label: '全样检验', value: '3'}]}],
        [{label: '检验水准', value: '', options: [{label: '选项1', value: 'option1'}, {label: '选项2', value: 'option2'}, {label: '选项3', value: 'option3'}]}, {label: '检验程度', value: '', options: [{label: '选项1', value: 'option1'}, {label: '选项2', value: 'option2'}, {label: '选项3', value: 'option3'}]}, {label: '默认检验部门', value: '', options: [{label: '选项1', value: 'option1'}, {label: '选项2', value: 'option2'}, {label: '选项3', value: 'option3'}]},],
        [{label: '检验工时（时）', value: ''}, {label: '存储期限（天）', value: ''}, {label: '默认检验员', value: '', options: [{label: '选项1', value: 'option1'}, {label: '选项2', value: 'option2'}, {label: '选项3', value: 'option3'}]},],
        [{label: '检验标准文件', value: ''},],
      ]
    }
  },
  props: ["data"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.Mtr-quality {
  height: 100%;
  display: flex;
  flex-direction: column;
  .lower{
    display: flex;
    flex-direction: column;
    padding: 20px 0;
  }
  .row{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
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
        .radiobar{
          width: 400px
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
