import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index.vue'
// import topic from '../components/topic.vue'

// code split
const topic = () => import('../components/topic.vue')
const login = () => import('../components/login.vue')
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
    }
  ]
})
