// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import './assets/css/element.scss'
import 'lib-flexible/flexible.js'

import echarts from 'echarts'
/* eslint-disable-next-line */
import './assets/js/china.js'
// 导入vuex
import Vuex from 'vuex'
Vue.use(Vuex)

/* eslint-disable-next-line */
this.echarts = echarts
axios.defaults.timeout = 1000 * 60 * 30
// console.log(axios.defaults.timeout)
Vue.config.productionTip = false
// axios.defaults.baseURL = '/api/private/v1/'
axios.defaults.baseURL = 'http://localhost:3000/api/private/v1/'
Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
/* eslint-disable-next-line */
var store = new Vuex.Store({
  state: {
    isLogin: false,
    userInfo: {},
    token: ''
  },
  mutations: {
    setLogin (state, flag) {
      state.isLogin = flag
    },
    setUserInfo (state, data) {
      state.userInfo = data
    },
    setToken (state, data) {
      state.token = data
    }
  }
})

Vue.filter('undefinedTo', function (dataStr, pattern = '——') {
  if (dataStr === 'UNDEFINED' || dataStr === 'undefined' || dataStr === '' || dataStr === undefined) {
    return pattern
  }
  return dataStr
})

Vue.filter('updateTimeFilter', function (dataStr, pattern = '') {
  console.log(dataStr)
  var date = new Date(dataStr)
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return Y + M + D + h + m + s
})

Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm') {
  var date = new Date(parseInt(dataStr + '000'))
  // console.log(dataStr)
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  // var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  // var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  // var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return Y + M + D // + h + m + s
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
