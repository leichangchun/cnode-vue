<template lang="html">
  <div class="container" v-show="topics.length > 0" @scroll="topicScroll">
    <div class="topic-mask" v-show="showNav" @click="changeNavAndMask"></div>
    <topicHeader :title="title" :show-menu="showMenu" :show-nav="showNav" v-on:change="changeNavAndMask"></topicHeader>
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
  </div>
</template>

<script>
import axios from 'axios'
import topicHeader from './header'
import topicNav from './topicnav.vue'
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
      showNav: false
    }
  },
  computed: {

  },
  created () {
    this._loadData()
  },
  components: {
    topicHeader,
    topicNav
  },
  methods: {
    _loadData: function () {
      axios({
        url: 'https://cnodejs.org/api/v1/topics?',
        method: 'get',
        params: this.params
      }).then(res => {
        console.log('load topics success!')
        this.topics = res.data.data
      }).catch(error => {
        console.log('load topics failed!')
        console.log(error)
      })
    },
    changeNavAndMask: function () {
      this.showNav = !this.showNav
    },

    getTabInfo: function (tab, good, top, isClass) {
      return util.getTabInfo(tab, good, top, isClass)
    },
    topicScroll: function (e) {
      // e.target 为触发事件的元素  取其scrollTop
      if (e.target.scrollTop > window.innerHeight) {
        // console.log('show the goTop component')
      } else {
        // console.log('hidden the goTop component')
      }

      if (e.target.scrollTop + window.innerHeight > this.$refs.topiclist.offsetHeight + 45 - 100) {
        // console.log('load more data')
      }
    }
  },
  filters: {
    formatDate: function (value) {
      return util.formatDate(value, true)
    }
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
        position: absolute;
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
