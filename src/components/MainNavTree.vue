<template>
  <div class="nav-tree">
    <el-tree :data="treeData" node-key="id" :default-expanded-keys="[0,1]" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>


export default {
  name: 'NavTree',
  data() {
    return {
      treeData: [{
        id: 0,
        label: '系统',
        children: [{
          id: 1,
          label: '物料信息管理',
          // children: [{
          //   label: '三级 1-1-1'
          // }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },

    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
      if(data.label === "物料信息管理"){
        this.$router.push('/');
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-tree {
  width: 200px;
}
</style>
