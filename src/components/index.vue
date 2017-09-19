<template lang="html">
  <div class="index-container">
    <div class="logo-container">
      <img src="../assets/logo.png" alt="Logo">
      <p>{{text}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      text: '每天进步一点点'
    }
  },
  mounted () {
    // setTimeout(function () {
    //   /*
    //     使用此种函数，此处this指向window 因为setTimeout执行再window下
    //    */
    //   console.log(this)
    // }, 1000)

    /**
     * 2秒后从介绍页跳转到内容展示
     * @type {function}
     */
    setTimeout(() => {
      // 使用箭头函数 this指向 index组件
      this.$router.replace('topic')
    }, 2000)
  }
}
</script>

<style lang="scss">
  .index-container{

    height: 100%;
    width: 100%;
    background-color: #ffffff;

    .logo-container{
      width: 200px;
      margin : 20vh auto 0;

      img{
        width: 100%;
      }

      p{
        text-align: center;
        font-size: 18px;
        font-weight: 400;
      }
    }
  }
</style>
