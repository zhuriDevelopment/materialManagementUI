<template>
  <div class="Mtr-purchase-and-store">
    <div class="lower">
      <div class="row" v-for="row in rows">
        <div class="col" v-for="col in row">
          <div class="label">{{col.label}}</div>
          <div class="inputbar">
            <el-select v-if="col.hasOwnProperty('options')" v-model="col.value"
            @change="changeModel" placeholder="请选择"
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
  name: 'MtrPurchaseAndStore',
  data() {
    return {
      info: this.data,
      rows: [
        [{label: '物料制购类型', value: '', options: [{label: '默认物料制购类型', value: '默认物料制购类型'}]},
          {label: 'ABC分类', value: '', options: [{label: '默认ABC分类', value: '默认ABC分类'}]},
          {label: '循环盘点编码', value: '', options: [{label: '默认循环盘点编码', value: '默认循环盘点编码'}]},],
        [{label: '是否批次管理', value: '', options: [{label: '批次管理', value: '批次管理'}]},
          {label: '是否单件管理', value: '', options: [{label: '单件管理', value: '单件管理'}]},
          {label: '是否进价控制', value: '', options: [{label: '进价控制', value: '进价控制'}]},],
        [{label: '默认供应商', value: '', options: [{label: '默认供应商', value: '默认供应商'}]},
          {label: '默认采购部门', value: '', options: [{label: '默认采购部门', value: '默认采购部门'}]},
          {label: '默认仓库', value: '', options: [{label: '默认仓库', value: '默认仓库'}]},],
        [{label: '默认采购单位', value: '', options: [{label: '默认采购单位', value: '默认采购单位'}]},
          {label: '默认库存单位', value: '', options: [{label: '默认库存单位', value: '默认库存单位'}]},
          {label: '默认库位', value: '', options: [{label: '默认库位', value: '默认库位'}]},],
      ]
    }
  },
  props: ["data"],
  watch: {
    data(newVal, oldVal) {
      const col_num = 3;
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
.Mtr-purchase-and-store {
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
