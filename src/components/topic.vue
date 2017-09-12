<template lang="html">
  <div class="container">
    <div class="topic-mask" v-show="showNav" @click="changeNavAndMask"></div>
    <topicHeader :title="title" :show-menu="showMenu" :show-nav="showNav" v-on:change="changeNavAndMask"></topicHeader>
    <topicNav :class="{'show-nav' : showNav}"></topicNav>
    <ul class="topic-list">
      <li class="topic-item" v-for="topic in topics">
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
  created () {
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
  components: {
    topicHeader,
    topicNav
  },
  methods: {

    changeNavAndMask: function () {
      this.showNav = !this.showNav
    },

    getTabInfo: function (tab, good, top, isClass) {
      return util.getTabInfo(tab, good, top, isClass)
    }
  },
  filters: {
    // formatDate: function (value) {
    //   return util.formatDate(value)
    // }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/common.scss";
.container {
    height: 100%;
    position: relative;

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
        height: calc(100% - 45px);
        margin-top: 45px;
        overflow-x: hidden;
        overflow-y: scroll;

        .topic-item {
            width: 100%;
            display: block;
            padding: $padding;

          .title{

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
              color: $clolrff;
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
            margin-top: $margin10;
            display: flex;
            flex-direction: row;

            img{
              width: 40px;
              height: 40px;
              border-radius: 50%;
              margin-right: $margin10;
            }

            .content{
              flex:1;
              font-size: $font-info;

              p{
                display: inline-flex;
                width: 100%;

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
