<template>
  <div class="Mtr-basic-info">
    <div class="upper">
      <div class="row" v-for="row in rows.slice(0,3)">
        <div class="col" v-for="col in row">
          <div class="label">{{col.label}}</div>
          <div class="inputbar">
            <el-select v-if="col.hasOwnProperty('options')" v-model="col.value" placeholder="请选择">
              <el-option
                v-for="item in col.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-input v-else v-model="col.value" placeholder="请输入"></el-input>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col col-2">
          <div class="label">{{rows[3][0].label}}</div>
          <div class="inputbar">
            <el-input v-model="rows[3][0].value"></el-input>
          </div>
        </div>
        <div class="col">
          <el-checkbox v-model="rows[3][1].value">{{rows[3][1].label}}</el-checkbox>
        </div>
      </div>
      <div class="row">
        <div class="col col-2">
          <div class="label">{{rows[4][0].label}}</div>
          <div class="inputbar">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="rows[4][0].value">
            </el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="lower">
      <div class="row">
        <div class="col">
          <div class="label">{{rows[5][0].label}}</div>
          <div class="inputbar">
            <el-select v-model="rows[5][0].value" placeholder="请选择">
              <el-option
                v-for="item in rows[5][0].options"
                :key="item.value"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col col-2">
          <div class="label">{{rows[6][0].label}}</div>
          <div class="inputbar">
            <el-table
              ref="singleTable"
              :data="rows[6][0].value"
              highlight-current-row
              align="left"
              style="width: 100%">
              <el-table-column
                type="index"
                width="50">
              </el-table-column>
              <el-table-column
                property="unit"
                label="计量单位"
                width="120">
              </el-table-column>
              <el-table-column
                property="factor"
                label="换算系数"
                width="120">
              </el-table-column>
              <el-table-column
                label="排序"
                width="120">
                <template slot-scope="scope">
                  <i class="el-icon-sort-up"></i>
                  <i class="el-icon-sort-down"></i>
                </template>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MtrBasicInfo',
  data() {
    return {
      info: this.data,
      rows: [
        [{label: 'SPU编码', value: ''}, {label: 'SPU名称', value: ''}, {label: '物料类型', value: '', options: [{label: '选项1', value: 'option1'} , {label: '选项2', value: 'option2'}, {label: '选项3', value: 'option3'}]}],
        [{label: '物料分类', value: '', options: [{label: '选项1', value: 'option1'} , {label: '选项2', value: 'option2'}, {label: '选项3', value: 'option3'}]}, {label: '来源', value: '', options: [{label: '选项1', value: 'option1'} , {label: '选项2', value: 'option2'}, {label: '选项3', value: 'option3'}]}, {label: '用途', value: ''}],
        [{label: '设计图号', value: ''}, {label: '设计版次', value: ''}, {label: '助记码', value: ''}],
        [{label: '规格描述', value: ''}, {label: '多规格物料', value: false}],
        [{label: '备注', value: ''}],
        [{label: '默认计量单位', value: '', options: [{label: '选项1', value: 'option1'} , {label: '选项2', value: 'option2'}, {label: '选项3', value: 'option3'}]}],
        [{label: '辅助计量单位', value: [{unit: '米', factor: ''}]}],
      ],
    };
  },
  props: ["data"],

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.Mtr-basic-info {
  height: 100%;
  display: flex;
  flex-direction: column;
  .upper{
    display: flex;
    flex-direction: column;
    padding: 20px 0;
    border-bottom: 1px solid black;
  }
  .lower{
    display: flex;
    flex-direction: column;
    padding: 20px 0;
  }
  .row{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .col{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 400px;
        margin: 15px 0;
        .label{
          font-size: 14px;
          width: 120px;
          white-space: nowrap;
        }
        .inputbar{
          width: 250px;
          margin-right: 15px;
          .el-select{
            width: 100%;
          }
        }
      }
      .col-2{
        width: 100%;
        .inputbar{
          margin-right: 20%;
          flex: 1;
        }
        .el-table{
          max-width: 600px;
        }
      }
    }
  i{
    font-size: 20px;
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>
