<template>
  <div class="Mtr-defs">
    <div class="lower">
      <div class="row">
        <el-table
          v-if="showTable"
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
              <el-input v-model="tableData[scope.$index][p]"
               :disabled="(disabled[scope.$index]===scope.row.materialCode && labels[index] ==='物料编码') ||
               (scope.row[labels[index]] === undefined && index > 5)"
               ></el-input>           
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
      labels: ['物料编码','物料名称','旧物料编码','条形码','采购价格','销售价格'],
      names: ['materialCode', 'materialName', 'oldMaterialCode', 'barCode', 'purchasePrice', 'sellingPrice'],
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
      flag: true,
      showTable: true,
    };
  },
  props: ["data"],

  watch: {
    data(val) {
      if(this.flag) {
        this.getBaseProps()
        this.flag = false;
      }
      // console.log(`MtrDefs`);
      this.tableData = [];
      for (let i in this.data) {
        delete this.data[i].format1;
        delete this.data[i].format2;
        delete this.data[i].format3;
        this.$set(this.tableData, i, this.data[i]);
        this.disabled.push(this.data[i].materialCode);
      }
      if (this.tableData.length == 0) {
        this.pushRow();
      }
    },
    tableData: {
      // handler should not be arrow function.
      handler: function (newVal, oldVal) {
        console.log(`MtrDefs tableData`, `handler`);
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
      let empObj = {};
      empObj = this.names.reduce((acc, key) => {
        acc[key] = '';
        return acc;
      }, {});
      this.tableData.push(empObj);
    },
    handleAdd(index, row) {
      // console.log(index, row);
      if(row.materialCode !== ''){
        this.disabled[index] = row.materialCode;
        this.pushRow();
      };
    },
    handleDelete(index, row) {
      // console.log(index, row);
      this.disabled.splice(index,1);
      this.tableData.splice(index, 1);
      if(this.tableData.length === 0){
        this.disabled = [];
        this.pushRow();
      }
    },
    updateValue(currentRow, oldCurrentRow) {
      // console.log("updateRowValue!");
      // console.log(currentRow);
      // console.log(oldCurrentRow);
    },
    getBaseProps() {
      console.log("props")
      console.log(this.data)
      let materialCodes = this.data.map(element => {
        return element.materialCode
      });
      console.log(materialCodes)
      materialCodes = this.data.map(element => element.materialCode);
      console.log(materialCodes)
      this.$axios
        .post(`${window.$config.HOST}/MaterialManagement/getMaterialBasePropsBySpuCodeAndMaterialCodes`, {
          spuCode: this.$route.params.id,
          materialCodes,
          propertyType: 4
        })
        .then(res => {
          console.log(res.data)
          const propTypes = res.data;
          let labels = [];
          let tmpData = this.data;
          for(let i = 0; i < propTypes.length; i += 1) {
            for(let j = 0; j< propTypes[i].length; j += 1) {
              console.log(propTypes[i][j])
              const baseProp = propTypes[i][j].baseProp;
              const value = propTypes[i][j].value;
              if(this.labels.indexOf(baseProp.label) < 0){
                this.labels.push(baseProp.label);
                this.names.push(baseProp.label)
                console.log("abc: ",this.labels)
              }
              tmpData[i][baseProp.label] = value;
            }
          }
          this.data = tmpData;
          console.log(this.data)
          // const labels = propTypes.map(el => el.baseProp);
          // console.log(propTypes)
          this.showTable = false;
          this.$nextTick(()=>{
            this.showTable = true;
          })
        })
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
