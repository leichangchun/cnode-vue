<template lang="html">
  <div class="login">
    <loginheader :title="title" :showMenu='false' :showNav="false" :show-add="false"></loginheader>
    <template v-if="!isLogin">
      <aside class="toast" v-show="hasError">
        {{toastMsg}}
      </aside>
      <div class="login-area">
        <input type="text" placeholder="请输入 Cnode社区的 accessToken" v-model="accessToken">
        <button type="button" name="button" @click="login">登录</button>
      </div>
    </template>
    <template v-else>
      <div class="login-info">
        <img :src="url_I" class="login-user-img">
        <p class="login-user-name">用户：<span>{{name}}</span></p>
        <span class="login-out fa fa-sign-out" @click="loginOut"></span>
        <span class="login-score" v-show="userInfo.score"><span>积分 ： </span>{{userInfo.score}}</span>
      </div>
      <div class="login-tabs">
        <span @click="changeData('topic')" class="tab-active">最近发帖</span>
        <span @click="changeData('reply')">最新回复</span>
      </div>
      <div class="tabs-detail">
        <ul class="topic-list">
          <li class="topic-item" v-for="topic in currentData">
            <router-link :to="{ name: 'detail', params: {id : topic.id} }">
              <div class="info">
                <img :src="topic.author.avatar_url" alt="用户头像" class="user-avatar">
                <div class="content">
                  <h3>{{topic.title}}</h3>
                  <p>
                    <span class="name">{{topic.author.loginname}}</span>
                    <time>{{topic.last_reply_at | formatDate }}</time>
                  </p>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
import loginheader from './header.vue'
import * as util from '../assets/js/utils.js'
export default {
  data () {
    return {
      toastMsg: 'acessToken 错误 ',
      hasError: false,
      accessToken: '',
      userInfo: {},
      currentData: {}
    }
  },
  computed: { // store 中的状态 在组件中可以通过计算属性使用
    title () {
      return !this.isLogin ? '登录帐号' : '用户信息'
    },
    ...mapGetters([
      'isLogin',
      'name'
      // 'url'
    ]),
    ...mapGetters({   // 对getters 中的状态重命名 需要用对象的方式
      url_I: 'url'
    })
  },
  created () {
    if (this.isLogin) {
      this._getUserInfo()
    }
  },
  methods: {
    login () {
      axios({
        url: 'https://cnodejs.org/api/v1/accesstoken',
        method: 'POST',
        data: {
          accesstoken: this.accessToken
        }
      }).then((res) => {
        let data = res.data

        // token 验证通过后，写入store 标志登录成功
        this.$store.commit('ADD_USER_INFO', {
          loginname: data.loginname,
          avatarurl: data.avatar_url,
          accessToken: this.accessToken
        })
        window.sessionStorage.setItem('accessToken', this.accessToken)
        // token 验证通过后，清空输入框
        this.accessToken = ''

        this._redirectFullPath()
      }).catch((error) => {
        // token 验证失败 提示并且2秒后隐藏
        this.toastMsg = error.response.data.error_msg
        this.hasError = true
        setTimeout(() => {
          this.hasError = false
        }, 2000)
      })
    },
    loginOut () {
      this.$store.commit('CLEAR_USER_INFO')
    },
    _redirectFullPath () {  // 如果是重定向过来的 ， 验证完成之后 跳转到 原路由对象
      if (this.$route.query.redirect) {
        this.$router.replace({
          path: this.$route.query.redirect
        })
      }
    },
    _getUserInfo () {
      axios({
        url: `user/${this.name}`,
        method: 'get',
        baseURL: 'https://cnodejs.org/api/v1'
      }).then(res => {
        let data = res.data
        this.userInfo = data.data
        // 默认展示发帖情况
        this.currentData = this.userInfo.recent_topics
      }).catch(error => {
        alert(error.response.data.error_msg)
      })
    },
    changeData (type, $event) {   // 传参时 用 $event 传递DOM事件
      if (document.querySelector('.tab-active')) {
        document.querySelector('.tab-active').classList.remove('tab-active')
      }
      event.target.classList.add('tab-active')
      if (type === 'reply') {
        this.currentData = this.userInfo.recent_replies
      } else if (type === 'topic') {
        this.currentData = this.userInfo.recent_topics
      }
    }
  },
  filters: {
    formatDate: function (value) {
      return util.formatDate(value, true)
    }
  },
  components: {
    loginheader
  }
}
</script>

<style lang="scss">
@import "../assets/scss/common.scss";
.login{
  height: 100%;
  background-color: $white;
  padding-top: 50px;   //padding 的百分比以宽度为基准
  font-size: $font-content;

  .toast{
    width: max-content;
    background-color: red;
    color: $light;
    padding: 5px;
    border-radius: $radius;
    margin: 0 auto;
  }

  .login-area{

    width: 100%;

    input{
      display: block;
      box-sizing: border-box;
      margin: $margin10;
      padding: 5px;
      width: calc(100vw - 30px);
      height: 25px;
      border: none;
      border-bottom: 1px solid $color42b;
      line-height: 25px;
    }

    button{
      display: block;
      background-color: $color42b;
      border-radius: $radius;
      width: 90%;
      line-height: 25px;
      font-size: $font-title;
      padding: 5px;
      margin: 30px auto;
    }
  }

  .login-info{

    background-color: $colord4;
    position: relative;
    padding: $padding;
    .login-user-img{
      display: block;
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin: 0 auto 10px;
    }

    .login-user-name{
      font-size: $font-content;
      text-align: center;

      span{
        font-weight: 700;
      }
    }

    .login-out{
      display: block;
      position: absolute;
      right: $padding;
      top: 0;
      padding: 5px;
      font-size: 20px;
    }

    .login-score{
      position: absolute;
      bottom: 35px;
      right: $padding;

      span{
        color: $color42b;
        font-weight: 600;
      }
    }
  }

  .login-tabs{
    padding: 5px $padding;
    display: flex;
    border-bottom: 1px solid #dddddd;
    span{
      flex: 1;
      padding: 5px;
      text-align: center;
      &:first-of-type{
        border-right: 1px solid #dddddd;
      }

      &.tab-active{
        color: $color42b;
        font-weight: 600;
      }
    }
  }

  .tabs-detail{
    height: calc(100vh - 248px);
    overflow-y: scroll;

    .topic-list{
      .topic-item {
          width: 100%;
          display: block;
          padding: $padding;
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

          h3{
            color: black;
          }
          p{
            display: inline-flex;
            width: 100%;
            color: $text;

            .name{
              flex: 1;
            }

            span{
              font-size: $font-content;
            }
          }
        }
      }

    }
  }
}
</style>
