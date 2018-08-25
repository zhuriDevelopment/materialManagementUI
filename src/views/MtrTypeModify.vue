<template>
  <div class="home">
    <Nav-header></Nav-header>
    <div class="body">
      <div class="main-nav">MainMenu</div>
      <div class="content">
        <div class="cards">
          <Tabs :tabValue="editableTabsValue" :tabList="editableTabs" :tabIndex="tabIndex" @updateTabs="updateTabs"></Tabs>
        </div>
        <Breadcrumb :tabIndex="tabIndex" :tabList="editableTabs" @clickHome="addHome"></Breadcrumb>
        <div class="card">
          <div class="leftTree">
            <div class="treebuttons">
              <el-button type="text" @click="addNode">添加</el-button>
              <el-button type="text" @click="deleteNode">删除</el-button>
            </div>
            <el-tree
              :data="treeData"
              node-key="id"
              default-expand-all
              :props="defaultTreeData"
              @node-click="handleNodeClick">
            </el-tree>
          </div>
          <div class="rightInfos">
            <div class="baseInfos">
              <Mtr-type-modify-info @changeValue="setNewSpuInfo" :data="mtrTypeModifyInfo"></Mtr-type-modify-info>
            </div>
            <div class="table">
              <el-tabs type="border-card" value = '1'>
                <el-tab-pane label="物料属性定义">
                  <Mtr-type-modify-table :data="mtrTypeModifyTable"></Mtr-type-modify-table>
                </el-tab-pane>
                <el-tab-pane label="采购和库存属性">
                  <Mtr-purchase-and-store @changeModel="updateControlData($event, 'mtrPurchaseAndStore')" :data="mtrPurchaseAndStore"></Mtr-purchase-and-store>
                </el-tab-pane>
                <el-tab-pane label="计划类属性">
                  <Mtr-plan @changeModel="updateControlData($event, 'mtrPlan')" :data="mtrPlan"></Mtr-plan>
                </el-tab-pane>
                <el-tab-pane label="销售类属性">
                  <Mtr-sales @changeModel="updateControlData($event, 'mtrSales')" :data="mtrSales"></Mtr-sales>
                </el-tab-pane>
                <el-tab-pane label="质量类属性">
                  <Mtr-quality @changeModel="updateControlData($event, 'mtrQuality')" :data="mtrQuality"></Mtr-quality>
                </el-tab-pane>
                <el-tab-pane label="财务类属性">
                  <Mtr-finance @changeModel="updateControlData($event, 'mtrFinance')" :data="mtrFinance"></Mtr-finance>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavHeader from "@/components/Nav";
import Tabs from "@/components/Tabs";
import Breadcrumb from "@/components/Breadcrumb";
import MtrTypeModifyInfo from "@/components/MtrTypeModifyPanels/MtrTypeModifyInfo";
import MtrTypeModifyTable from "@/components/MtrTypeModifyPanels/MtrTypeModifyTable";
import MtrPurchaseAndStore from "@/components/MtrInfoPanels/MtrPurchaseAndStore";
import MtrPlan from "@/components/MtrInfoPanels/MtrPlan";
import MtrSales from "@/components/MtrInfoPanels/MtrSales";
import MtrQuality from "@/components/MtrInfoPanels/MtrQuality";
import MtrFinance from "@/components/MtrInfoPanels/MtrFinance";

export default {
  name: "home",
  components: {
    NavHeader,
    Tabs,
    Breadcrumb,
    MtrTypeModifyInfo,
    MtrTypeModifyTable,
    MtrPurchaseAndStore,
    MtrPlan,
    MtrSales,
    MtrQuality,
    MtrFinance
  },
  created() {
    this.initTabs();
    this.initTree();
  },
  data() {
    return {
      mtrTypeModifyInfo: {},
      mtrTypeModifyTable: {},
      mtrPurchaseAndStore: {},
      mtrPurchaseAndStoreUpdateValue: [],
      mtrPlan: {},
      mtrPlanUpdateValue: [],
      mtrSales: {},
      mtrSalesUpdateValue: [],
      mtrQuality: {},
      mtrQualityUpdateValue: [],
      mtrFinance: {},
      mtrFinanceUpdateValue: [],
      treeData: [],
      defaultTreeData: {
        children: 'children',
        label: 'label'
      },
      nodeData: {},
      id: 1000,
    };
  },
  methods: {
    initTree() {
      console.log("initing Tree!");
      this.$axios.post(`${window.$config.HOST}/MaterialManagement/getMaterialCategory`, {})
          .then((response) => {
            console.log(response);
            this.treeData = [];
            this.treeData.push(response.data);
          })
          .catch(error => {
            this.treeData = [{
              "id": 0,
              "label": "物料总分类",
              "parentId": -1,
              "level": 0,
              "children": [
                  {
                      "id": 1,
                      "label": "A类",
                      "parentId": 0,
                      "level": 1,
                      "children": [
                          {
                              "id": 4,
                              "label": "工厂用品",
                              "parentId": 1,
                              "level": 2,
                              "children": [
                                  {
                                      "id": 7,
                                      "label": "大型机器",
                                      "parentId": 4,
                                      "level": 3,
                                      "children": []
                                  }
                              ]
                          }
                      ]
                  },
                  {
                      "id": 2,
                      "label": "B类",
                      "parentId": 0,
                      "level": 1,
                      "children": [
                          {
                              "id": 5,
                              "label": "仓库存货",
                              "parentId": 2,
                              "level": 2,
                              "children": [
                                  {
                                      "id": 8,
                                      "label": "布料",
                                      "parentId": 5,
                                      "level": 3,
                                      "children": []
                                  }
                              ]
                          }
                      ]
                  },
                  {
                      "id": 3,
                      "label": "C类",
                      "parentId": 0,
                      "level": 1,
                      "children": [
                          {
                              "id": 6,
                              "label": "办公用品",
                              "parentId": 3,
                              "level": 2,
                              "children": [
                                  {
                                      "id": 9,
                                      "label": "文具类",
                                      "parentId": 6,
                                      "level": 3,
                                      "children": []
                                  }
                              ]
                          }
                      ]
                  }
              ]
          }];
          });
      console.log("init Tree Finished!");
    },
    addNode(){
      const data = this.nodeData;
      const newChild = { id: this.id++, label: 'test', children: [] };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },
    deleteNode() {
      const searchTree = (element, id) => {
        if(element.id === id){
          return element;
        } else if (element.children != null){
            let result = null;
            for(let i = 0; result === null && i < element.children.length; i++){
                result = searchTree(element.children[i], id);
            }
            return result;
        }
        return null;
      }
      const node = searchTree(this.treeData[0], this.nodeData.id);
      const parent = searchTree(this.treeData[0], node.parentId);
      let children = [];
      if(parent !== null) {
        children = parent.children;
      } else {
        children = this.treeData[0];
      }
      const index = children.findIndex(d => d.id === this.nodeData.id);
      children.splice(index, 1);
      console.log(this.treeData[0])
      console.log(parent, index);
    },
    handleNodeClick(data) {
      this.nodeData = data;
      console.log(data);
      console.log(data.id);
      const catId = data.id;
      this.$axios.post(`${window.$config.HOST}/MaterialManagement/getAllMaterialBaseByCategoryInfos`, {
        "id": catId,
      })
      .then((response) => {
        console.log(response);
        const baseData = response.data[0];
        const catData = response.data[1];
        this.mtrTypeModifyInfo = {
          "baseData": baseData,
          "catData": catData,
        };
      });
    },
    initTabs() {
      if (localStorage.materialInfoTabs !== undefined) {
        const tabs = JSON.parse(localStorage.materialInfoTabs);
        console.log(tabs);
        this.editableTabs = tabs.list;
        this.editableTabsValue = tabs.value;
        this.tabIndex = tabs.index;
        console.log(this.editableTabs);
      } else {
        const tabs = {
          list: this.editableTabs,
          value: this.editableTabsValue,
          index: this.tabIndex
        };
        console.log(tabs);
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
      console.log("emit: ", tabs);
    },
    setNewSpuInfo(spuCode, spuName) {
      console.log(spuCode, spuName);
      this.$axios.post(`${window.$config.HOST}/MaterialManagement/getMaterialInfo`, {
        "spuCode": spuCode,
        "spuName": spuName,
        // 附件信息以后由单独的附件管理模块进行管理，独立于物料信息管理模块
        "typeArr": [5, 6, 7, 8, 9],
      })
      .then((response) => {
        console.log(response);
        this.mtrPurchaseAndStore = response.data[0];
        this.mtrPlan = response.data[1];
        this.mtrSales = response.data[2];
        this.mtrQuality = response.data[3];
        this.mtrFinance = response.data[4];
      })
      .catch(error => {
        this.mtrPurchaseAndStore = [
          {
              "propertyName": "物料制购类型",
              "propertyValue": "制购类型1"
          },
          {
              "propertyName": "ABC分类",
              "propertyValue": "ABC分类1"
          },
          {
              "propertyName": "循环盘点编码",
              "propertyValue": "盘点编码1"
          },
          {
              "propertyName": "是否批次管理",
              "propertyValue": "true"
          },
          {
              "propertyName": "是否单件管理",
              "propertyValue": "true"
          },
          {
              "propertyName": "是否进价控制",
              "propertyValue": "true"
          },
          {
              "propertyName": "默认供应商",
              "propertyValue": "默认供应商"
          },
          {
              "propertyName": "默认采购部门",
              "propertyValue": "默认采购部门"
          },
          {
              "propertyName": "默认仓库",
              "propertyValue": "默认仓库"
          },
          {
              "propertyName": "默认采购单位",
              "propertyValue": "默认采购单位"
          },
          {
              "propertyName": "默认库存单位",
              "propertyValue": "默认库存单位"
          },
          {
              "propertyName": "默认库位",
              "propertyValue": "默认库位"
          }
        ];
      });
    },
    checkContainsNV(list, name) {
      for (let element in list) {
        if (list[element].name === name) {
          return element;
        }
      }
      return -1;
    },
    updateControlData(newVal, type) {
      for (let element in newVal) {
        let oldValue = this[type][element].propertyValue;
        let newValue = newVal[element].propertyValue;
        let proName = newVal[element].propertyName;
        let findIndex = 0;
        if (newValue !== oldValue) {
          switch(type) {
            case `mtrPurchaseAndStore`:
              findIndex = this.checkContainsNV(this.mtrPurchaseAndStoreUpdateValue, proName);
              if (findIndex != -1) {
                this.mtrPurchaseAndStoreUpdateValue[findIndex].value = newValue;
              } else {
                this.mtrPurchaseAndStoreUpdateValue.push({
                  name: proName,
                  value: newValue,
                });
              }
              break;
            case `mtrFinance`:
              findIndex = this.checkContainsNV(this.mtrFinanceUpdateValue, proName);
              if (findIndex != -1) {
                this.mtrFinanceUpdateValue[findIndex].value = newValue;
              } else {
                this.mtrFinanceUpdateValue.push({
                  name: proName,
                  value: newValue,
                });
              }
              break;
            case `mtrSales`:
              findIndex = this.checkContainsNV(this.mtrSalesUpdateValue, proName);
              if (findIndex != -1) {
                this.mtrSalesUpdateValue[findIndex].value = newValue;
              } else {
                this.mtrSalesUpdateValue.push({
                  name: proName,
                  value: newValue,
                });
              }
              break;
            case `mtrQuality`:
              findIndex = this.checkContainsNV(this.mtrQualityUpdateValue, proName);
              if (findIndex != -1) {
                this.mtrQualityUpdateValue[findIndex].value = newValue;
              } else {
                this.mtrQualityUpdateValue.push({
                  name: proName,
                  value: newValue,
                });
              }
              break;
            case `mtrPlan`:
              findIndex = this.checkContainsNV(this.mtrPlanUpdateValue, proName);
              if (findIndex != -1) {
                this.mtrPlanUpdateValue[findIndex].value = newValue;
              } else {
                this.mtrPlanUpdateValue.push({
                  name: proName,
                  value: newValue,
                });
              }
              break;
          }
        }
      }
      console.log(this.mtrPurchaseAndStoreUpdateValue);
      console.log(this.mtrFinanceUpdateValue);
      console.log(this.mtrSalesUpdateValue);
      console.log(this.mtrQualityUpdateValue);
      console.log(this.mtrPlanUpdateValue);
      this[type] = newVal;
      // console.log(newVal, this[type]);
    },
  }
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  display: flex;
  flex-direction: column;
  .body {
    flex: 1;
    display: flex;
    flex-direction: row;
    .main-nav {
      padding-top: 200px;
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
        flex-direction: row;
      }
      .leftTree {
        width: calc(~"30% - 100px");
        .treebuttons {
          flex: 1;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          padding-left: 20px;
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
      }
    }
  }
}
</style>


