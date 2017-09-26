<template lang="html">
  <div class="container" v-show="topics.length > 0" @scroll="targetScroll" ref="container">
    <div class="topic-mask" v-show="showNav" @click="changeNavAndMask"></div>
    <topicHeader :title="title" :show-menu="showMenu" :show-nav="showNav" v-on:change="changeNavAndMask" :show-add="true"></topicHeader>
    <topicNav :class="{'show-nav' : showNav}"></topicNav>
    <ul class="topic-list" ref="topiclist">
      <li class="topic-item" v-for="topic in topics">
        <router-link :to="{ name: 'detail', params: {id : topic.id} }">
          <h3 :title="getTabInfo(topic.tab,topic.good,topic.top,false)" class="title single-row" :class="getTabInfo(topic.tab,topic.good,topic.top,true)">{{topic.title}}</h3>
          <div class="info">
            <img :src="topic.author.avatar_url" alt="用户头像" class="user-avatar">
            <div class="content">
              <p>
                <span class="name">{{topic.author.loginname}}</span>
                <span class="status"><b>{{topic.reply_count}}</b> /{{topic.visit_count}}</span>
              </p>
              <p>
                <time>{{topic.create_at | formatDate}}</time>
                <time>{{topic.last_reply_at | formatDate}}</time>
              </p>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
    <gotop :target-scroll-top="scrollTop" v-on:go-page-top="goTopicTop"></gotop>
  </div>
</template>

<script>
import axios from 'axios'
import topicHeader from './header'
import topicNav from './topicnav.vue'
import gotop from './gotop.vue'
import * as util from '../assets/js/utils.js'
export default {
  name: 'topic',
  data () {
    return {
      topics: [],
      params: {
        page: 1,
        limit: 20,
        tab: 'all',
        mdrender: true
      },
      title: '全部',
      showMenu: true,
      showNav: false,
      scrollTop: 0,
      scroll: true
    }
  },
  created () {
    // 有缓存 就用缓存   没缓存 重新加载
    if (window.sessionStorage.getItem('tempData')) {
      let tempData = JSON.parse(window.sessionStorage.getItem('tempData'))

      this.topics = tempData.topics
      this.params = tempData.params

      this.$nextTick(() => {
        this.$refs.container.scrollTop = tempData.scrollTop
      })
    } else {
      this.params.tab = this.$route.query.tab || 'all'
      this.title = this.getTabInfo(this.params.tab, false, false, false)
      this._loadData()
    }
    console.log('topic created')
  },
  components: {
    topicHeader,
    topicNav,
    gotop
  },
  methods: {
    _loadData: function () {
      console.log('_loadData')
      axios({
        url: 'https://cnodejs.org/api/v1/topics?',
        method: 'get',
        params: this.params
      }).then(res => {
        console.log('load topics success!')

        // 每次加载后 将数据push到 topics 中；topics中是所有要展示的数据
        res.data.data.forEach((value, index) => {
          this.topics.push(value)
        })
        this.params.page++
      }).catch(error => {
        console.log('load topics failed!' + error)
      })
    },
    changeNavAndMask: function () {
      this.showNav = !this.showNav
    },
    getTabInfo: function (tab, good, top, isClass) {
      return util.getTabInfo(tab, good, top, isClass)
    },
    targetScroll: util.throttle(function () { // 节流 防止滚动事件的回调触发的太频繁
      if (this.scroll) {
        this.scrollTop = arguments[0].target.scrollTop
        if (arguments[0].target.scrollTop + window.innerHeight > this.$refs.topiclist.offsetHeight + 45 - 100) {
          this._loadData()
        }
      } else {
        console.log('scroll is false')
      }
    }, 200, 500),
    goTopicTop: function () {
      util.scrollToTop(this.$refs.container, 5, 10)
    }
  },
  filters: {
    formatDate: function (value) {
      return util.formatDate(value, true)
    }
  },
  watch: {
    '$route' (to, from) { // 复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch（监测变化） $route 对象
      console.log('route watch')
    }
  },
  beforeRouteEnter (to, from, next) {
    if (['detail', 'login'].indexOf(from.name) < 0) {  // 如果不是从 指定页 返回 则清掉缓存
      if (window.sessionStorage.getItem('tempData')) {
        window.sessionStorage.removeItem('tempData')
      }
    }
    next()
  },
  beforeRouteUpdate (to, from, next) {
    // 同页面切换才会触发RouteUpdate,这时不会触发vue实例的钩子，所以要处理下数据
    if (to.query && to.query.tab) {
      this.params.tab = to.query.tab
      this.title = this.getTabInfo(this.params.tab, false, false, false)
      this.scrollTop = 0
      this.$refs.container.scrollTop = 0
      this.scroll = false
      this.params.page = 1
      this.topics = []
    }

    // 隐藏 侧边导航栏
    this.showNav = !this.showNav

    this._loadData()

    // bugfix 切换分类时会触发一次滚动事件，而此时的 topics已清空  所以会触发多加载一次数据
    let self = this
    window.setTimeout(function () {
      self.scroll = true
    }, 2000)

    console.log('route update')

    next()
  },
  beforeRouteLeave (to, from, next) {
    let tempData = {}
    // 如果是离开topic页，则缓存当前的部分参数
    if (to.name !== 'topic') {
      tempData.params = this.params
      tempData.topics = this.topics
      tempData.scrollTop = this.scrollTop
      tempData.title = this.title

      window.sessionStorage.setItem('tempData', JSON.stringify(tempData))
    }
    console.log('route leave')
    next()
  }
}
</script>

<style lang="scss">
@import "../assets/scss/common.scss";
.container {
    height: 100%;
    position: relative;
    padding-top: 45px;
    background-color: $white;
    overflow-y:scroll;
    overflow-x: hidden;

    .topic-mask {
        position: fixed;
        z-index: 3;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(0, 0, 0, .4);
    }

    .topic-list {
        width: 100%;

        .topic-item {
            width: 100%;
            display: block;
            padding: $padding;

          .title{
            color: $title;

            &::before{
              display: inline-block;
              content: attr(title);
              padding: 2px 6px;
              margin-top: -2px;
              font-size: $font-tag;
              border-radius: $radius;
              margin-right: $margin10;
              vertical-align: middle;
              text-align: center;
              color: $white;
              font-weight: 400;
            }

            &.top::before{
              background-color: #E74C3C
            }
            &.good::before{
              background-color: #E67E22
            }
            &.ask::before{
              background-color: #3498DB
            }
            &.job::before{
              background-color: #9B59B6
            }
            &.share::before{
              background-color: #1ABC9C
            }
          }

          .info{
            padding-top: $margin10;
            display: flex;
            flex-direction: row;

            img{
              @extend .author-img;
              margin-right: $margin10;
            }

            .content{
              flex:1;
              font-size: $font-info;

              p{
                display: inline-flex;
                width: 100%;
                color: $text;

                .name{
                  flex: 1;
                }

                span{
                  font-size: $font-content;

                  b{
                    color: $color42b;
                  }
                }

                time:first-of-type{
                  flex: 1;
                }
              }
            }
          }
        }
    }
}
</style>
