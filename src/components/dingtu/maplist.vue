<template>
    <div class="main-container">
        <el-dialog title="修改地图" :visible.sync="editMapDialogVisible">
            <el-form>
                <el-form-item label="地图名称" label-width="120px">
                <el-input v-model="mapName" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editMapDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editMapFunc()">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="新建团队" :visible.sync="addTeamDialogVisible">
            <el-form>
                <el-form-item label="团队名称" label-width="120px">
                <el-input v-model="teamName" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addTeamDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addTeamFunc()">确 定</el-button>
            </div>
        </el-dialog>
        <div class="teamList-container">
            <div class="teamList-container-top">
                <div class="title">
                    我创建的团队
                </div>
                <el-button class="addbtn" @click="addTeamDialogVisible = true">新建团队</el-button>
            </div>
            <div class="maplist-container" v-for="(team,id) in selfTeamList" :key="id">
                <div class="mapbox" v-for='(item,index) in team["mapList"]' :key="index">
                    <div class="map" style='background: url("http://api.map.baidu.com/staticimage?width=350&height=260&zoom=5&copyright=1&center=116.317653,40.048826"); margin-top: 0px;'>
                    </div>
                    <div class="mapbox-foot">{{item.name}}
                        <el-dropdown style="float: right; margin: 5px;">
                            <i class="el-dropdown-link el-icon-setting" style="font-size: 20px"></i>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="editMapDialogVisible = true">重命名</el-dropdown-item>
                                <el-dropdown-item style="color:red">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </div>
        </div>

        <div class="teamList-container">
            <div class="teamList-container-top">
                <div class="title">
                    我加入的团队
                </div>
            </div>
            <div class="maplist-container" v-for="(team,id) in selfTeamList" :key="id">
                <div class="mapbox" v-for='(item,index) in team["mapList"]' :key="index">
                    <div class="map" style='background: url("http://api.map.baidu.com/staticimage?width=350&height=260&zoom=5&copyright=1&center=116.317653,40.048826"); margin-top: 0px;'>
                    </div>
                    <div class="mapbox-foot">{{item.name}}
                        <el-dropdown style="float: right; margin: 5px;">
                            <i class="el-dropdown-link el-icon-setting" style="font-size: 20px"></i>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item @click.native="editMapDialogVisible = true">重命名</el-dropdown-item>
                                <el-dropdown-item style="color:red">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
  name: 'maplist',
  data () {
    return {
      editMapDialogVisible: false,
      addTeamDialogVisible: false,
      selfTeamList: [
        {
          name: '双目与音心的团队1',
          mapList: [
            {
              name: '地图1'
            },
            {
              name: '地图2'
            },
            {
              name: '地图3'
            }
          ]
        },
        {
          name: '双目与音心的团队2',
          mapList: [
            {
              name: '地图4'
            },
            {
              name: '地图5'
            }
          ]
        }
      ]
    }
  }
}
</script>
<style scoped lang="scss">
@import '../../assets/css/index.scss';
.teamList-container{
    .title{
        font-size: 20px;
        color: white;
        font-weight: 600;
        margin-bottom: 15px;
        margin-top: 10px;
    }
    .addbtn{
        position: absolute;
        right: 20px;
        top: 0px;
    }
}
.maplist-container{
    display: flex;
    background: rgb(11, 21, 49);
    border-radius: 5px;
    margin: 5px;
}
.mapbox{
    width: 250px;
    margin: 15px 20px;
    border-radius: 5px;
    border: 1px solid rgb(49, 76, 147);
    .mapbox-foot{
        text-align: center;
        color: white;
        font-size: 18px;
        padding: 10px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
.map{
    width: 100%;
    height: 160px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
}
</style>
