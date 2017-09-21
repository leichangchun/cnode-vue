// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/userinfo.js'

// import css及scss时 一定主要要在webpack.config中对应的loader中加入 include 否则会报错
import './assets/scss/github-markdown.css'
import './assets/font-awesome/scss/font-awesome.scss'
import './assets/scss/reset.css'

Vue.config.productionTip = false

// 页面刷新后 vuex管理的状态会清空
if (window.sessionStorage.getItem('userinfo')) {
  store.state.userinfo = JSON.parse(window.sessionStorage.getItem('userinfo'))
}

// router 的全局钩子
router.beforeEach((to, from, next) => {  // 一个路由匹配到的所有路由记录暴露为一个$route对象（或者是此处 to from 代表的路由钩子)的$route.matched数组
  if (to.matched.some(record => record.meta.reqireLogin)) {  // 判断即将进入的路由是否需要先登录
    if (!store.getters.isLogin) {
      next({   // 此处是必不可少的 不然路由无法进行下去   可以在next中 进行取消跳转 重定向等
        path: '/login',
        query: {    // 传递参数 登录页以此进行判断是否需要自动跳转
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,   // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件   需先调用 Vue.use(Vuex)
  template: '<App/>',
  components: { App }
})
