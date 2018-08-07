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
          </el-table-column>
          <el-table-column
            prop="label"
            label="属性标识">
          </el-table-column>
          <el-table-column
            prop="name"
            label="属性名">
          </el-table-column>
          <el-table-column
            prop="rangetype"
            label="取值范围类型">
          </el-table-column>
          <el-table-column
            prop="range"
            label="取值范围">
          </el-table-column>
          <el-table-column
            prop="sort"
            label="排序号">
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="150">
            <template slot-scope="scope">
              <el-button type="text" size="mini">添加</el-button>
              <el-button type="text" size="mini">删除</el-button>
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
      }
      ]
    }
  },
  props: ["data"],
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
}
</style>


