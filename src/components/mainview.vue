<template>
    <el-container class="mainview">
        <el-header>
        <div class="websiteicon">
        </div>
        <div class="websitetitle">
            中铁大桥局大数据平台
        </div>
        <div class="user-container">
            <div v-if="isNewsComplete">
                <el-dropdown class="usercontainer" trigger="click" v-if="(newProjectList.length > 0)">
                    <div class="el-icon-message message-container">
                      <div class="ball"></div>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for='(item,index) in newProjectList' :key="index" class='projectNews-container'>
                          <span class='projectName' @click=searchProject(item.projectName)>{{item.projectName}}</span>
                          <span class="newscount">
                            {{item.newCount}}
                          </span>
                        </el-dropdown-item>
                        <!-- <el-dropdown-item>修改名称</el-dropdown-item>
                        <el-dropdown-item>退出登录</el-dropdown-item> -->
                        <!-- <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                        <el-dropdown-item divided>蚵仔煎</el-dropdown-item> -->
                    </el-dropdown-menu>
                </el-dropdown>
                <div class="usercontainer" v-else>
                  <div class="el-icon-message message-container">
                  </div>
                </div>
            </div>
            <el-dropdown class="usercontainer" trigger="click">
                <div class="useravatar">
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="showProjectList">跟踪项目</el-dropdown-item>
                    <el-dropdown-item @click.native="editNameStart">修改名称</el-dropdown-item>
                    <el-dropdown-item @click.native="editPasswordStart">修改密码</el-dropdown-item>
                    <el-dropdown-item @click.native="logOut">退出登录</el-dropdown-item>
                    <!-- <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                    <el-dropdown-item divided>蚵仔煎</el-dropdown-item> -->
                </el-dropdown-menu>
            </el-dropdown>
            <div class="username">
                {{weixinName}}
            </div>
        </div>
        </el-header>
        <div style="background-color: #545c64;height: 100%; overflow: auto;">
            <el-col :span="3" style="min-width: 256px">
                <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @select="handleOpen"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-tickets"></i>
                        <span>项目信息</span>
                    </template>
                        <router-link class="router" to="/main/quanguotouzi">
                            <el-menu-item index="1-1">全国项目投资</el-menu-item>
                        </router-link>
                        <router-link class="router" to="/main/announcement">
                            <el-menu-item index="1-2">项目公告</el-menu-item>
                        </router-link>
                        <router-link class="router" to="/main/weixinarticle">
                            <el-menu-item index="1-3">微信公众平台信息</el-menu-item>
                        </router-link>
                        <!-- <el-menu-item index="1-3">微信公众平台信息</el-menu-item> -->
                        <!-- <el-menu-item index="1-4-1">选项1</el-menu-item> -->
                    </el-submenu>
                    <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-office-building"></i>
                        <span>项目跟踪</span>
                    </template>
                        <router-link class="router" to="/main/companyinfo">
                          <el-menu-item index="2-1" >公司信息</el-menu-item>
                        </router-link>
                        <router-link class="router" to="/main/xiangmuchaxun">
                          <el-menu-item index="2-2">项目查询</el-menu-item>
                        </router-link>
                        <router-link class="router" to="/main/caigouwang">
                          <el-menu-item index="2-3">项目跟踪</el-menu-item>
                        </router-link>
                        <!-- <el-menu-item index="1-3">微信公众平台信息</el-menu-item> -->
                        <!-- <el-menu-item index="1-4-1">选项1</el-menu-item> -->
                    </el-submenu>
                    <el-submenu index="3" v-if="!isLeader">
                      <template slot="title">
                          <i class="el-icon-location"></i>
                          <span>我的团队</span>
                      </template>
                      <router-link v-for="(item,index) in teamList" class="router" :to="'/main/maplist/' + item.manageTeamList.teamId" :key="item.manageTeamList.teamId">
                          <el-menu-item :index="'3-' + index" >
                              <el-tooltip class="item" effect="light" :content="item.manageTeamList.teamInfo[0].teamName" placement="right"  popper-class="atooltip">
                                  <div class="maptitle">{{item.manageTeamList.teamInfo[0].teamName}}</div>
                              </el-tooltip>
                              <el-dropdown style="float: right">
                                  <i class="el-dropdown-link el-icon-setting" style="font-size: 20px"></i>
                                  <el-dropdown-menu slot="dropdown">
                                      <el-dropdown-item v-if="isManager" @click.native="manageTeam(index)">团队管理员</el-dropdown-item>
                                      <el-dropdown-item @click.native="joinTeam(index)">团队成员</el-dropdown-item>
                                      <el-dropdown-item @click.native="editMapDialogVisible = true ; teamIndex = index; teamName = teamList[teamIndex].manageTeamList.teamInfo[0].teamName; isJoinTeam = false">重命名</el-dropdown-item>
                                      <el-dropdown-item style="color:red">解散团队</el-dropdown-item>
                                  </el-dropdown-menu>
                              </el-dropdown>
                          </el-menu-item>
                      </router-link>
                        <!-- <el-menu-item index="1-2">项目公告</el-menu-item>
                        <el-menu-item index="1-3">微信公众平台信息</el-menu-item> -->
                        <!-- <el-menu-item index="1-4-1">选项1</el-menu-item> -->
                    </el-submenu>
                    <el-submenu index="3" v-if="isLeader">
                      <template slot="title">
                          <i class="el-icon-location"></i>
                          <span>团队信息</span>
                      </template>
                      <router-link v-for="(item,index) in teamList" class="router" :to="'/main/maplist/' + item._id" :key="item._id">
                          <el-menu-item :index="'3-' + index" >
                              <el-tooltip class="item" effect="light" :content="item.teamName" placement="right"  popper-class="atooltip">
                                  <div class="maptitle">{{item.teamName}}</div>
                              </el-tooltip>
                          </el-menu-item>
                      </router-link>
                        <!-- <el-menu-item index="1-2">项目公告</el-menu-item>
                        <el-menu-item index="1-3">微信公众平台信息</el-menu-item> -->
                        <!-- <el-menu-item index="1-4-1">选项1</el-menu-item> -->
                    </el-submenu>
                    <el-submenu index="4" v-if="(!isManager && !isLeader)">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>加入的团队</span>
                        </template>
                        <router-link v-for="(item,index) in joinTeamList" class="router" :to="'/main/maplist/' + item.joinTeamList.teamId" :key="item.joinTeamList.teamId">
                            <el-menu-item :index="'4-' + index" >
                                <el-tooltip class="item" effect="light" :content="item.joinTeamList.teamInfo[0].teamName" placement="right"  popper-class="atooltip">
                                    <div class="maptitle">{{item.joinTeamList.teamInfo[0].teamName}}</div>
                                </el-tooltip>
                                <el-dropdown style="float: right">
                                    <i class="el-dropdown-link el-icon-setting" style="font-size: 20px"></i>
                                    <el-dropdown-menu slot="dropdown">
                                        <!-- <el-dropdown-item @click.native="teamIndex = index; isManageTeamDialogVisible = true;  teamName = joinTeamList[teamIndex].joinTeamList.teamInfo[0].teamName; isJoinTeam = true">团队成员</el-dropdown-item> -->
                                        <!-- <el-dropdown-item @click.native="editMapDialogVisible = true ; teamIndex = index; teamName = joinTeamList[teamIndex].joinTeamList.teamInfo[0].teamName; isJoinTeam = true">重命名</el-dropdown-item> -->
                                        <el-dropdown-item style="color:red">退出团队</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </el-menu-item>
                        </router-link>
                            <!-- <el-menu-item index="1-2">项目公告</el-menu-item>
                            <el-menu-item index="1-3">微信公众平台信息</el-menu-item> -->
                            <!-- <el-menu-item index="1-4-1">选项1</el-menu-item> -->
                    </el-submenu>
                    <router-link class="router" to="/main/manageuser" v-if="isManager">
                      <el-menu-item index="5">
                        <i class="el-icon-user"></i>
                        <span slot="title">用户管理</span>
                      </el-menu-item>
                    </router-link>
                </el-menu>
            </el-col>
            <el-main>
              <router-view v-if="isRouterAlive"></router-view>
            </el-main>
        </div>
        <el-dialog title="修改用户名" :visible.sync="editWeixinNameVisible">
          <el-form>
              <el-form-item label="新用户名" label-width="120px">
              <el-input v-model="newWeixinName" autocomplete="off"></el-input>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="editWeixinNameVisible = false">取 消</el-button>
              <el-button type="primary" @click="editWeixinNameFunc()">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改密码" :visible.sync="editPasswordVisible">
          <el-form>
              <el-form-item label="原密码" label-width="120px">
                <el-input v-model="oldPassword" autocomplete="off" type="password" show-password></el-input>
              </el-form-item>
              <el-form-item label="新密码" label-width="120px">
                <el-input v-model="newPassword1" autocomplete="off" type="password" show-password></el-input>
              </el-form-item>
              <el-form-item label="重新输入密码" label-width="120px">
                <el-input v-model="newPassword2" autocomplete="off" type="password" show-password></el-input>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="editPasswordVisible = false">取 消</el-button>
              <el-button type="primary" @click="editPasswordFunc()">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改团队" :visible.sync="editMapDialogVisible">
            <el-form>
                <el-form-item label="团队名称" label-width="120px">
                <el-input v-model="teamName" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editMapDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editTeamFunc()">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="teamName + '- 团队管理员'" :visible.sync="isManageTeamDialogVisible">
          <div class="fieldedit-content">
          <el-table
            :data="manageTeamMemberList">
          <el-table-column
            label="字段名称"
            min-width="30%"
            prop="weixinName"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            min-width="40%">
            <template slot-scope="scope">
              <el-button
              size="mini"
              type="danger"
              @click="deleteManageMember(scope.$index, scope.row)">移除</el-button>
            </template>
          </el-table-column>
          </el-table>
          </div>
          <div class="fieldedit-bottom">
            <el-button style="float: right; margin-right: 10px;" type="success" @click="isAddManageMember = true">邀请新管理员</el-button>
          </div>
          <el-dialog
          width="50%"
          title="邀请管理员"
          :visible.sync="isAddManageMember"
          append-to-body>
          <el-form>
            <el-form-item label="用户名称" label-width="120px">
              <el-input v-model="newManageMemberName" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isAddManageMember = false">取 消</el-button>
            <el-button type="primary" @click="addManageMember()">确 定</el-button>
          </div>
          </el-dialog>
        </el-dialog>
        <el-dialog :title="teamName + '- 团队管理'" :visible.sync="isJoinTeamDialogVisible">
            <div class="fieldedit-content">
            <el-table
              :data="teamMemberList">
            <el-table-column
              label="字段名称"
              min-width="30%"
              prop="weixinName"
            >
            </el-table-column>
            <el-table-column
            label="操作权限"
            min-width="30%"
            >
            <template slot-scope="scope">
              <div>
                {{ scope.row.joinTeamList.power | powerFilter}}
              </div>
            </template>
            </el-table-column>
            <el-table-column
              label="操作"
              min-width="40%">
              <template slot-scope="scope">
                <el-button
                size="mini"
                @click="editMemberPowerStart(scope.$index, scope.row)">管理</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="deleteMember(scope.$index, scope.row)">移除</el-button>
              </template>
            </el-table-column>
            </el-table>
            </div>
            <div class="fieldedit-bottom">
              <el-button style="float: right; margin-right: 10px;" type="success" @click="isAddMember = true">邀请新成员</el-button>
            </div>
            <el-dialog
            width="50%"
            :title="editUserInfo.weixinName + '-权限分配'"
            :visible.sync="isEditPower"
            append-to-body>
            <el-form>
              <el-form-item label="权限设置" label-width="120px">
                <el-checkbox v-model='editUserInfo.canEdit'>可修改</el-checkbox>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="cancelEditPower()">取 消</el-button>
              <el-button type="primary" @click="editMemberPower()">确 定</el-button>
            </div>
            </el-dialog>
            <el-dialog
            width="50%"
            title="邀请成员"
            :visible.sync="isAddMember"
            append-to-body>
            <el-form>
              <el-form-item label="用户名称" label-width="120px">
                <el-input v-model="newMemberName" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="isAddMember = false">取 消</el-button>
              <el-button type="primary" @click="addMember()">确 定</el-button>
            </div>
            </el-dialog>
        </el-dialog>
        <el-dialog title="跟踪项目列表" :visible.sync="isProjectListDialogShow">
          <div class="fieldedit-content">
          <el-table
            :data="projectList">
          <el-table-column
            prop="projectName"
            label="项目名称"
            min-width="50%">
          </el-table-column>
          <el-table-column
            label="操作"
            min-width="50%">
            <template slot-scope="scope">
              <el-button
              size="mini"
              type="danger"
              @click="deleteProject(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
          </el-table>
          </div>
          <div class="fieldedit-bottom">
            <el-button style="float: right; margin-right: 10px;" type="success" @click="isAddProject = true">新增</el-button>
          </div>
          <el-dialog
          width="50%"
          title="新增跟踪项目"
          :visible.sync="isAddProject"
          append-to-body>
          <el-form>
            <el-form-item label="项目名称" label-width="120px">
              <el-input v-model="newProjectName" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="isAddProject = false">取 消</el-button>
            <el-button type="primary" @click="addProject">确 定</el-button>
          </div>
          </el-dialog>
        </el-dialog>
    </el-container>
</template>

<script>
// import deepClone from '../assets/js/deepcopy.js'
import loginMin from '../assets/js/mixin.js'

export default {
  name: 'mainview',
  mixins: [loginMin],
  data () {
    return {
      userId: window.sessionStorage.getItem('userId'),
      isNewsComplete: false,
      testflag: false,
      editMapDialogVisible: false,
      teamIndex: 0,
      teamName: '',
      teamList: {},
      joinTeamList: {},
      isJoinTeam: false,
      teamMemberList: [],
      isJoinTeamDialogVisible: false,
      isAddMember: false,
      newMemberName: '',
      isManageTeamDialogVisible: false,
      isAddManageMember: false,
      newManageMemberName: '',
      manageTeamMemberList: [],
      isEditPower: false,
      editUserInfo: {
        weixinName: '',
        canEdit: false
      },
      newProjectList: [],
      projectList: [],
      isProjectListDialogShow: false,
      isAddProject: false,
      newProjectName: '',
      newWeixinName: '',
      oldPassword: '',
      newPassword1: '',
      newPassword2: '',
      editWeixinNameVisible: false,
      editPasswordVisible: false,
      weixinName: window.sessionStorage.getItem('weixinName'),
      /* eslint-disable-next-line */
      isLeader: (window.sessionStorage.getItem('userRole') == '领导'),
      /* eslint-disable-next-line */
      isManager: (window.sessionStorage.getItem('userRole') == '管理员'),
      isRouterAlive: true
    }
  },
  computed: {
    // teamName: function () {
    //   return this.teamList[this.teamIndex].manageTeamList.teamInfo[0].teamName
    // }
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      console.log('routeralive')
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
    logOut () {
      this.$router.push('/')
    },
    async addProject () {
      await this.$http.get('teamuser/addCareProject?projectName=' + this.newProjectName + '&userId=' + this.userId)
      await this.$http.post('teamuser/getCareProjectList?userId=' + this.userId).then(Response => {
        this.projectList = Response.data.data[0].careProjectList
        console.log(this.projectList)
      })
      this.isAddProject = false
    },
    async deleteProject (index, row) {
      await this.$http.get('teamuser/deleteCareProject?projectName=' + row.projectName + '&userId=' + this.userId)
      await this.$http.post('teamuser/getCareProjectList?userId=' + this.userId).then(Response => {
        this.projectList = Response.data.data[0].careProjectList
        console.log(this.projectList)
      })
    },
    searchProject (projectName) {
      this.$http.get('teamuser/updateLatestDate?projectName=' + projectName + '&userId=' + this.userId)
      console.log('页面跳转')
      this.$router.push({path: '/main/caigouwang', query: {keyword: projectName}})
    },
    editNameStart () {
      this.newWeixinName = this.weixinName
      this.editWeixinNameVisible = true
    },
    async editWeixinNameFunc () {
      let data = {
        'weixinName': this.newWeixinName
      }
      await this.$http.post('teamuser/updateUserinfo/' + this.userId, data)
      this.$message({
        type: 'success',
        message: '修改成功',
        duration: 2000
      })
      window.sessionStorage.setItem('weixinName', this.newWeixinName)
      this.weixinName = this.newWeixinName
      this.editWeixinNameVisible = false
    },
    editPasswordStart () {
      console.log('editPasswordStart')
      this.editPasswordVisible = true
    },
    async editPasswordFunc () {
      /* eslint-disable-next-line */
      if (this.oldPassword == '' || this.newPassword1 == '' || this.newPassword2 == '') {
        this.$message({
          type: 'error',
          message: '请输入密码',
          duration: 2000
        })
        return false
      }
      /* eslint-disable-next-line */
      if(this.newPassword1 != this.newPassword2){
        this.$message({
          type: 'error',
          message: '两次密码不一致',
          duration: 2000
        })
        return false
      }
      let res = await this.$http.post('teamuser/updatePassword/' + this.userId, {oldPassword: this.oldPassword, newPassword: this.newPassword1})
      console.log(res)
      if (res.data.data.error) {
        this.$message({
          type: 'error',
          message: '密码错误',
          duration: 2000
        })
        return false
      } else {
        this.$message({
          type: 'success',
          message: '修改成功',
          duration: 2000
        })
      }
      this.editPasswordVisible = false
      this.oldPassword = this.newPassword1 = this.newPassword2 = ''
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    joinTeam (index) {
      this.getTeamMemberList(this.teamList[index].manageTeamList.teamId)
      this.teamIndex = index
      this.isJoinTeamDialogVisible = true
      this.teamName = this.teamList[index].manageTeamList.teamInfo[0].teamName
      this.isJoinTeam = false
    },
    manageTeam (index) {
      this.getManageTeamMemberList(this.teamList[index].manageTeamList.teamId)
      this.teamIndex = index
      this.isManageTeamDialogVisible = true
      this.teamName = this.teamList[index].manageTeamList.teamInfo[0].teamName
      this.isJoinTeam = false
    },
    getTeamList (userId) {
      this.$http.get('teamuser/getManageTeamList/' + userId).then(Response => {
        this.teamList = Response.data.data
      })
    },
    editMemberPowerStart (index, data) {
      // this.$set(this.editUserInfo)
      this.editUserInfo.weixinName = data.weixinName
      this.editUserInfo._id = data._id
      /* eslint-disable-next-line */
      this.editUserInfo.canEdit = (data.joinTeamList.power == 2)
      this.isEditPower = true
    },
    async editMemberPower () {
      let data = {
        teamId: this.teamList[this.teamIndex].manageTeamList.teamId,
        power: (this.editUserInfo.canEdit) ? 2 : 1
      }
      console.log(data)
      await this.$http.put('teamuser/updateUsersTeamPower/' + this.editUserInfo._id, data)
      this.isEditPower = false
      this.editUserInfo = {
        weixinName: '',
        canEdit: false
      }
      await this.getTeamMemberList(this.teamList[this.teamIndex].manageTeamList.teamId)
    },
    cancelEditPower () {
      this.isEditPower = false
      this.editUserInfo = {
        weixinName: '',
        canEdit: false
      }
    },
    getTeamMemberList (teamId) {
      this.$http.get('teamuser/getJoinTeamUsersList/' + teamId).then(Response => {
        this.teamMemberList = Response.data.data
        // console.log(this.teamMemberList)
      })
    },
    getManageTeamMemberList (teamId) {
      this.$http.get('teamuser/getManageTeamUsersList/' + teamId).then(Response => {
        this.manageTeamMemberList = Response.data.data
      })
    },
    getJoinTeamList (userId) {
      this.$http.get('teamuser/getJoinTeamList/' + userId).then(Response => {
        this.joinTeamList = Response.data.data
      })
    },
    async addMember () {
      let vue = this
      await this.$http.post('teamuser/joinTeam?teamId=' + this.teamList[this.teamIndex].manageTeamList.teamId + '&userName=' + this.newMemberName)
        .then(Response => {
          if (Response.data.data.error) {
            vue.$message({
              type: 'error',
              message: Response.data.data.msg,
              duration: 2000
            })
            console.log(Response.data.data.msg)
          } else {
            vue.$message({
              type: 'success',
              message: '添加成功',
              duration: 2000
            })
            console.log('添加成功')
          }
        })
      this.newMemberName = ''
      this.isAddMember = false
      this.getTeamMemberList(this.teamList[this.teamIndex].manageTeamList.teamId)
    },
    async addManageMember () {
      let vue = this
      await this.$http.post('teamuser/manageTeam?teamId=' + this.teamList[this.teamIndex].manageTeamList.teamId + '&userName=' + this.newManageMemberName)
        .then(Response => {
          if (Response.data.data.error) {
            vue.$message({
              type: 'error',
              message: Response.data.data.msg,
              duration: 2000
            })
            console.log(Response.data.data.msg)
          } else {
            vue.$message({
              type: 'success',
              message: '添加成功',
              duration: 2000
            })
            console.log('添加成功')
          }
        })
      this.newManageMemberName = ''
      this.isAddManageMember = false
      this.getManageTeamMemberList(this.teamList[this.teamIndex].manageTeamList.teamId)
    },
    async deleteMember (index, data) {
      let res = await this.$confirm(`确定移除 ${data.weixinName}？`).catch(err => console.log(err))
      if (res) {
        await this.$http.delete('teamuser/removeUserFromTeam?teamId=' + this.teamList[this.teamIndex].manageTeamList.teamId + '&userId=' + data._id)
        this.$message({
          type: 'success',
          message: '移除成功',
          duration: 2000
        })
        this.getTeamMemberList(this.teamList[this.teamIndex].manageTeamList.teamId)
      }
    },
    async deleteManageMember (index, data) {
      let res = await this.$confirm(`确定移除 ${data.weixinName}？`)
      if (res) {
        await this.$http.delete('teamuser/removeUserFromManageTeam?teamId=' + this.teamList[this.teamIndex].manageTeamList.teamId + '&userId=' + data._id)
        this.$message({
          type: 'success',
          message: '移除成功',
          duration: 2000
        })
        this.getManageTeamMemberList(this.teamList[this.teamIndex].manageTeamList.teamId)
      }
    },
    async editTeamFunc () {
      if (!this.isJoinTeam) {
        await this.$http.put('team/updateTeamName?teamId=' + this.teamList[this.teamIndex].manageTeamList.teamInfo[0]._id, {'teamName': this.teamName})
        this.$message({
          type: 'success',
          message: '更新成功',
          duration: 2000
        })
        this.getTeamList(this.userId)
      } else {
        await this.$http.put('team/updateTeamName?teamId=' + this.joinTeamList[this.teamIndex].joinTeamList.teamInfo[0]._id, {'teamName': this.teamName})
        this.$message({
          type: 'success',
          message: '更新成功',
          duration: 2000
        })
        this.getTeamList(this.userId)
      }
      this.editMapDialogVisible = false
    },
    showProjectList () {
      console.log('showProject')
      this.$http.post('teamuser/getCareProjectList?userId=' + this.userId).then(Response => {
        this.projectList = Response.data.data[0].careProjectList
        console.log(Response.data.data)
      })
      this.isProjectListDialogShow = true
    }
  },
  filters: {
    powerFilter: function (value) {
      /* eslint-disable-next-line */
      if (value == 1) return '查看'
      /* eslint-disable-next-line */
      if (value == 2) return '查看、修改'
      return '查看'
      // value = value.toString()
      // return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  created () {
    console.log(window.sessionStorage.getItem('userRole'))
    this.$http.post('teamuser/checkNewInfo?userId=' + this.userId).then(Response => {
      /* eslint-disable-next-line */
      if (Response.data.data != '暂无关注项目') {
        this.newProjectList = Response.data.data
      }
      // console.log(Response)
      this.isNewsComplete = true
    })
    if (this.isLeader) {
      let vue = this
      this.$http.get('team/getAllTeams').then(Response => {
        vue.teamList = Response.data.data
      })
      return
    }
    this.getTeamList(this.userId)
    this.getJoinTeamList(this.userId)
  }
}
</script>

<style>
.mainview{
    position: relative;
    width: 100%;
    height: 100%;
}

.el-header{
    display: flex;
    background-color: rgb(33, 33, 33);
    color: rgb(255, 255, 255);
    text-align: center;
    line-height: 60px;
}

.el-menu-item.is-active {
    background-color: #409EFF!important;
}

.el-aside{
    background-color: #909399;
    /* color: #333; */
    text-align: center;
    line-height: 200px;
    height: 100%;
}

.websiteicon {
    height: 44px;
    background-color: #c0c4cc;
    width: 44px;
    margin-top: 8px;
    border-radius: 44px;
}

.usercontainer{
    margin-top: 8px;
    margin-right: 10px;
}

.username{
    color:whitesmoke;
}
.user-container {
    position: absolute;
    right: 40px;
    display: flex;
}
.useravatar{
    /* float: right; */
    background-color: #0BB976;
    width: 44px;
    height: 44px;
    border-radius: 44px;
}

.websitetitle {
    text-align: left;
    width:80%;
    margin-left: 10px;
    font-size: 21px;
    font-weight: 600;
}

.el-menu{
    border: none;
}

.el-submenu__title {
    height: 60px;
    font-size: 20px;
}

.el-submenu [class^=el-icon-]{
    font-size: 23px;
}

.el-menu-item {
    font-size: 20px;
}

.el-menu-item, .el-submenu__title {
    height: 60px;
}

.el-menu-item [class^=el-icon-] {
    font-size: 23px;
}

.el-submenu .el-menu-item {
    height: 50px;
}

.el-submenu .el-menu {
    background-color: #F7F7F7;
}

.el-main{
    background-color: rgb(110,127,134);
    height: inherit;
}

/* #app {
font-family: 'Avenir', Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: #2c3e50;
margin-top: 60px;
} */

.router{
text-decoration: none;
}
.right {
    float: right;
    width: 60px;
}
.atooltip{
    background-color: #F7F7F7 !important;
}
.maptitle{
    max-width: 130px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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

.ball{
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: red;
  position: absolute;
  right: 4px;
  top: 10px;
}

.message-container{
  font-size: 30px;
  margin-right: 10px;
}

.projectNews-container{
  position: relative;
  padding-right: 35px;
  line-height: 30px;
}

.projectName{
  max-width: 100px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

}

.newscount{
  position: absolute;
  background-color: red;
  right: 6px;
  line-height: initial;
  top: 5px;
  color: white;
  font-size: 12px; /*no*/
  text-align: center;
  padding: 0 5px;
  border-radius: 10px; /*no*/
}
</style>
