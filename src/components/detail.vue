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
    <div class="addreply">
      <section class="commit-input">
        <textarea name="commit" placeholder="请输入评论"></textarea>
      </section>
      <span @click="addCommitOrReply('commit')">新增评论</span>
    </div>
    <section class="detail-replies" v-show="replies.length > 0">
      <h2>评论区</h2>
      <div class="replies-item" v-for="reply in replies">
        <section class="author-info">
          <img :src="reply.author.avatar_url" alt="回复者头像">
          <div class="info">
            <p>
              <span class="name">{{reply.author.loginname}}</span>
              <span class="up-count hasuped" v-show="reply.ups.length > 0">{{reply.ups.length}}</span>
              <span class="fa fa-thumbs-up" :class="{'hasuped' : reply.is_uped}"></span>
              <span class="reply-btn fa fa-mail-reply" @click="toggleInput(reply)"></span>
            </p>
            <p>
              <time>回复于 {{detail.create_at | formatDate}}</time>
            </p>
          </div>
        </section>
        <section class="reply-content markdown-body" v-html="reply.content">
        </section>
        <section class="reply-input" v-show="reply.showInput">
          <textarea name="reply" placeholder="请输入回复"></textarea>
          <button type="button" name="button" @click="addCommitOrReply('reply',reply)">回复</button>
        </section>
      </div>
    </section>

    <gotop :target-scroll-top="scrollTop" v-on:go-page-top="goTopicTop"></gotop>
  </article>
</template>

<script>
import detailHeader from './header.vue'
import gotop from './gotop.vue'
import * as util from '../assets/js/utils'
import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      detail: [],
      showMenu: false,
      title: '主题',
      scrollTop: 0,
      repliesContent: {
        accesstoken: this.$store.state.userinfo.accessToken,
        content: '',
        reply_id: null
      }
    }
  },
  computed: {
    replies () {
      return this.detail.replies.reverse()
    },
    ...mapGetters([
      'isLogin',
      'name',
      'url'
    ])
  },
  created () {
    axios({
      url: `https://cnodejs.org/api/v1/topic/${this.$route.params.id}`,
      method: 'get'
    }).then((res) => {
      if (res.data.success) {
        this.detail = res.data.data
        this.detail.replies.forEach((reply, index) => {
          this.$set(reply, 'showInput', false)
        })
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
    }, 200, 500),
    checkContent: function (str) {
      let testReg = /^\s*$/
      return !testReg.test(str)
    },
    addCommitOrReply: function (type, reply) {   // 参数中不用带event就能直接访问
      if (!this.isLogin) {
        this.$router.push({
          path: '/login',
          query: {
            redirect: this.$route.fullPath
          }
        })

        return false
      }

      let textareaDom = event.target.parentElement.querySelector('textarea')

      // 简单的检查
      if (!this.checkContent(textareaDom.value)) {
        alert('输入内容不能为空')
        return false
      }

      // 获取评论内容
      this.repliesContent.content = textareaDom.value

      // 如果是回复他人评论 需带上id并对内容进行处理
      if (type === 'reply') {
        this.repliesContent.reply_id = reply.id
        this.repliesContent.content = `@${this.name} ${this.repliesContent.content}`
      }

      axios({
        url: `https://cnodejs.org/api/v1/topic/${this.$route.params.id}/replies`,
        method: 'post',
        data: this.repliesContent
      }).then((res) => {
        if (res.data.success) {
          let now = new Date()
          this.detail.replies.push({
            author: {
              avatar_url: this.url,
              loginname: this.name
            },
            content: type === 'reply' ? `<a href="#">@${this.name}</a> ${textareaDom.value}` : textareaDom.value,
            create_at: now,
            id: res.data.reply_id,
            is_uped: false,
            reply_id: this.repliesContent.reply_id,
            showInput: false,
            ups: []
          })

          // 此处的event 是 readystatechange事件的event target是XMLHttpRequest
          // 所以再请求之前存储下target
          textareaDom.value = ''

          // 如果是回复帖子，则回复完成关掉输入框
          if (type === 'reply') {
            reply.showInput = false
          }
        } else {
          console.log(`commit not success`)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    toggleInput: function (reply) {
      reply.showInput = !reply.showInput
    }
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

          time{
            text-align: right;
          }
        }
      }
    }
  }

  .detail-content{
    overflow: scroll;
    margin-bottom: $padding;
    padding: $padding;
    border-bottom: 1px solid #dddddd;
  }

  .addreply{
    width: 100%;
    padding: 0 $padding $padding;
    border-bottom: 1px solid #dddddd;

    span{
      display: inline-block;
      @extend .button;
      font-size: 14px;
      margin-left: 20px;
    }
  }

  .detail-replies{

    h2{
      padding:$padding;
      border-bottom: 1px solid #dddddd;
    }
    .replies-item{

      &:not(:last-child){
        border-bottom: 1px solid #dddddd;
      }

      .fa,.up-count{
        width: $authorImg/2;
        height: $authorImg/2;
        margin-left: $margin10;
        text-align: center;
        line-height: $authorImg/2;
      }

      .hasuped{
        color: $color42b;
      }
      .reply-content{
        padding: 0 $padding;
      }
    }
  }

  .reply-input,.commit-input{
    padding: 0 $padding;
    margin-bottom: $margin10;

    textarea{
      width: 100%;
      height: 60px;
      padding: 5px;
      border-radius: $radius;
    }

    button{
      @extend .button;
    }
  }
</style>
