<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <h1>优鸿教育项目同步辅导工具</h1>
    <p class="gray">作者:GUO Dongbo(内部人员专用) 适用项目：预科以后且有作者参与开发的项目</p>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  .gray{
    color: gray;
    margin: 0;
  }
  .m-l {
    margin-left: 20px
  }
  .blue{color: blue}
  .corsur{cursor: pointer}
  .rem{font-size: 20px}
  .m-ll {
    margin-left: 50px
  }
  .tishi{
    color: dodgerblue;
}
  .h{
    margin-top: 8px;
    margin-bottom: 0;
  }
  /*.input {*/
    /*width: 200px;*/
  /*}*/
</style>
