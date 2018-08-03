<template>
  <div class="Mtr-files">
    <div class="lower">
      <div class="row">
        <div class="buttonGroup">
          <div class="buttonSingle">
            <el-button type="primary">上传<i class="el-icon-upload el-icon--right"></i></el-button>
          </div>
        </div>
      </div>
      <div class="row" v-for="files in filesData">
        <div class="col col-2">
          <div class="label">物料描述文件</div>
          <div class="filebar">
            <el-input placeholder="请输入内容" v-model="files.filePath">
                <el-button slot="append">浏览...</el-button>
            </el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MtrFiles',
  data() {
    return {
      info: this.data,
      filesData: [{
        'fileId': 1,
        'fileName': '1.txt',
        'filePath': 'file://User/cplayer/1.txt'
      }, {
        'fileId': 2,
        'fileName': '2.txt',
        'filePath': 'file://User/cplayer/2.txt'
      }]
    };
  },
  props: ["data"],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.Mtr-files {
  height: 100%;
  display: flex;
  flex-direction: column;
  .lower{
    display: flex;
    flex-direction: column;
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
        .filebar{
          margin-right: 15px;
          flex: 1;
          width: 100%;
        }
      }
      .buttonGroup{
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        margin: 15px 0;
        .buttonSingle{
          margin-right: 15px;
          i{
            margin-right: 0px;
          }
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
