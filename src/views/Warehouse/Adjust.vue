<template>
  <div class="WarehouseAdjust">
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
          <div class="search">
              <div class="row">
                <div class="col">
                  <div class="title">调整单号: </div>
                  <el-input v-model="inputs.aId"></el-input>
                </div>
                <div class="col">
                  <div class="title">调整日期: </div>
                  <el-input v-model="inputs.aDate"></el-input>
                </div>
                <div class="col">
                  <div class="title">申请人: </div>
                  <el-select v-model="inputs.name" placeholder="请选择">
                    <el-option
                      v-for="item in inputs.options[0]"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="title">操作仓库: </div>
                  <el-select v-model="inputs.operation" placeholder="请选择">
                    <el-option
                      v-for="item in inputs.options[1]"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </div>
                <div class="col">
                  <div class="title">操作员: </div>
                  <el-select v-model="inputs.operator" placeholder="请选择">
                    <el-option
                      v-for="item in inputs.options[1]"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </div>
                <div class="col">
                  <div class="title">原因: </div>
                  <el-input v-model="inputs.reason" placeholder="请选择"></el-input>
                </div>
              </div>
              <div class="row">
                <div class="col col-1">
                  <div class="title">备注: </div>
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="inputs.textarea">
                  </el-input>
                </div>
              </div>
              <!-- <div class="col col-2">
                <el-button type="primary" @click="search">搜索</el-button>
              </div> -->
            
          </div>
          
          <div class="table">
            <el-table
              :data="tableData"
              border
              highlight-current-row
              style="width: 100%">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                v-for="(p,index) in Object.keys(tableData[0])"
                :key="index"
                :prop="p"
                width="160"
                :label="labels[index]">
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
  name: "WarehouseAdjust",
  components: {
    NavHeader,
    Tabs,
    Breadcrumb,
    NavTree,
  },
  created() {
    this.initTabs();
  },
  data() {
    return {
      inputs:{
        aId: '',
        aData: '',
        name: '',
        operation: '',
        operator: '',
        reason: '',
        textarea: '',
        options: [['admin'],[''], ['操作员1']],
      },
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
      labels: ["仓库名", "库区", "货架", "库位", "物料种类", "使用状况", "预约状况"],
      names: [],
      tableData: [
        {a: '11', b: '22', c: '33', d: '44', e: '55', f: '66', g: '77'},
        
      ],
      selectData: [
        { model: '', label: '仓库名', options: ['仓库1','仓库2'], },
        { model: '', label: '库区', options: ['库区1','库区2'], }, 
        { model: '', label: '货架', options: ['货架1','货架2'], },
        { model: '', label: '~', options: ['货架1','货架2'], }
      ],
    };
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
      
    },
  }
};
</script>

<style lang="less" scoped>
.WarehouseAdjust {
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
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      
        margin: 0 20px;
        .row{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 100%;
        }
        .col{
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 300px;
            margin: 15px 0;
            &.col-1{
              width: 100%;
            }
            .el-select, .el-input, .el-textarea{
                width: 200px;
            }
            .title {
              width: 80px;
              white-space: nowrap;
              text-align: left;
            }
            
          }
          .col-2{
            justify-content: flex-end;
          }
        // height: 50px;
        
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


