<template>
<div class="main-container">
  <el-dialog title="编辑图层" :visible.sync="editLayerDialogVisible">
      <el-form :model="layer">
        <el-form-item label="图层名称" label-width="120px">
          <el-input v-model="layer.label" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="layer.isDefault">默认图层</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editLayerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editLayerFunc(layer.index)">确 定</el-button>
      </div>
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
          <el-dropdown-item >数据管理</el-dropdown-item>
          <el-dropdown-item @click.native="setLayerDefault(index)">设为默认</el-dropdown-item>
          <el-dropdown-item >字段管理</el-dropdown-item>
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
    <div class="show-menu-container" @click.stop="showMenuFun">
      <a class="show-menu-button">
        <i :class="{'el-icon-arrow-right':(!isMenuShow),'el-icon-arrow-left':(isMenuShow)}"></i>
      </a>
    </div>
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
          <input type="text" class="noborder-input" placeholder="请输入字段值" v-model="markerAttribute.valueList[index].value">
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
          <input type="text" class="noborder-input" placeholder="请输入字段值" v-model="markerAttribute.valueList[index].value">
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
import deepClone from '../../assets/js/deepcopy.js'

export default{
  name: 'DingTu',
  data () {
    return {
      markerButtonTitle: '画点',
      isAddMark: false,
      isAddingMarker: false,
      isAreaMeasure: false,
      isDistance: false,
      isEdittingMarker: false,
      isMenuShow: true,
      editLayerDialogVisible: false,
      popVisible: false,
      polylineButtonTitle: '测距',
      polygonButtonTitle: '面积测量',
      isChooseColor: false,
      layerIndex: 0,
      showLabelButtonTitle: '显示标题',
      isShowLabel: false,
      addMarkerLayerName: 0,
      layer: {},
      markerColor: {
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
      markerList: [],
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
              key: '建设单位'
            }
          ],
          markerList: [
            {
              id: '4',
              title: '测试点4',
              color: 'rgb(80, 130, 204)',
              fontSize: '30px',
              layerName: 0,
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
              location: '',
              position: [116.397428, 39.90923]
            }
          ]
        }
      ],
      markerAttribute: {
      },
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
      // this.markerAttribute.layerName = value
      this.$set(this.markerAttribute, 'layerName', value)
      // this.markerAttribute.$set('layerName', this.markerAttribute.value)
      console.log(this.markerAttribute)
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
      this.layer = deepClone(this.layerList[index])
      this.layer.index = index
      this.layer.isDefault = (this.layerIndex === index)
      console.log(this.layer)
      this.editLayerDialogVisible = true
    },
    setLayerDefault (index) {
      console.log('setLayerDefault')
      this.layerIndex = index
      this.initMarkerAttribue()
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
      this.initMarkerAttribue()
      this.isEdittingMarker = false
    },
    initMarkerAttribue () {
      this.markerAttribute = { }
      this.$set(this.markerAttribute, 'layerName', this.layerIndex)
      this.addMarkerLayerName = this.layerIndex
      // this.markerAttribute.layerName = this.layerIndex
      this.$set(this.markerAttribute, 'valueList', this.initValueList(this.layerList[this.layerIndex].valueKeyList.length))
      // this.markerAttribute.valueList = this.initValueList(this.layerList[this.layerIndex].valueKeyList.length)
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
        this.markerList[layerIndex].markers.find((item, index, arr) => {
          if (item.getExtData().id === markerid) {
            item.setMap(null)
            this.markerAttribute.color = this.markerColor.color
            this.markerAttribute.fontSize = this.markerColor.fontSize
            item = this.initMarkByAttribute(this.markerAttribute)
            this.layerList[layerIndex].markerList[index] = this.markerAttribute

            return true
          }
          return false
        }, this)
      } else {
        this.markerList[this.markerLayerIndex].markers.find((item, index, arr) => {
          if (item.getExtData().id === markerid) {
            item.setMap(null)
            arr.splice(index, 1)
            this.layerList[this.markerLayerIndex].markerList.splice(index, 1)
            this.markerAttribute.color = this.markerColor.color
            this.markerAttribute.fontSize = this.markerColor.fontSize
            item = this.initMarkByAttribute(this.markerAttribute)
            this.layerList[layerIndex].markerList.push(this.markerAttribute)
            this.markerList[layerIndex].markers.push(item)
            return true
          }
          return false
        }, this)
      }

      this.initMarkerAttribue()
      this.isEdittingMarker = false
    },
    drawDOMByStyle (style) {
      let icon = document.createElement('i')
      icon.style.color = style.color
      icon.style.fontSize = style.fontSize
      icon.style.top = (style.fontSize === '30px') ? '4px' : (style.fontSize === '40px') ? '-5px' : '14px'
      icon.style.left = (style.fontSize === '30px') ? '-6px' : (style.fontSize === '40px') ? '-5px' : '0px'
      icon.style.position = 'absolute'
      icon.className = 'el-icon-location'
      return icon
    },
    initMarkByAttribute (markerAttribute) {
      let position = markerAttribute.position
      let marker = new this.AMap.Marker({
        icon: new this.AMap.Icon({
          size: new this.AMap.Size(53, 68), // 图标大小
          // imageSize: new this.AMap.Size(36, 36),
          image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
          imageOffset: new this.AMap.Pixel(-13, -30)
        }),
        position: position,
        offset: new this.AMap.Pixel(-13, -30)
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
      marker.setLabel({
        // offset: new this.AMap.Pixel(-4, -20), // 设置文本标注偏移量
        content: '<div class="markerlabel ifmarkershow"  style="display:none">' + markerAttribute.title + '</div>', // 设置文本标注内容
        direction: 'top' // 设置文本标注方位
      })

      let image = this.drawDOMByStyle(markerAttribute)
      marker.setExtData({id: markerAttribute.id})
      marker.setContent(image)
      marker.setMap(this.Map)
      marker.on('click', this.markerClickFunc, this)
      return marker
      // marker.setMap(this.Map)
    },
    changeMarkerColor (index) {
      this.markerColor.color = this.colorList[index]
      this.isChooseColor = false
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
      // // label.offset = new this.AMap.Pixel(-4, -20)
      // label.content = '<div class="markerlabel" style="display:block">' + this.markerAttribute.title + '</div>'
      // label.direction = 'top'
      // e.target.setLabel(null)
      // e.target.setLabel(label)
      this.markerLayerIndex = this.markerAttribute.layerName
      this.isEdittingMarker = true
    },
    addMarkerFunc  (e) {
      console.log(this)
      if (!this.isAddingMarker) {
        this.isAddingMarker = true
        let position = [e.lnglat.getLng(), e.lnglat.getLat()]
        this.marker = new this.AMap.Marker({
          icon: new this.AMap.Icon({
            size: new this.AMap.Size(53, 68), // 图标大小
            // imageSize: new this.AMap.Size(36, 36),
            image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
            imageOffset: new this.AMap.Pixel(-13, -30)
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
      this.marker = new this.AMap.Marker({
        content: image,
        position: this.markerAttribute.position
        // offset: new this.AMap.Pixel(-13, -30)
      })
      this.marker.setLabel({
        // offset: new this.AMap.Pixel(-4, -20), // 设置文本标注偏移量
        content: '<div class="markerlabel ifmarkershow"  style="display:none">' + this.markerAttribute.title + '</div>', // 设置文本标注内容
        direction: 'top' // 设置文本标注方位
      })

      // this.marker.setContent(image)
      this.layerList[this.markerAttribute.layerName].markerList.push(this.markerAttribute)
      // this.layerList.find((item, index) => {
      //   if (item.value === this.markerAttribute.layerName) {
      //     item.markerList.push(this.markerAttribute)
      //     return true
      //   }
      //   return false
      // }, this)
      this.initMarkerAttribue()
      console.log('mapclicked')
      // this.markerAttribute = { }
      // this.markerAttribute.layerName = this.layerIndex
      // this.markerAttribute.valueList = this.initValueList(this.layerList[this.layerIndex].valueKeyList.length)
      this.marker.setMap(this.Map)
      this.marker.on('click', this.markerClickFunc, this)
      this.markerList[this.markerAttribute.layerName].markers.push(this.marker)
      this.isAddMark = false
      this.isAddingMarker = false
      this.removeMarkerEvent()
      this.markerButtonTitle = '画点'
      this.Map.setDefaultCursor('url("https://webapi.amap.com/theme/v1.3/openhand.cur"),point')
    },
    cancelMarker () {
      this.marker.setMap(null)
      this.marker = null
      this.initMarkerAttribue()
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
          $script.src = `https://webapi.amap.com/maps?v=1.4.15&key=7c9346b11617747218a9c04c55dd8052&plugin=AMap.RangingTool,AMap.MouseTool,AMap.Geocoder&callback=_initBaiduMap`
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
      this.initLayer()
      this.markerAttribute.layerName = this.layerIndex
      this.markerAttribute.valueList = this.initValueList(this.layerList[this.layerIndex].valueKeyList.length)
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
}

.map-container{
    /* width: 100%; */
    flex: 4;
    height: 100%;
    position: relative;
    overflow: hidden;
    margin: 0;
    font-family: "微软雅黑";
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

.marker-form {
  width: 315px;
  height: 500px;
  position: absolute;
  right: 5px;
  top: 50%;
  margin-top: -250px;
  z-index: 999;
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
    overflow-y: scroll;
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

/deep/ .amap-icon{
  overflow: inherit !important;
}

/deep/ .amap-marker-label{
  border: none;
  background-color: #FF5722;
  border-radius: 3px;
  padding: 0;
}

/deep/ .el-select{
  padding-left: 0!important;
}

/deep/ .el-input__inner{
  border: none;
  padding: 0;
}
</style>
