import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index.vue'
// import topic from '../components/topic.vue'

// code split 懒加载，打包的时候会分离，使用的时候才会加载 可减小js体积
const topic = () => import('../components/topic.vue')
const login = () => import('../components/login.vue')
const detail = () => import('../components/detail.vue')
const about = () => import('../components/about.vue')
const add = () => import('../components/add.vue')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index
    }, {
      path: '/topic',
      name: 'topic',
      component: topic
    }, {
      path: '/login',
      name: 'login',
      component: login
    }, {
      path: '/detail/:id',
      name: 'detail',
      component: detail
    }, {
      path: '/about',
      name: 'about',
      component: about
    }, {
      path: '/add',
      name: 'add',
      component: add,
      meta: {     // meta是路由记录字段 可以自定义字段  此处定义了一个标志需要登录的字段
        reqireLogin: true
      }
    }
  ]
})
