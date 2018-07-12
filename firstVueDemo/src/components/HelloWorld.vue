<template>
  <div class="hello">
    <h2>用户登录</h2>
    <div class="demo-input-suffix">
      <div class="type">类型：<el-radio v-model="info.radio" label="2" border checked>我是老师</el-radio>
    <el-radio v-model="info.radio" label="1" border>我是学生</el-radio></div>

  </div>
    <div class="demo-input-suffix">
      用户名：
      <div class="input">
        <el-input
          @focus="err=false"
          placeholder="请输入账号"
          suffix-icon=""
          v-model="info.username">
        </el-input>
      </div>
    </div>
    <div class="demo-input-suffix">
      密码：
      <div class="input">
        <el-input @focus="err=false"
          placeholder="请输入密码" type="password"
          suffix-icon="" @keyup.enter.native="login"
          v-model="info.password">
        </el-input>
      </div>
    </div>
    <div  class="demo-input-suffix"><error v-if="err" :error="error"></error></div>
    <el-button @click="login" type="primary" v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
    <br>
    <!--<router-link to="day1">跳转至HelloVue</router-link>-->
  </div>

</template>

<script>

import error from './error'
import {api, URL} from '../api/index'

export default {
  name: 'HelloWorld',
  data () {
    return {
      error: '',
      info: {'username': '', 'password': '', 'radio': '2'},
      err: false,
      fullscreenLoading: false
    }
  },
  components: {
    error
  },
  methods: {
    login () {
      // alert(URL)
      let data1 = this.info
      if (!data1.username) {
        this.error = '请输入账号'
        this.err = true
      } else if (!data1.password) {
        this.error = '请输入密码'
        this.err = true
      } else {
        // this.fullscreenLoading = true
        // Axios.post('/login/?vue=true', this.info).then(res => {
        api.post(URL.LOGIN, this.info).then(res => {
          this.fullscreenLoading = false
          console.log(res.data.data.sessionid)
          if (res.data.status == 0) {
            this.error = res.data.data.error
            this.err = true
          } else {
            localStorage.setItem('sessionid', res.data.data.sessionid)
            localStorage.setItem('type', this.info.radio)
            localStorage.setItem('uid', res.data.data.uid)
            this.$router.push('/index/?type=' + this.info.radio + '&name=' + res.data.data.name)
          }
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  .demo-input-suffix {
    width: 600px;
    margin: auto;
    text-align: right;
    padding-right: 120px;
  }

  .input {
    width: 400px;
    display: inline-block;
    margin-top: 20px;
  }
  .type{
    text-align: left;width: 400px;margin-left: 150px;

  }
  button {
    margin-top: 30px;
  }

  a {
    color: #42b983;
    text-decoration: none;
  }
</style>
