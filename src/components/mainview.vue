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
                    <el-dropdown-item>黄金糕</el-dropdown-item>
                    <el-dropdown-item>狮子头</el-dropdown-item>
                    <el-dropdown-item>螺蛳粉</el-dropdown-item>
                    <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                    <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
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
                        <i class="el-icon-location"></i>
                        <span>项目信息</span>
                    </template>
                        <router-link class="router" to="/main/quanguotouzi">
                        <el-menu-item index="1-1">全国项目投资</el-menu-item>
                        </router-link>
                        <router-link class="router" to="/main/announcement">
                        <el-menu-item index="1-2">项目公告</el-menu-item>
                        </router-link>
                        <el-menu-item index="1-3">微信公众平台信息</el-menu-item>
                        <!-- <el-menu-item index="1-4-1">选项1</el-menu-item> -->
                    </el-submenu>
                    <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>项目跟踪</span>
                    </template>
                        <el-menu-item index="2-1">公司信息</el-menu-item>
                        <el-menu-item index="2-2">项目查询</el-menu-item>
                        <!-- <el-menu-item index="1-3">微信公众平台信息</el-menu-item> -->
                        <!-- <el-menu-item index="1-4-1">选项1</el-menu-item> -->
                    </el-submenu>
                    <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>钉图标记</span>
                    </template>
                        <router-link class="router" to="/main/dingtu">
                        <el-menu-item index="3-1" >钉图标记</el-menu-item>
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
    </el-container>
</template>

<script>
export default {
  name: 'mainview',
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    }
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
</style>
