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
            label="属性类别">
            <template slot-scope="scope">
              <el-input v-model="tableData[scope.$index]['type']"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="label"
            label="属性标识">
            <template slot-scope="scope">
              <el-input v-model="tableData[scope.$index]['label']"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="属性名">
            <template slot-scope="scope">
              <el-input v-model="tableData[scope.$index]['name']"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="rangetype"
            label="取值范围类型">
            <template slot-scope="scope">
              <el-input v-model="tableData[scope.$index]['rangetype']"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="range"
            label="取值范围">
            <template slot-scope="scope">
              <el-input v-model="tableData[scope.$index]['range']"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="sort"
            label="排序号">
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


