<template lang="html">
  <!-- 加入v-if 进行判断 防止在数据未加载完时因找不到字段而报错 -->
  <article class="detail-page" v-if="detail.tab" ref='container' @scroll="targetScroll">

    <detail-header :show-menu="showMenu" :title="title" :show-login="true"></detail-header>

    <section class="author-info">
      <img :src="detail.author.avatar_url" alt="作者头像">
      <div class="info">
        <p>
          <span class="name">{{detail.author.loginname}}</span>
          <span class="visit-count">浏览量 ： {{detail.visit_count}}</span>
        </p>
        <p>
          <time>发布于 {{detail.create_at | formatDate}}</time>
        </p>
      </div>
    </section>
    <!-- 文章的内容是HTML格式的   所以使用v-html -->
    <section class="detail-content markdown-body" v-html="detail.content">

    </section>

    <section class="detail-replies">

    </section>

    <gotop :target-scroll-top="scrollTop" v-on:go-page-top="goTopicTop"></gotop>
  </article>
</template>

<script>
import detailHeader from './header.vue'
import gotop from './gotop.vue'
import * as util from '../assets/js/utils'
import axios from 'axios'
export default {
  data () {
    return {
      detail: [],
      showMenu: false,
      title: '主题',
      scrollTop: 0
    }
  },
  created () {
    axios({
      url: `https://cnodejs.org/api/v1/topic/${this.$route.params.id}`,
      method: 'get'
    }).then((res) => {
      if (res.data.success) {
        this.detail = res.data.data
      } else {
        console.log(`get detail not success`)
      }
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    getTabInfo: function (tab, good, top, isClass) {
      return util.getTabInfo(tab, good, top, isClass)
    },
    goTopicTop: function () {
      util.scrollToTop(this.$refs.container, 5, 10)
    },
    targetScroll: util.throttle(function () { // 节流 防止滚动事件的回调触发的太频繁
      this.scrollTop = arguments[0].target.scrollTop
    }, 200, 500)
  },
  components: {
    detailHeader,
    gotop
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

  .detail-page{
    height: 100%;
    padding-top: 45px;
    overflow: scroll;
    background-color: $white;

    .author-info{
      padding: $padding;
      display: flex;

      img{
        @extend .author-img;
        margin-right: $margin10;
      }

      .info{
        flex: 1;

        p{
          color: $text;
          font-size: $font-info;
          line-height: $authorImg/2;
          display: flex;

          .name,time{
            flex: 1;
          }
        }
      }
    }
  }

  .detail-content{
    overflow: scroll;
    margin-bottom: $padding;
    border-bottom: 1px solid #dddddd;
  }
</style>
