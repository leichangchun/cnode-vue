<template lang="html">
  <div class="container">
    <topicHeader :title="title" :show-menu="false" :show-nav="false"></topicHeader>
    <p>
      参考了github上大神的开源项目，学习并完成了 基于ES6 + vue-cli + vue2.0 + vue-router + axios + vuex -- 模拟node社区部分功能的网页应用
      虽然部分地方还有待完善，但自觉已受益匪浅，加油加油，每天进步一点点！！！
    </p>
  </div>
</template>

<script>
import topicHeader from './header'
export default {
  data () {
    return {
      title: '关于'
    }
  },
  components: {
    topicHeader
  }
}
</script>


<style lang="scss" scoped>
  // scoped 关键字 使css样式只在当前组件生效
  .container{
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    padding-top:60px;

    p{
      text-indent: 24px;
      font-size: 14px;
      line-height: 30px;
      padding: 10px;
    }
  }
</style>
