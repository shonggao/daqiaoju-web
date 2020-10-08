<template>
    <div class="main-container">
        <div class="search-container container">
            <el-input class="input-box" v-model="searchCompanyName" placeholder="输入查询公司全名"></el-input>
            <el-button class="button-box" plain>搜索</el-button>
            <!-- <input v-model='searchCompanyName' placeholder="输入查询公司全名"> -->
        </div>
        <div class="company-container">
            <div class="text-container">
                <div class="companyInfo-container container">
                    <div class="companyName">中国建筑股份有限公司</div>
                    <div class="line"></div>
                    <div class="info-container">
                        <div class="infoName">电话</div>
                        <div class="infoValue">010-86498181</div>
                        <div class="infoName">官网</div>
                        <div class="infoValue">
                            <a href="http://www.cscec.com" style="color: #409EFF">http://www.cscec.com</a>
                        </div>
                    </div>
                    <div class="info-container">
                        <div class="infoName">邮箱</div>
                        <div class="infoValue">
                            <a href="http://zhibanyuan@cscec.com" style="color: #409EFF">zhibanyuan@cscec.com</a>
                        </div>
                        <div class="infoName">地址</div>
                        <div class="infoValue">北京市海淀区三里河路15号</div>
                    </div>
                    <div class="info-container">
                        <div style="font-size: 20px;"><span>简介:</span>中国建筑是一家建筑工程服务提供商，业务布局涵盖投资开发、工程建设、勘察设计等板块，其中投资开发板块包括地产开发、建造融资、持有运营等，工程建设板块包括房屋建筑、基础设施建设等，同时也涉及绿色建造、节能环保等新业务领域。</div>
                    </div>
                </div>
                <div class="employee-container container" style="padding-bottom: 15px;">
                    <div class="title">重要人员</div>
                    <div class="line"></div>
                    <div class="info-container">
                        <div class="infoName">董事长</div>
                        <div class="infoValue" style="color: #409EFF">周乃翔</div>
                        <div class="infoName">董秘</div>
                        <div class="infoValue"  style="color: #409EFF">薛克庆</div>
                    </div>
                    <div class="info-container">
                        <div class="infoName">独立董事</div>
                        <div class="infoValue" style="color: #409EFF">杨春锦 , 余海龙 , 贾谌 , 郑昌泓</div>
                        <div class="infoName">总经理</div>
                        <div class="infoValue" style="color: #409EFF">郑学选</div>
                    </div>
                    <div class="info-container">
                        <div class="infoName">法人代表</div>
                        <div class="infoValue" style="color: #409EFF">周乃翔</div>
                        <div class="infoName">证券事务代表</div>
                        <div class="infoValue">--</div>
                    </div>
                </div>
                <div class="contactway-container container" style="padding-bottom: 15px;">
                    <div class="title">联系信息</div>
                    <div class="line"></div>
                    <div class="info-container">
                        <div class="infoName">联系电话</div>
                        <div class="infoValue">010-86498114,010-88083288</div>
                        <div class="infoName">传真</div>
                        <div class="infoValue">010-86498114</div>
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
                        <div class="infoName">区域</div>
                        <div class="infoValue">北京</div>
                        <div class="infoName">邮政编码</div>
                        <div class="infoValue">100029</div>
                    </div>
                    <div class="info-container">
                        <div class="infoName">办公地址</div>
                        <div class="infoValue">北京市朝阳区安定路5号院3号楼中建财富国际中心</div>
                        <div class="infoName">注册地址</div>
                        <div class="infoValue">北京市海淀区三里河路15号</div>
                    </div>
                </div>
            </div>
            <div class="stock-chart container">
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
      searchCompanyName: ''
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
