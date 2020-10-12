<template>
    <div class="main-container">
        <div class="search-container container">
            <el-input class="input-box" v-model="searchCompanyName" placeholder="输入查询公司全名"></el-input>
            <el-button class="button-box" plain @click='searchCompanyInfo'>搜索</el-button>
            <!-- <input v-model='searchCompanyName' placeholder="输入查询公司全名"> -->
        </div>
        <div class="company-container">
            <div class="text-container">
                <div class="companyInfo-container container">
                    <div class="companyName">{{companyName | undefinedTo}}</div>
                    <div class="line"></div>
                    <div class="info-container">
                        <div class="infoName">电话</div>
                        <div class="infoValue">{{companyInfo.ContactInfo.PhoneNumber | undefinedTo}}</div>
                        <div class="infoName">官网</div>
                        <div class="infoValue">
                            <a :href="url" style="color: #409EFF" target="_blank" >{{url | undefinedTo}}</a>
                        </div>
                    </div>
                    <div class="info-container">
                        <div class="infoName">邮箱</div>
                        <div class="infoValue">
                            <a :href="companyInfo.ContactInfo.Email" target="_blank" style="color: #409EFF">{{companyInfo.ContactInfo.Email | undefinedTo}}</a>
                        </div>
                        <div class="infoName">地址</div>
                        <div class="infoValue">{{companyInfo.Address | undefinedTo}}</div>
                    </div>
                    <div class="info-container">
                        <div class="infoName">登记机关</div>
                        <div class="infoValue">{{companyInfo.BelongOrg | undefinedTo}}
                        </div>
                        <div class="infoName">注册资本</div>
                        <div class="infoValue">{{companyInfo.RegistCapi | undefinedTo}}</div>
                    </div>
                    <div class="info-container">
                        <div class="infoName">企业规模</div>
                        <div class="infoValue">{{companyInfo.PersonScope | undefinedTo}}
                        </div>
                        <div class="infoName">实缴资本</div>
                        <div class="infoValue">{{companyInfo.RecCap | undefinedTo}}</div>
                    </div>
                    <div class="info-container">
                        <div style="font-size: 20px;"><span>简介:</span>{{companyInfo.Scope | undefinedTo}}</div>
                    </div>
                </div>
                <div class="employee-container container" style="padding-bottom: 15px;">
                    <div class="title">重要人员</div>
                    <div class="line"></div>
                    <div class="info-container">
                        <div class="infoName">董事长</div>
                        <div class="infoValue" style="color: #409EFF">{{chairman | undefinedTo}}</div>
                        <div class="infoName">董事</div>
                        <div class="infoValue"  style="color: #409EFF">{{secretary | undefinedTo}}</div>
                    </div>
                    <div class="info-container">
                        <div class="infoName">独立董事</div>
                        <div class="infoValue" style="color: #409EFF">{{independentDirector | undefinedTo}}</div>
                        <div class="infoName">监事</div>
                        <div class="infoValue" style="color: #409EFF">{{supervisor | undefinedTo}}</div>
                    </div>
                    <div class="info-container">
                        <div class="infoName">法人代表</div>
                        <div class="infoValue" style="color: #409EFF">{{companyInfo.OperName | undefinedTo}}</div>
                        <div class="infoName">证券事务代表</div>
                        <div class="infoValue">--</div>
                    </div>
                </div>
                <!-- <div class="contactway-container container" style="padding-bottom: 15px;">
                    <div class="title">联系信息</div>
                    <div class="line"></div>
                    <div class="info-container">
                        <div class="infoName">联系电话</div>
                        <div class="infoValue">010-86498114,010-88083288</div>
                        <div class="infoName">区域</div>
                        <div class="infoValue">北京</div>
                    </div>
                    <div class="info-container">
                        <div class="infoName">企业网址</div>
                        <div class="infoValue">
                            <a href="http://www.cscec.com" style="color: #409EFF">http://www.cscec.com</a>
                        </div>
                        <div class="infoName">电子邮箱</div>
                        <div class="infoValue">
                            <a href="ir@cscec.com" style="color: #409EFF">ir@cscec.com</a>
                        </div>
                    </div>
                    <div class="info-container">
                        <div class="infoName">办公地址</div>
                        <div class="infoValue">北京市朝阳区安定路5号院3号楼中建财富国际中心</div>
                        <div class="infoName">注册地址</div>
                        <div class="infoValue">北京市海淀区三里河路15号</div>
                    </div>
                </div> -->
            </div>
            <div class="stock-chart container">
                <div class="title">股权穿透图</div>
                <div class="line"></div>
                <div id="stockChart" style="width: 100%; height: 100%"></div>
            </div>
        </div>
        <div class="project-container container" style="padding-bottom: 15px;">
            <div class="title">历史承建项目</div>
            <div class="line"></div>
            <div class="table-title">
                <div>项目名称</div>
                <div>项目编码</div>
                <div>项目类别</div>
                <div>建设单位</div>
                <div>项目属地</div>
            </div>
            <div class="tablecell">
                <div>新江湾城B2-01地块项目</div>
                <div>3101101601180102</div>
                <div>房屋建筑工程</div>
                <div>上海新江湾城投资发展有限公司</div>
                <div>上海市-市辖区-杨浦区</div>
            </div>
            <div class="tablecell">
                <div>海康威视成都科技园项目（一标段）</div>
                <div>5101101903120001</div>
                <div>房屋建筑工程</div>
                <div>成都海康威视数字技术有限公司</div>
                <div>四川省-成都市</div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
  name: 'companyinfo',
  data () {
    return {
      searchCompanyName: '',
      companyInfo: {
        Name: '', // 公司名称
        OperName: '', // 法人代表
        RegistCapi: '', // 注册资本
        Address: '', // 公司地址
        Scope: '', // 营业范围
        BelongOrg: '', // 注册地址
        PersonScope: '', // 人员规模
        RecCap: '', // 实缴资本

        Partners: [], // 股权结构
        Employees: [], // 人员信息
        ContactInfo: { // 联系信息
          WebSite: [{Url: ''}],
          PhoneNumber: '',
          Email: ''
        },
        Area: { // 地区信息
          Province: '',
          City: '',
          County: ''
        }
      },
      companyName: '',
      project: [],
      data: {}
    }
  },
  methods: {
    async searchCompanyInfo () {
      await this.$http.get('qichacha/keyword?name=' + this.searchCompanyName).then(Response => {
        console.log(Response)
        if (Response.status === 200) {
          this.companyInfo = Response.data.data.information
          this.companyName = Response.data.data.name
          this.project = Response.data.data.project
          this.initCharts()
        }
      })
    },
    category (type) {
      /* eslint-disable-next-line */
      if(type == '公司'){
        return 0
      }
      return 1
    },
    initCharts () {
      this.data.nodes = [{
        name: this.companyInfo.Name,
        category: 0, // 0代表公司，1代表自然人股东
        value: 100,
        capi: this.companyInfo.RegistCapi
      }]
      console.log(this.companyInfo.Partners)
      this.data.links = []
      for (var i = 0; i < this.companyInfo.Partners.length; i++) {
        this.data.nodes.push({
          name: this.companyInfo.Partners[i].StockName,
          category: this.category(this.companyInfo.Partners[i].StockType), // 0代表公司，1代表自然人股东
          value: this.companyInfo.Partners[i].StockPercent,
          capi: this.companyInfo.Partners[i].ShouldCapi
        })
        this.data.links.push({
          source: this.companyInfo.Partners[i].StockName,
          target: this.companyInfo.Name,
          name: this.companyInfo.Partners[i].StockPercent,
          capi: this.companyInfo.Partners[i].StockPercent
        })
      }
      const color1 = '#006acc'
      const color2 = '#ff7d18'
      // const color3 = '#000000D6'
      this.data.nodes.forEach(node => {
        if (node.category === 0) {
          // 控制大圆的大小
          node.symbolSize = node.value * 1.05 + 71

          node.itemStyle = {
            color: color1
          }
        }
      })
      this.data.links.forEach(link => {
        link.label = {
          align: 'center',
          fontSize: 12
        }

        link.lineStyle = {
          color: '#fff'
        }
      })
      let categories = [{
        name: '公司',
        itemStyle: {
          color: color1
        }
      },
      {
        name: '自然人股东',
        itemStyle: {
          color: color2
        }
      }]
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            var color = params.color// 图例颜色
            var htmlStr = '<div>'
            htmlStr += params.name + '<br/>'// x轴的名称

            // 为了保证和原来的效果一样，这里自己实现了一个点的效果
            htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' + color + ';"></span>'

            // 显示持股数（capi字段）
            htmlStr += params.data.capi

            htmlStr += '</div>'

            return htmlStr
          },

          itemPointer: {
            type: 'shadow'
          }
        },
        // title: {
        //   text: '知识图谱',
        // },
        legend: [{
          // selectedMode: 'single',
          textStyle: { // 图例文字的样式
            color: '#fff'
          },
          data: categories.map(x => x.name)
          // icon: 'circle'
        }],
        series: [{
          type: 'graph',
          layout: 'force',

          // 控制小圆的大小
          symbolSize: 7 + 50,
          // data.nodes.forEach(nodeValue),
          draggable: true,
          roam: true,
          focusNodeAdjacency: true,
          categories: categories,
          edgeSymbol: ['', 'arrow'],
          // edgeSymbolSize: [80, 10],
          edgeLabel: {
            normal: {
              show: true,
              textStyle: {
                fontSize: 18
              },
              formatter (x) {
                return x.data.name
                // return x.data.capi;
              }
            }
          },
          label: {
            show: true
          },
          force: {
            repulsion: 2000, // 控制箭头线的长度
            edgeLength: 120
          },
          data: this.data.nodes,
          links: this.data.links

        }]

      }
      var dom = document.getElementById('stockChart')
      var myChart = this.$echarts.init(dom)
      if (option && typeof option === 'object') {
        myChart.setOption(option, true)
        window.onresize = myChart.resize
      }
    }
  },
  computed: {
    chairman: function () {
      let res = ''
      if (this.companyInfo.Employees) {
        for (let i in this.companyInfo.Employees) {
          /* eslint-disable-next-line */
          if (this.companyInfo.Employees[i].Job == '董事长') {
            res += this.companyInfo.Employees[i].Name
            res += ' '
          }
        }
      }
      return res
    },
    secretary: function () {
      let res = ''
      if (this.companyInfo.Employees) {
        for (let i in this.companyInfo.Employees) {
          /* eslint-disable-next-line */
          if (this.companyInfo.Employees[i].Job == '董事') {
            res += this.companyInfo.Employees[i].Name
            res += ' '
          }
        }
      }
      return res
    },
    independentDirector: function () {
      let res = ''
      if (this.companyInfo.Employees) {
        for (let i in this.companyInfo.Employees) {
          /* eslint-disable-next-line */
          if (this.companyInfo.Employees[i].Job == '独立董事') {
            res += this.companyInfo.Employees[i].Name
            res += ' '
          }
        }
      }
      return res
    },
    supervisor: function () {
      let res = ''
      if (this.companyInfo.Employees) {
        for (let i in this.companyInfo.Employees) {
          /* eslint-disable-next-line */
          if (this.companyInfo.Employees[i].Job == '监事') {
            res += this.companyInfo.Employees[i].Name
            res += ' '
          }
        }
      }
      return res
    },
    url: function () {
      if (this.companyInfo.ContactInfo.WebSite) {
        return this.companyInfo.ContactInfo.WebSite[0].Url
      }
      return ''
    }
  }

}
</script>
<style lang="scss" scoped>
@import '../../assets/css/index.scss';
.main-container{
    color: white;
}

.search-container{
    display: flex;
    margin: 10px;
    padding: 5px 10px;
    .input-box{
        width: 500px;
        margin-right: 20px;
    }
}

.companyName{
    font-size: 24px;
    font-weight: 700;
    margin: 10px 20px;
}

.title{
    font-size: 24px;
    font-weight: 700;
    margin: 10px 20px;
}

.company-container{
    display: flex;
}

.text-container{
    flex: 2;
}

.stock-chart {
    flex: 1;
}

.companyInfo-container{
    padding-bottom: 15px;
}

.info-container{
    display: flex;
    margin: 3px 20px;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    background-color: rgba(49, 76, 147, 0.6);
    .infoName{
        font-size: 20px;
        width: 13%;
    }
    .infoValue{
        font-size: 20px;
        width: 37%;
    }
}

.table-title{
    margin: 3px 20px;
    display: flex;
    div{
        font-size: 20px;
        width: 20%;
    }
}

.tablecell{
    margin: 3px 20px;
    display: flex;
    background-color: rgba(49, 76, 147, 0.6);
    div{
        font-size: 20px;
        width: 20%;
    }
}
</style>
