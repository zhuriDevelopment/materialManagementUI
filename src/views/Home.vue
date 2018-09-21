<template>
  <div class="home">
    <nav-header></nav-header>
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
            <div class="input-group">
              <div class="inputs">
                <div class="bar">
                  <div class="title">物料类型</div>
                  <!-- <el-select v-model="materialType" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select> -->
                  <el-input v-model="materialType"></el-input>
                </div>
                <div class="bar">
                  <div class="title">物料编码</div>
                  <el-input v-model="materialCode"></el-input>
                </div>
                <div class="bar">
                  <div class="title">助记码</div>
                  <el-input v-model="mnemonic"></el-input>
                </div>
              </div>
              <div class="inputs" v-show="showAdv">
                <div class="bar">
                  <div class="title">SPU编码</div>
                  <el-input v-model="spuCode"></el-input>
                </div>
                <div class="bar">
                  <div class="title">SPU名称</div>
                  <el-input v-model="spuName"></el-input>
                </div>
                <div class="bar">
                  <div class="title">物料分类</div>
                  <el-input v-model="materialCategory"></el-input>
                </div>
              </div>
              <div class="inputs" v-show="showAdv">
                <div class="bar">
                  <div class="title">物料描述</div>
                  <el-input v-model="description"></el-input>
                </div>
              </div>
            </div>
            <div class="buttons">
              <!-- <div class="adv-search" @click="showAdvSearch">高级搜索</div> -->
              <el-button type="text" class="adv-search" @click="showAdvSearch">高级搜索</el-button>
              <el-button class="search-btn" @click="searchWithParams">搜索</el-button>
              <el-button type="primary" class="add-info" @click="createMtrInfos">新建物料信息</el-button>
            </div>
          </div>
          <div class="table">
            <el-table
              :data="tableData"
              border
              @row-click="clickRow"
              style="width: 100%">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                fixed
                prop="code"
                label="SPU编码"
                width="150">
              </el-table-column>
              <el-table-column
                prop="name"
                label="SPU名称"
                width="150">
              </el-table-column>
              <el-table-column
                prop="class"
                label="物料分类"
                width="150">
              </el-table-column>
              <el-table-column
                prop="desc"
                label="描述"
                width="200">
              </el-table-column>
              <el-table-column
                prop="figCode"
                label="设计图号"
                width="150">
              </el-table-column>
              <el-table-column
                prop="figVersion"
                label="设计版本"
                width="150">
              </el-table-column>
              <el-table-column
                prop="source"
                label="来源"
                width="100">
              </el-table-column>
              <el-table-column
                prop="unit"
                label="计量单位"
                width="200">
              </el-table-column>
              <el-table-column
                prop="note"
                label="备注"
                width="150">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="150">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                  <el-button type="text" size="small">编辑</el-button>
                  <el-button type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination">
            <div>{{this.pageNumberString}}</div>
            <!-- <el-pagination
              layout="prev, pager, next"
              :total="100">
            </el-pagination> -->
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

export default {
  name: "home",
  components: {
    NavHeader,
    Tabs,
    Breadcrumb,
    NavTree
  },
  created() {
    this.initTabs();
    this.getTableData();
  },
  data() {
    return {
      editableTabsValue: "/",
      editableTabs: [
        {
          title: "物料基本信息查询",
          name: "/"
        }
      ],
      tabIndex: "0",
      materialType: "",
      materialCode: "",
      mnemonic: "",
      spuCode: "",
      spuName: "",
      materialCategory: "",
      description: "",
      options: [
        {
          value: "选项1",
          label: "选项1"
        },
        {
          value: "选项2",
          label: "选项2"
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
      pageNumberString: "共搜索出100条数据",
      showAdv: false,
      treeData: [{
        label: '系统',
        children: [{
          label: '物料信息管理',
          // children: [{
          //   label: '三级 1-1-1'
          // }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
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
    clickRow(row, event, column) {
      // console.log(column);
      if (column.label !== "操作") {
        this.$router.push({ path: `/MtrInfo/${row.code}?name=${row.name}` });
      }
    },
    handleClick(row) {
      // console.log(row);
      this.$router.push({ path: `/MtrInfo/${row.code}?name=${row.name}` });
    },
    createMtrInfos() {
      this.$router.push({ path: `/MtrInfo/newCode?name=newName `});
    },
    getTableData() {
      this.$axios
        .post(`${window.$config.HOST}/MaterialManagement/getAllBaseInfo`)
        .then(response => {
          // console.log(response);
          let basedatas = response.data[0];
          let catdatas = response.data[1];
          let unitdatas = response.data[2];
          this.tableData = [];
          for (let i = 0; i < basedatas.length; ++i) {
            let tmpvalue = {};
            tmpvalue["code"] = basedatas[i]["spuCode"];
            tmpvalue["name"] = basedatas[i]["spuName"];
            tmpvalue["class"] = catdatas[i]["name"];
            tmpvalue["desc"] = basedatas[i]["description"];
            tmpvalue["figCode"] = basedatas[i]["designCode"];
            tmpvalue["figVersion"] = basedatas[i]["designVersion"];
            tmpvalue["source"] = basedatas[i]["source"];
            tmpvalue["unit"] = unitdatas[i]["name"];
            tmpvalue["note"] = basedatas[i]["note"];
            this.tableData.push(tmpvalue);
            this.pageNumberString = "共搜索出" + basedatas.length + "条数据";
          }
        })
        .catch(error => {
          // console.log(error);
        });
    },
    showAdvSearch() {
      this.showAdv = !this.showAdv;
    },
    searchWithParams() {
      let allEmptyFlag = 1;
      let sendData = {};
      if (this.materialType !== "") {
        sendData[`materialType`] = this.materialType;
        allEmptyFlag = 0;
      }
      if (this.materialCode !== "") {
        sendData[`materialCode`] = this.materialCode;
        allEmptyFlag = 0;
      }
      if (this.mnemonic !== "") {
        sendData[`mnemonic`] = this.mnemonic;
        allEmptyFlag = 0;
      }
      if (this.spuCode !== "") {
        sendData[`spuCode`] = this.spuCode;
        allEmptyFlag = 0;
      }
      if (this.spuName !== "") {
        sendData[`spuName`] = this.spuName;
        allEmptyFlag = 0;
      }
      if (this.materialCategory !== "") {
        sendData[`materialCategory`] = this.materialCategory;
        allEmptyFlag = 0;
      }
      if (this.description !== "") {
        sendData[`description`] = this.description;
        allEmptyFlag = 0;
      }
      // console.log(`searchParams: `, sendData);
      if (allEmptyFlag === 1) {
        this.getTableData();
      } else {
        this.$axios
          .post(`${window.$config.HOST}/MaterialManagement/getBaseInfo`, sendData)
          .then(response => {
            // console.log(response);
            let basedatas = response.data[0];
            let catdatas = response.data[1];
            let unitdatas = response.data[2];
            this.tableData = [];
            for (let i = 0; i < basedatas.length; ++i) {
              let tmpvalue = {};
              tmpvalue["code"] = basedatas[i]["spuCode"];
              tmpvalue["name"] = basedatas[i]["spuName"];
              tmpvalue["class"] = catdatas[i]["name"];
              tmpvalue["desc"] = basedatas[i]["description"];
              tmpvalue["figCode"] = basedatas[i]["designCode"];
              tmpvalue["figVersion"] = basedatas[i]["designVersion"];
              tmpvalue["source"] = basedatas[i]["source"];
              tmpvalue["unit"] = unitdatas[i]["name"];
              tmpvalue["note"] = basedatas[i]["note"];
              this.tableData.push(tmpvalue);
              this.pageNumberString = "共搜索出" + basedatas.length + "条数据";
            }
          })
          .catch(error => {
            // console.log(`searchWithParams error: `, error);
          });
      }
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
  .header {
    height: 50px;
    border-bottom: 1px solid black;
    line-height: 50px;
  }
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
      .cards {
        height: 50px;
        margin-bottom: 25px;
      }
      .card {
        display: flex;
        flex-direction: column;
      }
      .search {
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
