<template>
  <div class="Mtr-sales">
    <div class="lower">
      <div class="row" v-for="row in rows">
        <div class="col" v-for="col in row">
          <div class="label">{{col.label}}</div>
          <div class="inputbar">
            <el-select v-if="col.hasOwnProperty('options')" v-model="col.value"
            placeholder="请选择" @change="changeModel"
            filterable allow-create default-first-option>
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
  name: 'MtrSales',
  data() {
    return {
      info: this.data,
      rows: [
        [{label: '销售计划价格', value: '',}, {label: '计价货币', value: '',}],
        [{label: '是否售价控制', value: '', options: [{label: '选项1', value: 'option1'}, {label: '选项2', value: 'option2'}, {label: '选项3', value: 'option3'}]}, {label: '销售价格策略', value: '', options: [{label: '选项1', value: 'option1'}, {label: '选项2', value: 'option2'}, {label: '选项3', value: 'option3'}]},],
        [{label: '销价下降率（%）', value: ''}, {label: '销售成本科目', value: '', options: [{label: '选项1', value: 'option1'}, {label: '选项2', value: 'option2'}, {label: '选项3', value: 'option3'}]},],
        [{label: '默认客户', value: '', options: [{label: '选项1', value: 'option1'}, {label: '选项2', value: 'option2'}, {label: '选项3', value: 'option3'}]}, {label: '销售地', value: '', options: [{label: '选项1', value: 'option1'}, {label: '选项2', value: 'option2'}, {label: '选项3', value: 'option3'}]},],
        [{label: '默认业务员', value: '', options: [{label: '选项1', value: 'option1'}, {label: '选项2', value: 'option2'}, {label: '选项3', value: 'option3'}]}, {label: '默认销售单位', value: '', options: [{label: '选项1', value: 'option1'}, {label: '选项2', value: 'option2'}, {label: '选项3', value: 'option3'}]},],
      ]
    }
  },
  props: ["data"],
  watch: {
    data(newVal, oldVal) {
      const col_num = 2;
      this.rows=[];
      this.data.forEach((el, index) => {
        if((index % col_num) === 0){
          this.rows.push([]);
        }
        if(el.propertyValue === 'true') {
          el.propertyValue = '是';
        } else if(el.propertyValue === 'false') {
          el.propertyValue = '否';
        }
        this.rows[Math.floor(index / col_num)].push({
          label: el.propertyName,
          value: el.propertyValue,
          options: [{label: el.propertyValue, value: el.propertyValue}],
        })
      })
    }
  },
  methods: {
    changeModel() {
      const updateData = rows => {
        let newData = [];
        for(let i of rows) {
          for(let j of i) {
            newData.push({"propertyName": j.label, "propertyValue": j.value});
          }
        }
        return newData;
      }
      this.$emit('changeModel', updateData(this.rows))
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.Mtr-sales {
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
