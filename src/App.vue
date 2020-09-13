<template>
<div id="app">
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app{
  position: absolute;
  width: 100%;
  height: 100%;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  box-sizing: border-box;
}
input[type=text]:focus {
  outline: none;
}

</style>
