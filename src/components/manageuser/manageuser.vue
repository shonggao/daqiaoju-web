<template>
    <div class="main-container">
        <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible">
          <el-form :model="form">
              <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="form.weixinName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="form.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="角色" :label-width="formLabelWidth">
                  <el-select v-model="form.role" placeholder="请选择">
                      <el-option
                          v-for="item in roles"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value">
                      </el-option>
                  </el-select>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="editFrom">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="新增用户" :visible.sync="isAddUser">
          <el-form>
              <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="newUserName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="newPassword" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="角色" :label-width="formLabelWidth">
                <el-select v-model="newUserRole" placeholder="请选择">
                    <el-option
                        v-for="item in roles"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="isAddUser = false">取 消</el-button>
              <el-button type="primary" @click="addUser()">确 定</el-button>
          </div>
        </el-dialog>
        <div class="search-container container" style="padding-bottom: 10px;">
            <el-input class="input-box" v-model="searchName" placeholder="输入用户名"></el-input>
            <el-button class="button-box" plain @click='searchUser'>搜索</el-button>
            <el-button class="AddUserBtn" @click="isAddUser = true">添加用户</el-button>
            <!-- <input v-model='searchCompanyName' placeholder="输入查询公司全名"> -->
        </div>
        <div class="container program-container-box">
            <div class="program-table-container">
                <el-table
                :data="userList"
                border
                class="program-table">
                <el-table-column
                    prop="weixinName"
                    label="用户名"
                    min-width="24%">
                </el-table-column>
                <el-table-column
                    prop="password"
                    label="密码"
                    min-width="18%">
                </el-table-column>
                <el-table-column
                    prop="role"
                    label="用户角色"
                    min-width="18%">
                </el-table-column>
                <!-- <el-table-column
                    prop="zip"
                    label="邮编"
                    width="120">
                </el-table-column> -->
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
                :total="totalNum"
                :current-page.sync='page'
                @current-change='handleCurrentChange'
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import deepClone from '../../assets/js/deepcopy.js'

export default {
  name: 'manageuser',
  data () {
    return {
      userList: [],
      formLabelWidth: '120px',
      page: 1,
      totalNum: 0,
      totalPageNum: 0,
      searchName: '',
      form: {},
      dialogFormVisible: false,
      isAddUser: false,
      newUserName: '',
      newPassword: '',
      newUserRole: '',
      roles: [
        {
          value: '领导'},
        {
          value: '普通用户'}
      ]
    }
  },
  methods: {
    async editFrom () {
      await this.$http.post('teamuser/updateUserinfo/' + this.form._id, this.form)
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
      this.form = deepClone(row)
      this.dialogFormVisible = true
    },
    async getTableData () {
      let data = {
        'weixinName': this.searchName,
        // 'title': this.programName,
        'page': this.page,
        'limit': 10
      }
      await this.$http.post('teamuser/getUserListByPages', data).then(Response => {
        if (Response.status === 201) {
          this.userList = Response.data.data.result
          this.totalNum = Response.data.data.totalNum
          this.totalPageNum = Response.data.data.totalPageNum
          console.log(this.userList)
        }
      })
    },
    async handleDelete (index, row) {
      let res = await this.$confirm(`确定移除 ${row.weixinName}？`).catch(err => console.log(err))
      if (res) {
        await this.$http.delete('teamuser/deleteUserinfo/' + row._id)
        await this.$http.delete('setting/deleteManyByUserId/' + row._id)
        this.$message({
          type: 'success',
          message: '删除成功',
          duration: 2000
        })
        await this.getTableData()
      }
      return res
    },
    async searchUser () {
      await this.getTableData()
    },
    handleCurrentChange () {
      this.getTableData()
    },
    async addUser () {
      /* eslint-disable-next-line */
      if (this.newUserName == '' || this.newPassword == '' || this.newUserRole == '') {
        this.$message({
          type: 'error',
          message: '请输入用户名密码和用户角色',
          duration: 1000
        })
        return false
      }
      let data = {
        'weixinName': this.newUserName,
        'password': this.newPassword,
        'role': this.newUserRole
      }
      let res = await this.$http.post('teamuser', data)
      console.log(res)
      this.$http.post('setting/insertUserSettingOfNewUser/' + res.data.data._id, data)
      this.$message({
        type: 'success',
        message: '添加成功',
        duration: 2000
      })
      this.newUserName = ''
      this.newPassword = ''
      this.newUserRole = ''
      this.getTableData()
      this.isAddUser = false
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

.AddUserBtn{
  position: absolute;
  top: 20px;
  right: 20px;
}

</style>
