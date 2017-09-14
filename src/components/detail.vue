<template lang="html">
  <!-- 加入v-if 进行判断 防止在数据未加载完时因找不到字段而报错 -->
  <article class="detail-page" v-if="detail.tab">

    <detail-header :show-menu="showMenu" :title="title"></detail-header>

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

    <section class="detail-content markdown-body" v-html="detail.content">

    </section>

    <section class="detail-replies">

    </section>
  </article>
</template>

<script>
import detailHeader from './header.vue'
import * as util from '../assets/js/utils'
import axios from 'axios'
export default {
  data () {
    return {
      detail: [],
      showMenu: false,
      title: '主题'
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
    }
  },
  components: {
    detailHeader
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
  }
</style>
