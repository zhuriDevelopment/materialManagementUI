<template>
  <div class="WarehouseSplit">
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
          <Form class="search" :formData="formData"></Form>
          <div class="buttons">
            <el-button type="primary" @click="addData">新增</el-button>
            <el-button>修改</el-button>
            <el-button type="danger">删除</el-button>
          </div>
          <div class="table">
            <el-table
              :data="tableData"
              border
              highlight-current-row
              style="width: 100%">
              <el-table-column type="selection" width="55" fixed>
              </el-table-column>
              <el-table-column
                v-for="(p,index) in Object.keys(tableData[0])"
                :key="index"
                width="160"
                :label="labels[index]">
                <template slot-scope="scope">
                  <div v-if="[0, 1, 2, 3, 9, 10, 11].includes(index)">{{tableData[scope.$index][p]}}</div>
                  <el-select 
                    v-else-if="[].includes(index)" 
                    v-model="tableData[scope.$index][p]">
                    <el-option
                      v-for="item in units"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                  <el-input v-else v-model="tableData[scope.$index][p]"></el-input>           
                </template>
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
import Form from "@/components/Warehouse/Form";

export default {
  name: "WarehouseSplit",
  components: {
    NavHeader,
    Tabs,
    Breadcrumb,
    NavTree,
    Form,
  },
  created() {
    this.initTabs();
  },
  data() {
    return {
      formData: [
        [ //row1
          {type: 'input', title: '拆分单号', value: '', },
          {type: 'date', title: '拆分日期', value: '', },
          {type: 'select', title: '操作人', value: '', options: ['A', 'B', 'C']},
        ],
        [ //row2
          {type: 'select', title: '待拆分品', value: '', options: ['A', 'B', 'C']}, 
          {type: 'input', title: '商品名称', value: ''},
          {type: 'input', title: '拆分数量', value: ''},
        ],
        [
          {type: 'select', title: '拆分仓库', value: '', options: ['a','b','c']},
          {type: 'input', title: '批号', value: ''},
        ],
        [
          {type: 'textarea', title: '备注', value: ''},
        ]

      ],
      treeData: [],
      defaultTreeData: {
        children: 'children',
        label: 'label'
      },
      nodeData: {},
      id: 1000,
      tabIndex: '0',
      labels: ["拆分后的商品编号", "商品名称", "商品类别", "规格", "计量单位", "批号", "拆分单数", "拆分总数", "单价", "金额", "备注说明", "当前库存"],
      names: [],
      tableData: [
        {a: '11', b: '22', c: '33', d: '44', e: '55', f: '66', g: '77', h: '88', i: '99', j: '10', q: '11', p: '12'},
        
      ],
      units: ['米', '千克'],
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
    addData() {

    },
  }
};
</script>

<style lang="less" scoped>
.WarehouseSplit {
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
      }
      .buttons{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        margin: 30px 20px;
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


