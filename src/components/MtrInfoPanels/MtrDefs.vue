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
            width="60">
          </el-table-column>
          <el-table-column
            v-for="(p,index) in Object.keys(tableData[0])"
            :key="index"
            width="160"
            :label="labels[index]">
            <template slot-scope="scope">
              <el-input v-model="tableData[scope.$index][p]" :disabled="disabled[scope.$index]===scope.row.materialCode && labels[index] ==='物料编码'"></el-input>              
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
  name: 'MtrDefs',
  data() {
    return {
      labels: ['物料编码','物料名称','旧物料编码','条形码','采购价格','销售价格','规格1','规格2','规格3'],
      disabled: [],
      // tableData: [{
      //   materialCode: 'B12343',
      //   materialName: '布料',
      //   oldMaterialCode: 'B12333',
      //   barCode: '123321',
      //   purchasePrice: '0',
      //   sellingPrice: '0',
      //   format1: '规格1',
      //   format2: '规格2',
      //   format3: '规格3',
      // }],
      tableData: [{}],
    };
  },
  props: ["data"],
  watch: {
    data(val) {
      console.log(`MtrDefs`);
      this.tableData = [];
      for (let i in this.data) {
        this.tableData.push(Object.assign({}, this.data[i]));
        this.disabled.push(this.data[i].materialCode);
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
          if(d[i].materialCode === '' || d[i].materialName === '') {
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
        materialCode: '',
        materialName: '',
        oldMaterialCode: '',
        barCode: '',
        format1: '',
        format2: '',
        format3: '',
      })
    },
    handleAdd(index, row) {
      console.log(index, row);
      if(row.materialCode !== ''){
        this.disabled[index] = row.materialCode;
        this.pushRow();
      };
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.disabled.splice(index,1);
      this.tableData.splice(index, 1);
      if(this.tableData.length === 0){
        this.disabled = [];
        this.pushRow();
      }
    },
    updateValue(currentRow, oldCurrentRow) {
      console.log("updateRowValue!");
      console.log(currentRow);
      console.log(oldCurrentRow);
    }
  }
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
