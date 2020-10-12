<template>
    <el-container class="mainview">
        <el-header>
        <div class="websiteicon">
        </div>
        <div class="websitetitle">
            郑州市大桥局大数据平台
        </div>
        <div class="user-container">
            <el-dropdown class="usercontainer">
                <div class="useravatar">
                </div>
                <el-dropdown-menu slot="dropdown">
                    <!-- <el-dropdown-item>黄金糕</el-dropdown-item>
                    <el-dropdown-item>狮子头</el-dropdown-item> -->
                    <el-dropdown-item>退出登录</el-dropdown-item>
                    <!-- <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                    <el-dropdown-item divided>蚵仔煎</el-dropdown-item> -->
                </el-dropdown-menu>
            </el-dropdown>
            <div class="username">
                用户名
            </div>
        </div>
        </el-header>
        <div style="background-color: #545c64;height: 100%; overflow: auto;">
            <el-col :span="3">
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
                        <!-- <el-menu-item index="1-3">微信公众平台信息</el-menu-item> -->
                        <!-- <el-menu-item index="1-4-1">选项1</el-menu-item> -->
                    </el-submenu>
                    <el-submenu index="3">
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
                                        <el-dropdown-item @click.native="manageTeam(index)">团队成员</el-dropdown-item>
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
                    <el-submenu index="4">
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
                                        <el-dropdown-item @click.native="editMapDialogVisible = true ; teamIndex = index; teamName = joinTeamList[teamIndex].joinTeamList.teamInfo[0].teamName; isJoinTeam = true">重命名</el-dropdown-item>
                                        <el-dropdown-item style="color:red">退出团队</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </el-menu-item>
                        </router-link>
                            <!-- <el-menu-item index="1-2">项目公告</el-menu-item>
                            <el-menu-item index="1-3">微信公众平台信息</el-menu-item> -->
                            <!-- <el-menu-item index="1-4-1">选项1</el-menu-item> -->
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-main>
                <router-view/>
            </el-main>
        </div>
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
        <el-dialog :title="teamName + '- 团队管理'" :visible.sync="isManageTeamDialogVisible">
            <div class="fieldedit-content">
            <el-table
              :data="teamMemberList">
            <el-table-column
              label="字段名称"
              min-width="50%"
              prop="weixinName"
            >
              <!-- <template slot-scope="scope">
                <div>
                  {{scope.row}}
                </div>
              </template> -->
            </el-table-column>
            <el-table-column
              label="操作"
              min-width="50%">
              <template slot-scope="scope">
                <el-button
                size="mini"
                @click="editValueKey(scope.$index, scope.row)">管理</el-button>
                <el-button
                size="mini"
                type="danger"
                @click="deleteValueKey(scope.$index, scope.row)">移除</el-button>
              </template>
            </el-table-column>
            </el-table>
            </div>
            <div class="fieldedit-bottom">
              <el-button style="float: right; margin-right: 10px;" type="success" @click="isAddMember = true">邀请新成员</el-button>
            </div>
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
              <el-button type="primary" @click="addMember">确 定</el-button>
            </div>
            </el-dialog>
        </el-dialog>
    </el-container>
</template>

<script>
export default {
  name: 'mainview',
  data () {
    return {
      userId: '5f73f9d5832d312084c6d287',
      editMapDialogVisible: false,
      teamIndex: 0,
      teamName: '',
      teamList: {},
      joinTeamList: {},
      isJoinTeam: false,
      teamMemberList: [],
      isManageTeamDialogVisible: false,
      isAddMember: false,
      newMemberName: ''
    }
  },
  computed: {
    // teamName: function () {
    //   return this.teamList[this.teamIndex].manageTeamList.teamInfo[0].teamName
    // }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    manageTeam (index) {
      this.getTeamMemberList(this.teamList[index].manageTeamList.teamId)
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
    getTeamMemberList (teamId) {
      this.$http.get('teamuser/getJoinTeamUsersList/' + teamId).then(Response => {
        this.teamMemberList = Response.data.data
        // console.log(this.teamMemberList)
      })
    },
    getJoinTeamList (userId) {
      this.$http.get('teamuser/getJoinTeamList/' + userId).then(Response => {
        this.joinTeamList = Response.data.data
      })
    },
    async editTeamFunc () {
      if (!this.isJoinTeam) {
        await this.$http.put('team/updateTeamName?teamId=' + this.teamList[this.teamIndex].manageTeamList.teamInfo[0]._id, {'teamName': this.teamName})
        this.getTeamList(this.userId)
      } else {
        await this.$http.put('team/updateTeamName?teamId=' + this.joinTeamList[this.teamIndex].joinTeamList.teamInfo[0]._id, {'teamName': this.teamName})
        this.getTeamList(this.userId)
      }
      this.editMapDialogVisible = false
    }
  },
  created () {
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
    background-color: rgb(110 127 134);
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
</style>
