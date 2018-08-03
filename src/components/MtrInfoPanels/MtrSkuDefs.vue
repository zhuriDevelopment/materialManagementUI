<template>
  <div class="Mtr-sku-defs">
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
            property="skuCode"
            label="SKU编码">
          </el-table-column>
          <el-table-column
            property="skuName"
            label="SKU名称">
          </el-table-column>
          <el-table-column
            property="materialCode"
            label="物料编码">
          </el-table-column>
          <el-table-column
            property="unit"
            label="计量单位">
          </el-table-column>
          <el-table-column
            property="barCode"
            label="条形码">
          </el-table-column>
          <el-table-column
            property="purchasePrice"
            label="采购价格（元）">
          </el-table-column>
          <el-table-column
            property="sellingPrice"
            label="销售价格（元）">
          </el-table-column>
          <el-table-column
            property="description"
            label="备注">
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
  name: "MtrSkuDefs",
  data() {
    return {
      tableData: [{
        skuCode: 'SKU1001',
        skuName: 'S_丝绸',
        materialCode: 'B12343',
        unit: '米',
        barCode: '123321',
        purchasePrice: '100',
        sellingPrice: '120',
        description: '备注1'
      }, {
        skuCode: 'SKU1002',
        skuName: 'S_棉布',
        materialCode: 'B12345',
        unit: '米',
        barCode: '10086',
        purchasePrice: '110',
        sellingPrice: '130',
        description: '备注2'
      }]
    };
  },
  props: ["data"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.Mtr-sku-defs {
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


