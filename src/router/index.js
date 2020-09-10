import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import DingTu from '@/components/dingtu/dingtu'
import Announcement from '@/components/xiangmuxinxi/announcement'
import Login from '@/components/login'
import MianView from '@/components/mainview'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/main',
      name: 'main',
      component: MianView,
      children: [
        {
          path: 'quanguotouzi',
          name: 'HelloWorld',
          component: HelloWorld
        },
        {
          path: '',
          redirect: 'quanguotouzi'
        },
        {
          path: 'dingtu',
          name: 'dingtu',
          component: DingTu
        },
        {
          path: 'announcement',
          name: 'announcement',
          component: Announcement
        }
      ]
    }
  ]
})
