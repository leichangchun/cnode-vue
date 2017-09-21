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
      <img :src="url_I" class="login-user-img">
      <p class="login-user-name">用户 <span>{{name}}</span> 已登录</p>
      <span class="login-out fa fa-sign-out" @click="loginOut"></span>
    </template>
  </div>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
import loginheader from './header.vue'
export default {
  data () {
    return {
      toastMsg: 'acessToken 错误 ',
      hasError: false,
      accessToken: ''
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
          avatarurl: data.avatar_url
        })
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

  .login-user-img{
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 20px auto 10px;
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
    top: $header-height;
    padding: 5px;
    font-size: 20px;
  }
}
</style>
