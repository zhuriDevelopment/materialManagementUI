<template>
  <div class="Tabs">
    <el-tabs v-model="value" type="card" editable @tab-click="clickTab" @edit="handleTabsEdit">
      <el-tab-pane :key="item.name" v-for="(item, index) in list"
        :label="item.title" :name="item.name">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

export default {
  name: 'Tabs',
  data() {
    return {
      value: this.tabValue,
      list: this.tabList,
      idx: this.tabIndex,
      tabMap: {
        '/': '物料基本信息查询',
        'MtrInfo': '物料基本信息',
        'MtrTypeModify': '物料分类管理',
        'Warehouse': '仓库在库查询',
        'WarehouseUsage': '仓库使用情况查询',
      },
    };
  },
  computed: {
    id() {
      if(this.$route.params.hasOwnProperty('id')){
        return this.$route.params.id
      } else {
        return ''
      }
    },
    query() {
      if(this.$route.query !== {}){
        return this.$route.query
      } else {
        return {}
      }
    }
  },
  props: ['tabValue', 'tabList', 'tabIndex'],
  mounted() {
    // console.log(this.$route)
    const pathName = (this.$route.name !== 'Home') ? this.$route.name : '/';
    // console.log(pathName)
    if(this.list.filter(tab => tab.name === pathName).length === 0) {
      this.addTab(pathName, this.id, this.query);
    } else {
      // this.idx = this.list.filter(tab => tab.value === pathName)[0].tabIndex;
      this.value = pathName;
      // this.updateTabs();
    }

  },
  methods: {
    handleTabsEdit(targetName, action) {
      if (action === 'remove') {
        let tabs = this.list;
        let activeName = this.value;
        let idx = 0;
        let flag = false;
        if (activeName === targetName) {
          flag = true;
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
                idx = (tabs[index + 1]) ? index : (index - 1);
              }
            }
          });
        }
        this.value = activeName;
        this.list = tabs.filter(tab => tab.name !== targetName);
        this.idx = idx;
        if(this.list.length === 0){
          // console.log('list length === 0')
          activeName = '/';
          idx = 0;
          this.addTab(activeName, '');
        }
        this.updateTabs();
        if(flag){
          this.clickTab({name: activeName, index: this.idx, id: this.list[this.idx].id});
        }
      }
    },
    clickTab(tab) {
      this.savePageState(tab);
      // console.log('click tab')
      // console.log(tab.name)
      // console.log(tab)
      // console.log(this.list)
      // console.log(tab.index)
      // console.log(this.list[tab.index])
      let name = tab.name;
      if(name === '/'){
        name = 'Home';
      }
      
      // console.log(this.$route.params);
      if(this.list[tab.index].hasOwnProperty('id') && this.list[tab.index].id !== '' ) {
        // console.log("error")
        this.$router.push({ name, params: { id: this.list[tab.index].id }, query: this.list[tab.index].query });
      } else {
        // console.log("success")
        this.$router.push({ name });
      }

    },
    addTab(name, id, query) {
      this.list.push({
        title: this.tabMap[name],
        name,
        id,
        query
      });
      this.value = name;
      // console.log('addTab: ',this.list);
      this.updateTabs();
    },
    updateTabs() {
      const tabs = {'list': this.list, 'value': this.value, 'index': this.idx, 'query': this.query};
      // console.log('updateTabs', tabs);
      this.$emit('updateTabs', tabs);
      this.savePageState(tabs);
    },
    savePageState(tab) {
      const tabs = {'list': this.list, 'value': tab.name, 'index': tab.index, 'query': tab.query};
      // console.log('save tab ', tabs);
      localStorage.materialInfoTabs = JSON.stringify(tabs);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.Tabs {
  width: 100%;
}
</style>
