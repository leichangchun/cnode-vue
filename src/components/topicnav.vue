<template lang="html">
  <nav class="topic-nav">
    <section class="user-info">
      <div class="login">
        <span class="fa fa-user-circle-o"></span><span>登录</span>
      </div>
    </section>
    <section class="item-ul">
      
    </section>
  </nav>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  @import "../assets/scss/common.scss";

  .topic-nav{
    width: 200px;
    height: 100%;
    position: absolute;
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
        padding: 8px 9px;

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
      }
    }

  }
</style>
