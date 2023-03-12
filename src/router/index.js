import { createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect:'/visualization'
  },
  {
    path: '/visualization',
    name: '可视化',
    component: () => import('../views/VisualiZation.vue'),
  },
  {
    path: '/column',
    name: '栏目配置',
    component: () => import('../views/ColumnOption.vue')
  },
  {
    path: '/centerprofile',
    name: '中心简介',
    component: () => import('../views/CenterProfile.vue')
  },
  {
    path: '/centralarchitecture',
    name: '中心架构',
    component: () => import('../views/CentralArchitecture.vue')
  },
  {
    path: '/personmanagement',
    name: '人员管理',
    component: () => import('../views/PersonManagement.vue')
  },
  {
    path: '/performancepublicity',
    name: '绩效公示',
    component: () => import('../views/PerformancePublicity.vue')
  },
  {
    path: '/studyfield',
    name: '学习园地',
    component: () => import('../views/StudyField.vue')
  },
  {
    path: '/photomanagement',
    name: '照片管理',
    component: () => import('../views/PhotoManagement.vue')
  },
  {
    path: '/communistmanifesto',
    name: '共产党员责任区',
    component: () => import('../views/CommunistManifesto.vue')
  },
  {
    path: '/unionnotice',
    name: '工会通知',
    component: () => import('../views/UnionNotice.vue')
  },
  {
    path: '/systemrun',
    name: '系统运行情况',
    component: () => import('../views/SystemRun.vue')
  }, {
    path: '/overhaulingplan',
    name: '检修计划',
    component: () => import('../views/OverhaulingPlan.vue')
  }
  , {
    path: '/projectbrowse',
    name: '项目一览表',
    component: () => import('../views/ProjectBrowse.vue')
  },
  {
    path: '/punchcard',
    name: '打卡公示',
    component: () => import('../views/PunchCard.vue')
  },
  {
    path: '/matterwarn',
    name: '事项提醒',
    component: () => import('../views/MatterWarn.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
export default router
