<template lang="html">
  <div class="add-container">
    <addheader :show-menu="false" title="新增主题" :show-nav="false" :show-add="false"></addheader>
    <div class="add-topic-tab" @click="toggleTab">
      <span class="topic-tab-title">主题类别</span>
      <div class="topic-tab" :class="{'show-tab' : showTab}">
        <span class="tab-text">{{tabText}}</span>
        <div class="tabs">
          <div class="tab-item" @click="selectTab('dev','测试')">测试</div>
          <div class="tab-item" @click="selectTab('ask','问答')">问答</div>
          <div class="tab-item" @click="selectTab('share','分享')">分享</div>
          <div class="tab-item" @click="selectTab('job','招聘')">招聘</div>
        </div>
        <span class="fa fa-sort-desc"></span>
      </div>
      <button class="add-btn">发布</button>
    </div>
    <div class="add-title">
      <input type="text" name="title" placeholder="请输入标题" v-model="topic.title">
    </div>
    <div class="add-content">
      <textarea name="name" rows="8" cols="80" placeholder="请输入内容，支持markdown语法" v-model="topic.content"></textarea>
    </div>

  </div>
</template>

<script>
import addheader from './header.vue'
export default {
  data () {
    return {
      showTab: false,
      tabText: '--请选择分类--',
      topic: {
        tab: '',
        title: '',
        content: '',
        accesstoken: window.sessionStorage.getItem('accessToken')
      }
    }
  },
  methods: {
    toggleTab: function () {
      this.showTab = !this.showTab
    },
    selectTab: function (tab, text) {
      this.tabText = text
      this.topic.tab = tab
    }
  },
  components: {
    addheader
  }
}
</script>

<style lang="scss">
@import "../assets/scss/common.scss";

.add-container{
  height: 100%;
  background-color: $white;
  padding-top: 45px;
  display: flex;
  flex-direction: column;

  .add-topic-tab{
    padding: $padding;
    display: flex;
    text-align: center;
    font-size: $font-tag;
    min-height: 54px;   //此最小高度限制是为了解决 选择tab时，高度坍塌的问题
    border: 1px solid #dddddd;


    .topic-tab-title{
      font-size: $font-content;
      font-weight: 600;
      height: 22px;
      line-height: 22px;
    }

    .topic-tab{
      flex:1;
      position: relative;
      border: 1px solid #dddddd;
      margin: 0 $padding;
      box-sizing: content-box;
      height: 20px;
      line-height: 20px;

      &.show-tab{
        .tabs{
          max-height: 1000px;
        }

        .fa{
          transform: rotateZ(90deg);
        }
      }
      .tabs{
        position: absolute;
        top: 25px;

        width: 100%;
        text-align: center;
        border-radius: 0 0 10px 10px;
        max-height: 0;
        overflow: hidden;
        transition: all 0.5s ease;
        .tab-item{
          padding: 5px 0;
          background-color: #cccccc;

          &:not(:last-of-type){
            border-bottom: 1px solid $white;
          }
        }
      }

      .tab-text{
        width: 100%;
        display: block;
        height: 20px;
        line-height: 20px;
      }
      .fa{
        position: absolute;
        right: 0;
        top: 0;
        transition: all 0.5s ease;
        &::before{
          display: block;
          width: 20px;
          height: 20px;
          line-height: 20px;
          text-align: center;
        }
      }
    }
    .add-btn{
      width: 50px;
      text-align: center;
      background-color: $color42b;
      border-radius: $radius;
      height: 22px;
      line-height: 22px;
    }

  }

  .add-title{
    padding: $padding;
    border-bottom: 1px solid #dddddd;
    input{
      width: 100%;
      border-radius: $radius;
      line-height: 20px;
      padding: 5px;
    }
  }

  .add-content{
    padding: $padding;
    flex: 1;

    textarea{
      width: 100%;
      height: 100%;
      border-radius: $radius;
      padding: 5px;
    }
  }
}

</style>
