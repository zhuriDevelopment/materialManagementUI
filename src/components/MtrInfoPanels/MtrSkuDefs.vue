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
            label="SKU编码"
            width="200">
            <template slot-scope="scope">
              <el-input v-model="tableData[scope.$index]['skuCode']" :disabled="disabled[scope.$index]===scope.row.skuCode"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            property="materialCode"
            label="物料编码"
            width="200">
            <template slot-scope="scope">
              <el-input v-model="tableData[scope.$index]['materialCode']"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            property="unit"
            label="计量单位"
            width="200">
            <template slot-scope="scope">
              <el-input v-model="tableData[scope.$index]['unit']"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            property="barCode"
            label="条形码"
            width="200">
            <template slot-scope="scope">
              <el-input v-model="tableData[scope.$index]['barCode']"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            property="purchasePrice"
            label="采购价格（元）"
            width="200">
            <template slot-scope="scope">
              <el-input v-model="tableData[scope.$index]['purchasePrice']"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            property="sellingPrice"
            label="销售价格（元）"
            width="200">
            <template slot-scope="scope">
              <el-input v-model="tableData[scope.$index]['sellingPrice']"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            property="description"
            label="备注"
            width="200">
            <template slot-scope="scope">
              <el-input v-model="tableData[scope.$index]['description']"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="150">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="handleSkuDefAdd(scope.$index, scope.row)">添加</el-button>
              <el-button type="text" size="mini" @click="handleSkuDefDelete(scope.$index, scope.row)">删除</el-button>
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
      tableData: [],
      disabled: [],
    };
  },
  props: ["data"],
  watch: {
    data(val) {
      console.log("MtrSkuDefs");
      this.tableData = [];
      for (let i in this.data) {
        this.tableData.push(Object.assign({}, this.data[i]));
        this.disabled.push(this.data[i].skuCode);
      }
      if (this.tableData.length == 0) {
        this.pushRow();
      }
    },
    tableData: {
      // handler should not be arrow function.
      handler: function (newVal, oldVal) {
        let d = Object.assign([], d, newVal);
        let idxs = [];
        for(let i in d) {
          if(d[i].skuCode === '' || d[i].materialCode === '') {
            idxs.push(i)
          }
        }
        for(let i of idxs.reverse()) {
          d.splice(i, 1);
        }
        this.$emit('changeModel', d);
      },
      deep: true,
    }
  },
  methods: {
    pushRow() {
      this.tableData.push({
        skuCode: '',
        materialCode: '',
        unit: '',
        barCode: '',
        purchasePrice: '',
        sellingPrice: '',
        description: '',
      });
    },
    handleSkuDefAdd(index, row) {
      if(row.skuCode !== ''){
        this.pushRow();
        this.disabled[index] = row.skuCode;
      }
    },
    handleSkuDefDelete(index, row) {
      this.tableData.splice(index, 1);
      this.disabled.splice(index,1);
      if (this.tableData.length === 0) {
        this.pushRow();
        this.disabled = [];
      }
    }
  }
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


