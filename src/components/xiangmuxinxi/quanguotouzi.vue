<template>
  <div class="hello">
    <!-- <el-dialog title="修改项目信息" :visible.sync="dialogFormVisible">
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
    </el-dialog> -->
    <div class="main-container">
      <div class="container map-container">
        <p class="title">全国项目分布图</p>
        <div class="line"></div>
        <div class="content-container-box">
            <div class="chart-container-box">
              <div class="container chart-container info-container">
                <p class="title">2019年各省市财政收入</p>
                <div class="line"></div>
                <div id="chart1" class="chart"></div>
                <div class="info-footer"></div>
              </div>
              <div class="container chart-container info-container">
                <p class="title">2020年新基建投资规模</p>
                <div class="line"></div>
                <div id="chart2" class="chart"></div>
                <div class="info-footer"></div>
              </div>
            </div>
            <div class="map-container-box container">
                <div class="info-container-box">
                  <div class="info-container">
                    <div class="title-container">{{this.province}}财政收入</div>
                    <div class="info">{{invest[province] | undefinedTo}}亿元</div>
                    <div class="info-footer"></div>
                  </div>
                  <div class="info-container">
                    <div class="title-container">全国总投资</div>
                    <div class="info">33826亿元</div>
                    <div class="info-footer"></div>
                  </div>
                  <div class="info-container">
                    <div class="title-container">{{this.province}}基建投资额</div>
                    <div class="info">{{revenue[province] | undefinedTo}}元</div>
                    <div class="info-footer"></div>
                  </div>
                </div>
                <div id="map" class="map"></div>
                <div class="info-container-box" style="bottom: 0">
                  <div class="info-container" style="display: flex; justify-content: center">
                    <div>
                      <p class="province">{{this.province}}交通厅</p>
                      <a :href="jiaotongLink[province]" class="link" target="_blank" >{{jiaotongLink[province]}}</a>
                      <div class="info-footer"></div>
                    </div>
                  </div>
                  <div class="info-container" style="display: flex; justify-content: center">
                    <div>
                      <p class="province">{{this.province}}建设厅</p>
                      <a :href="jiansheLink[province]" class="link" target="_blank" >{{jiansheLink[province]}}</a>
                      <div class="info-footer"></div>
                    </div>
                  </div>
                  <!-- <div class="info-container" style="display: flex; justify-content: center">
                    <div>
                      <p class="province">{{this.province}}公安厅</p>
                      <a href="" class="link">https://lbs.amap.com/</a>
                      <div class="info-footer"></div>
                    </div>
                  </div> -->
                </div>
            </div>
            <div class="chart-container-box">
              <div class="container chart-container info-container">
                <p class="title">2020年各省市基建投资额</p>
                <div class="line"></div>
                <div id="chart3" class="chart"></div>
                <div class="info-footer"></div>
              </div>
              <div class="container chart-container info-container">
                <p class="title">基建投资资金来源</p>
                <div class="line"></div>
                <div id="chart4" class="chart"></div>
                <div class="info-footer"></div>
              </div>
            </div>
            <!-- <div class="rank-container">
              <el-table
                :data="tableData"
                stripe>
                <el-table-column
                  type="index"
                  label="排名"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="province"
                  label="省份"
                  width="120">
                </el-table-column>
                <el-table-column
                  prop="count"
                  label="项目数量"
                  width="120">
                </el-table-column>
              </el-table>
            </div> -->
        </div>
      </div>
    </div>
    <!-- <div class="filter-container container main-container">
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
    </div> -->
  </div>
</template>

<script>
// import option from '../assets/js/map.js'
// import deepClone from '../../assets/js/deepcopy.js'
// import '../assets/js/china.js'
import loginMin from '../../assets/js/mixin.js'

export default {
  name: 'quanguptouzi',
  mixins: [loginMin],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      value1: '',
      value2: '',
      input: '',
      province: '河南',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      editindex: '',
      form: {},
      count: 8,
      count1: 8,
      jiaotongLink: {
        '全国': 'http://www.mot.gov.cn/buzhangwangye/',
        '湖北': 'http://jtt.hubei.gov.cn/zfxxgk/fdzdgknr/jgjj/ldxx_/',
        '河南': 'http://www.hncd.gov.cn/portal/zfxxgk/zdgk/tld/lwd/A0905042227index_1.htm',
        '广东': 'http://td.gd.gov.cn/zwgk_n/zzjg/channel1/index.html',
        '江苏': 'http://jtyst.jiangsu.gov.cn/col/col77121/index.html',
        '上海': 'http://jtw.sh.gov.cn/jgld/index.html',
        '浙江': 'http://jtyst.zj.gov.cn/col/col1229232096/index.html',
        '山东': 'http://jtt.shandong.gov.cn/col/col100458/index.html?number=SD0102',
        '北京': 'http://jtw.beijing.gov.cn/xxgk/jgzn/ldjs/',
        '四川': 'http://jtt.sc.gov.cn/jtt/c102470/ldjs.shtml',
        '河北': 'http://jtt.hebei.gov.cn/jtyst/zwgk/jcxxgk/jggk/ldzc/',
        '安徽': 'http://jtt.ah.gov.cn/public/column/21701?type=4&catId=28008581&action=list',
        '福建': 'http://jtyst.fujian.gov.cn/jtgk/ldzc/hxt/',
        '湖南': 'http://jtt.hunan.gov.cn/jtt/xxgk/jgzn/tld/index.html',
        '辽宁': 'http://jtt.ln.gov.cn/jg/ldfg/',
        '江西': 'http://jt.jiangxi.gov.cn/col/col34273/index.html',
        '天津': 'http://jtys.tj.gov.cn/ZWGK6002/ZFXXGK3412/FDZDGKNR1877/JGXX/LDXX8181/WKC/',
        '山西': 'http://jtyst.shanxi.gov.cn/ycx/index.jhtml',
        '陕西': 'http://jtyst.shaanxi.gov.cn/home/index/ldcy.html',
        '重庆': 'https://jtj.cq.gov.cn/zwgk_240/ldxx/xra/',
        '云南': 'http://jtyst.yn.gov.cn/Category_128/Index.aspx',
        '内蒙古': 'http://jtyst.nmg.gov.cn/jtzw/zzjg/ldbz/',
        '广西': 'http://jtt.gxzf.gov.cn/zwgk/zfxxgk/jggk/ldzc/',
        '贵州': 'http://jt.guizhou.gov.cn/zfxxgk/fdzdgknr/ldjl/',
        '新疆': 'http://jtyst.xinjiang.gov.cn/xjjtysj/tjld0/leadlist.shtml',
        '吉林': 'http://jtyst.jl.gov.cn/jg_133173/ldjs/',
        '黑龙江': 'http://zizhan.mot.gov.cn/st/heilongjiang/201707/t20170719_3432228.html',
        '甘肃': 'http://jtys.gansu.gov.cn/dzsjlr/index.html',
        '海南': 'http://jt.hainan.gov.cn/xxgk/0100/',
        '宁夏': 'https://jtt.nx.gov.cn/info/iList.jsp?tm_id=146&cat_id=11137',
        '青海': 'http://zizhan.mot.gov.cn/st/qinghai/201707/t20170718_3432312.html',
        '西藏': 'http://jtt.xizang.gov.cn/zzjg/ldjs/',
        '郑州市': 'http://public.zhengzhou.gov.cn/?d=21#leader',
        '开封市': 'http://jtysj.kaifeng.gov.cn/news_list.aspx?id=305&pid=303',
        '洛阳市': 'http://jtysj.ly.gov.cn/home-article-fid-28-pid-31.html',
        '安阳市': 'http://jtj.anyang.gov.cn/Home/Detail?id=2111',
        '鹤壁市': 'http://jtj.hebi.gov.cn/sjtj/742319/742320/2159086/index.html',
        '新乡市': 'http://www.xxjtj.cn/ldbz/',
        '焦作市': 'http://jtysj.jiaozuo.gov.cn/index.aspx',
        '濮阳市': 'http://pyjt.puyang.gov.cn/Category_93/Index.aspx',
        '许昌市': 'http://sjtysj.xuchang.gov.cn/zzjg/001002/20200424/2170c486-b8ce-438c-bace-4a147370db2d.html',
        '漯河市': 'http://jtj.luohe.gov.cn/about/view-1034.html',
        '三门峡市': 'http://jtysj.smx.gov.cn/pageView/zhengfuxinxi.html?lmid=1589&rlmid=1599',
        '南阳市': 'http://www.nanyang.gov.cn/gk/lingdaoxinxi/137725.htm',
        '商丘市': 'http://www.shangqiu.gov.cn/Government/PublicInfoShow.aspx?ID=5994',
        '信阳市': 'http://jtysj.xinyang.gov.cn/ca/20180409000001.htm',
        '周口市': 'http://jtysj.zhoukou.gov.cn/Home/News?Id=27616'
      },
      jiansheLink: {
        '全国': 'http://www.mohurd.gov.cn/bld/index.html',
        '湖北': 'http://zjt.hubei.gov.cn/zfxxgk/fdzdgknr/jgjj/ldxx/#test',
        '河南': 'http://www.hnjs.gov.cn/xxgk/leaderInfo',
        '广东': 'http://zfcxjst.gd.gov.cn/xxgk/ldxx/index.html',
        '江苏': 'http://jscin.jiangsu.gov.cn/col/col47404/index.html',
        '上海': 'http://zjw.sh.gov.cn/jgld/index.html',
        '浙江': 'http://jst.zj.gov.cn/col/col1229155583/index.html',
        '山东': 'http://zjt.shandong.gov.cn/art/2020/4/23/art_102866_9030752.html?xxgkhide=1',
        '北京': 'http://zjw.beijing.gov.cn/bjjs/xxgk/jgzn27/index.shtml',
        '四川': 'http://jst.sc.gov.cn/scjst/c101400/lingdaojieshao.shtml',
        '河北': 'http://zfcxjst.hebei.gov.cn/xxgk/fdzdg/gaikuangxinxi/lingdaofengong/',
        '安徽': 'http://dohurd.ah.gov.cn/public/column/6991?type=4&catId=6715221&action=list',
        '福建': 'http://zjt.fujian.gov.cn/stgk/stld/lrl/',
        '湖南': 'http://zjt.hunan.gov.cn/zjt/xxgk/jgzn/ldjj/index.html',
        '辽宁': 'http://zjt.ln.gov.cn/zwgk/tldjj/',
        '江西': 'http://zjt.jiangxi.gov.cn/col/col40701/index.html',
        '天津': 'http://zfcxjs.tj.gov.cn/xxgk_70/jggk/ldjs/',
        '山西': 'https://zjt.shanxi.gov.cn/Main/list.action?channelId=50',
        '陕西': 'http://js.shaanxi.gov.cn/lingdao/tinglingdaojieshao2002.htm',
        '重庆': 'http://zfcxjw.cq.gov.cn/zwgk_166/fdzdgknr/jgjj/ldxx/',
        '云南': 'http://zfcxjst.yn.gov.cn/tld.aspx?id=7557',
        '内蒙古': 'http://www.nmg.gov.cn/col/col1276/index.html',
        '广西': 'http://zjt.gxzf.gov.cn/ldjs/',
        '贵州': 'http://zfcxjst.guizhou.gov.cn/zwgk/xxgkml/jcxxgk/ldjs/',
        '新疆': 'http://zjt.xinjiang.gov.cn/xjjs/ldxx/list_zzjg.shtml',
        '吉林': 'http://jst.jl.gov.cn/zwgk/ldfg/',
        '黑龙江': 'http://zfcxjst.hlj.gov.cn/aspx/ldjj_z.aspx?id=96',
        '甘肃': 'http://zjt.gansu.gov.cn/view//zzjg/leader/parent//lingdaoxingxi',
        '海南': 'http://zjt.hainan.gov.cn/szjt/0100/lingdao.shtml',
        '宁夏': 'http://jst.nx.gov.cn/tld/mhw.htm',
        '青海': 'http://zjt.qinghai.gov.cn/html/11/10928.html',
        '西藏': 'http://zjt.xizang.gov.cn/jggk/ldzc/201511/t20151105_98303.html',
        '郑州市': 'http://public.zhengzhou.gov.cn/?d=18#leader',
        '开封市': 'http://zfhcxjsj.kaifeng.gov.cn/ldxx',
        '洛阳市': 'http://lyszjj.ly.gov.cn/index.php?c=article&id=8364',
        '平顶山市': 'http://zjj.pds.gov.cn/channels/11680.html',
        '安阳市': 'http://ayzjj.anyang.gov.cn/viewCmsCac.do?cacId=ff8080812f8b5f45012f92dffd581d4b',
        '鹤壁市': 'http://zjj.hebi.gov.cn/szjj/988842/988856/744224/index.html',
        '新乡市': 'http://www.xxszjj.gov.cn/',
        '焦作市': 'http://www.jzjsw.gov.cn/Anli.asp?type=116',
        '濮阳市': 'http://www.pyjs.gov.cn/pc/fwzx.asp?a=newsview&id=21585',
        '许昌市': 'http://xcszjj.xuchang.gov.cn/govxxgk/00574722-6/openSubPage.html?specialurl=/govxxgk/00574722-6/category/011/011002/govlist.html&righttitle=%E4%BF%A1%E6%81%AF%E5%85%AC%E5%BC%80%E7%9B%AE%E5%BD%95',
        '漯河市': 'http://www.lhzj.gov.cn/html/lingdaofengong/',
        '三门峡市': 'http://zjj.smx.gov.cn/pageView/article.html?pageNum=1&lmid=1403&wzid=327680&rlmid=1409',
        '南阳市': 'http://www.nanyang.gov.cn/gk/lingdaoxinxi/235473.htm',
        '商丘市': 'http://www.shangqiu.gov.cn/Government/PublicInfoShow.aspx?ID=7516',
        '信阳市': 'http://zfcxjsj.xinyang.gov.cn/index.php?c=article&id=2491&cateid=A00010001',
        '周口市': 'http://zfcxjs.zhoukou.gov.cn/Home/NewsList?Id=1296',
        '驻马店市': 'http://zjj.zhumadian.gov.cn/a/lingdaozhichuang/2018/0526/47.html'
      },
      invest: {
        '西藏': 222,
        '青海': 282,
        '宁夏': 424,
        '海南': 814,
        '甘肃': 850,
        '黑龙江': 1219,
        '吉林': 1267,
        '新疆': 1577,
        '贵州': 1705,
        '广西': 1812,
        '内蒙古': 2160,
        '云南': 2074,
        '重庆': 2134,
        '陕西': 2288,
        '山西': 2348,
        '天津': 2410,
        '江西': 2487,
        '辽宁': 2652,
        '湖南': 3007,
        '福建': 3053,
        '安徽': 3183,
        '湖北': 3388,
        '河北': 3743,
        '河南': 4041,
        '四川': 4220,
        '北京': 5817,
        '山东': 6527,
        '浙江': 7048,
        '上海': 7165,
        '江苏': 8802,
        '广东': 12651
      },
      revenue: {
        '河南': '8372亿',
        '山西': '8151亿',
        '贵州': '7262亿',
        '广东': '7000亿',
        '四川': '6000亿',
        '江苏': '5410亿',
        '内蒙古': '5059亿',
        '陕西': '5014亿',
        '福建': '5005亿',
        '甘肃': '4500亿',
        '云南': '4400亿',
        '重庆': '3345亿',
        '浙江': '3000亿',
        '湖南': '3000亿',
        '北京': '2523亿',
        '河北': '2402亿',
        '江西': '2390亿',
        '湖北': '2263亿',
        '天津': '2105亿',
        '黑龙江': '2000亿',
        '西藏': '1872亿',
        '广西': '1675亿',
        '上海': '1500亿',
        '安徽': '1254亿',
        '海南': '681亿',
        '宁夏': '510亿'

      },
      options1: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          x: 60,
          y: 40,
          x2: 60,
          y2: 40,
          borderWidth: 1
        },
        dataZoom: {
          show: false,
          start: 0,
          end: 100
        },
        yAxis: [

          {
            axisLabel: {color: 'rgb(255,255,255)'}, // x轴字体颜色
            axisLine: {
              lineStyle: {color: 'rgb(255,255,255)'} // x轴坐标轴颜色
            },
            axisTick: {
              lineStyle: {color: 'rgb(255,255,255)'} // x轴刻度的颜色
            },
            type: 'category',
            inverse: true, // 让Y轴数据逆向
            boundaryGap: true,
            data: (function () {
              var naw = ['广东', '江苏', '上海', '浙江', '山东', '北京', '四川', '河南', '河北']
              // , '甘肃', '云南', '重庆', '浙江',
              // '湖南', '北京', '河北', '江西', '湖北', '天津', '黑龙江', '西藏', '广西', '上海', '安徽', '海南', '宁夏'];

              var res = []
              var len = 9
              while (len--) {
                res.push(naw[10 - len - 2])
              }
              return res
            })()
          },
          {
            axisLabel: {color: 'rgb(255,255,255)'}, // x轴字体颜色
            axisLine: {
              lineStyle: {color: 'rgb(255,255,255)'} // x轴坐标轴颜色
            },
            axisTick: {
              lineStyle: {color: 'rgb(255,255,255)'} // x轴刻度的颜色
            },
            type: 'category',
            inverse: true, // 让Y轴数据逆向
            boundaryGap: true,
            data: (function () {
              var touzie = ['12651亿', '8802亿', '7165亿', '7048亿', '6527亿', '5817亿', '4220亿', '4041亿', '3743亿']
              // , '4500亿', '4400亿',
              // '3345亿', '3000亿', '3000亿', '2523亿', '2402亿', '2390亿', '2263亿', '2105亿', '2000亿', '1872亿', '1675亿', '1500亿', '1254亿', '681亿', '510亿']
              var res = []
              var len = 9
              while (len--) {
                res.push(touzie[10 - len - 2])
              }
              return res
            })()
          }
        ],
        xAxis: [

          {
            axisLabel: {
              color: 'rgb(255,255,255)',
              fontSize: 8
            }, // x轴字体颜色

            axisLine: {
              lineStyle: {color: 'rgb(255,255,255)'} // x轴坐标轴颜色
            },
            splitLine: {show: false},

            // axisTick:{
            //     lineStyle:{color:'rgb(255,255,255)'}    // x轴刻度的颜色
            //     },

            type: 'value',
            scale: false,
            // name: '亿元',
            interval: 2000,
            max: 13000,
            min: 0
            // boundaryGap: [0.1, 0.1]
          }

        ],

        series: [
          { // For shadow
            type: 'bar',
            barWidth: '20%',
            itemStyle: {
              normal: {color: 'rgba(255, 255, 255,0.15)'}
            },
            barGap: '-100%',
            barCategoryGap: '10%',
            barMaxWidth: 15,
            data: [13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000,
              13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000,
              13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000, 13000 ],
            animation: false
          },

          {
            // name: '预购队列',
            type: 'bar',
            barWidth: '20%',
            // xAxisIndex: 0,
            yAxisIndex: 1,
            barMaxWidth: 15,
            itemStyle: {
              color: '#FFA54F',
              // '#FFFFE0',
              //  '#00B2EE',  浅蓝

              barBorderRadius: [0, 10, 10, 0] // （顺时针左上，右上，右下，左下）
            },

            data: (function () {
              var number = [12651, 8802, 7165, 7048, 6527, 5817, 4220, 4041, 3743]
              // , 4500, 4400,
              // 3345, 3000, 3000, 2523, 2402, 2390, 2263, 2105, 2000, 1872, 1675, 1500, 1254, 681, 510]
              var res = []
              var len = 9
              while (len--) {
                res.push(number[10 - len - 2])
              }
              return res
            })()
          }
        ]
      },
      myChart: {},
      options3: {
        backgroundColor: '#0b1531', // 背景色
        // title: {
        //   left: 'left',
        //   text: '2020年新基建投资规模',
        //   padding: [10, 20, 15, 30],
        //   textStyle: {
        //     // color:'#5E95E9',
        //     color: 'rgb(255,255,255)',
        //     fontSize: 18
        //   }
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c}亿 ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          textStyle: { // 图例文字的样式
            color: '#fff'
          },
          left: 'center',
          bottom: 10,
          data: ['特高压', '人工智能', '大数据中心', '轨道交通', '5G基站']
        },
        series: [
          {
            name: '基建类型',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '40%'],
            avoidLabelOverlap: false,
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
              {value: 600, name: '特高压'},
              {value: 300, name: '人工智能'},
              {value: 1000, name: '大数据中心'},
              {value: 5000, name: '轨道交通'},
              {value: 3000, name: '5G基站'}
            ]
          }
        ]
      },
      options4: {
        backgroundColor: '#0b1531', // 背景色
        // title: {
        //   left: 'left',
        //   text: '基建投资资金来源',
        //   padding: [10, 20, 15, 30],
        //   textStyle: {
        //     // color:'#5E95E9',
        //     color: 'rgb(255,255,255)',
        //     fontSize: 18
        //   }
        // },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c}%'
        },
        legend: {
          orient: 'horizontal',
          textStyle: { // 图例文字的样式
            color: '#fff'
          },
          left: 'center',
          bottom: 10,
          data: ['利用外资和其他资金来源', '国内贷款', '国家预算内资金', '自筹资金']
        },
        series: [
          {
            name: '资金来源',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '40%'],
            avoidLabelOverlap: false,
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
              {value: 8, name: '利用外资和其他资金来源'},
              {value: 16, name: '国内贷款'},
              {value: 16, name: '国家预算内资金'},
              {value: 60, name: '自筹资金'}
            ]
          }
        ]
      },
      provincedata: ['河南', '山西', '贵州', '广东', '四川', '江苏', '内蒙古', '陕西', '福建', '甘肃', '云南', '重庆', '浙江',
        '湖南', '北京', '河北', '江西', '湖北', '天津', '黑龙江', '西藏', '广西', '上海', '安徽', '海南', '宁夏'],
      touzie: ['8372亿', '8151亿', '7262亿', '7000亿', '6000亿', '5410亿', '5059亿', '5014亿', '5005亿', '4500亿', '4400亿',
        '3345亿', '3000亿', '3000亿', '2523亿', '2402亿', '2390亿', '2263亿', '2105亿', '2000亿', '1872亿', '1675亿', '1500亿', '1254亿', '681亿', '510亿'],
      number1: [8372, 8151, 7262, 7000, 6000, 5410, 5059, 5014, 5005, 4500, 4400,
        3345, 3000, 3000, 2523, 2402, 2390, 2263, 2105, 2000, 1872, 1675, 1500, 1254, 681, 510],
      provincedata1: ['广东', '江苏', '上海', '浙江', '山东', '北京', '四川', '河南', '河北', '湖北', '安徽', '福建', '湖南',
        '辽宁', '江西', '天津', '山西', '陕西', '重庆', '云南', '内蒙古', '广西', '贵州', '新疆', '吉林', '黑龙江', '甘肃', '海南', '宁夏', '青海', '西藏'],
      touzie1: ['12651亿', '8802亿', '7165亿', '7048亿', '6527亿', '5817亿', '4220亿', '4041亿', '3743亿', '3388亿', '3183亿',
        '3053亿', '3007亿', '2652亿', '2487亿', '2410亿', '2348亿', '2288亿', '2134亿', '2074亿', '2060亿', '1812亿', '1705亿', '1577亿', '1267亿', '1219亿', '850亿', '814亿', '424亿', '282亿', '222亿'],
      number: [12651, 8802, 7165, 7048, 6527, 5817, 4220, 4041, 3743, 3388, 3183, 3053, 3007, 2652, 2487, 2410, 2348, 2288, 2134, 2074, 2060, 1812, 1705, 1577, 1267, 1219, 850, 814, 424, 282, 222],
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          x: 60,
          y: 40,
          x2: 60,
          y2: 40,
          borderWidth: 1
        },
        dataZoom: {
          show: false,
          start: 0,
          end: 100
        },
        yAxis: [
          {
            type: 'category',
            inverse: true, // 让Y轴数据逆向
            boundaryGap: true,
            axisLabel: {
              color: '#fff'
            },
            data: (function () {
              var naw = ['河南', '山西', '贵州', '广东', '四川', '江苏', '内蒙古', '陕西', '福建']
              // , '甘肃', '云南', '重庆', '浙江',
              // '湖南', '北京', '河北', '江西', '湖北', '天津', '黑龙江', '西藏', '广西', '上海', '安徽', '海南', '宁夏'];
              var res = []
              var len = 9
              while (len--) {
                res.push(naw[10 - len - 2])
              }
              return res
            })()
          },
          {
            type: 'category',
            inverse: true, // 让Y轴数据逆向
            boundaryGap: true,
            axisLabel: {
              color: '#fff'
            },
            data: (function () {
              var touzie = ['8372亿', '8151亿', '7262亿', '7000亿', '6000亿', '5410亿', '5059亿', '5014亿', '5005亿']
              // , '4500亿', '4400亿',
              // '3345亿', '3000亿', '3000亿', '2523亿', '2402亿', '2390亿', '2263亿', '2105亿', '2000亿', '1872亿', '1675亿', '1500亿', '1254亿', '681亿', '510亿']
              var res = []
              var len = 9
              while (len--) {
                res.push(touzie[10 - len - 2])
              }
              return res

            // var res = [];
            // var len1 = 1;
            // while (len1++) {
            //     res.push(len1);
            // }
            // return res;
            })()
          }
        ],
        xAxis: [
          {
            type: 'value',
            scale: false,
            // name: '亿元',
            interval: 1000,
            max: 9000,
            min: 0,
            boundaryGap: [0.1, 0.1],
            axisLabel: {
              color: '#fff',
              fontSize: 8
            }
          }

        ],

        series: [
          { // For shadow
            type: 'bar',
            barWidth: '20%',
            itemStyle: {
              normal: {color: 'rgba(0,0,0,0.05)'}
            },
            barGap: '-100%',
            barCategoryGap: '10%',
            barMaxWidth: 20,
            data: [9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000,
              9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000,
              9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000, 9000 ],
            animation: false
          },
          {
            // name: '预购队列',
            type: 'bar',
            barWidth: '20%',
            // xAxisIndex: 0,
            yAxisIndex: 1,
            barMaxWidth: 20,
            itemStyle: {
              color: '#5E95D0',

              barBorderRadius: [0, 10, 10, 0] // （顺时针左上，右上，右下，左下）
            },

            data: (function () {
              var number = [8372, 8151, 7262, 7000, 6000, 5410, 5059, 5014, 5005]
              // , 4500, 4400,
              // 3345, 3000, 3000, 2523, 2402, 2390, 2263, 2105, 2000, 1872, 1675, 1500, 1254, 681, 510]
              var res = []
              var len = 9
              while (len--) {
                res.push(number[10 - len - 2])
              }
              return res
            })()
          }
        ]
      },
      options2: {
        backgroundColor: 'rgb(11, 21, 49)',
        title: {
          text: '全国财政信息统计图',
          left: 'center',
          textStyle: {
            fontWeight: '700',
            color: '#fff'
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
              areaColor: '#2B91B7',
              borderColor: '#195BB9',
              borderWidth: 1
            },
            emphasis: {
              areaColor: '#2F4554'
            }
          }
        }
        // series: option.series
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
    }
    // editFrom () {
    //   // this.tableData1[this.editindex] = this.form
    //   // console.log(this.tableData1)
    //   this.tableData1[this.editindex].name = this.form.name
    //   this.tableData1[this.editindex].province = this.form.province
    //   this.tableData1[this.editindex].city = this.form.city
    //   this.tableData1[this.editindex].date = this.form.date
    //   this.tableData1[this.editindex].address = this.form.address
    //   this.form = {}
    //   this.editindex = ''
    //   this.dialogFormVisible = false
    // },
    // handleEdit (index, row) {
    //   this.editindex = index
    //   this.form = deepClone(this.tableData1[index])
    //   this.dialogFormVisible = true
    // }
  },
  mounted () {
    // console.log(window.echarts)
    this.initChart('chart1', this.options1)
    this.initChart('map', this.options2)
    this.initChart('chart2', this.options3)
    this.initChart('chart3', this.option)
    var self = this
    setInterval(function () {
      self.count++
      // var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
      var flag1 = self.count % 26
      var data1 = self.option.series[1].data
      // var data1 = option.series[1].data;
      data1.shift()
      data1.push(self.number1[flag1])
      // data1.shift();
      // data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

      self.option.yAxis[0].data.shift()

      self.option.yAxis[0].data.push(self.provincedata[flag1])
      self.option.yAxis[1].data.shift()
      self.option.yAxis[1].data.push(self.touzie[flag1])

      self.myChart['chart3'].setOption(self.option)

      window.onresize = self.myChart['chart3'].resize
    }, 2100)
    setInterval(function () {
      self.count1++
      // var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
      var flag1 = self.count1 % 26
      var data1 = self.options1.series[1].data
      // var data1 = option.series[1].data;
      data1.shift()
      data1.push(self.number[flag1])
      // data1.shift();
      // data1.push((Math.random() * 10 + 5).toFixed(1) - 0);

      self.options1.yAxis[0].data.shift()

      self.options1.yAxis[0].data.push(self.provincedata1[flag1])
      self.options1.yAxis[1].data.shift()
      self.options1.yAxis[1].data.push(self.touzie1[flag1])

      self.myChart['chart1'].setOption(self.options1)

      window.onresize = self.myChart['chart1'].resize
    }, 2100)

    this.initChart('chart4', this.options4)
    this.myChart['map'].on('click', function (params) {
      this.province = params.name
      // console.log(params)
      // this.options1.series[0].data = [ {value: 335, name: '视频广告1'},
      //   {value: 310, name: '视频广告2'},
      //   {value: 234, name: '视频广告3'},
      //   {value: 135, name: '视频广告4'},
      //   {value: 1548, name: '视频广告5'}]
      // this.options1.legend.data = ['视频广告1', '视频广告2', '视频广告3', '视频广告4', '视频广告5']
      // this.options3.series[0].data = [101, 522, 20, 34, 39, 330, 120]
      // this.updateChart('chart1', this.options1)
      // this.updateChart('chart2', this.options3)
    }, this)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../../assets/css/index.scss';

@import '../../assets/css/variables.scss';
@import '../../assets/css/radio.scss';
.main-container{
  display: flex;
}

.map-container{
  flex: 2;
  /* height: 800px; */
}

.chart-container-box{
  flex: 1;
}

.chart-container{
  height: 390px;
  /* border-top: 1px solid transparent; */
}

.filter-container{
  height: 60px;
  position: relative;
  color: #fff;
}

.program-container-box{
  min-width: 1400px; /*no*/
  max-width: 1900px; /*no*/
  /* height: 650px; */
  border: 1px solid transparent;/*no*/
  display: flex;
}

.title{
  margin: 15px 21px;
  color: $primary-text-color;
  font-weight: 600;
  font-size: 20px
}

.content-container-box{
  display: flex;
}

.info-container-box{
  display: flex;
  /* flex: 3; */
  position: absolute;
  width: 100%;
  z-index: 1000;
  padding: 10px 20px;
}

.map-container-box{
  flex: 2;
  position: relative;
}

.rank-container{
  flex: 2;
  /* background-color: pink; */
  margin: 50px 15px;
  height: 600px;
}

.info-container{
  position: relative;
  color: #fff;
  flex:1;
  /* height: 115px; */
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
  margin-bottom: 24px;
}

.chart{
  height: 300px;
  margin: 10px;
  /* width: 100%; */
}

.map{
  width: 100%;
  height: 100%;
  /* background: pink; */
  /* margin: 0 15px; */
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

p.province {
    margin: 7px 0px;
    text-align: center;
}

.address-container{
  display: flex;
  justify-content: space-between;
  position: absolute;
  padding: 0 15px;
  width: 100%;
  bottom: 0;
}

.link{
  color: #fff;
}
</style>
