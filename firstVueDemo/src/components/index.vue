<template>
  <div class="content">
    <div class="head"><span>{{yindao}}<span class="warm">{{name}}</span>{{type}}</span>
      <p class="out" >
        <el-button type="primary" plain round @click="checkout">随机切换皮肤</el-button>
      </p>
      <el-dropdown class="out" trigger="click" @command="handleCommand" placement="bottom-start">
        <el-tooltip content="这里显示的为常用账号" placement="top">
        <el-button type="primary" plain round v-loading.fullscreen.lock="fullscreenLoading">
          切换账号<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button></el-tooltip>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item,index) in data" :key="index" :command="index">{{item.name}}({{item.p}})</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <p class="out"><span class="blue corsur el-icon-refresh" @click="sx">刷新</span>
        <span class="blue m-l corsur el-icon-d-arrow-left" @click="logout">退出登录</span></p>
    </div>
    <div id="c-content">
      <div id="a-content-left">
        <div class="a-content-left" :class="{'hid':index==x}" v-for="(item,index) in nav" :key="index" @click="hid(index)">{{item}}
        </div>
      </div>
      <div id="a-content-right">
        <info :x="x" ref="sx_tea" v-if="js==2"></info>
        <stu :x="stu" ref="sx_stu" v-if="js==1"></stu>
      </div>
    </div>
    <!--背景标签-->
    <div class="back_0" :class="'back_' + back">
  </div>
  </div>
</template>
<script>
import info from './tea/base'
import stu from './stu/info'
import {api, URL} from '../api/index'
export default {
  name: 'index',
  data () {
    return {
      back: localStorage.getItem('back') || 0, // 背景默认值
      fullscreenLoading: false, // 加载中满屏状态
      yindao: '', // 引导语  亲爱的同学
      name: this.$route.query.name,
      type: '',
      x: 0,
      stu: 0,
      js: Number(this.$route.query.type),
      tabPosition: 'left',
      data: {}
    }
  },
  components: {
    info,
    stu
  },
  methods: {
    hid (index) {
      this.x = index
      this.stu = index
    },
    logout () {
      localStorage.removeItem('sessionid')
      localStorage.removeItem('type')
      localStorage.removeItem('uid')
      this.$router.push('/')
    },
    sx () {
      // 刷新功能-组件定义的别名 请求完成后重新调用组件
      this.$nextTick(() => {
        if (this.js == 2) {
          this.$refs.sx_tea.info()
        } else {
          this.$refs.sx_stu.info()
        }
      })
    },
    handleCommand (index) {
      var base = this.data[index]
      this.$message({type: 'success', message: '您选择了' + base.name + '(' + base.p + ')', center: true})
      this.fullscreenLoading = true
      this.$router.push('/')
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
    checkout () {
      var n = parseInt(Math.random(0, 1) * 5)
      if (n === this.back) {
        this.checkout()
      } else {
        this.back = n
      }
      localStorage.setItem('back', this.back)
    }
  },
  computed: {
    nav () {
      if (this.js == 1) {
        this.yindao = '亲爱的'
        this.type = '同学！'
        return ['基本信息', '绑定微信', '免费课时', '清除数据', '更多功能']
      } else {
        this.yindao = '尊敬的'
        this.type = '老师！'
        return ['基本信息', '获取督导资格', '辅助功能', '娱乐-小游戏', '娱乐-拼图']
      }
    }
  },
  created () {
    api.get('/get/quick/').then(res => {
      this.data = res.data
    })
  }
}
</script>
<style scoped>
  .content {
    width: 1000px;
    height: 600px;
    /*border: 1px black solid;*/
    margin: auto;
    padding: 15px;
  }

  .warm {
    font-size: 20px;
    color: blue;
  }

  .head {
    text-align: left;
    margin-top: 0;
    margin-left: 5%
  }

  .out {
    display: inline-block;
    margin: 0;
    margin-left: 10%
  }

  #c-content {
    margin-top: 10px;
    border: 1px solid #F5F7FA;
    border-radius: 10px;
    height: 600px;
    position: relative;
    box-shadow: #F5F7FA 2px 2px;
    background-color: white;
  }

  .hid {
    background-color: white;
    color: #409EFF !important;
    border-right: none;
  }

  .a-content-left {
    font-size: 20px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    cursor: pointer;
    color: gray;
    border-radius: 10px;
  }

  .a-content-left:hover {
    background-color: white;
    color: #409EFF;
  }

  #a-content-left {
    /*border-right: 1px solid darkgray;*/
    width: 20%;
    height: 600px;
    background-color: #F5F7FA;
    border-radius: 10px;
  }

  #a-content-right {
    position: absolute;
    top: 0;
    right: 0;
    width: 80%;
    height: 600px;
    /*padding-top: 20px;*/
    /*padding-left: 20px;*/
    overflow: auto;
    text-align: left;
    margin-bottom: 50px;
  }
</style>
