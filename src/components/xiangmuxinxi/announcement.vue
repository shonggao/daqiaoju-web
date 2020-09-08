<template>
    <div class="main-container">
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
                <p class="filter-type">公告类型：</p>
                <el-radio-group v-model="announcementType">
                    <el-radio-button label="招标公告"></el-radio-button>
                    <el-radio-button label="变更公告"></el-radio-button>
                    <el-radio-button label="候选人公示"></el-radio-button>
                    <el-radio-button label="中标结果公示"></el-radio-button>
                </el-radio-group>
            </div>
            <div class="line"></div>
            <div class="province-filter">
                <p class="filter-type" style="min-width: 40px">省份：</p>
                <el-radio-group v-model="province">
                    <el-radio-button label="河南"></el-radio-button>
                    <el-radio-button label="河北"></el-radio-button>
                    <el-radio-button label="北京"></el-radio-button>
                    <el-radio-button label="上海"></el-radio-button>
                </el-radio-group>
            </div>
        </div>
        <div class="filter-container-box container main-container">
            <el-input class="input-box" v-model="input" placeholder="请输入项目名称"></el-input>
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
                :data="tableData1"
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
  name: 'announcement',
  data () {
    return {
      announcementType: '',
      province: '',
      tableData1: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }],
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
      this.tableData1[this.editindex] = this.form
      this.form = {}
      this.editindex = ''
      this.dialogFormVisible = false
    },
    handleEdit (index, row) {
      this.editindex = index
      console.log(index)
      this.form = this.tableData1[index]
      this.dialogFormVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/index.css';
@import '../../assets/css/page.css';

.filter-container{
    width: 100%;
    margin: 10px;
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

.el-radio-button{
    margin: 0 20px;
    border: 1px solid transparent;
}

/deep/ .el-radio-button__inner{
    border: none !important;
    border-radius: 0.074074rem !important;
}
</style>
