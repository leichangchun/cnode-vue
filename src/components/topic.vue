<template lang="html">
  <div class="container">
    <div class="topic-mask" v-show="showNav" @click="changeNavAndMask"></div>
    <topicHeader :title="title" :show-menu="showMenu" :show-nav="showNav" v-on:change="changeNavAndMask"></topicHeader>
    <topicNav :class="{'show-nav' : showNav}"></topicNav>
  </div>
</template>

<script>
import axios from 'axios'
import topicHeader from './header'
import topicNav from './topicnav.vue'
export default {
  name: 'topic',
  data () {
    return {
      topic: [],
      params: {
        page: 1,
        limit: 20,
        tab: 'all',
        mdrender: true
      },
      title: '全部',
      showMenu: true,
      showNav: false
    }
  },
  created () {
    axios({
      url: 'https://cnodejs.org/api/v1/topics?',
      method: 'get',
      params: this.params
    }).then(res => {
      console.log('load topics')
      this.topic = res.data.data
    }).catch(error => {
      console.log('load topics failed!')
      console.log(error)
    })
  },
  components: {
    topicHeader,
    topicNav
  },
  methods: {
    changeNavAndMask: function () {
      this.showNav = !this.showNav
    }
  }
}
</script>

<style lang="scss">
  .container{
    height: 100%;
    position: relative;

    .topic-mask{
      position: absolute;
      z-index: 3;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(0, 0, 0, .4);
    }
  }
</style>
