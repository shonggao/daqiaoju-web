<template>
<div class="main-container">
  <el-dialog title="编辑图层" :visible.sync="editLayerDialogVisible">
      <el-form>
        <el-form-item label="图层名称" label-width="120px">
          <el-input v-model="layer.label" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="默认" label-width="120px">
          <el-checkbox v-model="layer.isDefault">默认图层</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editLayerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editLayerFunc(layer.index)">确 定</el-button>
      </div>
  </el-dialog>
  <el-dialog title="修改图层" :visible.sync="changeMarkersLayerDialogVisible">
    <el-form>
      <el-form-item label="图层名称" label-width="120px">
        <el-select v-model="newLayerIndex" size="small" placeholder="请选择" @change="layerIndexChanged">
          <el-option
            v-for="item in layerNameList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="changeMarkersLayerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="changeMarkersLayer(newLayerIndex)">确 定</el-button>
    </div>
  </el-dialog>
  <el-dialog title="修改样式" :visible.sync="setMarkersStyleDialogVisible">
    <div class="content">
      <div class="marker-style">
        <label for="">标记样式</label>
        <div class="self-input" style="text-align: right; cursor: pointer; padding-left: 0px; position: absolute; top: 0;" @click.stop="chooseColor()">
          <button><i class="iconfont el-icon-location" id="markerStyle" :style="markerColor1"></i></button>
        </div>
      </div>
      <div class="marker-style" style="padding-right: 0px;">
        <div style="padding-left: 0px;" class="self-input">
          <div class="marker-custom-icon" style="background-color: rgb(80, 130, 204);" @click.stop="changeMarkerColor1(0)"></div>
          <div class="marker-custom-icon" style="background-color: rgb(101, 179, 68);" @click.stop="changeMarkerColor1(1)"></div>
          <div class="marker-custom-icon" style="background-color: rgb(255, 0, 0);" @click.stop="changeMarkerColor1(2)"></div>
          <div class="marker-custom-icon" style="background-color: rgb(174, 106, 177);" @click.stop="changeMarkerColor1(3)"></div>
          <div class="marker-custom-icon" style="background-color: rgb(255, 109, 52);" @click.stop="changeMarkerColor1(4)"></div>
          <div class="marker-custom-icon" style="background-color: rgb(255, 192, 67);" @click.stop="changeMarkerColor1(5)"></div>
          <div class="marker-custom-icon" style="background-color: rgb(0, 0, 0);" @click.stop="changeMarkerColor1(6)"></div>
        </div>
      </div>
      <div class="marker-style">
        <label for="">标记大小</label>
        <div class="self-input" style="cursor: pointer; padding-left: 90px; position: absolute; top: 0;" >
          <el-select v-model="markerColor1.fontSize" size="small" clearable placeholder="请选择">
            <el-option
              v-for="item in sizeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="setMarkersStyleDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="setMarkersStyle">确 定</el-button>
    </div>
  </el-dialog>
  <el-dialog
    title="提示"
    :visible.sync="deleteMarkersDialogVisible"
    width="30%">
    <span>是否删除这些标记点</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="deleteMarkersDialogVisible = false">取 消</el-button>
      <el-button type="danger" @click="deleteMarkers()">确 定</el-button>
    </span>
  </el-dialog>
  <div class="layer-container" v-if="isMenuShow">
    <div class="layer-container-title" style="overflow: hidden">
      <p>图层列表</p>
      <i class="el-icon-plus" @click="addLayerBtn"></i>
    </div>
    <div class="layer-box" v-for="(item , index) in layerList" :key="item.value" style="overflow: hidden">
      <i class="el-icon-folder-opened layerIcon" style="float: left"></i>
      <p :class="{layerName:true,defaultLayer:(layerIndex == index)}" style="float: left">{{item.label}}
        <span>({{item.markerList.length}})</span>
      </p>
      <el-dropdown trigger="click"  style="float: right">
        <i class="el-icon-setting layer-setting-icon"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="startDataManager(index)">数据管理</el-dropdown-item>
          <el-dropdown-item @click.native="setLayerDefault(index)">设为默认</el-dropdown-item>
          <el-dropdown-item @click.native="startFieldEdit(index)">字段管理</el-dropdown-item>
          <el-dropdown-item @click.native="editLayerStart(index)">编辑</el-dropdown-item>
          <el-dropdown-item >分享图层</el-dropdown-item>
          <el-dropdown-item >数据导入</el-dropdown-item>
          <el-dropdown-item >数据导出</el-dropdown-item>
          <el-dropdown-item style="color:red">删除图层</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <i class="el-icon-view layer-setting-icon" style="float: right" @click="visibleLayer(index)"></i>
    </div>
  </div>
  <div id="map" class="map-container">
    <div class="search-container">
      <input id="addressinput" class="input-box" v-model="searchAddress" placeholder="请输入要搜索的地点">
      <button class='btn'><i class="iconfont el-icon-search"></i></button>
    </div>
    <div class="show-menu-container" @click.stop="showMenuFun">
      <a class="show-menu-button">
        <i :class="{'el-icon-arrow-right':(!isMenuShow),'el-icon-arrow-left':(isMenuShow)}"></i>
      </a>
    </div>
    <div class="dataManager-container" v-if="isDataManager">
      <div class="dataManager-top">
        <p class="layerName">{{dataManagerLayer.label}}</p>
        <p class="container-title">数据管理</p>
        <input type="text" class="dataFilter" placeholder="请输入筛选内容">
        <el-button type="success" @click="setMarkersStyleDialogVisible = true">设置样式</el-button>
        <el-button type="success" @click="changeMarkersLayerDialogVisible = true; newLayerIndex = dataLayerIndex">修改图层</el-button>
        <el-button type="danger" @click="deleteMarkersDialogVisible = true">批量删除</el-button>
        <i class="el-icon-close close-icon" @click="isDataManager = false"></i>
      </div>
      <div class="dataManager-content">
      <el-table
        ref='datatable'
        :data="dataManagerLayer.markerList">
        <el-table-column
          fixed
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="color"
          label="样式"
          width="100">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标记名称"
          width="100">
        </el-table-column>
        <el-table-column
          prop="location"
          label="详细地址"
          width="140">
        </el-table-column>
        <el-table-column
          v-for="(item,index) in dataManagerLayer.valueKeyList"
          :key="index"
          :prop="item.key"
          :label="item.key"
          width="140">
        </el-table-column>
        <el-table-column
          prop="creator"
          label="创建人"
          width="100">
        </el-table-column>
        <el-table-column
          prop="addtime"
          label="添加时间"
          width="200">
       </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="dataEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="dataDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </div>
    <el-dialog :title="fieldManagerLayer.label + '- 字段管理'" :visible.sync="isFieldEdit">
      <div class="fieldedit-content">
      <el-table
        :data="fieldManagerLayer.valueKeyList"
        border>
      <el-table-column
        label="字段名称"
        prop="key"
        min-width="50%">
      </el-table-column>
      <el-table-column
        label="操作"
        min-width="50%">
        <template slot-scope="scope">
          <el-button
          size="mini"
          type="danger"
          @click="deleteValueKey(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
      </el-table>
      </div>
      <div class="fieldedit-bottom">
        <el-button style="float: right; margin-right: 10px;" type="success" @click="isAddValueKey = true">新增</el-button>
      </div>
      <el-dialog
      width="50%"
      title="新增字段"
      :visible.sync="isAddValueKey"
      append-to-body>
      <el-form>
        <el-form-item label="字段名称" label-width="120px">
          <el-input v-model="newValueKey" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAddValueKey = false">取 消</el-button>
        <el-button type="primary" @click="addValueKey">确 定</el-button>
      </div>
      </el-dialog>
    </el-dialog>
    <!-- <div class="fieldedit-container" v-if="isFieldEdit">
      <div class="fieldedit-top">
        <p class="layerName">{{fieldManagerLayer.label}}</p>
        <p class="container-title">字段管理</p>
        <i class="el-icon-close close-icon" @click="isFieldEdit = false"></i>
      </div>
      <div class="fieldedit-content"></div>
    </div> -->
  </div>
  <div class="control-container">
    <el-button-group>
      <el-button class="control-button" icon="el-icon-map-location" @click.stop="draw('marker')" id="marker">{{markerButtonTitle}}</el-button>
      <el-button class="control-button" id="polyline" @click.stop="draw('polyline')">{{polylineButtonTitle}}</el-button>
      <el-button class="control-button" id="polygon" @click.stop="draw('polygon')" >{{polygonButtonTitle}}</el-button>
      <el-button class="control-button" id="polygon" @click.stop="showLabel" >{{showLabelButtonTitle}}</el-button>
    </el-button-group>
  </div>
  <div class="marker-form" v-if="isAddingMarker">
    <div class="form-top">
      <span class="title">添加标记点</span>
      <span class="el-icon-circle-close iconfont "  @click="cancelMarker"></span>
    </div>
    <div class="marker-content">
      <div class="marker-content-item">
        <label for="">所属图层</label>
        <div>
          <el-select v-model="addMarkerLayerName" size="small" placeholder="请选择" @change="layerIndexChanged">
            <el-option
              v-for="item in layerNameList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="marker-content-item margin-top">
        <label for="">标记名称</label>
        <div class="self-input">
          <input type="text" class="noborder-input" placeholder="请输入标记点名称" v-model="markerAttribute.title">
        </div>
      </div>
      <div class="marker-content-item">
        <label for="">当前位置</label>
        <div class="self-input">
          <input type="text" class="noborder-input" v-model="markerAttribute.location" >
        </div>
      </div>
      <div class="marker-content-item">
        <label for="">标记样式</label>
        <div class="self-input" style="text-align: right; cursor: pointer; padding-left: 0px;" @click.stop="chooseColor()">
          <button><i class="iconfont el-icon-location" id="markerStyle" :style="markerColor"></i></button>
        </div>
      </div>
      <div class="marker-content-item" style="padding-right: 0px;"  v-if="isChooseColor">
        <div style="padding-left: 0px;" class="self-input">
          <div class="marker-custom-icon" style="background-color: rgb(80, 130, 204);" @click.stop="changeMarkerColor(0)"></div>
          <div class="marker-custom-icon" style="background-color: rgb(101, 179, 68);" @click.stop="changeMarkerColor(1)"></div>
          <div class="marker-custom-icon" style="background-color: rgb(255, 0, 0);" @click.stop="changeMarkerColor(2)"></div>
          <div class="marker-custom-icon" style="background-color: rgb(174, 106, 177);" @click.stop="changeMarkerColor(3)"></div>
          <div class="marker-custom-icon" style="background-color: rgb(255, 109, 52);" @click.stop="changeMarkerColor(4)"></div>
          <div class="marker-custom-icon" style="background-color: rgb(255, 192, 67);" @click.stop="changeMarkerColor(5)"></div>
          <div class="marker-custom-icon" style="background-color: rgb(0, 0, 0);" @click.stop="changeMarkerColor(6)"></div>
        </div>
      </div>
      <div class="marker-content-item margin-bottom">
        <label for="">标记大小</label>
        <div>
          <el-select v-model="markerColor.fontSize" size="small" clearable placeholder="请选择">
            <el-option
              v-for="item in sizeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="marker-content-item" v-for="(item,index) in layerList[addMarkerLayerName].valueKeyList" :key="index">
        <label for="">{{item.key}}</label>
        <div class="self-input">
          <input type="text" class="noborder-input" placeholder="请输入字段值" v-model="markerAttribute[layerList[addMarkerLayerName].valueKeyList[index].key]">
        </div>
      </div>
      <div class="marker-content-item margin-top">
        <label for="">图片</label>
        <div class="self-input">
          <input type="text" class="noborder-input" placeholder="上传图片">
        </div>
      </div>
    </div>
    <div class="form-bottom">
      <el-button type="primary" @click="saveMarker">保存</el-button>
      <el-button plain @click="cancelMarker">取消</el-button>
    </div>
  </div>

  <div class="marker-form" v-if="isEdittingMarker">
    <div class="form-top">
      <span class="title">编辑标记点</span>
      <span class="el-icon-circle-close iconfont" @click="closeEditForm"></span>
    </div>
    <div class="marker-content">
      <div class="marker-content-item">
        <label for="">所属图层</label>
        <div class="self-input">
          <el-select v-model="markerAttribute.layerName" size="small" clearable placeholder="请选择">
            <el-option
              v-for="(item) in layerNameList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="marker-content-item margin-top">
        <label for="">标记名称</label>
        <div class="self-input">
          <input type="text" class="noborder-input" placeholder="请输入标记点名称" v-model="markerAttribute.title">
        </div>
      </div>
      <div class="marker-content-item">
        <label for="">当前位置</label>
        <div class="self-input">
          <input type="text" class="noborder-input" v-model="markerAttribute.location" >
        </div>
      </div>
      <div class="marker-content-item">
        <label for="">标记样式</label>
        <div class="self-input" style="text-align: right; cursor: pointer; padding-left: 0px;" @click.stop="chooseColor()">
          <button><i class="iconfont el-icon-location" id="markerStyle" :style="markerColor"></i></button>
        </div>
      </div>
      <div class="marker-content-item" style="padding-right: 0px;"  v-if="isChooseColor">
        <div style="padding-left: 0px;" class="self-input">
          <div class="marker-custom-icon" style="background-color: rgb(80, 130, 204);" @click.stop="changeMarkerColor(0)"></div>
          <div class="marker-custom-icon" style="background-color: rgb(101, 179, 68);" @click.stop="changeMarkerColor(1)"></div>
          <div class="marker-custom-icon" style="background-color: rgb(255, 0, 0);" @click.stop="changeMarkerColor(2)"></div>
          <div class="marker-custom-icon" style="background-color: rgb(174, 106, 177);" @click.stop="changeMarkerColor(3)"></div>
          <div class="marker-custom-icon" style="background-color: rgb(255, 109, 52);" @click.stop="changeMarkerColor(4)"></div>
          <div class="marker-custom-icon" style="background-color: rgb(255, 192, 67);" @click.stop="changeMarkerColor(5)"></div>
          <div class="marker-custom-icon" style="background-color: rgb(0, 0, 0);" @click.stop="changeMarkerColor(6)"></div>
        </div>
      </div>
      <div class="marker-content-item margin-bottom">
        <label for="">标记大小</label>
        <div>
          <el-select v-model="markerColor.fontSize" size="small" clearable placeholder="请选择">
            <el-option
              v-for="item in sizeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="marker-content-item" v-for="(item,index) in layerList[markerAttribute.layerName].valueKeyList" :key="index">
        <label for="">{{item.key}}</label>
        <div class="self-input">
          <input type="text" class="noborder-input" placeholder="请输入字段值" v-model="markerAttribute[layerList[markerAttribute.layerName].valueKeyList[index].key]">
        </div>
      </div>
      <div class="marker-content-item margin-top">
        <label for="">图片</label>
        <div class="self-input">
          <input type="text" class="noborder-input" placeholder="上传图片">
        </div>
      </div>
    </div>
    <div class="form-bottom">
      <!-- <i class="el-icon-delete" style="float: left" ></i> -->
      <el-popover
        style="float: left"
        placement="top"
        width="160"
        v-model="popVisible">
        <p>确定要删除这个标记吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="popVisible = false">取消</el-button>
          <el-button type="primary" size="mini" @click="removeMarker(markerAttribute.layerName,markerAttribute.id)">确定</el-button>
        </div>
        <i class="el-icon-delete" style="font-size: 20px;margin-top: 10px;" slot='reference'></i>
        <!-- <el-button slot="reference">删除</el-button> -->
      </el-popover>
      <el-button type="primary" @click="editMarker(markerAttribute.layerName,markerAttribute.id)">保存</el-button>
      <el-button plain @click="closeEditForm">取消</el-button>
    </div>
  </div>
    <!-- </baidu-map> -->
</div>
</template>
<script>
// import deepClone from '../../assets/js/deepcopy.js'

export default{
  name: 'DingTu',
  data () {
    return {
      markerButtonTitle: '画点',
      isAddMark: false, // 处于添加标记点状态
      isAddingMarker: false, // 正在添加标记点
      isAreaMeasure: false,
      isDistance: false,
      isEdittingMarker: false, // 正在编辑标记点
      isMenuShow: true, // 图层侧边栏是否显示
      editLayerDialogVisible: false, // 编辑图层窗口是否显示
      popVisible: false, // 删除提示框
      changeMarkersLayerDialogVisible: false,
      deleteMarkersDialogVisible: false,
      setMarkersStyleDialogVisible: false,
      polylineButtonTitle: '测距',
      polygonButtonTitle: '面积测量',
      isChooseColor: false, // 是否选择标记填样式
      layerIndex: 0, // 默认图层index值
      dataLayerIndex: 0, // 显示数据管理的图层index
      isDataManager: false, // 数据管理窗体是否显示
      isFieldEdit: false,
      fieldLayerIndex: 0,
      showLabelButtonTitle: '显示标题',
      isShowLabel: false, // 是否显示标题
      newValueKey: '',
      isAddValueKey: false,
      addMarkerLayerName: 0, // 添加标记点所属图层index
      newLayerIndex: 0,
      searchAddress: '',
      layer: {
        index: 0,
        label: '',
        isDefault: false
      },
      markerColor: {
        // 目前操作标记点的样式
        color: 'rgb(80, 130, 204)',
        fontSize: '20px'
      },
      markerColor1: {
        // 目前操作标记点的样式
        color: 'rgb(80, 130, 204)',
        fontSize: '20px'
      },
      colorList: [
        'rgb(80, 130, 204)',
        'rgb(101, 179, 68)',
        'rgb(255, 0, 0)',
        'rgb(174, 106, 177)',
        'rgb(255, 109, 52)',
        'rgb(255, 192, 67)',
        'rgb(0, 0, 0)'
      ],
      markerList: [], // 地图中存储标记点的列表，按照所属图层分类
      layerList: [
        {
          value: 0,
          label: '黄金糕',
          visible: true,
          valueKeyList: [
            {
              key: '标记名称'
            },
            {
              key: '标记地址'
            },
            {
              key: '投资金额'
            }
          ],
          markerList: [
            {
              id: '4',
              title: '测试点4',
              color: 'rgb(80, 130, 204)',
              fontSize: '30px',
              layerName: 0,
              '标记名称': '标记名称',
              '标记地址': '标记地址',
              '投资金额': '投资金额',
              valueList: [{value: '123'}, {value: '123'}, {value: '123'}],
              location: '',
              position: [117.397428, 38.90923]
            }
          ]
        }, {
          value: 1,
          label: '双皮奶',
          visible: true,
          valueKeyList: [
            {
              key: '标记名称'
            },
            {
              key: '标记地址'
            },
            {
              key: '建设单位'
            }
          ],
          markerList: [
            {
              id: '1',
              title: '测试点1',
              color: 'rgb(80, 130, 204)',
              fontSize: '20px',
              valueList: [{value: '123'}, {value: '123'}, {value: '123'}],
              '标记名称': '标记名称',
              '标记地址': '标记地址',
              '建设单位': '建设单位',
              location: '',
              layerName: 1,
              position: [115.397428, 39.90923]
            },
            {
              id: '2',
              title: '测试点2',
              color: 'rgb(80, 130, 204)',
              fontSize: '30px',
              valueList: [{value: '123'}, {value: '123'}, {value: '123'}],
              location: '',
              '标记名称': '标记名称',
              '标记地址': '标记地址',
              '建设单位': '建设单位',
              layerName: 1,
              position: [116.397428, 38.90923]
            },
            {
              id: '3',
              title: '测试点3',
              color: 'rgb(80, 130, 204)',
              fontSize: '40px',
              valueList: [{value: '123'}, {value: '123'}, {value: '123'}],
              layerName: 1,
              '标记名称': '标记名称',
              '标记地址': '标记地址',
              '建设单位': '建设单位',
              location: '',
              position: [116.397428, 39.90923]
            }
          ]
        }
      ],
      markerAttribute: {
      }, // 目前操作标记点的属性值
      sizeOptions: [
        {
          label: '大',
          value: '40px'
        },
        {
          label: '中',
          value: '30px'
        },
        {
          label: '小',
          value: '20px'
        }
      ]
    }
  },
  methods: {
    attributeAssign (markerAttribute, layerIndex) {
      let {id, title, color, fontSize, layerName, location, position} = markerAttribute

      let newMarkerAttribute = {id, title, color, fontSize, layerName, location, position}
      for (let valueKey of this.layerList[layerIndex].valueKeyList) {
        newMarkerAttribute[valueKey.key] = markerAttribute[valueKey.key]
      }
      return newMarkerAttribute
    },
    setMarkersStyle () {
      for (var marker of this.$refs.datatable.selection) {
        this.setMarkerStyle(this.dataLayerIndex, marker)
      }
      this.$refs.datatable.setCurrentRow()
      this.setMarkersStyleDialogVisible = false
    },
    setMarkerStyle (layerIndex, marker) {
      var markerid = marker.id
      this.markerList[layerIndex].markers.find((item, index, arr) => {
        if (item.getExtData().id === markerid) {
          item.setMap(null)
          this.layerList[layerIndex].markerList[index].color = this.markerColor1.color
          this.layerList[layerIndex].markerList[index].fontSize = this.markerColor1.fontSize
          item = this.initMarkByAttribute(this.layerList[layerIndex].markerList[index])
          return true
        }
        return false
      }, this)
    },
    moveMarker (newLayerIndex, oldLayerIndex, marker) {
      var markerid = marker.id
      marker.layerName = newLayerIndex
      this.markerList[oldLayerIndex].markers.find((item, index, arr) => {
        if (item.getExtData().id === markerid) {
          this.markerList[newLayerIndex].markers.push(item)
          arr.splice(index, 1)
          this.layerList[newLayerIndex].markerList.push(marker)
          this.layerList[oldLayerIndex].markerList.splice(index, 1)
          return true
        }
        return false
      }, this)
    },
    changeMarkersLayer (newLayerIndex) {
      var oldLayerIndex = this.dataLayerIndex
      for (var marker of this.$refs.datatable.selection) {
        this.moveMarker(newLayerIndex, oldLayerIndex, marker)
      }
      this.$refs.datatable.setCurrentRow()
      this.changeMarkersLayerDialogVisible = false
    },
    deleteMarkers () {
      for (var marker of this.$refs.datatable.selection) {
        this.removeMarker(marker.layerName, marker.id)
      }
      this.$refs.datatable.setCurrentRow()
      this.deleteMarkersDialogVisible = false
    },
    dataEdit (index, row) {
      // console.log(index, row)
      var marker = this.findMarkerByIndexID(row.layerName, row.id)
      marker.emit('click', {target: marker})
    },
    dataDelete (index, row) {
      this.removeMarker(row.layerName, row.id)
    },
    deleteValueKey (index, row) {
      this.layerList[this.fieldLayerIndex].markerList.forEach(item => {
        item[this.layerList[this.fieldLayerIndex].valueKeyList[index].key] = undefined
        delete item[this.layerList[this.fieldLayerIndex].valueKeyList[index].key]
      })
      this.layerList[this.fieldLayerIndex].valueKeyList.splice(index, 1)

      this.isAddValueKey = false
    },
    addValueKey () {
      // var valuelist = deepClone(this.layerList[this.fieldLayerIndex].valueKeyList)
      // valuelist.push({key: this.newValueKey})
      // this.layerList[this.fieldLayerIndex].valueKeyList = valuelist
      // this.$set(this.layerList[this.fieldLayerIndex], 'valueKeyList', valuelist)
      // this.oldValueKeyList = deepClone(this.fieldManagerLayer.valueKeyList)
      // console.log(JSON.stringify(this.oldValueKeyList) === JSON.stringify(this.fieldManagerLayer.valueKeyList))
      this.layerList[this.fieldLayerIndex].markerList.forEach(item => {
        item[this.newValueKey] = ''
      })
      this.layerList[this.fieldLayerIndex].valueKeyList.push({key: this.newValueKey})
      console.log(this.layerList[this.fieldLayerIndex])
      this.newValueKey = ''
      this.isAddValueKey = false
    },
    startFieldEdit (index) {
      this.isFieldEdit = true
      this.fieldLayerIndex = index
    },
    startDataManager (index) {
      this.isDataManager = true
      this.dataLayerIndex = index
    },
    showLabel () {
      if (this.isShowLabel) {
        this.isShowLabel = false
        this.showLabelButtonTitle = '显示标题'
        var arr = [...(document.getElementsByClassName('markerlabel'))]
        arr.forEach(item => {
          item.style.display = 'none'
        })
      } else {
        var arr1 = [...(document.getElementsByClassName('markerlabel'))]
        arr1.forEach(item => {
          item.style.display = 'block'
          // item.classList.remove('ifshowlabel')
        })
        this.isShowLabel = true
        this.showLabelButtonTitle = '隐藏标题'
      }
    },
    newmarkerlist (layer) {
      var markerlist = {}
      markerlist.visible = true
      markerlist.layerName = layer.index
      markerlist.markers = []
      return markerlist
    },
    newLayer (layer) {
      var newlayer = {}
      newlayer.label = layer.label
      newlayer.visible = true
      newlayer.valueKeyList = [{key: '备注'}]
      newlayer.markerList = []
      newlayer.value = layer.index
      return newlayer
    },
    addLayerBtn () {
      this.editLayerDialogVisible = true
      this.layer = {
        label: '',
        isDefault: false,
        index: -1
      }
    },
    closeEditForm () {
      this.isEdittingMarker = false
      this.initMarkByAttribute()
    },
    layerIndexChanged (value) {
      // console.log(this.markerAttribute)
      // var value = this.markerAttribute.layerName
      this.markerAttribute.layerName = value
      // this.initMarkerAttribue(value)
      this.$set(this.markerAttribute, 'layerName', value)
      console.log(this.layerList[value].valueKeyList[0])
      console.log(this.markerAttribute['标记名称'])
      // this.markerAttribute.$set('layerName', this.markerAttribute.value)
      console.log(this.markerAttribute)
    },
    markerLayerIndexChanged (value) {
      // this.isEdittingMarker = false
      // this.$nextTick(Response => {
      //   this.isEdittingMarker = true
      // })
      if (this.markerAttribute.valueList.length < this.layerList[value].valueKeyList.length) {
        var count = this.layerList[value].valueKeyList.length - this.markerAttribute.valueList.length
        for (var i = 0; i < count; i++) {
          this.markerAttribute.valueList.push({value: ''})
        }
      }
    },
    visibleLayer (index) {
      if (this.layerList[index].visible) {
        this.hiddenLayer(index)
        this.layerList[index].visible = false
      } else {
        this.showLayer(index)
        this.layerList[index].visible = true
      }
    },
    editLayerFunc (index) {
      if (index === -1) {
        this.layer.index = this.layerList.length
        this.layerList.push(this.newLayer(this.layer))
        this.markerList.push(this.newmarkerlist(this.layer))
        console.log(this.markerList)
        if (this.layer.isDefault) {
          this.layerIndex = this.layer.index
        }
      } else {
        if (this.layer.isDefault) {
          this.layerIndex = index
        }
        this.layerList[index].label = this.layer.label
      }
      this.layer = {}
      this.editLayerDialogVisible = false
    },
    editLayerStart (index) {
      this.layer.label = this.layerList[index].label
      this.layer.index = index
      this.layer.isDefault = (this.layerIndex === index)
      this.editLayerDialogVisible = true
    },
    setLayerDefault (index) {
      console.log('setLayerDefault')
      this.layerIndex = index
      this.initMarkerAttribue(this.layerIndex)
    },
    showMenuFun () {
      if (this.isMenuShow) {
        this.isMenuShow = false
      } else {
        this.isMenuShow = true
      }
    },
    initValueList (num) {
      let valueList = []
      for (var i = 0; i < num; i++) {
        valueList.push({value: ''})
      }
      return valueList
    },
    chooseColor () {
      if (this.isChooseColor) {
        this.isChooseColor = false
      } else {
        this.isChooseColor = true
      }
    },
    initLayer () {
      if (this.layerList) {
        this.layerList.forEach((item, index) => {
          this.markerList[index] = {}
          this.markerList[index].layerName = item.label
          this.markerList[index].visible = true
          this.markerList[index].markers = []
          for (let markerAttrubute of item.markerList) {
            this.markerList[index].markers.push(this.initMarkByAttribute(markerAttrubute))
          }
        }, this)
      }
    },
    hiddenLayer (index) {
      this.markerList[index].visible = false
      this.markerList[index].markers.forEach((item, index) => {
        item.setMap(null)
      }, this)
    },
    showLayer (index) {
      this.markerList[index].visible = false
      this.markerList[index].markers.forEach((item, index) => {
        item.setMap(this.Map)
      }, this)
    },
    removeMarker (layerIndex, markerid) {
      this.markerList[layerIndex].markers.find((item, index, arr) => {
        if (item.getExtData().id === markerid) {
          item.setMap(null)
          arr.splice(index, 1)
          this.layerList[layerIndex].markerList.splice(index, 1)
          return true
        }
        return false
      }, this)
      this.popVisible = false
      this.initMarkerAttribue(this.layerIndex)
      this.isEdittingMarker = false
    },
    initMarkerAttribue (index) {
      this.markerAttribute = { }
      this.$set(this.markerAttribute, 'layerName', index)
      this.addMarkerLayerName = index
      // this.markerAttribute.layerName = this.layerIndex
      // this.$set(this.markerAttribute, 'valueList', this.initValueList(this.layerList[index].valueKeyList.length))
      // this.markerAttribute.valueList = this.initValueList(this.layerList[this.layerIndex].valueKeyList.length)
    },
    findMarkerByIndexID (index, markerid) {
      var marker = this.markerList[index].markers.find((item, index) => {
        if (item.getExtData().id === markerid) {
          return true
        }
        return false
      }, this)
      if (marker) {
        return marker
      }
      return undefined
    },
    findMarkerById (markerid) {
      for (var layer of this.layerList) {
        var item = layer.markerList.find((item, index) => {
          if (item.id === markerid) {
            return true
          }
          return false
        }, this)
        if (item) {
          return item
        }
      }
      return undefined
    },
    editMarker (layerIndex, markerid) {
      if (this.markerLayerIndex === layerIndex) {
        var markerIndex = this.markerList[layerIndex].markers.findIndex((item) => {
          if (item.getExtData().id === markerid) {
            return true
          }
          return false
        }, this)
        this.markerList[layerIndex].markers[markerIndex].setMap(null)
        this.markerAttribute.color = this.markerColor.color
        this.markerAttribute.fontSize = this.markerColor.fontSize
        this.markerList[layerIndex].markers[markerIndex] = this.initMarkByAttribute(this.markerAttribute)
        this.layerList[layerIndex].markerList[markerIndex] = this.markerAttribute
      } else {
        this.markerList[this.markerLayerIndex].markers.find((item, index, arr) => {
          if (item.getExtData().id === markerid) {
            item.setMap(null)
            arr.splice(index, 1)
            this.layerList[this.markerLayerIndex].markerList.splice(index, 1)
            this.markerAttribute.color = this.markerColor.color
            this.markerAttribute.fontSize = this.markerColor.fontSize
            // this.markerAttribute.valueList = this.markerAttribute.valueList.slice(0, this.layerList[this.markerAttribute.layerName].valueKeyList.length)
            item = this.initMarkByAttribute(this.markerAttribute)
            this.layerList[layerIndex].markerList.push(this.attributeAssign(this.markerAttribute, layerIndex))
            this.markerList[layerIndex].markers.push(item)
            return true
          }
          return false
        }, this)
      }

      this.initMarkerAttribue(this.layerIndex)
      this.isEdittingMarker = false
    },
    drawDOMByStyle (style) {
      let icon = document.createElement('i')
      icon.style.color = style.color
      icon.style.fontSize = style.fontSize
      icon.style.top = (style.fontSize === '30px') ? '6px' : (style.fontSize === '40px') ? '-3px' : '14px'
      icon.style.left = (style.fontSize === '30px') ? '-6px' : (style.fontSize === '40px') ? '-11px' : '-1px'
      icon.style.position = 'absolute'
      icon.className = 'el-icon-location'
      return icon
    },
    initMarkByAttribute (markerAttribute) {
      let position = markerAttribute.position
      let image = this.drawDOMByStyle(markerAttribute)
      let marker = new this.AMap.Marker({
        content: image,
        position: position
        // offset: new this.AMap.Pixel(-13, -30)
      })
      // this.Map.add(this.marker)
      // let vue = this
      this.geocoder.getAddress(position, function (status, result) {
        // console.log(markerAttribute)
        if (status === 'complete' && result.regeocode) {
          markerAttribute.location = result.regeocode.formattedAddress
        } else {
          console.log('根据经纬度查询地址失败')
        }
      })
      var top = (markerAttribute.fontSize === '30px') ? '-10px' : (markerAttribute.fontSize === '40px') ? '-20px' : '0px'
      marker.setLabel({
        // offset: new this.AMap.Pixel(-4, -20), // 设置文本标注偏移量
        content: '<div class="markerlabel ifmarkershow"  style="display:none; transform: translate(-50%); background-color: #40dcff;color: #303133; padding: 0 5px;border-radius: 3px; position: absolute; left: 10px; top:' + top + ';" >' + markerAttribute.title + '</div>', // 设置文本标注内容
        direction: 'top' // 设置文本标注方位
      })

      marker.setExtData({id: markerAttribute.id})
      // marker.setContent(image
      marker.setMap(this.Map)
      marker.on('click', this.markerClickFunc, this)
      return marker
      // marker.setMap(this.Map)
    },
    changeMarkerColor (index) {
      this.markerColor.color = this.colorList[index]
      this.isChooseColor = false
    },
    changeMarkerColor1 (index) {
      this.markerColor1.color = this.colorList[index]
    },
    draw (id) {
      console.log(this.isAddMark)
      if (this.isAddMark) {
        if (this.isAddingMarker) {
          this.cancelMarker()
        } else {
          this.isAddMark = false
        }
        this.Map.setDefaultCursor('url("https://webapi.amap.com/theme/v1.3/openhand.cur"),point')
        this.removeMarkerEvent()
        this.markerButtonTitle = '画点'
        if (id === 'marker') {
          return 0
        }
      }
      if (this.isDistance) {
        this.polylineButtonTitle = '测距'
        this.isDistance = false
        this.mouseTool.close(true)
        if (id === 'polyline') {
          return 0
        }
      }
      if (this.isAreaMeasure) {
        this.isAreaMeasure = false
        this.polygonButtonTitle = '面积测量'
        this.mouseTool.close(true)
        if (id === 'polygon') {
          return 0
        }
      }
      switch (id) {
        case 'polyline': {
          this.mouseTool.rule({
            lineOptions: {// 可缺省
              strokeStyle: 'solid',
              strokeColor: '#FF33FF',
              strokeOpacity: 1,
              strokeWeight: 2
            }
            // 同 RangingTool 的 自定义 设置，缺省为默认样式
          })
          this.isDistance = true
          this.polylineButtonTitle = '取消测量'
          break
        }
        case 'polygon': {
          this.mouseTool.measureArea({
            strokeColor: '#80d8ff',
            fillColor: '#80d8ff',
            fillOpacity: 0.3
            // 同 Polygon 的 Option 设置
          })
          this.isAreaMeasure = true
          this.polygonButtonTitle = '取消测量'
          break
        }
        case 'marker': {
          this.Map.setDefaultCursor('crosshair')
          this.addMarkerEvent()
          this.isAddMark = true
          this.markerButtonTitle = '取消画点'
          break
        }
      }
    },
    removeMarkerEvent () {
      let vue = this
      this.Map.off('click', this.addMarkerFunc, vue)
    },
    markerClickFunc (e) {
      console.log(e.target.C.Ce.labelDom)
      // var label = e.target.getLabel()
      e.target.C.Ce.labelDom.firstChild.style.display = 'block'
      console.log(e.target.C.Ce.labelDom.firstChild.style.display)
      // e.target.C.Ce.labelDom.style.display = 'block'
      this.markerAttribute = this.findMarkerById(e.target.getExtData().id)
      this.Map.setZoomAndCenter(10, this.markerAttribute.position)
      // // label.offset = new this.AMap.Pixel(-4, -20)
      // label.content = '<div class="markerlabel" style="display:block">' + this.markerAttribute.title + '</div>'
      // label.direction = 'top'
      // e.target.setLabel(null)
      // e.target.setLabel(label)
      this.markerColor.color = this.markerAttribute.color
      this.markerColor.fontSize = this.markerAttribute.fontSize
      this.markerLayerIndex = this.markerAttribute.layerName
      this.isEdittingMarker = true
    },
    addMarkerFunc  (e) {
      console.log(this)
      this.initMarkerAttribue(this.layerIndex)
      if (!this.isAddingMarker) {
        this.isAddingMarker = true
        let position = [e.lnglat.getLng(), e.lnglat.getLat()]
        this.marker = new this.AMap.Marker({
          icon: new this.AMap.Icon({
            size: new this.AMap.Size(53, 68), // 图标大小
            // imageSize: new this.AMap.Size(36, 36),
            image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
            imageOffset: new this.AMap.Pixel(-11, -28)
          }),
          position: position,
          offset: new this.AMap.Pixel(-13, -30)
        })
        // this.Map.add(this.marker)
        this.marker.setMap(this.Map)
        // this.markerAttribute.position = position
        this.$set(this.markerAttribute, 'position', position)
        let vue = this
        this.geocoder.getAddress(position, function (status, result) {
          console.log(vue.isAddingMarker)
          if (status === 'complete' && result.regeocode) {
            vue.$set(vue.markerAttribute, 'location', result.regeocode.formattedAddress)
            // vue.markerAttribute.location = result.regeocode.formattedAddress
          } else {
            console.log('根据经纬度查询地址失败')
          }
        })
      }
    },
    saveMarker () {
      // 保存标记点信息到对应图层标记列表中
      this.marker.setMap(null)
      this.marker = null
      let image = this.drawDOMByStyle(this.markerColor)
      this.markerAttribute.color = this.markerColor.color
      this.markerAttribute.fontSize = this.markerColor.fontSize
      this.markerAttribute.id = this.markerAttribute.title
      this.marker = new this.AMap.Marker({
        content: image,
        position: this.markerAttribute.position
        // offset: new this.AMap.Pixel(-13, -30)
      })
      var top = (this.markerAttribute.fontSize === '30px') ? '-10px' : (this.markerAttribute.fontSize === '40px') ? '-20px' : '0px'
      this.marker.setLabel({
        // offset: new this.AMap.Pixel(-4, -20), // 设置文本标注偏移量
        content: '<div class="markerlabel ifmarkershow"  style="display:none; transform: translate(-50%); background-color: #40dcff;color: #303133; padding: 0 5px;border-radius: 3px; position: absolute; left: 10px; top:' + top + ';" >' + this.markerAttribute.title + '</div>', // 设置文本标注内容
        direction: 'top' // 设置文本标注方位
      })
      this.marker.setExtData({id: this.markerAttribute.id})
      // this.marker.setContent(image)
      this.layerList[this.markerAttribute.layerName].markerList.push(this.attributeAssign(this.markerAttribute, this.markerAttribute.layerName))
      // this.layerList.find((item, index) => {
      //   if (item.value === this.markerAttribute.layerName) {
      //     item.markerList.push(this.markerAttribute)
      //     return true
      //   }
      //   return false
      // }, this)
      // this.markerAttribute = { }
      // this.markerAttribute.layerName = this.layerIndex
      // this.markerAttribute.valueList = this.initValueList(this.layerList[this.layerIndex].valueKeyList.length)
      this.marker.setMap(this.Map)
      this.marker.on('click', this.markerClickFunc, this)
      this.markerList[this.markerAttribute.layerName].markers.push(this.marker)
      this.initMarkerAttribue(this.layerIndex)
      this.isAddMark = false
      this.isAddingMarker = false
      this.removeMarkerEvent()
      this.markerButtonTitle = '画点'
      this.Map.setDefaultCursor('url("https://webapi.amap.com/theme/v1.3/openhand.cur"),point')
    },
    cancelMarker () {
      this.marker.setMap(null)
      this.marker = null
      this.initMarkerAttribue(this.layerIndex)
      // this.markerAttribute = { }
      // this.markerAttribute.layerName = this.layerIndex
      // this.markerAttribute.valueList = this.initValueList(this.layerList[this.layerIndex].valueKeyList.length)
      this.isAddMark = false
      this.isAddingMarker = false
      this.removeMarkerEvent()
      this.markerButtonTitle = '画点'
      this.Map.setDefaultCursor('url("https://webapi.amap.com/theme/v1.3/openhand.cur"),point')
    },
    addMarkerEvent () {
      let vue = this
      this.Map.on('click', this.addMarkerFunc, vue)
    },
    getMapScript () {
      if (!global.AMap) {
        global.AMap = {}
        global.AMap._preloader = new Promise((resolve, reject) => {
          global._initBaiduMap = function () {
            resolve(global.AMap)
            // console.log(global.AMap)
            global.document.body.removeChild($script)
            global.AMap._preloader = null
            global._initBaiduMap = null
          }

          const $script = document.createElement('script')
          $script.type = 'text/javascript'
          $script.src = `https://webapi.amap.com/maps?v=1.4.15&key=7c9346b11617747218a9c04c55dd8052&plugin=AMap.RangingTool,AMap.MouseTool,AMap.Geocoder,AMap.Autocomplete,AMap.PlaceSearch&callback=_initBaiduMap`
          global.document.body.appendChild($script)

          // $script.onload = $script.onreadystatechange = function () {
          //   if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
          //     setTimeout(() => { global._initBaiduMap() }, 1000)

          //     $script.onload = $script.onreadystatechange = null
          //   }
          // }
        })
        return global.AMap._preloader
      } else if (!global.AMap._preloader) {
        return Promise.resolve(global.AMap)
      } else {
        return global.AMap._preloader
      }
    },
    select (e) {
      this.placeSearch.setCity(e.poi.adcode)
      this.placeSearch.search(e.poi.name, (status, searchResult) => {
        if (status) {
          console.log(searchResult)
        } else {
          console.log('未找到相关信息')
        }
      }) // 关键字查询查询
    },

    initMap (AMap) {
      // console.log(AMap)
      window.AMap = AMap
      this.AMap = window.AMap
      this.Map = new this.AMap.Map('map', {
        resizeEnable: true,
        center: [116.404, 39.915],
        zoom: 8
      })
      this.mouseTool = new this.AMap.MouseTool(this.Map)
      this.geocoder = new this.AMap.Geocoder({
        city: '010', // 城市设为北京，默认：“全国”
        radius: 1000 // 范围，默认：500
      })
      var autoOptions = {
        input: 'addressinput'
      }
      var auto = new this.AMap.Autocomplete(autoOptions)
      this.placeSearch = new this.AMap.PlaceSearch({
        map: this.Map
      }) // 构造地点查询类
      this.AMap.event.addListener(auto, 'select', this.select, this)// 注册监听，当选中某条记录时会触发
      this.initLayer()
      this.markerAttribute.layerName = this.layerIndex
      // this.markerAttribute.valueList = this.initValueList(this.layerList[this.layerIndex].valueKeyList.length)
    }
    // this.Map.centerAndZoom(new this.AMap.Point(116.404, 39.915), 8)
  },
  beforeCreate () {

  },
  computed: {
    layerNameList: function () {
      var list = []
      for (var layer of this.layerList) {
        list.push({value: layer.value, label: layer.label})
      }
      console.log(list)
      return list
    },
    dataManagerLayer: function () {
      return this.layerList[this.dataLayerIndex]
    },
    fieldManagerLayer: function () {
      return this.layerList[this.fieldLayerIndex]
    }
  },
  watch: {
    layerList: {
      handler (newValue, oldValue) {
        // console.log(newValue)
        // console.log(this.oldValueKeyList.length)
        /* eslint-disable-next-line */

        // console.log(oldValue.length)
      },
      deep: true
    }
  },
  mounted () {
    const {getMapScript, initMap} = this
    getMapScript()
      .then(initMap)
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/index.css';

.main-container{
  display: flex;
  overflow-x: initial;
}

.map-container{
    /* width: 100%; */
    flex: 4;
    height: 100%;
    position: relative;
    overflow: hidden;
    margin: 0;
    /* font-family: "微软雅黑"; */
}

.control-container{
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 99;
}

.control-button:hover{
  color: red;
}

.search-container{
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1000;
  width: 300px;
  overflow: hidden;
  .btn{
    height: 33px;
    background: none;
    font-size: 17px;
    color: grey;
    position: absolute;
    right: 0;
    top: 4px;
    outline: none;
    padding: 0 5px;
    line-height: 33px;
    border: none;
  }
}

#addressinput{
  height: 35px;
  border-radius: 5px;
  border: 1px solid #eee;
  padding: 0 10px;
  width: 100%;
  padding-right: 40px;
  outline: none;
  -webkit-box-shadow: 0 0 10px #ccc;
  box-shadow: 0 0 10px #ccc;
}

.marker-form {
  width: 315px;
  height: 500px;
  position: absolute;
  right: 5px;
  top: 50%;
  margin-top: -250px;
  z-index: 1200;
  background: #fff;
  -webkit-box-shadow: 0 0 10px #ccc;
  box-shadow: 0 0 10px #ccc;
  .form-top {
    height: 40px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-bottom: 1px solid #eee;
    background: #35b499;
    line-height: 40px;
    .title {
      float: left;
      padding-left: 10px;
    }
  }
}
.marker-content{
    padding: 40px 0;
    height: 100%;
    background: #eee;
    overflow-y: auto;
}
.marker-content-item {
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    background: #fff;
    border-bottom: 1px solid #eee; /*no*/
    overflow: hidden;
    font-size: 12px; /*no*/
    input {
      height: 30px;
      width: 100%;
      border: none;
    }
    label {
      max-width: 90px;
      margin: 0;
      float: left;
    }
    .self-input {
      width: 100%;
      padding-left: 90px;
    }
    div{
      padding-left: 90px;
    }
    /deep/ .el-select{
      padding-left: 0!important;
    }

    /deep/ .el-input__inner{
      border: none;
      padding: 0;
    }
}

.marker-form .form-bottom {
    width: 100%;
    height: 40px;
    position: absolute;
    /* bottom: 0; */
    left: 0;
    border-top: 1px solid #eee; /*no*/
    text-align: right;
    padding: 0 10px;
    background: #fff;
}

.marker-content .margin-top {
    margin-top: 10px;
}

.marker-content .margin-bottom {
    margin-bottom: 10px;
}

.marker-custom-icon{
    width: 30px !important;
    height: 30px;
    padding-left: 0 !important;
    float: left;
    border-radius: 3px; /*no*/
    margin: 5px 4px;
    cursor: pointer;
}

.marker-form .form-top .title{
    float: left;
    padding-left: 10px;
}
.marker-form .form-top span{
    color: #fff;
}

.marker-form .form-top .iconfont{
    float: right;
    padding-right: 10px;
    font-size: 20px; /*no*/
    padding-top: 10px;
}

.iconfont{
  font-size: 20px;/*no*/
}

.marker-content .marker-content-item button{
    border: none;
    background: none;
    text-align: right;
    padding-right: 0;
    outline: none;
}

.layer-container{
  flex: 1;
  min-width: 240px;
  height: 100%;
  background-color: #fff;
  padding: 0 15px;
  border: 2px solid #eee; /*no*/
}

.defaultLayer::after{
  content: "默认";
  color: white;
  background-color: #FF5722;
  font-size: 12px; /*no*/
  text-align: center;
  border-radius: 2px; /*no*/
  padding: 0 6px;
  margin-left: 3px;
}

.layerIcon{
  float: left;
  margin-top: 16px;
  margin-right: 5px;
  font-size: 20px;  /*no*/
  color: #35b499;
}

.layerName{
  font-size: 16px;  /*no*/
}

.layer-setting-icon{
  font-size: 20px;  /*no*/
  margin-top: 16px;
  margin-right: 5px;
  color: #35b499;
}

.layer-container-title{
  p{
    float: left;
    font-size: 20px;  /*no*/
    margin-left: 5px;
    font-weight: 700;
    font-family: auto;
  }
  i{
    float: right;
    font-size: 20px;  /*no*/
    margin-top: 26px;
    font-weight: 700;
    color: #35b499;
  }
}

.show-menu-container {
    position: absolute;
    top: 50%;
    /* left: 300px; */
    margin-top: -50px;
    z-index: 1099;
    background: rgba(0,0,0,.38);
    width: 12px; /*no*/
    height: 100px; /*no*/
    line-height: 100px; /*no*/
    border-top-right-radius: 100px; /*no*/
    border-bottom-right-radius: 100px;/*no*/
    cursor: pointer;
    .show-menu-btn {
      color: #fff;
      width: 12px;
      height: 30px;
      font-size: 16px;  /*no*/
    }
}

.ifmarkershow{
  display: none!important;
}

.markerlabel{
  margin: 2px 3px !important;
}

.dataManager-container{
  cursor: default;
  border: 1px solid #eee; /*no*/
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: #fff;
  .dataManager-content{
    overflow: auto;
    position: relative;
    width: 100%;
    height: 300px;
    padding: 10px 0;
    /deep/ .el-table{
      position: absolute;
      width: auto;
      max-width: none;
      /* overflow: hidden; */
    }
  }
  .dataManager-top{
    display: flex;
    border-bottom: 1px solid #eee;
    /* justify-content: space-between; */
    /* line-height: 40px; */
    padding: 0 15px;
    .layerName{
      color: #35b499;
      font-weight: 700;
    }
    .container-title{
      margin: 10px 15px;
      font-size: 16px;
      padding: 6px 5px;
    }
    .close-icon{
      position: absolute;
      right: 5px;
      top: 13px;
      height: 26px;
      border-radius: 15px;
      font-size: 20px;
      line-height: 26px;
      padding: 0 10px;
    }
    button{
      height: 26px;
      border-radius: 15px;
      font-size: 12px;
      line-height: 26px;
      margin: 13px 5px;
      padding: 0 10px
    }
    input{
      height: 26px;
      margin-top: 13px;
      border-radius: 6px;
      font-size: 12px;
      line-height: 26px;
      width: 200px;
      border: 1px solid #ccc;
    }
  }
}

.fieldedit-content{
  max-height: 500px; /*no*/
  overflow-y: scroll;
}
.fieldedit-bottom{
  overflow: hidden;
  border-bottom: 1px solid #eee; /*no*/
  margin: 5px 0px;
  padding: 5px 0px;
}

.marker-style{
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #eee;
  overflow: hidden;
  font-size: 12px;
  line-height: 60px;
  position: relative;
  .self-input {
    width: 100%;
    padding-left: 90px;
    /* position: absolute; */
  }
  button{
    border: none;
    background-color: transparent;
  }
  .marker-custom-icon {
    width: 0.555556rem !important;
    height: 0.555556rem;
    padding-left: 0 !important;
    float: left;
    border-radius: 3px;
    margin: 15px 8px;
    cursor: pointer;
  }
}

/deep/ .amap-icon{
  overflow: inherit !important;
}

/deep/ .amap-marker-label{
  border: none;
  background-color: #FF5722;
  border-radius: 3px;
  padding: 0;
}

</style>
