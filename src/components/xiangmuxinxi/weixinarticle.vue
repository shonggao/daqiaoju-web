<template>
  <div class="main-container">
      <el-dialog title="修改微信公众号列表" :visible.sync="isNameEdit">
        <div class="fieldedit-content">
        <el-table
          :data="nameList">
        <el-table-column
          label="微信公众号名称"
          min-width="50%">
          <template slot-scope="scope">
            {{scope.row}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="50%">
          <template slot-scope="scope">
            <el-button
            size="mini"
            @click="editName(scope.$index, scope.row)">编辑</el-button>
            <el-button
            size="mini"
            type="danger"
            @click="deleteName(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
        </el-table>
        </div>
        <div class="fieldedit-bottom">
          <el-button style="float: right; margin-right: 10px;" type="success" @click="isAddName = true">新增</el-button>
        </div>
        <el-dialog
        width="50%"
        title="新增微信公众号"
        :visible.sync="isAddName"
        append-to-body>
        <el-form>
          <el-form-item label="字段名称" label-width="120px">
            <el-input v-model="newName" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isAddName = false">取 消</el-button>
          <el-button type="primary" @click="addName">确 定</el-button>
        </div>
        </el-dialog>
      </el-dialog>
    <el-dialog title="修改项目信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
          <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="日期" :label-width="formLabelWidth">
          <el-date-picker
              v-model="form.date"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
          </el-date-picker>
          </el-form-item>
          <el-form-item label="省份" :label-width="formLabelWidth">
          <el-input v-model="form.province" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="市区" :label-width="formLabelWidth">
          <el-input v-model="form.city" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editFrom">确 定</el-button>
      </div>
    </el-dialog>
    <div class="filter-container container">
      <div class="announcement-filter">
          <p class="filter-type">公众号名称：</p>
          <el-radio-group v-model="name">
              <el-radio-button label="全部"></el-radio-button>
              <el-radio-button v-for="(item,index) in nameList" :label="item" :key="index"></el-radio-button>
          </el-radio-group>
          <i class="el-icon-edit edit-icon" @click="isNameEdit = true"></i>
      </div>
        <!-- <div class="line"></div> -->
    </div>
    <div class="filter-container-box container main-container">
      <el-input class="input-box" v-model="programName" placeholder="请输入项目名称"></el-input>
      <el-button class="button-box" plain>搜索</el-button>
      <div class="tooltip-container">
          <p class="tooltip">开始时间：</p>
          <el-date-picker
          v-model="value1"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
          </el-date-picker>
          <p class="tooltip">结束时间：</p>
          <el-date-picker
          v-model="value2"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
          </el-date-picker>
      </div>
    </div>
    <div class="container program-container-box">
      <div class="program-table-container">
          <el-table
          :data="weixinArticleList"
          border
          class="program-table">
          <el-table-column
            prop="date"
            label="日期"
            min-width="24%">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            min-width="18%">
          </el-table-column>
          <el-table-column
            prop="province"
            label="省份"
            min-width="18%">
          </el-table-column>
          <el-table-column
            prop="city"
            label="市区"
            min-width="18%">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            min-width="45%">
          </el-table-column>
          <!-- <el-table-column
            prop="zip"
            label="邮编"
            width="120">
          </el-table-column> -->
          <el-table-column label="操作" style="min-width: 150px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          class="page-container"
          layout="prev, pager, next"
          :total="100">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  name: 'weixinarticle',
  data () {
    return {
      name: '全部',
      nameList: ['超级建筑', '铁路建设规划', '国家ppp', '基建通', '路桥之家'],
      programName: '',
      isAddName: false,
      isNameEdit: false,
      newName: '',
      // tableData1: [{
      //   date: '2016-05-03',
      //   name: '王小虎',
      //   province: '上海',
      //   city: '普陀区',
      //   address: '上海市普陀区金沙江路 1518 弄',
      //   zip: 200333
      // }, {
      //   date: '2016-05-02',
      //   name: '王小虎',
      //   province: '上海',
      //   city: '普陀区',
      //   address: '上海市普陀区金沙江路 1518 弄',
      //   zip: 200333
      // }, {
      //   date: '2016-05-04',
      //   name: '王小虎',
      //   province: '上海',
      //   city: '普陀区',
      //   address: '上海市普陀区金沙江路 1518 弄',
      //   zip: 200333
      // }, {
      //   date: '2016-05-01',
      //   name: '王小虎',
      //   province: '上海',
      //   city: '普陀区',
      //   address: '上海市普陀区金沙江路 1518 弄',
      //   zip: 200333
      // }, {
      //   date: '2016-05-08',
      //   name: '王小虎',
      //   province: '上海',
      //   city: '普陀区',
      //   address: '上海市普陀区金沙江路 1518 弄',
      //   zip: 200333
      // }, {
      //   date: '2016-05-06',
      //   name: '王小虎',
      //   province: '上海',
      //   city: '普陀区',
      //   address: '上海市普陀区金沙江路 1518 弄',
      //   zip: 200333
      // }, {
      //   date: '2016-05-06',
      //   name: '王小虎',
      //   province: '上海',
      //   city: '普陀区',
      //   address: '上海市普陀区金沙江路 1518 弄',
      //   zip: 200333
      // }, {
      //   date: '2016-05-06',
      //   name: '王小虎',
      //   province: '上海',
      //   city: '普陀区',
      //   address: '上海市普陀区金沙江路 1518 弄',
      //   zip: 200333
      // }, {
      //   date: '2016-05-06',
      //   name: '王小虎',
      //   province: '上海',
      //   city: '普陀区',
      //   address: '上海市普陀区金沙江路 1518 弄',
      //   zip: 200333
      // }, {
      //   date: '2016-05-07',
      //   name: '王小虎',
      //   province: '上海',
      //   city: '普陀区',
      //   address: '上海市普陀区金沙江路 1518 弄',
      //   zip: 200333
      // }],
      weixinArticleList: [],
      value1: '',
      value2: '',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      editindex: '',
      form: {}
    }
  },
  methods: {
    editFrom () {
      console.log(this.form)
      this.weixinArticleList[this.editindex] = this.form
      this.form = {}
      this.editindex = ''
      this.dialogFormVisible = false
    },
    handleEdit (index, row) {
      this.editindex = index
      console.log(index)
      this.form = this.weixinArticleList[index]
      this.dialogFormVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/index.scss';
@import '../../assets/css/page.scss';

.filter-container{
    width: 100%;
    margin: 10px;
    color: white;
    /* height: 100px; */
}

.announcement-filter{
    display: flex;
    padding: 4px 25px;
}

.province-filter{
    display: flex;
    padding: 4px 25px;
}

.filter-type{
  color: white;
}

/deep/ .el-radio-button__inner{
    border: none !important;
    border-radius: 0.074074rem !important;
}

/deep/ .el-radio-button{
    margin: 0 20px;
    border: 1px solid transparent;
}

.edit-icon{
  position: absolute;
  top: 25px;
  right: 20px;
  font-size: 20px;
}

.fieldedit-content{
  max-height: 500px; /*no*/
  overflow-y: auto;
}
.fieldedit-bottom{
  overflow: hidden;
  /* border-bottom: 1px solid #eee; no */
  margin: 5px 0px;
  padding: 5px 0px;
}
</style>
