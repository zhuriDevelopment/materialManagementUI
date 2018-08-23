<template>
  <div class="Mtr-type-modify-info">
    <div class="row">
      <div class="col" v-for="(col, index) in inputBoxData">
        <div class="label">{{col.label}}</div>
        <!-- <el-input
          :placeholder="col.holder"
          v-model="col.model"
          clearable>
        </el-input> -->
        <el-select
          :placeholder="col.holder"
          @change="selectchange(index)"
          v-model="col.model">
          <el-option
            v-for="item in col.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="row">
      <div class="col" v-for="col in selectData">
        <div class="label">{{col.label}}</div>
        <el-select v-model="col.model" placeholder="请选择" @change="typeselectchange">
          <el-option
            v-for="item in col.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="col col-2">
        <el-button type="primary">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MtrTypeModifyInfo',
  data() {
    return {
      info: this.data,
      inputBoxData: [{
        label: '分类编码',
        model: '',
        holder: '请输入分类编码',
        options: [{label: '选项1', value: 'option1'}, {label: '选项2', value: 'option2'}, {label: '选项3', value: 'option3'}]
      }, {
        label: '分类名称',
        model: '',
        holder: '请输入分类名称',
        options: [{label: '选项1', value: 'option1'}, {label: '选项2', value: 'option2'}, {label: '选项3', value: 'option3'}]
      }],
      selectData: [{
        model: '',
        label: '物料类别',
        options: [],
      }],
      spuCodeArr: [],
      spuNameArr: [],
      typeArr: [
        {label: '无类别', value: '0'},
        {label: '原材料', value: '1'},
        {label: '半成品', value: '2'},
        {label: '成品', value: '3'},
        {label: '设备', value: '4'},
      ],
      spuCodeModel: '',
      spuNameModel: '',
      typeModel: '',
      code2Name: {},
      name2Code: {},
    }
  },
  props: ["data"],
  watch: {
    data(newVal, oldVal) {
      console.log("pass data in mtr type info!");
      console.log(this.data);
      if (this.data.baseData.length > 0) {
        this.spuCodeArr = [];
        this.spuNameArr = [];
        for (let baseInfo in this.data.baseData) {
          this.spuCodeArr.push(this.data.baseData[baseInfo].spuCode);
          this.spuNameArr.push(this.data.baseData[baseInfo].spuName);
          this.code2Name[this.data.baseData[baseInfo].spuCode] = this.data.baseData[baseInfo].spuName;
        }
        const invertObj = obj =>
          Object.keys(obj).reduce((acc, key)=>{
            acc[obj[key]] = key;
            return acc;
          }, {});
        this.name2Code = invertObj(this.code2Name);
        let spuCodeOptions = [];
        let spuNameOptions = [];
        for (let spuCode in this.spuCodeArr) {
          spuCodeOptions.push({
            label: this.spuCodeArr[spuCode],
            value: this.spuCodeArr[spuCode],
          });
        };
        for (let spuName in this.spuNameArr) {
          spuNameOptions.push({
            label: this.spuNameArr[spuName],
            value: this.spuNameArr[spuName],
          })
        };
        this.spuCodeModel = this.spuCodeArr[0];
        this.spuNameModel = this.spuNameArr[0];
        this.inputBoxData = [
          {
            label: '分类编码',
            model: this.spuCodeModel,
            holder: '请选择分类编码',
            options: spuCodeOptions,
          },
          {
            label: '分类名称',
            model: this.spuNameModel,
            holder: '请选择分类名称',
            options: spuNameOptions,
          }
        ];
        this.typeModel = toString(0); // 这里传typemodel
        this.selectData = [{
          model: this.typeModel,
          label: '物料类别',
          options: this.typeArr,
        }];
      } else {
        console.log("baseData empty!");
      }
    },
  },
  methods: {
    selectchange(idx) {
      console.log("change!");
      console.log(idx);
      // 检查是name还是code，0是code，1是name
      const model = this.inputBoxData[idx].model;
      this.inputBoxData[1-idx].model = (idx === 0) ? this.code2Name[model] : this.name2Code[model];
    },
    typeselectchange(value) {
      console.log(`typechange!`);
      console.log(value);
    }
  }
}
</script>

<style lang="less" scoped>
.Mtr-type-modify-info {
  display: flex;
  flex-direction: column;
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .col{
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 400px;
      margin: 15px 0;
      .label {
        font-size: 14px;
        width: 120px;
        white-space: nowrap;
      }
      .el-select{
        width: 100%;
        padding-left: 0px;
      }
    }
    .col-2{
      justify-content: flex-end;
    }
  }
}
</style>


