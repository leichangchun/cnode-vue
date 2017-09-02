import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index.vue'
import topic from '../components/topic.vue'

// const topic = () => import('../components/topic.vue')
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
    }
  ]
})
