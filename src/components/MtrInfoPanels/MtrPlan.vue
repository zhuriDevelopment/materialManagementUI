<template>
  <div class="Mtr-plan">
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
  name: 'MtrPlan',
  data() {
    return {
      info: this.data,
      rows: [
        [{label: '是否独立需求', value: '', options: [{label: '默认独立需求', value: '默认独立需求'}]}, {label: '订货提前期（天）', value: ''},],
        [{label: '补货政策', value: '', options: [{label: '默认补货政策', value: '默认补货政策'}]}, {label: '补货周期（天）', value: ''},],
        [{label: '最大库存量', value: ''}, {label: '安全库存量', value: ''},],
        [{label: '订货批量', value: ''},],
        [{label: '批量政策', value: '', options: [{label: '默认批量政策', value: '默认批量政策'}]}, {label: '批量周期（天）', value: ''},],
        [{label: '默认计划单位', value: ''},],
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
