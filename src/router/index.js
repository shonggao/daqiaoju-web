import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import DingTu from '@/components/dingtu/dingtu'
import Announcement from '@/components/xiangmuxinxi/announcement'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/quanguotouzi',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/dingtu',
      name: 'dingtu',
      component: DingTu
    },
    {
      path: '/announcement',
      name: 'announcement',
      component: Announcement
    }
  ]
})
