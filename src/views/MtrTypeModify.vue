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
              <el-button type="text">添加</el-button>
              <el-button type="text">删除</el-button>
            </div>
            <el-tree
              :data="treeData"
              node-key="id"
              :props="defaultTreeData"
              @node-click="handleNodeClick">
            </el-tree>
          </div>
          <div class="rightInfos">
            <div class="baseInfos">
              <Mtr-type-modify-info :data="mtrTypeModifyInfo"></Mtr-type-modify-info>
            </div>
            <div class="table">
              <el-tabs type="border-card">
                <el-tab-pane label="物料属性定义">
                  <Mtr-type-modify-table :data="mtrTypeModifyTable"></Mtr-type-modify-table>
                </el-tab-pane>
                <el-tab-pane label="采购和库存属性">
                  <Mtr-purchase-and-store :data="mtrPurchaseAndStore"></Mtr-purchase-and-store>
                </el-tab-pane>
                <el-tab-pane label="计划类属性">
                  <Mtr-plan :data="mtrPlan"></Mtr-plan>
                </el-tab-pane>
                <el-tab-pane label="销售类属性">
                  <Mtr-sales :data="mtrSales"></Mtr-sales>
                </el-tab-pane>
                <el-tab-pane label="质量类属性">
                  <Mtr-quality :data="mtrQuality"></Mtr-quality>
                </el-tab-pane>
                <el-tab-pane label="财务类属性">
                  <Mtr-finance :data="mtrFinance"></Mtr-finance>
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
      mtrPlan: {},
      mtrSales: {},
      mtrQuality: {},
      mtrFinance: {},
      treeData: [],
      defaultTreeData: {
        children: 'children',
        label: 'label'
      }
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
          });
      console.log("init Tree Finished!");
    },
    handleNodeClick(data) {
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
    }
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


