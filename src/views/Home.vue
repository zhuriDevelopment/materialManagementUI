<template>
  <div class="home">
    <div class="header">Banner</div>
    <div class="body">
      <div class="main-nav">MainMenu</div>
      <div class="content">
        <div class="cards">
          <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
            <el-tab-pane
              :key="item.name"
              v-for="(item, index) in editableTabs"
              :label="item.title"
              :name="item.name"
            >
              {{item.content}}
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="nav">
          <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">物料信息管理</el-breadcrumb-item>
          <el-breadcrumb-item>物料基本信息查询</el-breadcrumb-item>
          <el-breadcrumb-item>子页面1</el-breadcrumb-item>
          <el-breadcrumb-item>子页面2</el-breadcrumb-item>
        </el-breadcrumb>
        </div>
        <div class="search">
          <div class="inputs">
            <div class="bar">
              <div class="title">物料分类</div>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="bar">
              <div class="title">物料编码</div>
              <el-input v-model="code1"></el-input>
            </div>
            <div class="bar">
              <div class="title">助记码</div>
              <el-input v-model="code2"></el-input>
            </div>
          </div>
          <div class="adv-search">高级搜索</div>
          <el-button class="search-btn">搜索</el-button>
          <el-button type="primary" class="add-info">新建物料信息</el-button>
        </div>
        <div class="table">
          <el-table
            :data="tableData"
            border
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
          <div>共搜索出100条数据</div>
          <el-pagination
            layout="prev, pager, next"
            :total="100">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'home',
  components: {
    
  },
  data() {
    return {
      editableTabsValue: '2',
      editableTabs: [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }],
      tabIndex: 2,
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
    handleTabsEdit(targetName, action) {
      if (action === 'add') {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        });
        this.editableTabsValue = newTabName;
      }
      if (action === 'remove') {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
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

  .header{
    height: 50px;
    border-bottom: 1px solid black;
    line-height: 50px;
  }
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
        margin-bottom: 35px;
      }
      .nav{
        margin-top: 20px;
        height: 50px;
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
