<template>
  <div class="Mtr-type-modify-table">
    <div class="row">
      <div class="col">
        <el-table
          :data="tableData"
          border
          highlight-current-row
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            fixed="left"
            width="60px">
          </el-table-column>
          <el-table-column
            prop="type"
            label="属性类别"
            width="160">
            <template slot-scope="scope">
              <el-select v-model="tableData[scope.$index]['type']" placeholder="属性类别">
                <el-option
                  key="1"
                  label='关键属性'
                  value="1">
                </el-option>
                <el-option
                  key="2"
                  label='非关键属性'
                  value="2">
                </el-option>
                <el-option
                  key="3"
                  label='批号属性'
                  value="3">
                </el-option>
                <el-option
                  key="4"
                  label='规格属性'
                  value="4">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="label"
            label="属性标识"
            width="160">
            <template slot-scope="scope">
              <el-input v-model="tableData[scope.$index]['label']"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="属性名"
            width="160">
            <template slot-scope="scope">
              <el-input v-model="tableData[scope.$index]['name']"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="rangetype"
            label="取值范围类型"
            width="160">
            <template slot-scope="scope">
              <!-- <el-input v-model="tableData[scope.$index]['rangetype']"></el-input> -->
              <el-select v-model="tableData[scope.$index]['rangetype']" placeholder="属性类别">
                <el-option
                  key="1"
                  label="任意文本"
                  value="1">
                </el-option>
                <el-option
                  key="2"
                  label="最大最小值"
                  value="2">
                </el-option>
                <el-option
                  key="3"
                  label="指定范围单选"
                  value="3">
                </el-option>
                <el-option
                  key="4"
                  label="指定范围多选"
                  value="4">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="range"
            label="取值范围"
            width="160">
            <template slot-scope="scope">
              <el-input v-model="tableData[scope.$index]['range']"></el-input>
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="range"
            label="属性值"
            width="160">
            <template slot-scope="scope">
              <el-input v-model="tableData[scope.$index]['value']"></el-input>
            </template>
          </el-table-column> -->
          <el-table-column
            prop="sort"
            label="排序号"
            width="100">
            <template slot-scope="scope">
                  <i class="el-icon-sort-up" @click="handleUnitUp(scope.$index, scope.row)" :class="{'disabled': scope.$index === 0}"></i>
                  <i class="el-icon-sort-down"  @click="handleUnitDown(scope.$index, scope.row)" :class="{'disabled': scope.$index === tableData.length-1}"></i>
                </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="150">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="handleAdd(scope.$index, scope.row)">添加</el-button>
              <el-button type="text" size="mini" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MtrTypeModifyTable',
  data() {
    return {
      info: this.data,
      tableData: [{
        type: "关键属性",
        label: "标识1",
        name: "sku编码",
        rangetype: "任意文本",
        range: "任意",
        sort: "1",
      }],
      disabled: [],
    }
  },
  props: ["data"],
  watch: {
    data(val) {
      console.log(`MtrTypeModifyTable`);
      this.tableData = [];
      for (let i in this.data) {
        this.tableData.push(Object.assign({}, this.data[i]));
      }
    },
    tableData: {
      handler: function (newVal, oldVal) {
        console.log(`newVal`, newVal);
        let data = Object.assign([], data, newVal);
        console.log(`data`, data);
        let result = [[], []];
        for (let i in data) {
          let element1 = {};
          let element2 = {};
          element1["materialCode"] = "-1";
          // element1["value"] = data[i].value;
          element2["type"] = parseInt(data[i].type);
          element2["label"] = data[i].label;
          element2["name"] = data[i].name;
          let rangeObject = {};
          rangeObject.type = parseInt(data[i].rangetype);
          rangeObject.upper = data[i].range.split('-')[1].trim();
          rangeObject.lower = data[i].range.split('-')[0].trim();
          element2["range"] = JSON.stringify(rangeObject);
          element2["sort"] = data[i].sort;
          result[0].push(element1);
          result[1].push(element2);
        }
        console.log(`tableData Result`, result);
        this.$emit('changeValue', result);
      },
      deep: true,
    },
  },
  methods: {
    pushRow() {
      this.tableData.push({
        type: '',
        label: '',
        name: '',
        rangetype: '',
        range: '',
        sort: this.tableData.length + 1,
      })
    },
    handleAdd(index, row) {
      console.log(index, row);
      this.pushRow();
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.tableData.splice(index, 1);
      if(this.tableData.length === 0){
        this.disabled = [];
        this.pushRow();
      }
    },
    handleUnitUp(index, row){
      let baseInfos = this.tableData;
      if(index !== 0) {
        [baseInfos[index - 1], baseInfos[index]] = [baseInfos[index], baseInfos[index - 1]];
        [baseInfos[index - 1].sort, baseInfos[index].sort] = [baseInfos[index].sort, baseInfos[index - 1].sort];
        this.tableData = Object.assign([], this.tableData, baseInfos);
        this.exchangeDisable(index, index - 1);
      }
      console.log(this.tableData);
    },
    handleUnitDown(index, row){
      let baseInfos = this.tableData;
      if(index < this.tableData.length - 1) {
        [baseInfos[index + 1], baseInfos[index]] = [baseInfos[index], baseInfos[index + 1]];
        [baseInfos[index + 1].sort, baseInfos[index].sort] = [baseInfos[index].sort, baseInfos[index + 1].sort];
        this.tableData = Object.assign([], this.tableData, baseInfos);
        this.exchangeDisable(index, index + 1);
      }
      console.log(this.tableData);
    },
    exchangeDisable(idx1, idx2) {
      const tmp = this.disabled[idx1];
      this.disabled[idx1] = this.disabled[idx2];
      this.disabled[idx2] = tmp;
    },
  }
}
</script>

<style lang="less" scoped>
.Mtr-type-modify-table {
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
      width: 100%;
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


