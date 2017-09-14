// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// import css及scss时 一定主要要在webpack.config中对应的loader中加入 include 否则会报错
import './assets/scss/github-markdown.css'
import './assets/font-awesome/scss/font-awesome.scss'
import './assets/scss/reset.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
