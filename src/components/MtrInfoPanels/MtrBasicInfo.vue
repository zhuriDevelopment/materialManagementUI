<template>
  <div class="Mtr-basic-info">
    <div class="upper" v-if="rows.length > 3">
      <div class="row" v-for="row in rows.slice(0,3)">
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
      <div class="row">
        <div class="col col-2">
          <div class="label">{{rows[3][0].label}}</div>
          <div class="inputbar">
            <el-input v-model="rows[3][0].value"></el-input>
          </div>
        </div>
        <div class="col">
          <el-checkbox v-model="rows[3][1].value">{{rows[3][1].label}}</el-checkbox>
        </div>
      </div>
      <div class="row">
        <div class="col col-2">
          <div class="label">{{rows[4][0].label}}</div>
          <div class="inputbar">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="rows[4][0].value">
            </el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="lower" v-if="rows.length > 3">
      <div class="row">
        <div class="col">
          <div class="label">{{rows[5][0].label}}</div>
          <div class="inputbar">
            <el-select v-model="rows[5][0].value" placeholder="请选择">
              <el-option
                v-for="item in rows[5][0].options"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col col-2">
          <div class="label">{{rows[6][0].label}}</div>
          <div class="inputbar">
            <el-table
              ref="singleTable"
              :data="rows[6][0].value"
              highlight-current-row
              align="left"
              style="width: 100%">
              <el-table-column
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                property="unit"
                label="计量单位"
                width="120">
                <template slot-scope="scope">
                  <el-input v-model="rows[6][0].value[scope.$index]['unit']" :disabled="disabled[scope.$index]===scope.row.unit"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                property="factor"
                label="换算系数"
                width="120">
                <template slot-scope="scope">
                  <el-input v-model="rows[6][0].value[scope.$index]['factor']" :disabled="disabled[scope.$index]===scope.row.unit"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                label="排序"
                width="120">
                <template slot-scope="scope">
                  <i class="el-icon-sort-up" @click="handleUnitUp(scope.$index, scope.row)" :class="{'disabled': scope.$index === 0}"></i>
                  <i class="el-icon-sort-down"  @click="handleUnitDown(scope.$index, scope.row)" :class="{'disabled': scope.$index === rows[6][0].value.length-1}"></i>
                </template>
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="150">
                <template slot-scope="scope">
                  <el-button @click="handleUnitAdd(scope.$index, scope.row)" type="text" size="small" :disabled="disabled[scope.$index]===scope.row.unit">添加</el-button>
                  <el-button @click="handleUnitDelete(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MtrBasicInfo',
  props: ["basicInfo"],
  data() {
    return {
      rows: [],
      disabled: [],
    };
  },
  watch: {
    basicInfo(newVal, oldVal) {
      this.rows = [
        [{label: 'SPU编码', value: this.basicInfo.spuCode},
          {label: 'SPU名称', value: this.basicInfo.spuName},
          {label: '物料类型', value: this.basicInfo.type}],
        [{label: '物料分类', value: this.basicInfo.category,},
        {label: '来源', value: this.basicInfo.source,},
        {label: '用途', value: this.basicInfo.usage,}],
        [{label: '设计图号', value: this.basicInfo.designCode,},
          {label: '设计版次', value: this.basicInfo.designVersion,},
          {label: '助记码', value: this.basicInfo.mnemonic,}],
        [{label: '规格描述', value: ''},
          {label: '多规格物料', value: false}],
        [{label: '备注', value: this.basicInfo.note}],
        [{label: '默认计量单位', value: '',}],
        [{label: '辅助计量单位',
          value: [{unit: '米', factor: '1', sort: 1,},
                  {unit: '厘米', factor: '0.3', sort: 2,},
                  {unit: '尺', factor: '2.3', sort: 3,}]}],
      ];
    },
    rows(newVal, oldVal) {
      return this.rows;
    },
  },
  methods: {
    pushRow() {  
      this.rows[6][0].value.push({
        unit: '',
        factor: '',
        sort: this.rows[6][0].value.length + 1,
      });
      console.log(this.rows[6][0].value)
    },
    reverseValue(x, y){
      // console.log(x, y)
      [x.sort, y.sort] = [y.sort, x.sort];
      return [x, y]
    },
    handleUnitUp(index, row){
      let units = this.rows[6][0].value;
      if(index !== 0) {
        [units[index - 1], units[index]] = [units[index], units[index - 1]];
        [units[index - 1].sort, units[index].sort] = [units[index].sort, units[index - 1].sort]
        this.rows[6][0].value = Object.assign([], this.rows[6][0].value, units);
        this.exchangeDisable(index, index - 1);
      }
    },
    handleUnitDown(index, row){
      let units = this.rows[6][0].value;
      if(index < this.rows[6][0].value.length - 1) {
        [units[index + 1], units[index]] = [units[index], units[index + 1]];
        [units[index + 1].sort, units[index].sort] = [units[index].sort, units[index + 1].sort]
        this.rows[6][0].value = Object.assign([], this.rows[6][0].value, units)
        this.exchangeDisable(index, index + 1);
      }
    },
    exchangeDisable(idx1, idx2) {
      const tmp = this.disabled[idx1];
      this.disabled[idx1] = this.disabled[idx2];
      this.disabled[idx2] = tmp;
    },
    handleUnitAdd(index, row) {
      if(this.rows[6][0].value.slice(-1)[0].unit !== ''){
        this.pushRow();
      }
      if(this.rows[6][0].value[index].unit !== ''){
        this.disabled[index] = row.unit;
      }
    },
    handleUnitDelete(index, row) {
      this.rows[6][0].value.splice(index, 1);
      if(this.rows[6][0].value.length === 0){
        this.pushRow();
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.Mtr-basic-info {
  display: flex;
  flex-direction: column;
  .upper{
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    border-bottom: 1px solid black;
  }
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
    &.disabled{
      cursor: default;
      color: #c0c4cc;
    }
  }
}
</style>
