<template lang="html">
  <div class="login">
    {{test}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      test: 'this is a login Page'
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/common.scss";
.login{
  height: 100%;
  background-color: $white;
  text-align: center;
  padding-top: 50%;   //padding 的百分比以宽度为基准
  font-size: $font-title;
}
</style>
