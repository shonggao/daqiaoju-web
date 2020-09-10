<template>
<div class="main-container">
  <div id="map" class="map-container">
  </div>
  <div class="control-container">
    <el-button-group>
      <el-button class="control-button" icon="el-icon-map-location" @click.stop="draw('marker')" id="marker">{{markerButtonTitle}}</el-button>
      <el-button class="control-button" id="polyline" @click.stop="draw('polyline')">{{polylineButtonTitle}}</el-button>
      <el-button class="control-button" id="polygon" @click.stop="draw('polygon')" >{{polygonButtonTitle}}</el-button>
    </el-button-group>
  </div>
  <div class="marker-form" v-if="isAddingMarker">
    <div class="form-top">
      <span class="title">添加标记点</span>
      <span class="el-icon-circle-close iconfont "></span>
    </div>
    <div class="marker-content">
      <div class="marker-content-item">
        <label for="">所属图层</label>
        <div>
          <el-select v-model="markerAttribute.layerName" size="small" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in layerList"
              :key="item.value"
              :label="item.label"
              :value="index">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="marker-content-item margin-top">
        <label for="">标记名称</label>
        <div>
          <input type="text" class="noborder-input" placeholder="请输入标记点名称" v-model="markerAttribute.title">
        </div>
      </div>
      <div class="marker-content-item">
        <label for="">当前位置</label>
        <div>
          <input type="text" class="noborder-input" v-model="markerAttribute.location" >
        </div>
      </div>
      <div class="marker-content-item">
        <label for="">标记样式</label>
        <div style="text-align: right; cursor: pointer; padding-left: 0px;" @click.stop="chooseColor()">
          <button><i class="iconfont el-icon-location" id="markerStyle" :style="markerColor"></i></button>
        </div>
      </div>
      <div class="marker-content-item" style="padding-right: 0px;"  v-if="isChooseColor">
        <div style="padding-left: 0px;">
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

      <div class="marker-content-item" v-for="(item,index) in layerList[layerIndex].valueKeyList" :key="index">
        <label for="">{{item.key}}</label>
        <div>
          <input type="text" class="noborder-input" placeholder="请输入字段值" v-model="markerAttribute.valueList[index].value">
        </div>
      </div>
      <div class="marker-content-item margin-top">
        <label for="">图片</label>
        <div>
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
      <span class="title">添加标记点</span>
      <span class="el-icon-circle-close iconfont "></span>
    </div>
    <div class="marker-content">
      <div class="marker-content-item">
        <label for="">所属图层</label>
        <div>
          <el-select v-model="markerAttribute.layerName" size="small" clearable placeholder="请选择">
            <el-option
              v-for="(item,index) in layerList"
              :key="item.value"
              :label="item.label"
              :value="index">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="marker-content-item margin-top">
        <label for="">标记名称</label>
        <div>
          <input type="text" class="noborder-input" placeholder="请输入标记点名称" v-model="markerAttribute.title">
        </div>
      </div>
      <div class="marker-content-item">
        <label for="">当前位置</label>
        <div>
          <input type="text" class="noborder-input" v-model="markerAttribute.location" >
        </div>
      </div>
      <div class="marker-content-item">
        <label for="">标记样式</label>
        <div style="text-align: right; cursor: pointer; padding-left: 0px;" @click.stop="chooseColor()">
          <button><i class="iconfont el-icon-location" id="markerStyle" :style="markerColor"></i></button>
        </div>
      </div>
      <div class="marker-content-item" style="padding-right: 0px;"  v-if="isChooseColor">
        <div style="padding-left: 0px;">
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

      <div class="marker-content-item" v-for="(item,index) in layerList[layerIndex].valueKeyList" :key="index">
        <label for="">{{item.key}}</label>
        <div>
          <input type="text" class="noborder-input" placeholder="请输入字段值" v-model="markerAttribute.valueList[index].value">
        </div>
      </div>
      <div class="marker-content-item margin-top">
        <label for="">图片</label>
        <div>
          <input type="text" class="noborder-input" placeholder="上传图片">
        </div>
      </div>
    </div>
    <div class="form-bottom">
      <el-button type="primary" @click="editMarker(markerAttribute.layerName,markerAttribute.id)">保存</el-button>
      <el-button plain @click="removeMarker(markerAttribute.layerName,markerAttribute.id)">取消</el-button>
    </div>
  </div>

    <!-- </baidu-map> -->
</div>
</template>
<script>

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
      polylineButtonTitle: '测距',
      polygonButtonTitle: '面积测量',
      isChooseColor: false,
      layerIndex: 0,
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
          value: '选项1',
          label: '黄金糕',
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
          value: '选项2',
          label: '双皮奶',
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
          this.markerList[index].show = true
          this.markerList[index].markers = []
          for (let markerAttrubute of item.markerList) {
            this.markerList[index].markers.push(this.initMarkByAttribute(markerAttrubute))
          }
        }, this)
      }
    },
    hiddenLayer (index) {
      this.markerList[index].show = false
      this.markerList[index].markers.forEach((item, index) => {
        item.setMap(null)
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
      this.initMarkerAttribue()
      this.isEdittingMarker = false
    },
    initMarkerAttribue () {
      this.markerAttribute = { }
      this.markerAttribute.layerName = this.layerIndex
      this.markerAttribute.valueList = this.initValueList(this.layerList[this.layerIndex].valueKeyList.length)
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
      this.markerList[layerIndex].markers.find((item, index, arr) => {
        if (item.getExtData().id === markerid) {
          item.setMap(null)
          item = this.initMarkByAttribute(this.markerAttribute)
          this.layerList[layerIndex].markerList[index] = this.markerAttribute

          return true
        }
        return false
      }, this)
      this.initMarkerAttribue()
      this.isEdittingMarker = false
    },
    drawDOMByStyle (style) {
      let icon = document.createElement('i')
      icon.style.color = style.color
      icon.style.fontSize = style.fontSize
      icon.className = 'el-icon-location'
      return icon
    },
    initMarkByAttribute (markerAttribute) {
      let position = markerAttribute.position
      let marker = new this.AMap.Marker({
        icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
        position: position,
        offset: new this.AMap.Pixel(-13, -30)
      })
      // this.Map.add(this.marker)
      // let vue = this
      this.geocoder.getAddress(position, function (status, result) {
        console.log(markerAttribute)
        if (status === 'complete' && result.regeocode) {
          markerAttribute.location = result.regeocode.formattedAddress
        } else {
          console.log('根据经纬度查询地址失败')
        }
      })
      marker.setLabel({
        offset: new this.AMap.Pixel(-20, -20), // 设置文本标注偏移量
        content: markerAttribute.title, // 设置文本标注内容
        direction: 'right' // 设置文本标注方位
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
      if (this.isAddMark) {
        this.cancelMarker()
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
      console.log(e.target)
      this.markerAttribute = this.findMarkerById(e.target.getExtData().id)
      this.isEdittingMarker = true
    },
    addMarkerFunc  (e) {
      console.log(this)
      this.isAddingMarker = true
      let position = [e.lnglat.getLng(), e.lnglat.getLat()]
      this.marker = new this.AMap.Marker({
        icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
        position: position,
        offset: new this.AMap.Pixel(-13, -30)
      })
      this.Map.add(this.marker)
      this.markerAttribute.position = position
      let vue = this
      this.geocoder.getAddress(position, function (status, result) {
        console.log(vue.isAddingMarker)
        if (status === 'complete' && result.regeocode) {
          vue.markerAttribute.location = result.regeocode.formattedAddress
        } else {
          console.log('根据经纬度查询地址失败')
        }
      })
    },
    saveMarker () {
      // 保存标记点信息到对应图层标记列表中

      this.marker.setLabel({
        offset: new this.AMap.Pixel(-20, -20), // 设置文本标注偏移量
        content: this.markerAttribute.title, // 设置文本标注内容
        direction: 'right' // 设置文本标注方位
      })
      let image = this.drawDOMByStyle(this.markerColor)
      this.markerAttribute.color = this.markerColor.color
      this.markerAttribute.fontSize = this.markerColor.fontSize
      this.marker.setContent(image)
      this.layerList[this.markerAttribute.layerName].markerList.push(this.markerAttribute)
      // this.layerList.find((item, index) => {
      //   if (item.value === this.markerAttribute.layerName) {
      //     item.markerList.push(this.markerAttribute)
      //     return true
      //   }
      //   return false
      // }, this)
      this.initMarkerAttribue()
      // this.markerAttribute = { }
      // this.markerAttribute.layerName = this.layerIndex
      // this.markerAttribute.valueList = this.initValueList(this.layerList[this.layerIndex].valueKeyList.length)
      this.marker.setMap(this.Map)
      this.marker.on('click', this.markerClickFunc, this)
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
  mounted () {
    const {getMapScript, initMap} = this
    getMapScript()
      .then(initMap)
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/index.css';
.map-container{
    width: 100%;
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
    border-bottom: 1px solid #eee;
    overflow: hidden;
    font-size: 12px;
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
    div {
      width: 100%;
      padding-left: 90px;
    }

}

.marker-content .marker-content-item>div[data-v-f4614156] {
    width: 100%;
    padding-left: 90px;
}

.marker-content .marker-content-item label[data-v-f4614156] {
    max-width: 90px;
    margin: 0;
    float: left;
}

.marker-form .form-bottom {
    width: 100%;
    height: 40px;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #eee;
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
    border-radius: 3px;
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
    font-size: 20px;
    padding-top: 10px;
}

.iconfont{
  font-size: 20px;
}

.marker-content .marker-content-item button{
    border: none;
    background: none;
    text-align: right;
    padding-right: 0;
    outline: none;
}

/deep/ .el-select{
  padding-left: 0!important;
}

/deep/ .el-input__inner{
  border: none;
  padding: 0;
}
</style>
