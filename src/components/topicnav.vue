<template lang="html">
  <nav class="topic-nav">
    <section class="user-info line-bottom">
      <div class="login">
        <router-link :to="{ name: 'login'}" v-if="!isLogin"><span class="fa fa-user-circle-o"></span><span>登录</span></router-link>
        <router-link :to="{ name: 'login'}" v-else><img :src="url"><p>{{name}}</p></router-link>
      </div>
    </section>
    <section class="item-ul">
      <li><router-link :to="{ name: 'topic', query: {tab : 'all'} }" class="fa fa-align-justify">全部</router-link></li>
      <li><router-link :to="{ name: 'topic', query: {tab : 'good'} }" class="fa fa-thumbs-o-up">精品</router-link></li>
      <li><router-link :to="{ name: 'topic', query: {tab : 'share'} }" class="fa fa-share-alt">分享</router-link></li>
      <li><router-link :to="{ name: 'topic', query: {tab : 'ask'} }" class="fa fa-question-circle">问答</router-link></li>
      <li><router-link :to="{ name: 'topic', query: {tab : 'dev'} }" class="fa fa-exclamation-triangle">测试</router-link></li>
      <li class="line-bottom"><router-link :to="{ name: 'topic', query: {tab : 'job'} }" class="fa fa-address-book-o">招聘</router-link></li>
      <li><router-link :to="{ name: 'about'}" class="fa fa-exclamation-circle">关于</router-link></li>
    </section>
  </nav>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'isLogin',
      'name',
      'url'
    ])
  }
}
</script>

<style lang="scss">
  @import "../assets/scss/common.scss";

  .topic-nav{
    width: 200px;
    height: 100%;
    position: fixed;
    top: 0;
    left: -200px;
    z-index: 5;
    background-color: #ffffff;
    transition: all 0.5s ease;

    &.show-nav{
      left: 0;
    }

    .user-info{
      width: 100%;
      padding: 15px;

      .login{
        padding: 16px 9px;

        span{
          height: 24px;
          line-height: 24px;
          font-size: 16px;
          vertical-align: middle;
          text-align: center;
        }

        .fa{
          width: 24px;
          color: $color42b;
          margin-right: 12px;
          font-size: 24px;
        }
        img{
          display: block;
          width: 36px;
          margin: 0 auto;
          border-radius:50%;
        }
        p{
          text-align: center;
          padding: 5px;
        }
      }
    }

    .item-ul{
      padding: 8px 9px;

      li{
        padding: 10px 0;

        a{

          width: 100%;
          height: 100%;
          text-indent: 10px;
          font-size: $font-title;
          font-weight: 700;
          color: $color31;
          &::before{
            padding-right: 20px;
            padding-left: 20px;
          }
        }
      }
    }
  }
</style>
