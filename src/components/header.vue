<template lang="html">
    <header class="topic-header" :class="{'show-nav' : showNav}">
      <div class="left-menu" v-show="showMenu" @click="toggleNav">
        <span class="fa fa-bars"></span>
      </div>
      <div class="left-back" v-show="!showMenu" @click="goback">
        <span class="fa fa-chevron-left"></span>
      </div>
      <span class="title">{{title}}</span>
      <!-- 传一个带参数对象时  是 :to -->
      <router-link to="/add" class="right-login" v-show="showAdd">
        <span class="fa fa-plus"></span>
      </router-link>
    </header>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    showMenu: Boolean,
    title: String,
    showNav: Boolean,
    showAdd: Boolean
  },
  methods: {
    toggleNav: function () {
      this.$emit('change')
    },
    goback: function () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss">

@import "./../assets/scss/common.scss";

  .topic-header{
    z-index : 2;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #e8e8e8;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
    transition: all 0.5s ease;
    background-color: hsla(0,0%,100%,.95);

    &.show-nav{
      transform: translateX(200px);
    }

    .left-menu,.left-back{
      width: 49px;
      height: $header-height;
      position: absolute;  //absolute是相对于第一个非static(默认)的父元素定位 之前一直以为相对于relative
      top: 0;
      left: 0;
    }

    .left-menu span,.left-back span,.right-login span{
      width: 100%;
      height: $header-height;
      line-height: $header-height;
      text-align: center;
      font-size: 20px;
    }

    .title{
      display: inline-block;
      width: 100%;
      height: $header-height;
      line-height: $header-height;
      text-align: center;
      font-size: 16px;
      font-weight: 600;
    }

    .right-login{
      display: inline-block;
      width: 49px;
      height: $header-height;
      position: absolute;
      top: 0;
      right: 0;

      span{
        color : $color42b;
      }

      img{
        display: block;
        margin: 8px;
        width: 33px;
        border-radius: 50%;
      }
    }
  }
</style>
