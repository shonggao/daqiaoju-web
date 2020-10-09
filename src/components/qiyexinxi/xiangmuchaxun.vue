<template>
    <div class="main-container">
      <div class="search-container container">
        <el-input class="input-box" v-model="searchCompanyName" placeholder="输入查询项目名称"></el-input>
        <el-button class="button-box" plain>搜索</el-button>
        <!-- <input v-model='searchCompanyName' placeholder="输入查询公司全名"> -->
      </div>
      <div class="result-container">
        <div class="searchResult-container container"></div>
        <div class="otherInfo-container container"></div>
      </div>
    </div>
</template>
<script>
export default{
  name: 'xiangmuchaxun',
  data () {
    return {
      searchInfo: ''
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

.result-container{
  display: flex;
  .searchResult-container{
    flex: 2;
    height: 800px;
  }
  .otherInfo-container{
    flex: 1;
    height: 800px;
  }
}
</style>
