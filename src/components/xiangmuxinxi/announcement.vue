<template>
    <div class="main-container">
      <el-dialog title="修改项目信息" :visible.sync="dialogFormVisible">
          <el-form :model="form">
              <el-form-item v-for="(item,index) in keyValueList[announcementType]" :label="item" :key='index' :label-width="formLabelWidth">
              <el-input v-model="form[item]" autocomplete="off"></el-input>
              </el-form-item>
              <!-- <el-form-item label="日期" :label-width="formLabelWidth">
                <el-input v-model="form.date" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="省份" :label-width="formLabelWidth">
              <el-input v-model="form.province" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="市区" :label-width="formLabelWidth">
              <el-input v-model="form.city" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="地址" :label-width="formLabelWidth">
              <el-input v-model="form.address" autocomplete="off"></el-input>
              </el-form-item> -->
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="editFrom">确 定</el-button>
          </div>
      </el-dialog>
      <div class="filter-container container">
          <div class="announcement-filter">
              <p class="filter-type">公告类型：</p>
              <el-radio-group v-model="announcementType" @change='getTableData'>
                  <el-radio-button label="招标公告"></el-radio-button>
                  <el-radio-button label="变更公告"></el-radio-button>
                  <el-radio-button label="候选人公告"></el-radio-button>
                  <el-radio-button label="结果公告"></el-radio-button>
              </el-radio-group>
          </div>
          <div class="line"></div>
          <div class="province-filter">
              <p class="filter-type" style="min-width: 40px">省份：</p>
              <el-radio-group v-model="province" @change='getTableData'>
                  <el-radio-button label="全部"></el-radio-button>
                  <el-radio-button label="河南"></el-radio-button>
                  <el-radio-button label="河北"></el-radio-button>
                  <el-radio-button label="北京"></el-radio-button>
                  <el-radio-button label="上海"></el-radio-button>
              </el-radio-group>
          </div>
      </div>
      <div class="filter-container-box container main-container">
          <el-input class="input-box" v-model="searchProjectName" placeholder="请输入项目名称"></el-input>
          <el-button class="button-box" plain @click='getTableData'>搜索</el-button>
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
              :data="tableData1.result"
              border
              class="program-table">
              <el-table-column
                v-for="(item,index) in keyValueList[announcementType]"
                :key="index"
                :label="item"
              >
              <template slot-scope="scope">
                {{scope.row[item]}}
              </template>
              </el-table-column>
              <el-table-column label="操作" width="150">
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
              :total='totalNum'
              :current-page.sync='page'
              @current-change='handleCurrentChange'>
            </el-pagination>
          </div>
      </div>
    </div>
</template>
<script>
import deepClone from '../../assets/js/deepcopy.js'
export default{
  name: 'announcement',
  data () {
    return {
      announcementType: '招标公告',
      searchProjectName: '',
      province: '全部',
      tableData1: [],
      value1: '',
      value2: '',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      editindex: '',
      form: {},
      page: 1,
      keyValueList: {
        '招标公告': ['公告标题', '发布时间', '公告链接', '招标人', '项目详细地址', '标书下发时间', '开标时间', '省份'],
        '变更公告': ['公告标题', '发布时间', '公告链接', '省份'],
        '候选人公告': ['公告标题', '发布时间', '公告链接', '招标人', '候选人1', '候选人2', '候选人3', '省份'],
        '结果公告': ['公告标题', '发布时间', '公告链接', '招标人', '中标单位', '中标价格', '省份']
      },
      urlValueList: {
        '招标公告': 'zhaobiao',
        '候选人公告': 'houxuan',
        '变更公告': 'biangeng',
        '结果公告': 'jieguo'
      },
      totalNum: 0,
      totalPageNum: 0
    }
  },
  methods: {
    async getTableData () {
      let data = {
        'proviceName': this.province === '全部' ? '' : this.province,
        'typeName': this.announcementType,
        'title': this.searchProjectName,
        'page': this.page,
        'limit': 10
      }
      await this.$http.post('notice/queryPageInfo', data).then(Response => {
        if (Response.status === 201) {
          this.tableData1 = Response.data.data
          this.totalNum = this.tableData1.totalNum
          this.totalPageNum = this.tableData1.totalPageNum
          console.log(this.tableData1)
        }
      })
    },
    async handleDelete (index, row) {
      await this.$http.delete('notice/' + row._id)
      await this.getTableData()
    },
    async editFrom () {
      console.log(this.form)
      // this.tableData1.result[this.editindex] = this.form
      await this.$http.put('notice/' + this.urlValueList[this.announcementType] + '/' + this.form._id, this.form)
      this.$message({
        type: 'success',
        message: '修改成功',
        duration: 2000
      })
      await this.getTableData()
      this.form = {}
      this.editindex = ''
      this.dialogFormVisible = false
    },
    handleEdit (index, row) {
      this.editindex = index
      // console.log(index)
      this.form = deepClone(this.tableData1.result[index])
      this.dialogFormVisible = true
    },
    handleCurrentChange () {
      this.getTableData()
    }
  },
  created () {
    this.getTableData()
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
</style>
