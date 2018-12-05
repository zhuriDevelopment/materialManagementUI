<template>
  <div class="WarehouseUsage">
    <Nav-header></Nav-header>
    <div class="body">
      <div class="main-nav">
        <Nav-tree></Nav-tree>
      </div>
      <div class="content">
        <div class="cards">
          <Tabs :tabValue="editableTabsValue" :tabList="editableTabs" :tabIndex="tabIndex" @updateTabs="updateTabs"></Tabs>
        </div>
        <Breadcrumb :tabIndex="tabIndex" :tabList="editableTabs" @clickHome="addHome"></Breadcrumb>
        <div class="card">
          <div class="search row">
              <div class="col" :class="{'short': index > 1}" v-for="(col, index) in [select1, select2]">
                <div class="label" :class="{'short-label': index > 2}">{{col.label}}</div>
                <el-select v-model="col.model" :class="{'short': index > 1}" placeholder="请选择">
                  <el-option
                    v-for="item in col.options"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </div>
              <div class="col col-2">
                <el-button type="primary" @click="search">搜索</el-button>
              </div>
            
          </div>
          
          <div class="table">
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
                align="left"
                v-for="(p, index) in tableKeys"
                :key="index"
                :prop="p"
                width="160"
                :label="labels[index]">
                <!-- <template slot-scope="scope">{{p}}</template> -->
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination">
            <!-- <div>{{this.pageNumberString}}</div> -->
            <el-pagination
              layout="prev, pager, next"
              :total="100">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavHeader from "@/components/Nav";
import Tabs from "@/components/Tabs";
import Breadcrumb from "@/components/BreadcrumbWarehouse";
import NavTree from "@/components/MainNavTree";
export default {
  name: "WarehouseUsage",
  components: {
    NavHeader,
    Tabs,
    Breadcrumb,
    NavTree,
  },
  created() {
    this.initTabs();
    this.getWareHouse();
  },
  data() {
    return {
      warehouse: '',
      materialType: '',
      materialCode: '',
      materialName: '',
      catCode: '',
      catName: '',
      treeData: [],
      defaultTreeData: {
        children: 'children',
        label: 'label'
      },
      nodeData: {},
      id: 1000,
      tabIndex: '0',
      labels: ["仓库名", "库区", "库位", "物料种类", "使用状况", "预约状况"],
      tableKeys: ["warehouseName", "locationGroupName", "storageLocationName", "materialType", "useState", "orderState"],
      names: [],
      tableData: [
        {a: '11', b: '22', c: '33', d: '44', e: '55', f: '66', g: '77'},
        
      ],
      select1: { model: '', label: '仓库名', options: ['仓库1','仓库2'], },
      select2: { model: '', label: '库区', options: [], }, 
        // { model: '', label: '货架', options: ['货架1','货架2'], },
        // { model: '', label: '~', options: ['货架1','货架2'], }
    };
  },
  watch: {
    select1:{
      handler: function (newVal, oldVal) {
        this.select2.options = Object.assign([], this.warehouse[newVal.model])
        console.log("options:", this.select2.options)
        
        // this.selectData[1].options = Object.assign({}, this.warehouse[newVal[0].model])
      },
      deep: true,
    }
  },
  methods: {
    initTabs() {
      if (localStorage.materialInfoTabs !== undefined) {
        const tabs = JSON.parse(localStorage.materialInfoTabs);
        // console.log(tabs);
        this.editableTabs = tabs.list;
        this.editableTabsValue = tabs.value;
        this.tabIndex = tabs.index;
        // console.log(this.editableTabs);
      } else {
        const tabs = {
          list: this.editableTabs,
          value: this.editableTabsValue,
          index: this.tabIndex
        };
        // console.log(tabs);
        localStorage.materialInfoTabs = JSON.stringify(tabs);
      }
    },
    getWareHouse() {
      this.$axios.post(`${window.$config.HOST}/InWarehouse/getWarehouseUseStateAllInfo`, {})
          .then((res) => {
            // console.log(`treeData = `, response);
            this.warehouse = res.data;
            console.log(this.warehouse)
            // 仓库
            this.select1.options = []
            Object.keys(this.warehouse).forEach(el => {
              this.select1.options.push(el)
            })
          })
          .catch(error => {
            // console.log(`error in initing tree`, error);
          });
    },
    addHome() {
      this.editableTabs = tabs.filter(tab => tab.name !== "");
      this.editableTabs.push({
        title: "/",
        name: "物料基本信息查询"
      });
    },
    updateTabs(tabs) {
      this.editableTabsValue = tabs.value;
      this.editableTabs = tabs.list;
      this.tabIndex = tabs.index;
      // console.log("emit: ", tabs);
    },
    search() {
      const params = {
        groupName: this.select2.model,
      }
      this.$axios.post(`${window.$config.HOST}/InWarehouse/getWarehouseUseStateInfoByParms`, params)
          .then((res) => {
            // console.log(`treeData = `, response);
            this.tableData = res.data;
            console.log(this.tableData)
            // 仓库
            
          })
          .catch(error => {
            // console.log(`error in initing tree`, error);
          });
    },
  }
};
</script>

<style lang="less" scoped>
.WarehouseUsage {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .body {
    flex: 1;
    display: flex;
    flex-direction: row;
    .main-nav {
      padding-top: 20px;
      min-width: 200px;
      border-right: 1px solid black;
    }
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      width: calc(~"100% - 250px");
      margin: 10px;
      .card {
        display: flex;
        flex-direction: column;
      }
      .leftTree {
        width: calc(~"30% - 100px");
        .treebuttons {
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          .el-button {
            padding-left: 10px;
          }
        }
        .custom-tree-node {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 14px;
          padding-right: 8px;
        }
      }
      .rightInfos {
        width: 70%;
        display: flex;
        flex-direction: column;
        max-height: 700px;
        overflow: auto;
        .table {
          margin-top: 20px;
        }
        .el-tabs {
          // height: 100%;
          display: flex;
          flex-direction: column;
        }
        .el-tab-pane {
          overflow: scroll;
          max-height: 500px;
        }
      }
      .search {
        & .row {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        .col{
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 400px;
            margin: 15px 0;
            &.short{
              width: 260px;
            }
            .label {
              font-size: 14px;
              width: 100px;
              white-space: nowrap;
              &.short-label{
                width: 30px;
              }
            }
            .el-select{
              &.short{
                width: 120px;
              }
              width: 150px;
              padding-left: 0px;
            }
          }
          .col-2{
            justify-content: flex-end;
          }
        // height: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin: 0 20px;
        .input-group {
          display: flex;
          flex-direction: column;
          .inputs {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-bottom: 15px;
          }
          .bar {
            display: flex;
            flex-direction: row;
            align-items: center;
            min-width: 150px;
            flex: 1;
            .title {
              min-width: 60px;
              font-size: 15px;
              margin: 0 10px 0 25px;
              text-align: left;
            }
          }
        }
        .buttons{
          display: flex;
          flex-direction: row;
          align-items: center;
          align-self: flex-start;
          & > div, button{
            margin-bottom: 15px;
          }
        }
        .adv-search {
          margin-left: 25px;
          cursor: pointer;
          white-space: nowrap;
        }
        .search-btn {
          margin: 0 20px;
        }
      }
      .table {
        width: calc(~"100% - 80px");
        padding: 10px;
      }
      .pagination {
        position: fixed;
        bottom: 20px;
        height: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin: 0 50px;
      }
    }
  }
}
</style>


