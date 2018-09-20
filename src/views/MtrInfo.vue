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
          <div class="button-row">
            <el-row type="flex" justify="end">
              <el-button type="primary" icon="el-icon-check" @click="submitChangeValue">提交</el-button>
            </el-row>
          </div>
          <el-tabs type="border-card" value="0">
            <el-tab-pane label="物料基本信息">
              <Mtr-basic-info @changeModel="updateMtrData($event, 'mtrBasicInfo')"
                :basicInfo="mtrBasicInfo"
                :units="mtrBasicInfoUnits"></Mtr-basic-info>
            </el-tab-pane>
            <el-tab-pane label="物料定义">
              <Mtr-defs @changeModel="updateMtrData($event, 'mtrDefs')" :data="mtrDefs"></Mtr-defs>
            </el-tab-pane>
            <el-tab-pane label="SKU定义">
              <Mtr-sku-defs @changeModel="updateMtrData($event, 'mtrSkuDefs')" :data="mtrSkuDefs"></Mtr-sku-defs>
            </el-tab-pane>
            <el-tab-pane label="附件管理">
              <Mtr-files :data="mtrFiles"></Mtr-files>
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
</template>

<script>
import NavHeader from "@/components/Nav";
import Tabs from "@/components/Tabs";
import Breadcrumb from "@/components/Breadcrumb";
import NavTree from "@/components/MainNavTree";
import MtrBasicInfo from "@/components/MtrInfoPanels/MtrBasicInfo";
import MtrDefs from "@/components/MtrInfoPanels/MtrDefs";
import MtrSkuDefs from "@/components/MtrInfoPanels/MtrSkuDefs";
import MtrFiles from "@/components/MtrInfoPanels/MtrFiles";
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
    MtrBasicInfo,
    MtrDefs,
    MtrSkuDefs,
    MtrFiles,
    MtrPurchaseAndStore,
    MtrPlan,
    MtrSales,
    MtrQuality,
    MtrFinance,
  },
  created() {
    this.initTabs();
  },
  mounted() {
    this.setData();
  },
  data() {
    return {
      spuCode: "",
      spuName: "",
      mtrBasicInfo: {},
      mtrBasicInfoUnits: {},
      mtrBasicInfoUpdateValue: {},
      mtrBasicInfoUnitsUpdateValue: {},
      mtrUnitTable: {},
      mtrUnitTableUpdateValue: [],
      mtrDefs: {},
      mtrDefsUpdateValue: [],
      mtrSkuDefs: {},
      mtrSkuDefsUpdateValue: [],
      mtrFiles: {},
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
      editableTabsValue: "",
      editableTabs: [],
      tabIndex: "",
      value: "",
      code1: "",
      code2: "",
      options: [
        {
          value: "选项1",
          label: "选项1"
        },
        {
          value: "选项2",
          label: "选项2"
        },
        {
          value: "选项3",
          label: "选项3"
        },
        {
          value: "选项4",
          label: "选项4"
        },
        {
          value: "选项5",
          label: "选项5"
        }
      ],
      tableData: [
        {
          code: "1",
          name: "1",
          class: "",
          desc: "",
          figCode: "",
          figVersion: "",
          source: "",
          unit: "",
          note: ""
        }
      ],

    };
  },
  methods: {
    initTabs() {
      if (localStorage.materialInfoTabs !== undefined) {
        const tabs = JSON.parse(localStorage.materialInfoTabs);
        console.log(tabs);
        this.editableTabs = tabs.list;
        this.editableTabsValue = tabs.value;
        this.tabIndex = tabs.index;
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
      console.log("addhome");
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
    },
    checkContainsNV(list, name) {
      for (let element in list) {
        if (list[element].name === name) {
          return element;
        }
      }
      return -1;
    },
    updateMtrData(newVal, type) {
      let flag = false;
      let unitTable = [];
      let defaultUnit = [];
      console.log("emit: ", newVal);
      console.log("origin: ", this[type]);
      if (type === "mtrBasicInfo") {
        unitTable = newVal.asUnit;
        defaultUnit = newVal.defaultUnit;
        delete newVal.asUnit;
        for (let i in newVal) {
          if (this[type].hasOwnProperty(i)) {
            if (newVal[i] !== this[type][i]) {
              // console.log(type, i, newVal[i], this[type][i]);
              flag = true;
              break;
            }
          } else {
            console.log("new element! => ", i);
            flag = true;
            break;
          }
        }
      } else {
        if (newVal.length !== this[type].length) {
          flag = true;
        } else {
          for (let i = 0; i < newVal.length; i++) {
            for (let key in newVal[i]) {
              if (newVal[i][key] !== this[type][i][key]) {
                flag = true;
                break;
              }
            }
            if (flag) {
              break;
            }
          }
        }
      }
      if (flag) {
        switch (type) {
          case "mtrBasicInfo":
            console.log("mtrBasicInfo: ", newVal);
            console.log("计量单位表: ", unitTable);
            console.log("默认计量单位：", defaultUnit);
            this.spuCode = newVal.spuCode;
            this.spuName = newVal.spuName;
            this.mtrBasicInfoUpdateValue = [];
            for (let key in newVal) {
              if (this[type].hasOwnProperty(key)) {
                if (newVal[key] !== this[type][key]) {
                  this.mtrBasicInfoUpdateValue.push({
                    name: key,
                    value: newVal[key]
                  });
                }
              }
            }
            console.log(`mtrBasicInfoUpdateValue: `, this.mtrBasicInfoUpdateValue);
            this.mtrUnitTableUpdateValue = [];
            this.mtrUnitTableUpdateValue.push(defaultUnit);
            this.mtrUnitTableUpdateValue.push([]);
            for (let i in unitTable) {
              if (unitTable[i].name !== "") {
                this.mtrUnitTableUpdateValue[1].push(unitTable[i]);
              }
            }
            // this.mtrUnitTableUpdateValue.push(unitTable);
            console.log("mtrUnitTableUpdateValue: ", this.mtrUnitTableUpdateValue);
            break;
          case "mtrDefs":
            console.log("mtrDefs: ", newVal);
            this.mtrDefsUpdateValue = newVal;
            break;
          case "mtrSkuDefs":
            console.log("mtrSkuDefs: ", newVal);
            this.mtrSkuDefsUpdateValue = newVal;
            break;
        }
      }
    },
    updateControlData(newVal, type) {
      for (let element in newVal) {
        let oldValue = this[type][element].propertyValue;
        let newValue = newVal[element].propertyValue;
        let proName = newVal[element].propertyName;
        let findIndex = 0;
        if (newValue !== oldValue) {
          switch (type) {
            case `mtrPurchaseAndStore`:
              findIndex = this.checkContainsNV(
                this.mtrPurchaseAndStoreUpdateValue,
                proName
              );
              if (findIndex != -1) {
                this.mtrPurchaseAndStoreUpdateValue[findIndex].value = newValue;
              } else {
                this.mtrPurchaseAndStoreUpdateValue.push({
                  name: proName,
                  value: newValue
                });
              }
              break;
            case `mtrFinance`:
              findIndex = this.checkContainsNV(
                this.mtrFinanceUpdateValue,
                proName
              );
              if (findIndex != -1) {
                this.mtrFinanceUpdateValue[findIndex].value = newValue;
              } else {
                this.mtrFinanceUpdateValue.push({
                  name: proName,
                  value: newValue
                });
              }
              break;
            case `mtrSales`:
              findIndex = this.checkContainsNV(
                this.mtrSalesUpdateValue,
                proName
              );
              if (findIndex != -1) {
                this.mtrSalesUpdateValue[findIndex].value = newValue;
              } else {
                this.mtrSalesUpdateValue.push({
                  name: proName,
                  value: newValue
                });
              }
              break;
            case `mtrQuality`:
              findIndex = this.checkContainsNV(
                this.mtrQualityUpdateValue,
                proName
              );
              if (findIndex != -1) {
                this.mtrQualityUpdateValue[findIndex].value = newValue;
              } else {
                this.mtrQualityUpdateValue.push({
                  name: proName,
                  value: newValue
                });
              }
              break;
            case `mtrPlan`:
              findIndex = this.checkContainsNV(
                this.mtrPlanUpdateValue,
                proName
              );
              if (findIndex != -1) {
                this.mtrPlanUpdateValue[findIndex].value = newValue;
              } else {
                this.mtrPlanUpdateValue.push({
                  name: proName,
                  value: newValue
                });
              }
              break;
          }
        }
      }
      this[type] = newVal;
      // console.log(newVal, this[type]);
    },
    setData() {
      if (this.$route.params.id !== 'newCode' && this.$route.query.name !== 'newName') {
        this.$axios
          .post(`${window.$config.HOST}/MaterialManagement/getMaterialInfo`, {
            spuCode: this.$route.params.id,
            spuName: this.$route.query.name,
            // 附件信息以后由单独的附件管理模块进行管理，独立于物料信息管理模块
            typeArr: [1, 2, 3, 5, 6, 7, 8, 9, 10]
          })
          .then(response => {
            console.log(`ajax response`, response);
            // 物料基础信息
            const _mtrBasicInfo = response.data[0][0];
            this.mtrBasicInfo = {
              spuCode: _mtrBasicInfo["spuCode"],
              spuName: _mtrBasicInfo["spuName"],
              type: _mtrBasicInfo["type"],
              category: _mtrBasicInfo["materialCatId"],
              source: _mtrBasicInfo["source"],
              usage: _mtrBasicInfo["usage"],
              designCode: _mtrBasicInfo["designCode"],
              designVersion: _mtrBasicInfo["designVersion"],
              mnemonic: _mtrBasicInfo["mnemonic"],
              note: _mtrBasicInfo["note"]
            };
            // 物料基础信息中的物料单位
            const _mtrBasicInfoUnits = response.data[8];
            this.mtrBasicInfoUnits = _mtrBasicInfoUnits;
            // 物料定义
            const _mtrDefs = response.data[1];
            let _defLen = response.data[1].length;
            this.mtrDefs = [];
            for (let i = 0; i < _defLen; ++i) {
              let tmpDef = {};
              tmpDef["materialCode"] = _mtrDefs[i]["materialCode"];
              tmpDef["materialName"] = _mtrDefs[i]["materialName"];
              tmpDef["oldMaterialCode"] = _mtrDefs[i]["oldMaterialCode"];
              tmpDef["barCode"] = _mtrDefs[i]["barCode"];
              tmpDef["purchasePrice"] = _mtrDefs[i]["purchasePrice"];
              tmpDef["sellingPrice"] = _mtrDefs[i]['sellingPrice'];
              tmpDef["format1"] = `规格1`;
              tmpDef["format2"] = `规格2`;
              tmpDef["format3"] = `规格3`;
              this.mtrDefs.push(tmpDef);
            }
            // 物料sku信息
            const _mtrSkuDefs = response.data[2];
            let _skuLen = response.data[2][0].length;
            this.mtrSkuDefs = [];
            for (let i = 0; i < _skuLen; ++i) {
              let tmpSku = {};
              tmpSku["skuCode"] = _mtrSkuDefs[0][i]["skuCode"];
              tmpSku["materialCode"] = _mtrSkuDefs[1][i]["materialCode"];
              tmpSku["unit"] = _mtrSkuDefs[2][i]["name"];
              tmpSku["barCode"] = _mtrSkuDefs[1][i]["barCode"];
              tmpSku["purchasePrice"] = _mtrSkuDefs[0][i]["purchasePrice"];
              tmpSku["sellingPrice"] = _mtrSkuDefs[0][i]["sellingPrice"];
              tmpSku["description"] = _mtrSkuDefs[0][i]["description"];
              this.mtrSkuDefs.push(tmpSku);
            }
            this.mtrPurchaseAndStore = response.data[3];
            this.mtrPlan = response.data[4];
            this.mtrSales = response.data[5];
            this.mtrQuality = response.data[6];
            this.mtrFinance = response.data[7];
          })
          .catch(error => {
            console.log(error);
            this.mtrBasicInfo = {
              spuCode: "1",
              spuName: "111",
              type: "123",
              category: "321",
              source: "123",
              usage: "321",
              designCode: "qqq",
              designVersion: "1.0",
              mnemonic: "123",
              note: "123"
            };
            this.mtrDefs = [{
              materialCode: 'B12343',
              materialName: '布料',
              oldMaterialCode: 'B12333',
              barCode: '123321',
              purchasePrice: '0',
              sellingPrice: '0',
              format1: '规格1',
              format2: '规格2',
              format3: '规格3',
            }];
            this.mtrPurchaseAndStore = [
              {
                propertyName: "物料制购类型",
                propertyValue: "制购类型1"
              },
              {
                propertyName: "ABC分类",
                propertyValue: "ABC分类1"
              },
              {
                propertyName: "循环盘点编码",
                propertyValue: "盘点编码1"
              },
              {
                propertyName: "是否批次管理",
                propertyValue: "true"
              },
              {
                propertyName: "是否单件管理",
                propertyValue: "true"
              },
              {
                propertyName: "是否进价控制",
                propertyValue: "true"
              },
              {
                propertyName: "默认供应商",
                propertyValue: "默认供应商"
              },
              {
                propertyName: "默认采购部门",
                propertyValue: "默认采购部门"
              },
              {
                propertyName: "默认仓库",
                propertyValue: "默认仓库"
              },
              {
                propertyName: "默认采购单位",
                propertyValue: "默认采购单位"
              },
              {
                propertyName: "默认库存单位",
                propertyValue: "默认库存单位"
              },
              {
                propertyName: "默认库位",
                propertyValue: "默认库位"
              }
            ];
            this.mtrPlan = [
              {
                propertyName: "是否独立需求",
                propertyValue: "true"
              },
              {
                propertyName: "订货提前期（天）",
                propertyValue: "7"
              },
              {
                propertyName: "补货政策",
                propertyValue: "补货政策1"
              },
              {
                propertyName: "补货周期（天）",
                propertyValue: "15"
              },
              {
                propertyName: "最大库存量",
                propertyValue: "一个仓库"
              },
              {
                propertyName: "安全库存量",
                propertyValue: "半个仓库"
              },
              {
                propertyName: "订货批量",
                propertyValue: "10批一次"
              },
              {
                propertyName: "批量政策",
                propertyValue: "批量政策1"
              },
              {
                propertyName: "批量周期（天）",
                propertyValue: "7"
              },
              {
                propertyName: "默认计划单位",
                propertyValue: "默认计划单位"
              }
            ];
            this.mtrSales = [
              {
                propertyName: "销售计划价格",
                propertyValue: "1000"
              },
              {
                propertyName: "计价货币",
                propertyValue: "计价货币1"
              },
              {
                propertyName: "是否售价控制",
                propertyValue: "true"
              },
              {
                propertyName: "销售价格策略",
                propertyValue: "价格策略1"
              },
              {
                propertyName: "销价下限率（%）",
                propertyValue: "10"
              },
              {
                propertyName: "销售成本科目",
                propertyValue: "成本科目1"
              },
              {
                propertyName: "默认客户",
                propertyValue: "客户A"
              },
              {
                propertyName: "销售地",
                propertyValue: "销售地1"
              },
              {
                propertyName: "默认业务员",
                propertyValue: "业务员小青"
              },
              {
                propertyName: "默认销售单位",
                propertyValue: "默认销售单位"
              }
            ];
            this.mtrQuality = [
              {
                propertyName: "检验方式",
                propertyValue: "不检验"
              },
              {
                propertyName: "检验水准",
                propertyValue: "检验水准1"
              },
              {
                propertyName: "检验程度",
                propertyValue: "检验程度1"
              },
              {
                propertyName: "默认检验部门",
                propertyValue: "默认检测部门"
              },
              {
                propertyName: "检验工时（时）",
                propertyValue: "150"
              },
              {
                propertyName: "存储期限（天）",
                propertyValue: "60"
              },
              {
                propertyName: "默认检验员",
                propertyValue: "默认检验员"
              },
              {
                propertyName: "检验标准文件",
                propertyValue: "文件A"
              }
            ];
            this.mtrFinance = [
              {
                propertyName: "财务类别",
                propertyValue: "财务类别1"
              },
              {
                propertyName: "记账本位币",
                propertyValue: "位币1"
              },
              {
                propertyName: "会计科目",
                propertyValue: ""
              },
              {
                propertyName: "增值税代码",
                propertyValue: "默认增值税代码"
              },
              {
                propertyName: "存货计价方法",
                propertyValue: "计价方法1"
              },
              {
                propertyName: "成本计算方法",
                propertyValue: "计算方法1"
              },
              {
                propertyName: "开票类型",
                propertyValue: "类型1"
              }
            ];
          });
      } else {
        console.log(`add new infos!`);
        this.mtrBasicInfo = {
          spuCode: '',
          spuName: '',
          type: '',
          category: '',
          source: '',
          usage: '',
          designCode: '',
          designVersion: '',
          mnemonic: '',
          note: ''
        };
        this.mtrBasicInfoUnits = [[{
          label: '初始单位',
          name: '初始单位',
          englishName: 'init Unit',
          conversionFactor: '1',
          relatedId: '0',
          sort: 1,
        }],
        [{
          label: '初始单位',
          name: '初始单位',
          englishName: 'init Unit',
          conversionFactor: '1',
          relatedId: '0',
          sort: 1,
        }]];
        this.mtrDefs = [];
        this.mtrSkuDefs = [];
        this.mtrPurchaseAndStore = [
          {
            propertyName: "物料制购类型",
            propertyValue: "制购类型1"
          },
          {
            propertyName: "ABC分类",
            propertyValue: "ABC分类1"
          },
          {
            propertyName: "循环盘点编码",
            propertyValue: "盘点编码1"
          },
          {
            propertyName: "是否批次管理",
            propertyValue: "true"
          },
          {
            propertyName: "是否单件管理",
            propertyValue: "true"
          },
          {
            propertyName: "是否进价控制",
            propertyValue: "true"
          },
          {
            propertyName: "默认供应商",
            propertyValue: "默认供应商"
          },
          {
            propertyName: "默认采购部门",
            propertyValue: "默认采购部门"
          },
          {
            propertyName: "默认仓库",
            propertyValue: "默认仓库"
          },
          {
            propertyName: "默认采购单位",
            propertyValue: "默认采购单位"
          },
          {
            propertyName: "默认库存单位",
            propertyValue: "默认库存单位"
          },
          {
            propertyName: "默认库位",
            propertyValue: "默认库位"
          }
        ];
        this.mtrPurchaseAndStoreUpdateValue = [];
        for (var element in this.mtrPurchaseAndStore) {
          this.mtrPurchaseAndStoreUpdateValue.push({
            "name": this.mtrPurchaseAndStore[element].propertyName,
            "value": this.mtrPurchaseAndStore[element].propertyValue,
          });
        };
        this.mtrPlan = [
          {
            propertyName: "是否独立需求",
            propertyValue: "true"
          },
          {
            propertyName: "订货提前期（天）",
            propertyValue: "7"
          },
          {
            propertyName: "补货政策",
            propertyValue: "补货政策1"
          },
          {
            propertyName: "补货周期（天）",
            propertyValue: "15"
          },
          {
            propertyName: "最大库存量",
            propertyValue: "一个仓库"
          },
          {
            propertyName: "安全库存量",
            propertyValue: "半个仓库"
          },
          {
            propertyName: "订货批量",
            propertyValue: "10批一次"
          },
          {
            propertyName: "批量政策",
            propertyValue: "批量政策1"
          },
          {
            propertyName: "批量周期（天）",
            propertyValue: "7"
          },
          {
            propertyName: "默认计划单位",
            propertyValue: "默认计划单位"
          }
        ];
        this.mtrPlanUpdateValue = [];
        for (var element in this.mtrPlan) {
          this.mtrPlanUpdateValue.push({
            "name": this.mtrPlan[element].propertyName,
            "value": this.mtrPlan[element].propertyValue,
          });
        };
        this.mtrSales = [
          {
            propertyName: "销售计划价格",
            propertyValue: "1000"
          },
          {
            propertyName: "计价货币",
            propertyValue: "计价货币1"
          },
          {
            propertyName: "是否售价控制",
            propertyValue: "true"
          },
          {
            propertyName: "销售价格策略",
            propertyValue: "价格策略1"
          },
          {
            propertyName: "销价下限率（%）",
            propertyValue: "10"
          },
          {
            propertyName: "销售成本科目",
            propertyValue: "成本科目1"
          },
          {
            propertyName: "默认客户",
            propertyValue: "客户A"
          },
          {
            propertyName: "销售地",
            propertyValue: "销售地1"
          },
          {
            propertyName: "默认业务员",
            propertyValue: "业务员小青"
          },
          {
            propertyName: "默认销售单位",
            propertyValue: "默认销售单位"
          }
        ];
        this.mtrSalesUpdateValue = [];
        for (var element in this.mtrSales) {
          this.mtrSalesUpdateValue.push({
            "name": this.mtrSales[element].propertyName,
            "value": this.mtrSales[element].propertyValue,
          });
        };
        this.mtrQuality = [
          {
            propertyName: "检验方式",
            propertyValue: "不检验"
          },
          {
            propertyName: "检验水准",
            propertyValue: "检验水准1"
          },
          {
            propertyName: "检验程度",
            propertyValue: "检验程度1"
          },
          {
            propertyName: "默认检验部门",
            propertyValue: "默认检测部门"
          },
          {
            propertyName: "检验工时（时）",
            propertyValue: "150"
          },
          {
            propertyName: "存储期限（天）",
            propertyValue: "60"
          },
          {
            propertyName: "默认检验员",
            propertyValue: "默认检验员"
          },
          {
            propertyName: "检验标准文件",
            propertyValue: "文件A"
          }
        ];
        this.mtrQualityUpdateValue = [];
        for (var element in this.mtrQuality) {
          this.mtrQualityUpdateValue.push({
            "name": this.mtrQuality[element].propertyName,
            "value": this.mtrQuality[element].propertyValue,
          });
        };
        this.mtrFinance = [
          {
            propertyName: "财务类别",
            propertyValue: "财务类别1"
          },
          {
            propertyName: "记账本位币",
            propertyValue: "位币1"
          },
          {
            propertyName: "会计科目",
            propertyValue: "默认会计科目"
          },
          {
            propertyName: "增值税代码",
            propertyValue: "默认增值税代码"
          },
          {
            propertyName: "存货计价方法",
            propertyValue: "计价方法1"
          },
          {
            propertyName: "成本计算方法",
            propertyValue: "计算方法1"
          },
          {
            propertyName: "开票类型",
            propertyValue: "类型1"
          }
        ];
        this.mtrFinanceUpdateValue = [];
        for (var element in this.mtrFinance) {
          this.mtrFinanceUpdateValue.push({
            "name": this.mtrFinance[element].propertyName,
            "value": this.mtrFinance[element].propertyValue,
          });
        };
      }
    },
    submitChangeValue() {
      console.log("change!");
      // console.log(this.$route);
      let spuCode = this.$route.params.id;
      let spuName = this.$route.query.name;
      if (spuCode === 'newCode' && spuName === 'newName') {
        spuCode = this.spuCode;
        spuName = this.spuName;
      }
      let sendData = {
        spuCode: spuCode,
        spuName: spuName,
        data: []
      };
      console.log(`spuCode`, spuCode, `spuName`, spuName);
      if (this.mtrBasicInfoUpdateValue.length > 0) {
        let tmpData = {
          propertyType: 1,
          updateValue: this.mtrBasicInfoUpdateValue
        };
        sendData[`data`].push(tmpData);
        console.log(`add BasicInfo values!`);
      }
      if (this.mtrDefsUpdateValue.length > 0) {
        for (let i in this.mtrDefsUpdateValue) {
          delete this.mtrDefsUpdateValue[i].format1;
          delete this.mtrDefsUpdateValue[i].format2;
          delete this.mtrDefsUpdateValue[i].format3;
        }
        let tmpData = {
          propertyType: 2,
          updateValue: this.mtrDefsUpdateValue
        };
        sendData[`data`].push(tmpData);
        console.log(`add Defs Values!`);
      }
      if (this.mtrSkuDefsUpdateValue.length > 0) {
        let tmpData = {
          propertyType: 3,
          updateValue: this.mtrSkuDefsUpdateValue
        };
        sendData[`data`].push(tmpData);
        console.log(`add SkuDefs Values!`);
      }
      if (this.mtrPurchaseAndStoreUpdateValue.length != 0) {
        let tmpData = {
          propertyType: 5,
          updateValue: this.mtrPurchaseAndStoreUpdateValue,
          organizationCode: 1
        };
        sendData["data"].push(tmpData);
        console.log(`add PurchaseAndStore values!`);
      }
      if (this.mtrPlanUpdateValue.length != 0) {
        let tmpData = {
          propertyType: 6,
          updateValue: this.mtrPlanUpdateValue,
          organizationCode: 1
        };
        sendData["data"].push(tmpData);
        console.log(`add Plan values!`);
      }
      if (this.mtrSalesUpdateValue.length != 0) {
        let tmpData = {
          propertyType: 7,
          updateValue: this.mtrSalesUpdateValue,
          organizationCode: 1
        };
        sendData["data"].push(tmpData);
        console.log(`add Sales values!`);
      }
      if (this.mtrQualityUpdateValue.length != 0) {
        let tmpData = {
          propertyType: 8,
          updateValue: this.mtrQualityUpdateValue,
          organizationCode: 1
        };
        sendData["data"].push(tmpData);
        console.log(`add Quality values!`);
      }
      if (this.mtrFinanceUpdateValue.length != 0) {
        let tmpData = {
          propertyType: 9,
          updateValue: this.mtrFinanceUpdateValue,
          organizationCode: 1
        };
        sendData["data"].push(tmpData);
        console.log(`add Finance values!`);
      }
      if (this.mtrUnitTableUpdateValue.length != 0) {
        let tmpData = {
          propertyType: 10,
          updateValue: this.mtrUnitTableUpdateValue,
        };
        sendData["data"].push(tmpData);
        console.log(`add Unit Values!`);
      }
      console.log(sendData);
      this.$axios.post(`${window.$config.HOST}/MaterialManagement/updateMaterialInfo`, sendData)
        .then((response) => {
          console.log(response);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.home {
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
      .button-row {
        margin-bottom: 15px;
      }
      .cards {
        height: 50px;
        margin-bottom: 15px;
      }
      .card {
        display: flex;
        flex-direction: column;
        flex: 1;
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
        height: 50px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin: 0 20px;
        .inputs {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .bar {
          display: flex;
          flex-direction: row;
          align-items: center;
          min-width: 150px;
          .title {
            min-width: 60px;
            font-size: 15px;
            margin: 0 10px 0 25px;
            text-align: left;
          }
        }
        .adv-search {
          margin: 0 20px;
          cursor: pointer;
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
