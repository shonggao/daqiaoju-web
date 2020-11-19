<template>
    <div class="main-container">
        <div class="search-container container"  style="padding-bottom: 10px;">
            <el-input class="input-box" v-model="searchKeyword" placeholder="输入查询项目名称"></el-input>
            <el-button class="button-box" plain @click='pn = 1;searchPorjectInfo()'>搜索</el-button>
            <!-- <input v-model='searchCompanyName' placeholder="输入查询公司全名"> -->
        </div>
        <div class="program-table-container container"
        style="padding: 10px 150px"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        >
        <div class="program-table-container">
            <el-table
            :data="tableData"
            border
            class="program-table">
            <el-table-column
                prop="title"
                label="名称"
                min-width="60%">
              <template slot-scope="scope">
              <a :href="scope.row.URL" target="_blank">{{scope.row.title}}</a>
              </template>
            </el-table-column>
            <el-table-column
              prop="area"
                label="地址"
                min-width="20%">
            </el-table-column>
            <el-table-column
                prop="category"
                label="类型"
                min-width="30%">
            </el-table-column>
            <el-table-column
                prop="date"
                label="日期"
                min-width="20%">
            </el-table-column>
            </el-table>
          <el-pagination
            v-if = 'hasSearchResult'
            background
            class="page-container"
            layout="prev, pager, next"
            :total="totalPage"
            :current-page.sync='pn'
          >
          </el-pagination>
        </div>
        <!-- <div class="otherInfo-container container"></div> -->
      </div>
    </div>
</template>
<script>
export default{
  name: 'caigouwang',
  data () {
    return {
      searchKeyword: this.$route.query.keyword,
      searchResult: [],
      pn: 1,
      totalPage: 0,
      loading: false
    }
  },
  methods: {
    searchPorjectInfo () {
      this.loading = true
      console.log(this.searchKeyword)
      this.$http.post('teamuser/projectAllInfo?projectName=' + this.searchKeyword).then(Response => {
        this.searchResult = Response.data.data
        /* eslint-disable-next-line */
        this.totalPage = this.searchResult.length
        this.loading = false
      })
    }
  },
  created () {
    console.log(this.searchKeyword)
    if (this.searchKeyword) {
      this.searchPorjectInfo()
    }
  },
  computed: {
    hasSearchResult: function () {
      /* eslint-disable-next-line */
      if (this.searchResult.length == 0 || !(this.searchResult)) {
        return false
      }
      return true
    },
    tableData: function () {
      if (this.pn * 10 > this.totalPage) {
        return this.searchResult.slice((this.pn - 1) * 10, this.totalPage)
      }
      return this.searchResult.slice((this.pn - 1) * 10, this.pn * 10)
    }
  },
  watch: {
    '$route' (to, from) {
      // 监听路由是否变化

      /* eslint-disable-next-line */
      if (to.query.keyword != from.query.keyword) {
        if (to.query.keyword) {
          this.searchKeyword = to.query.keyword
          this.searchPorjectInfo()
        }

        // this.getLayerListByMapid()
        // const {getMapScript, initMap} = this
        // getMapScript()
        //   .then(initMap)
      }
      console.log(to)
      console.log(from)
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

a{
  color: white;
}
a:hover{
  color: white;
}
a:visited{
  color: white;
}
</style>
