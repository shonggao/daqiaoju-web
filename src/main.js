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

/* eslint-disable-next-line */
this.echarts = echarts

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:3000/api/private/v1/'
Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts

Vue.filter('undefinedTo', function (dataStr, pattern = '——') {
  if (dataStr === 'UNDEFINED' || dataStr === 'undefined' || dataStr === '') {
    return pattern
  }
  return dataStr
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
