<template>
  <div class="hello">
    <el-dialog title="修改项目信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="日期" :label-width="formLabelWidth">
            <el-date-picker
              v-model="form.date"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="省份" :label-width="formLabelWidth">
            <el-input v-model="form.province" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="市区" :label-width="formLabelWidth">
            <el-input v-model="form.city" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="地址" :label-width="formLabelWidth">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="editFrom">确 定</el-button>
        </div>
    </el-dialog>
    <div class="main-container">
      <div class="container map-container">
        <p class="title">全国项目分布图</p>
        <div class="line"></div>
        <div class="content-container-box">
            <div class="map-container-box">
                <div class="info-container-box">
                  <div class="info-container">
                    <div class="title-container">总投资</div>
                    <div class="info">33826亿元</div>
                    <div class="info-footer"></div>
                  </div>
                  <div class="info-container">
                    <div class="title-container">总投资</div>
                    <div class="info">33826亿元</div>
                    <div class="info-footer"></div>
                  </div>
                  <div class="info-container">
                    <div class="title-container">总投资</div>
                    <div class="info">33826亿元</div>
                    <div class="info-footer"></div>
                  </div>
                </div>
                <div id="map" class="map"></div>
            </div>
            <div class="rank-container">
              <el-table
                :data="tableData"
                stripe
                style="width: 100%">
                <el-table-column
                  type="index"
                  label="排名"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="province"
                  label="省份"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="count"
                  label="项目数量">
                </el-table-column>
              </el-table>
            </div>
        </div>
      </div>
      <div class="chart-container-box">
        <div class="container chart-container">
          <p class="title">项目分类</p>
          <div class="line"></div>
          <div id="chart1" class="chart"></div>
        </div>
        <div class="container chart-container">
          <p class="title">投资金额分布情况</p>
          <div class="line"></div>
          <div id="chart2" class="chart"></div>
        </div>
      </div>
    </div>
    <div class="filter-container container main-container">
      <el-input class="input-box" v-model="input" placeholder="请输入项目名称"></el-input>
      <el-button class="button-box" plain>搜索</el-button>
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
          :data="tableData1"
          border
          class="program-table">
          <el-table-column
            prop="date"
            label="日期"
            min-width="24%">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            min-width="18%">
          </el-table-column>
          <el-table-column
            prop="province"
            label="省份"
            min-width="18%">
          </el-table-column>
          <el-table-column
            prop="city"
            label="市区"
            min-width="18%">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            min-width="45%">
          </el-table-column>
          <!-- <el-table-column
            prop="zip"
            label="邮编"
            width="120">
          </el-table-column> -->
          <el-table-column label="操作" style="min-width: 150px">
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
          :total="100">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import option from '../assets/js/map.js'
import deepClone from '../assets/js/deepcopy.js'
// import '../assets/js/china.js'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      tableData1: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }],
      value1: '',
      value2: '',
      input: '',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      editindex: '',
      form: {},
      tableData: [{
        rank: '1',
        province: '上海',
        count: '48'
      }, {
        rank: '2',
        province: '北京',
        count: '46'
      }, {
        rank: '3',
        province: '广东',
        count: '43'
      }, {
        rank: '4',
        province: '重庆',
        count: '39'
      }, {
        rank: '4',
        province: '重庆',
        count: '39'
      }, {
        rank: '4',
        province: '重庆',
        count: '39'
      }, {
        rank: '4',
        province: '重庆',
        count: '39'
      }, {
        rank: '4',
        province: '重庆',
        count: '39'
      }, {
        rank: '4',
        province: '重庆',
        count: '39'
      }, {
        rank: '4',
        province: '重庆',
        count: '39'
      }, {
        rank: '4',
        province: '重庆',
        count: '39'
      }, {
        rank: '4',
        province: '重庆',
        count: '39'
      }],
      options1: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          // orient: 'vertical',
          bottom: '5%',
          // left: 10,
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            center: ['50%', '45%'],
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1548, name: '搜索引擎'}
            ]
          }
        ]
      },
      myChart: {},
      options3: {
        color: ['#2f89cf'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '0%',
          top: '10px',
          right: '0%',
          bottom: '4%',
          width: '88%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            },
            // 修改刻度标签相关样式
            axisLabel: {
              color: 'black',
              fontSize: '12'
            },
            // x轴样式不显示
            axisLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            // 修改刻度标签相关样式
            axisLabel: {
              color: 'black',
              fontSize: '12'
            },
            // x轴样式不显示
            axisLine: {
              color: 'black'
            }
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '35%',
            itemStyle: {
              // 修改柱子圆角
              barBorderRadius: 5
            },
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      },
      options2: {
        backgroundColor: '#fff',
        title: {
          text: '模拟航线',
          subtext: '数据纯属虚构',
          left: 'center',
          textStyle: {
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params, ticket, callback) {
          /* eslint-disable-next-line */
            if (params.seriesType == 'effectScatter') {
              return '线路：' + params.data.name + '' + params.data.value[2]
            /* eslint-disable-next-line */
            } else if (params.seriesType == 'lines') {
              return params.data.fromName + '>' + params.data.toName + '<br />' + params.data.value
            } else {
              return params.name
            }
          }
        },
        legend: {
          orient: 'vertical',
          top: 'bottom',
          left: 'left',
          data: ['西安 Top3', '西宁 Top3', '银川 Top3'],
          textStyle: {
            color: '#000'
          },
          selectedMode: 'multiple'
        },
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: true,
              color: '#fff'
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: '#C7F6D7',
              borderColor: '#195BB9',
              borderWidth: 1
            },
            emphasis: {
              areaColor: '#2B91B7'
            }
          }
        },
        series: option.series
      }
    }
  },
  methods: {
    initChart (chartid, options) {
      // 使用id 和 options初始化图表
      this.myChart[chartid] = this.$echarts.init(document.getElementById(chartid))
      this.myChart[chartid].setOption(options)
      let self = this
      window.addEventListener('resize', function () {
        self.myChart[chartid].resize()
      })
    },
    updateChart (chartid, options) {
      // 使用id 和 options更新图表
      this.myChart[chartid].setOption(options)
    },
    editFrom () {
      // this.tableData1[this.editindex] = this.form
      // console.log(this.tableData1)
      this.tableData1[this.editindex].name = this.form.name
      this.tableData1[this.editindex].province = this.form.province
      this.tableData1[this.editindex].city = this.form.city
      this.tableData1[this.editindex].date = this.form.date
      this.tableData1[this.editindex].address = this.form.address
      this.form = {}
      this.editindex = ''
      this.dialogFormVisible = false
    },
    handleEdit (index, row) {
      this.editindex = index
      this.form = deepClone(this.tableData1[index])
      this.dialogFormVisible = true
    }
  },
  mounted () {
    // console.log(window.echarts)
    this.initChart('chart1', this.options1)
    this.initChart('map', this.options2)
    this.initChart('chart2', this.options3)
    this.myChart['map'].on('click', function (params) {
      console.log(params)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/css/index.css';
.main-container{
  display: flex;
}

.map-container{
  flex: 2;
  height: 800px;
}

.chart-container-box{
  flex: 1;
}

.chart-container{
  height: 390px;
  border-top: 1px solid transparent;
}

.filter-container{
  height: 60px;
  position: relative;
}

.program-container-box{
  min-width: 1400px; /*no*/
  max-width: 1900px; /*no*/
  height: 650px;
  border: 1px solid transparent;/*no*/
  display: flex;
}

.title{
  margin: 15px 21px;
  color: black;
  font-weight: 600;
  font-size: 20px
}

.content-container-box{
  display: flex;
}

.info-container-box{
  display: flex;
  /* flex: 3; */
  padding: 10px 20px;
}

.map-container-box{
  flex: 3;
}

.rank-container{
  flex: 2;
  /* background-color: pink; */
  margin: 50px 15px;
  height: 600px;
}

.info-container{
  position: relative;
  flex:1;
  height: 115px;
  margin: 15px;
}
.info-container:before{
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-left: 2px solid #02a6b5; /*no*/
  border-top: 2px solid #02a6b5; /*no*/
  content: "";
}

.info-container:after{
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid #02a6b5; /*no*/
  border-top: 2px solid #02a6b5; /*no*/
  content: "";
}

.info-footer:before{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-left: 2px solid #02a6b5; /*no*/
  border-bottom: 2px solid #02a6b5; /*no*/
  content: "";
}

.info-footer:after{
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid #02a6b5; /*no*/
  border-bottom: 2px solid #02a6b5; /*no*/
  content: "";
}

.title-container{
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  margin-top: 24px;
}

.info{
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  margin-top: 12px;
}

.chart{
  height: 300px;
  margin: 10px;
  /* width: 100%; */
}

.map{
  width: 100%;
  height: 550px;
  /* background: pink; */
  margin: 0 15px;
}

.input-box{
  margin: 0 20px;
  margin-top: 10px;
  width: 400px;
}

.button-box{
  height: 40px;
  margin-top: 10px;
}

.tooltip-container{
  display: flex;
  position: absolute;
  right: 10px;
  top: 10px;
  .tooltip{
    margin-right: 20px;
    margin-left: 40px;
  }
}

.program-table-container{
  /* width: 100%; */
  padding: 10px 260px;
  flex: 1;
  overflow-x: hidden;
}

.program-table{
  width: 20.37037rem;
  min-width: 1000px; /*no*/
  /* margin: 10px 260px; */
}

.page-container{
  margin: 20px 340px;
}
</style>
