<template>
  <div class="hello">
    <h2>用户登录</h2>
    <div class="demo-input-suffix">
      <div class="type">类型：<el-radio v-model="info.radio" label="2" border checked>我是老师</el-radio>
    <el-radio v-model="info.radio" label="1" border>我是学生</el-radio>
      <el-dropdown trigger="click" @command="handleCommand" placement="bottom-start" style="margin-left: 40px">
        <el-button type="primary" plain>
          快速登录<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item,index) in data" :key="index" :command="index">{{item.name}}({{item.p}})</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      </div>
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
    <div class="demo-input-suffix">
      常用账号：
      <div class="input" style="text-align: left">
        <template><el-checkbox v-model="info.checked"></el-checkbox></template>
        <span class="often" @click="often">我同意常用账号协议</span>
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
      data: {},
      info: {'username': '', 'password': '', 'radio': '2', checked: true},
      err: false,
      fullscreenLoading: false,
      o: this.$route.query.o || null
    }
  },
  components: {
    error
  },
  methods: {
    often () {
      this.$alert('设置常用账号后，任何人都可以使用你的账号快速登录！也可以操作你的数据！请自觉使用自己的账号！', '谨慎操作', {center: true, type: 'warning'})
    },
    handleCommand (index) {
      var base = this.data[index]
      this.$message({type: 'success', message: '您选择了' + base.name + '(' + base.p + ')', center: true})
      this.fullscreenLoading = true
      api.post('/login/?quick=' + base.id).then(res => {
        this.fullscreenLoading = false
        if (res.status == 0) {
          this.error = res.data.error
          this.err = true
        } else {
          localStorage.setItem('sessionid', res.data.sessionid)
          localStorage.setItem('type', res.data.type)
          localStorage.setItem('uid', res.data.uid)
          this.$router.push('/index/?type=' + res.data.type + '&name=' + res.data.name)
        }
      })
    },
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
        this.fullscreenLoading = true
        // Axios.post('/login/?vue=true', this.info).then(res => {
        api.post(URL.LOGIN, this.info).then(res => {
          this.fullscreenLoading = false
          if (res.status == 0) {
            this.error = res.data.error
            this.err = true
          } else {
            localStorage.setItem('sessionid', res.data.sessionid)
            localStorage.setItem('type', this.info.radio)
            localStorage.setItem('uid', res.data.uid)
            this.$router.push('/index/?type=' + this.info.radio + '&name=' + res.data.name)
          }
        })
      }
    }
  },
  created () {
    console.log(this.o)
    if (this.o) {
      this.error = this.o
      this.err = true
    }
    api.get('/get/quick/').then(res => {
      this.data = res.data
    })
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
  .often{
    cursor: pointer;
    color: deepskyblue;
    margin-left: 10px;
  }
  .input {
    width: 400px;
    display: inline-block;
    margin-top: 20px;
  }
  .type{
    text-align: left;width: 600px;margin-left: 151px;

  }
  button {
    margin-top: 30px;
  }

  a {
    color: #42b983;
    text-decoration: none;
  }
</style>
