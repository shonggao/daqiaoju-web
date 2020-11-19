import Vue from 'vue'
import Router from 'vue-router'
import QuanGuoTouZi from '@/components/xiangmuxinxi/quanguotouzi'
import DingTu from '@/components/dingtu/dingtu'
import Announcement from '@/components/xiangmuxinxi/announcement'
import Login from '@/components/login'
import MianView from '@/components/mainview'
import Register from '@/components/register'
import WeixinArticle from '@/components/xiangmuxinxi/weixinarticle'
import MapList from '@/components/dingtu/maplist'
import XiangMuChaXun from '@/components/qiyexinxi/xiangmuchaxun'
import CompanyInfo from '@/components/qiyexinxi/companyinfo'
import ManageUser from '@/components/manageuser/manageuser'
import CaiGouWang from '@/components/qiyexinxi/caigouwang'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/register',
      name: 'register',
      component: Register
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
          name: 'quanguotouzi',
          component: QuanGuoTouZi
        },
        {
          path: '',
          redirect: 'quanguotouzi'
        },
        {
          path: 'dingtu/:id',
          name: 'dingtu',
          component: DingTu
        },
        {
          path: 'announcement',
          name: 'announcement',
          component: Announcement
        },
        {
          path: 'weixinarticle',
          name: 'weixinarticle',
          component: WeixinArticle
        },
        {
          path: 'maplist/:id',
          name: 'maplist',
          component: MapList
        },
        {
          path: 'xiangmuchaxun',
          name: 'xiangmuchaxun',
          component: XiangMuChaXun
        },
        {
          path: 'companyinfo',
          name: 'companyinfo',
          component: CompanyInfo
        },
        {
          path: 'manageuser',
          name: 'manageuser',
          component: ManageUser
        },
        {
          path: 'caigouwang',
          name: 'caigouwang',
          component: CaiGouWang
        }
      ]
    }
  ]
})
