<template>
  <div class="home">
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
          <div class="leftTree">
            <div class="treebuttons">
              <el-button type="text" @click="addNode">添加</el-button>
              <el-button type="text" @click="editNode">编辑</el-button>
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
              <Mtr-type-modify-info @changeValue="setNewCatInfo" @updateAll="updateAllData" :data="mtrTypeModifyInfo"></Mtr-type-modify-info>
            </div>
            <div class="table">
              <el-tabs type="border-card" value = '1'>
                <el-tab-pane label="物料属性定义">
                  <Mtr-type-modify-table @changeValue="setNewBaseProp" :data="mtrTypeModifyTable"></Mtr-type-modify-table>
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
import NavTree from "@/components/MainNavTree";
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
    NavTree,
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
      mtrTypeModifyTable: [],
      mtrTypeModifyTableUpdateValue: [],
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
      catCode: '',
      catName: '',
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
      // console.log("initing Tree!");
      this.$axios.post(`${window.$config.HOST}/MaterialManagement/getMaterialCategory`, {})
          .then((response) => {
            // console.log(`treeData = `, response);
            this.treeData = [];
            this.treeData.push(response.data);
          })
          .catch(error => {
            // console.log(`error in initing tree`, error);
          });
      // console.log("init Tree Finished!");
    },
    addNode(){
      const data = this.nodeData;
      const newChild = { id: this.id++, label: 'test', children: [], parentId: data.id };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },
    editNode() {
      const data = this.nodeData;
      // console.log('node:', data);
      if(!data.hasOwnProperty('id')){
        this.$message({
          type: 'info',
          message: '请先选择节点'
        });
      } else {
        this.$prompt('修改节点名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          data.label = value;
          this.$message({
            type: 'success',
            message: '修改成功'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      }

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
      this.treeData =  Object.assign([], this.treeData, []);
    },
    handleNodeClick(data) {
      this.nodeData = data;
      // console.log(`handleNodeClick data`, data);
      // console.log(`data.id`, data.id);
      const catId = data.id;
      this.$axios.post(`${window.$config.HOST}/MaterialManagement/getMaterialCategoryInfosWithId`, {
        "id": catId,
      })
      .then((response) => {
        // console.log(`handleNodeClick resposne`, response);
        this.mtrTypeModifyInfo = response.data[0];
        // const baseData = response.data[0];
        // const catData = response.data[1];
        // this.mtrTypeModifyInfo = {
        //   "baseData": baseData,
        //   "catData": catData,
        // };
      });
    },
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
    setNewBaseProp(updateData) {
      this.mtrTypeModifyTableUpdateValue = Object.assign([], updateData);
      let len = this.mtrTypeModifyTableUpdateValue[0].length;
      for (let i = 0; i < len; ++i) {
        this.mtrTypeModifyTableUpdateValue[0]["spuCode"] = this.spuCode;
      }
    },
    setNewCatInfo(catCode, catName) {
      // console.log(`setNewCatInfo`, catCode, catName);
      this.catCode = catCode;
      this.catName = catName;
      this.$axios.post(`${window.$config.HOST}/MaterialManagement/getMaterialInfoWithCatCodeAndCatName`, {
        "code": catCode,
        "name": catName,
        "typeArr": [5, 6, 7, 8, 9, 11]
      }).then((response) => {
        // console.log(`setNewCatInfo response:`, response);
        this.mtrPurchaseAndStore = response.data[0];
        this.mtrPlan = response.data[1];
        this.mtrSales = response.data[2];
        this.mtrQuality = response.data[3];
        this.mtrFinance = response.data[4];
        let len = response.data[5].length;
        this.mtrTypeModifyTable = [];
        for (let i = 0; i < len; ++i) {
          let tmp = {};
          tmp["type"] = response.data[5][i].type.toString();
          tmp["label"] = response.data[5][i].label;
          tmp["name"] = response.data[5][i].name;
          let rangeObject = JSON.parse(response.data[5][i].valueRange);
          // console.log(`rangeObject`, rangeObject);
          tmp["rangetype"] = rangeObject.type.toString();
          tmp["range"] = rangeObject.lower + " - " + rangeObject.upper;
          tmp["sort"] = response.data[5][i].sort;
          this.mtrTypeModifyTable.push(tmp);
        }
      }).catch(error => {
        // console.log(`error in setNewSpuInfo`, error);
      });
      // // console.log(spuCode, spuName);
      // this.spuCode = spuCode;
      // this.spuName = spuName;
      // this.$axios.post(`${window.$config.HOST}/MaterialManagement/getMaterialInfo`, {
      //   "spuCode": spuCode,
      //   "spuName": spuName,
      //   // 附件信息以后由单独的附件管理模块进行管理，独立于物料信息管理模块
      //   "typeArr": [5, 6, 7, 8, 9, 11],
      // })
      // .then((response) => {
      //   // console.log(response);
      //   this.mtrPurchaseAndStore = response.data[0];
      //   this.mtrPlan = response.data[1];
      //   this.mtrSales = response.data[2];
      //   this.mtrQuality = response.data[3];
      //   this.mtrFinance = response.data[4];
      //   let len = response.data[5][1].length;
      //   this.mtrTypeModifyTable = [];
      //   for (let i = 0; i < len; ++i) {
      //     let tmp = {};
      //     tmp["type"] = response.data[5][1][i].type.toString();
      //     tmp["label"] = response.data[5][1][i].label;
      //     tmp["name"] = response.data[5][1][i].name;
      //     let rangeObject = JSON.parse(response.data[5][1][i].valueRange);
      //     // console.log(`rangeObject`, rangeObject);
      //     tmp["rangetype"] = rangeObject.type.toString();
      //     tmp["range"] = rangeObject.lower + " - " + rangeObject.upper;
      //     tmp["sort"] = response.data[5][1][i].sort;
      //     tmp["value"] = response.data[5][0][i].value;
      //     this.mtrTypeModifyTable.push(tmp);
      //   }
      // })
      // .catch(error => {
      //   // console.log(`error in setNewSpuInfo`, error);
      // });
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
      this[type] = newVal;
      // // console.log(newVal, this[type]);
    },
    updateAllData() {
      // console.log(`Update All Values!`);
      let sendData = {
        code: this.catCode,
        name: this.catName,
        data: [],
      };
      if (this.mtrPurchaseAndStoreUpdateValue.length != 0) {
        let tmpData = {
          propertyType: 5,
          updateValue: this.mtrPurchaseAndStoreUpdateValue,
          organizationCode: 1
        };
        sendData["data"].push(tmpData);
        // console.log(`add PurchaseAndStore values!`);
      }
      if (this.mtrPlanUpdateValue.length != 0) {
        let tmpData = {
          propertyType: 6,
          updateValue: this.mtrPlanUpdateValue,
          organizationCode: 1
        };
        sendData["data"].push(tmpData);
        // console.log(`add Plan values!`);
      }
      if (this.mtrSalesUpdateValue.length != 0) {
        let tmpData = {
          propertyType: 7,
          updateValue: this.mtrSalesUpdateValue,
          organizationCode: 1
        };
        sendData["data"].push(tmpData);
        // console.log(`add Sales values!`);
      }
      if (this.mtrQualityUpdateValue.length != 0) {
        let tmpData = {
          propertyType: 8,
          updateValue: this.mtrQualityUpdateValue,
          organizationCode: 1
        };
        sendData["data"].push(tmpData);
        // console.log(`add Quality values!`);
      }
      if (this.mtrFinanceUpdateValue.length != 0) {
        let tmpData = {
          propertyType: 9,
          updateValue: this.mtrFinanceUpdateValue,
          organizationCode: 1
        };
        sendData["data"].push(tmpData);
        // console.log(`add Finance values!`);
      }
      if (this.mtrTypeModifyTableUpdateValue.length != 0) {
        let tmpData = {
          propertyType: 11,
          updateValue: this.mtrTypeModifyTableUpdateValue,
        };
        sendData["data"].push(tmpData);
        // console.log(`add mtrTypeModifyTableValue!`);
      }
      // console.log(`sendData`, sendData);
      this.$axios.post(`${window.$config.HOST}/MaterialManagement/updateMaterialInfoWithCatCodeAndCatName`, sendData)
        .then((response) => {
          // console.log(response);
        });
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
        flex-direction: row;
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
    }
  }
}
</style>


