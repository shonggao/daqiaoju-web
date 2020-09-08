<template>
<div class="main-container">
    <!-- <baidu-map class="map-container" :center="map.center" :zoom="map.zoom" @ready="handler">

        <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT"></bm-navigation>

        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation> -->
  <div id="map" class="map-container">
  </div>
  <div class="control-container">
    <el-button-group>
      <el-button class="control-button" icon="el-icon-map-location" @click.stop="draw('marker')" id="marker">{{markerButtonTitle}}</el-button>
      <el-button class="control-button" id="polyline" @click.stop="distance('polyline')">测距</el-button>
      <el-button class="control-button" id="polygon" @click.stop="draw('polygon')" >面积测量</el-button>
    </el-button-group>
  </div>
  <div class="marker-form" v-if="isAddMark">
    <div class="form-top">
      <span class="title">添加标记点</span>
      <span class="el-icon-circle-close iconfont "></span>
    </div>
    <div class="marker-content">
      <div class="marker-content-item">
        <label for="">所属图层</label>
        <div>
          <el-select v-model="value" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="marker-content-item margin-top">
        <label for="">标记名称</label>
        <div>
          <input type="text" class="noborder-input" placeholder="请输入标记点名称">
        </div>
      </div>
      <div class="marker-content-item">
        <label for="">当前位置</label>
        <div>
          <input type="text" class="noborder-input" readonly>
        </div>
      </div>
      <div class="marker-content-item">
        <label for="">标记样式</label>
        <div style="text-align: right; cursor: pointer; padding-left: 0px;" @click.stop="chooseColor()">
          <button><i class="iconfont el-icon-location" :style="markerColor"></i></button>
        </div>
      </div>
      <div class="marker-content-item"  v-if="isChooseColor">
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
      <div class="marker-content-item">
        <label for="">标记大小</label>
        <div>
          <el-select v-model="value" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="marker-content-item margin-top">
        <label for="">备注</label>
        <div>
          <input type="text" class="noborder-input" placeholder="请输入字段值">
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
      <el-button type="primary">保存</el-button>
      <el-button plain>取消</el-button>
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
      map: {
        center: {lng: 121.4472540000, lat: 31.3236200000},
        zoom: 8,
        show: true,
        dragging: true
      },
      Bmap: null,
      markerButtonTitle: '画点',
      isAddMark: false,
      polylineButtonTitle: '测距',
      isChooseColor: false,
      markerColor: {
        color: 'rgb(80, 130, 204)'
      },
      colorList: [
        'rgb(80, 130, 204)',
        'rgb(101, 179, 68)',
        'rgb(255, 0, 0)',
        'rgb(174, 106, 177)',
        'rgb(255, 109, 52)',
        'rgb(255, 192, 67)',
        'rgb(0, 0, 0)'
      ]
    }
  },
  methods: {
    addmaker () {
      /* eslint-disable-next-line */
      if(this.Map == null){
        return false
      } else {
        if (this.isAddMark) {
          this.isAddMark = false
        }
      }
    },
    chooseColor () {
      if (this.isChooseColor) {
        this.isChooseColor = false
      } else {
        this.isChooseColor = true
      }
    },
    changeMarkerColor (index) {
      this.markerColor.color = this.colorList[index]
      this.isChooseColor = false
    },
    getBMapGLLib () {
      // this.BMapGL = BMap
      if (!global.BMapGLLib) {
        global.BMapGLLib = {}
        global.BMapGLLib._preloader = new Promise((resolve, reject) => {
          global._iniBMapGLLib = function () {
            resolve(global.BMapGLLib)

            global.document.body.removeChild($script)
            global.document.body.removeChild($link)
            global.document.body.removeChild($script1)
            global.BMapGLLib._preloader = null
            global._initBMapGLLib = null
          }

          const $link = document.createElement('link')
          global.document.body.appendChild($link)
          $link.src = 'https://mapopen.cdn.bcebos.com/github/BMapGLLib/DrawingManager/src/DrawingManager.min.css'
          const $script = document.createElement('script')
          global.document.body.appendChild($script)
          $script.src = `https://mapopen.cdn.bcebos.com/github/BMapGLLib/DrawingManager/src/DrawingManager.min.js`

          const $script1 = document.createElement('script')
          global.document.body.appendChild($script1)
          $script1.src = `https://mapopen.cdn.bcebos.com/github/BMapGLLib/DistanceTool/src/DistanceTool.min.js`
          $script1.onload = $script1.onreadystatechange = function () {
            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
              setTimeout(() => { global._iniBMapGLLib() }, 1000)

              $script1.onload = $script1.onreadystatechange = null
            }
          }
        })
        return global.BMapGLLib._preloader
      } else if (!global.BMapGLLib._preloader) {
        return Promise.resolve(global.BMapGLLib)
      } else {
        return global.BMapGLLib._preloader
      }
    },
    initBMapGLLib (BMapGLLib) {
      var styleOptions = {
        strokeColor: '#5E87DB', // 边线颜色
        fillColor: '#5E87DB', // 填充颜色。当参数为空时，圆形没有填充颜色
        strokeWeight: 2, // 边线宽度，以像素为单位
        strokeOpacity: 1, // 边线透明度，取值范围0-1
        fillOpacity: 0.2 // 填充透明度，取值范围0-1
      }
      var labelOptions = {
        borderRadius: '2px',
        background: '#FFFBCC',
        border: '1px solid #E1E1E1',
        color: '#703A04',
        fontSize: '12px',
        letterSpacing: '0',
        padding: '5px'
      }
      this.distanceTool = new BMapGLLib.DistanceTool(this.Map)
      this.drawingManager = new BMapGLLib.DrawingManager(this.Map, {
        enableCalculate: true, // 绘制是否进行测距测面
        enableSorption: true, // 是否开启边界吸附功能
        sorptiondistance: 20, // 边界吸附距离
        enableGpc: true, // 是否开启延边裁剪功能
        // enableLimit: true, // 是否开启超限提示
        // limitOptions: {
        //   area: 500000000, // 面积超限值
        //   distance: 300000000 // 距离超限值
        // },
        circleOptions: styleOptions, // 圆的样式
        polylineOptions: styleOptions, // 线的样式
        polygonOptions: styleOptions, // 多边形的样式
        rectangleOptions: styleOptions, // 矩形的样式
        labelOptions: labelOptions // label样式
      })
      this.addEvent()
      console.log(this.distanceTool, this.drawingManager)
    },
    reset () {
      const {getBMapGLLib, initBMapGLLib} = this
      getBMapGLLib()
        .then(initBMapGLLib)
    },
    addEvent () {
      this.distanceTool.addEventListener('drawend', function (e) {
        console.log('drawend')
        console.log(e.points)
        console.log(e.overlays)
        console.log(e.distance)
        // this.distanceTool.open()
      })
      this.distanceTool.addEventListener('addpoint', function (e) {
        console.log('addpoint')
        console.log(e.point)
        console.log(e.pixel)
        console.log(e.index)
        console.log(e.distance)
      })
      // let vue = this
      this.distanceTool.addEventListener('removepolyline', function (e) {
        console.log('removepolyline')
        console.log(e)
        // vue.distanceTool.open()
      })
      // 绘制完成后获取相关的信息(面积等)
      this.drawingManager.addEventListener('polygoncomplete', function (e) {
        console.log('overlaycomplete')
        alert(e.calculate)
      })
    },
    removEvent () {
      // this.distanceTool.removeEventListener()
      this.distanceTool.removeEventListener('drawend', function (e) {
        console.log('drawend')
        console.log(e.points)
        console.log(e.overlays)
        console.log(e.distance)
      })
      this.distanceTool.removeEventListener('addpoint', function (e) {
        console.log('addpoint')
        console.log(e.point)
        console.log(e.pixel)
        console.log(e.index)
        console.log(e.distance)
      })
      this.distanceTool.removeEventListener('removepolyline', function (e) {
        console.log('removepolyline')
        console.log(e)
      })
    },
    draw (id) {
      // var arr = document.getElementsByClassName('bmap-btn');
      // for(var i = 0; i<arr.length; i++) {
      //     arr[i].style.backgroundPositionY = '0';
      // }
      // e.style.backgroundPositionY = '-52px';
      var drawingType
      switch (id) {
        case 'marker': {
          drawingType = window.BMAP_DRAWING_MARKER
          break
        }
        case 'polyline': {
          drawingType = window.BMAP_DRAWING_POLYLINE
          break
        }
        case 'rectangle': {
          drawingType = window.BMAP_DRAWING_RECTANGLE
          break
        }
        case 'polygon': {
          drawingType = window.BMAP_DRAWING_POLYGON
          break
        }
        case 'circle': {
          drawingType = window.BMAP_DRAWING_CIRCLE
          break
        }
      }
      console.log(id)
      console.log(drawingType)
      if (this.distanceTool._isOpen) {
        this.polylineButtonTitle = '测距'
        this.distanceTool.colse()
      }
      // 进行绘制
      if (this.drawingManager._isOpen && this.drawingManager.getDrawingMode() === drawingType) {
        this.isAddMark = false
        // this.drawingType = ''
        this.markerButtonTitle = '画点'
        this.drawingManager.close()
      } else {
        this.isAddMark = true
        this.markerButtonTitle = '取消画点'
        this.drawingManager.setDrawingMode(drawingType)
        this.drawingManager.open()
      }
    },
    distance (id) {
      console.log(this.distanceTool)
      if (this.isAddMark) {
        this.isAddMark = false
        // this.drawingType = ''
        this.markerButtonTitle = '画点'
        this.drawingManager.close()
      }
      if (this.distanceTool._isOpen) {
        console.log('取消测距')
        this.polylineButtonTitle = '测距'
        // this.removEvent()
        this.distanceTool.close()
      } else {
        console.log('测距')
        this.polylineButtonTitle = '取消测距'
        this.distanceTool.open()
        // this.addEvent()
      }
    }
  },
  beforeCreate () {
    function getMapScript () {
      if (!global.BMapGL) {
        global.BMapGL = {}
        global.BMapGL._preloader = new Promise((resolve, reject) => {
          global._initBaiduMap = function () {
            resolve(global.BMapGL)
            console.log(global.BMapGL)
            global.document.body.removeChild($script)
            global.BMapGL._preloader = null
            global._initBaiduMap = null
          }

          const $script = document.createElement('script')
          global.document.body.appendChild($script)
          $script.type = 'text/javascript'
          $script.src = `https://api.map.baidu.com/api?type=webgl&v=3.0&ak=Xmyh6oA3PW3mnWY4GTEoPO3VtTP7PGks`

          $script.onload = $script.onreadystatechange = function () {
            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
              setTimeout(() => { global._initBaiduMap() }, 1000)

              $script.onload = $script.onreadystatechange = null
            }
          }
        })
        return global.BMapGL._preloader
      } else if (!global.BMapGL._preloader) {
        return Promise.resolve(global.BMapGL)
      } else {
        return global.BMapGL._preloader
      }
    };

    getMapScript().then(
      (BMapGL) => {
        console.log(BMapGL)
        window.BMapGL = BMapGL
      })
  },
  mounted () {
    this.BMapGL = window.BMapGL
    this.Map = new this.BMapGL.Map('map', {enableMapClick: true})
    this.Map.centerAndZoom(new this.BMapGL.Point(116.404, 39.915), 8)
    this.Map.enableScrollWheelZoom(true)
    this.reset()
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/index.css';
.map-container{
    width: 100%;
    height: 840px;
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
