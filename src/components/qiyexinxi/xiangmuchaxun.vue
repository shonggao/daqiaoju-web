<template>
    <div class="main-container">
      <div class="search-container container">
        <el-input class="input-box" v-model="searchProject" placeholder="输入查询项目名称"></el-input>
        <el-button class="button-box" plain @click='pn = 1;searchPorject()'>搜索</el-button>
        <el-select v-model="site" placeholder="请选择" style="margin-left: 200px; margin-top: 10px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <!-- <input v-model='searchCompanyName' placeholder="输入查询公司全名"> -->
      </div>
      <div class="program-table-container container"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <div class="program-table">
          <div v-if="!hasSearchResult" class='tipInfo-container'>
            暂无搜索结果
          </div>
          <div class="searchRes-container" v-for="(item,index) in searchRes" :key='index'>
            <div class="link-container"><a :href="item.link" class="link" target="_blank" >{{item.title}}</a></div>
            <div class="detail">{{item.detail}}</div>
          </div>
          <el-pagination
            v-if = 'hasSearchResult'
            background
            class="page-container"
            layout="prev, pager, next"
            :total="totalPage"
            :current-page.sync='pn'
            @current-change='searchPorject'
          >
          </el-pagination>
        </div>
        <!-- <div class="otherInfo-container container"></div> -->
      </div>
    </div>
</template>
<script>
export default{
  name: 'xiangmuchaxun',
  data () {
    return {
      searchProject: '',
      options: [{
        value: 'bidchance.com',
        label: '招标网'
      }, {
        value: 'zbytb.com',
        label: '采购与招标网'
      }, {
        value: 'hnggzy.com',
        label: '河南省'
      }, {
        value: 'hbggzy.cn',
        label: '湖北省'
      }, {
        value: 'prec.sxzwfw.gov.cn',
        label: '山西省'
      }, {
        value: 'sxggzyjy.cn',
        label: '陕西省'
      }, {
        value: 'jsggzy.jszwfw.gov.cn',
        label: '江苏省'
      }, {
        value: 'ggzy.hebei.gov.cn',
        label: '河北省'
      }, {
        value: 'ggzyjyzx.shandong.gov.cn',
        label: '山东省'
      }, {
        value: 'ggzy.hunan.gov.cn',
        label: '湖南省'
      }, {
        value: 'gxggzy.gxzf.gov.cn',
        label: '广西'
      }, {
        value: 'bs.gdggzy.org.cn',
        label: '广东省'
      }, {
        value: 'ggzy.guizhou.gov.cn',
        label: '贵州省'
      }, {
        value: 'zw.hainan.gov.cn',
        label: '海南省'
      }, {
        value: 'hljggzyjyw.gov.cn',
        label: '黑龙江'
      }, {
        value: 'jxsggzy.cn',
        label: '江西省'
      }, {
        value: 'ggzyzx.jl.gov.cn',
        label: '吉林省'
      }, {
        value: 'lnggzy.gov.cn',
        label: '辽宁省'
      }, {
        value: 'ggzyjy.nmg.gov.cn',
        label: '内蒙古'
      }, {
        value: 'nxggzyjy.org',
        label: '宁夏'
      }, {
        value: 'qhggzyjy.gov.cn',
        label: '青海省'
      }, {
        value: 'ggzyjy.sc.gov.cn',
        label: '四川省'
      }, {
        value: 'zwfw.xinjiang.gov.cn',
        label: '新疆'
      }, {
        value: 'ggzyjy.gansu.gov.cn',
        label: '甘肃省'
      }, {
        value: 'ggzyfw.fujian.gov.cn',
        label: '福建省'
      }, {
        value: 'xzggzy.gov.cn',
        label: '西藏'
      }, {
        value: 'ynggzy.com',
        label: '云南省'
      }, {
        value: 'new.zmctc.com',
        label: '浙江省'
      }],
      site: 'bidchance.com',
      pn: 1,
      totalPage: 0,
      searchRes: [],
      loading: false
    }
  },
  methods: {
    async searchPorject () {
      this.loading = true
      await this.$http.get('baidu/searchProject?keywords=' + this.searchProject + '&site=' + this.site + '&pn=' + (this.pn - 1) * 10).then(
        Response => {
          if (Response.status === 200) {
            this.searchRes = Response.data.data.reslist
            /* eslint-disable-next-line */
            if(this.pn == 1){
              this.totalPage = parseInt(Response.data.data.page) * 10
            }
            console.log(Response.data.data)
          }
        }
      )
      this.loading = false
    }
  },
  computed: {
    hasSearchResult: function () {
      /* eslint-disable-next-line */
      if (this.searchRes.length == 0 || !(this.searchRes)) {
        return false
      }
      return true
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/index.scss';
@import '../../assets/css/page.scss';
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
.tipInfo-container{
  font-size: 30px;
  text-align: center;
  font-weight: 700;
}

.searchRes-container{
  color: white;
  margin: 10px 0;
  padding: 5px;
  padding-left: 10px;
  background: rgba(49, 76, 147, 0.6);
}

.link-container{
  font-size: 20px;
  a:hover{
    color: white;
  }
  a:visited{
    color: white;
  }
}
.link{
  font-size: 20px;
  color: white;
}
.detail{
  font-size: 20px;
  color: #C0C4CC;
}
/* .result-container{
  display: flex;
  .searchResult-container{
    flex: 2;
    height: 800px;
  }
  .otherInfo-container{
    flex: 1;
    height: 800px;
  }
} */
</style>
