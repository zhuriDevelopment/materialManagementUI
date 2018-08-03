<template>
  <div class="Mtr-defs">
    <div class="lower">
      <div class="row">
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
            property="materialCode"
            label="物料编码">
          </el-table-column>
          <el-table-column
            property="materialName"
            label="物料名称">
          </el-table-column>
          <el-table-column
            property="oldMaterialCode"
            label="旧物料编码">
          </el-table-column>
          <el-table-column
            property="barCode"
            label="条形码">
          </el-table-column>
          <el-table-column
            property="format1"
            label="规格1">
          </el-table-column>
          <el-table-column
            property="format2"
            label="规格2">
          </el-table-column>
          <el-table-column
            property="format3"
            label="规格3">
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
  name: 'MtrDefs',
  data() {
    return {
      tableData: [{
        materialCode: 'B12343',
        materialName: '布料',
        oldMaterialCode: 'B12333',
        barCode: '123321',
        format1: '规格1',
        format2: '规格2',
        format3: '规格3',
      }, {
        materialCode: 'B12344',
        materialName: '原料',
        oldMaterialCode: 'B12334',
        barCode: '10086',
        format1: '规格11',
        format2: '规格22',
        format3: '规格33',
      }, {
        materialCode: 'B12345',
        materialName: '丝绸',
        oldMaterialCode: 'B12335',
        barCode: '123',
        format1: '规格111',
        format2: '规格222',
        format3: '规格333',
      }]
    };
  },
  props: ["data"],
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.Mtr-defs {
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
    }
  i{
    font-size: 20px;
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>
