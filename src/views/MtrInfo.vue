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
          <el-tabs type="border-card">
            <el-tab-pane label="物料基本信息">
              <Mtr-basic-info :data="mtrBasicInfo"></Mtr-basic-info>
            </el-tab-pane>
            <el-tab-pane label="物料定义">
              <Mtr-defs :data="mtrDefs"></Mtr-defs>
            </el-tab-pane>
            <el-tab-pane label="SKU定义">
              <Mtr-sku-defs :data="mtrSkuDefs"></Mtr-sku-defs>
            </el-tab-pane>
            <el-tab-pane label="附件管理">
              <Mtr-files :data="mtrFiles"></Mtr-files>
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
</template>

<script>
import NavHeader from '@/components/Nav'
import Tabs from '@/components/Tabs'
import Breadcrumb from '@/components/Breadcrumb'
import MtrBasicInfo from '@/components/MtrInfoPanels/MtrBasicInfo'
import MtrDefs from '@/components/MtrInfoPanels/MtrDefs'
import MtrSkuDefs from '@/components/MtrInfoPanels/MtrSkuDefs'
import MtrFiles from '@/components/MtrInfoPanels/MtrFiles'
import MtrPurchaseAndStore from '@/components/MtrInfoPanels/MtrPurchaseAndStore'
import MtrPlan from '@/components/MtrInfoPanels/MtrPlan'
import MtrSales from '@/components/MtrInfoPanels/MtrSales'
import MtrQuality from '@/components/MtrInfoPanels/MtrQuality'
import MtrFinance from '@/components/MtrInfoPanels/MtrFinance'

export default {
  name: 'home',
  components: {
    NavHeader,
    Tabs,
    Breadcrumb,
    MtrBasicInfo,
    MtrDefs,
    MtrSkuDefs,
    MtrFiles,
    MtrPurchaseAndStore,
    MtrPlan,
    MtrSales,
    MtrQuality,
    MtrFinance
  },
  created() {
    this.initTabs();
  },
  data() {
    return {
      mtrBasicInfo: {},
      mtrDefs: {},
      mtrSkuDefs: {},
      mtrFiles: {},
      mtrPurchaseAndStore: {},
      mtrPlan: {},
      mtrSales: {},
      mtrQuality: {},
      mtrFinance: {},
      editableTabsValue: '',
      editableTabs: [],
      tabIndex: '',
      value: '',
      code1: '',
      code2: '',
      options: [{
        value: '选项1',
        label: '选项1'
      }, {
        value: '选项2',
        label: '选项2'
      }, {
        value: '选项3',
        label: '选项3'
      }, {
        value: '选项4',
        label: '选项4'
      }, {
        value: '选项5',
        label: '选项5'
      }],
      tableData:[
        {code: '1', name: '1', class:'', desc:'',figCode:'',figVersion:'',source:'',unit:'',note:''}
      ],

    };
  },
  methods: {
    initTabs() {
      if(localStorage.materialInfoTabs !== undefined) {
        const tabs = JSON.parse(localStorage.materialInfoTabs);
        console.log(tabs)
        this.editableTabs = tabs.list;
        this.editableTabsValue = tabs.value;
        this.tabIndex = tabs.index;
      } else {
        const tabs = {'list': this.editableTabs, 'value': this.editableTabsValue, 'index': this.tabIndex};
        console.log(tabs)
        localStorage.materialInfoTabs = JSON.stringify(tabs);
      }
    },
    addHome() {
      console.log('addhome')
      this.editableTabs = tabs.filter(tab => tab.name !== '');
      this.editableTabs.push({
        title: '/',
        name: '物料基本信息查询',
      })
    },
    updateTabs(tabs) {
      this.editableTabsValue = tabs.value;
      this.editableTabs = tabs.list;
      this.tabIndex = tabs.index
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.home{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .body{
    flex: 1;
    display: flex;
    flex-direction: row;
    .main-nav{
      padding-top: 200px;
      min-width: 200px;
      border-right: 1px solid black;
    }
    .content{
      flex: 1;
      display: flex;
      flex-direction: column;
      width: calc(~"100% - 250px");
      margin: 10px;
      .cards{
        height: 50px;
        margin-bottom: 25px;
      }
      .card{
        display: flex;
        flex-direction: column;
        flex: 1;
        .el-tabs{
          // height: 100%;
          display: flex;
          flex-direction: column;
        }
        .el-tab-pane{
          overflow: scroll;
          max-height: 500px;
        }
      }
      .search{
        height: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin: 0 20px;
        .inputs{
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .bar{
          display: flex;
          flex-direction: row;
          align-items: center;
          min-width: 150px;
          .title{
            min-width: 60px;
            font-size: 15px;
            margin: 0 10px 0 25px;
            text-align: left;

          }
        }
        .adv-search{
          margin: 0 20px;
          cursor: pointer;
        }
        .search-btn{
          margin: 0 20px;
        }
      }
      .table{
        width: calc(~"100% - 80px");
        padding: 10px;
      }
      .pagination{
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
