<template>
  <div class="content">
    <div class="head"><span>{{yindao}}<span class="warm">{{name}}</span>{{type}}</span>
      <p class="out"><span class="blue corsur el-icon-refresh" @click="sx">刷新</span>
        <span class="blue m-l corsur el-icon-d-arrow-left" @click="logout" >退出登录</span></p>
    </div>
    <div id="c-content">
      <div id="a-content-left">
        <div class="a-content-left" :class="{'hid':index==x}" v-for="(item,index) in nav" @click="hid(index)">{{item}}</div>
      </div>
      <div id="a-content-right">
        <info :x="x" ref="sx_tea" v-if="js==2"></info>
        <stu :x="stu" ref="sx_stu" v-if="js==1"></stu>
      </div>
    </div>
  </div>
</template>
<script>
import info from './tea/base'
import stu from './stu/info'
export default {
  name: 'index',
  data () {
    return {
      yindao: '',
      name: this.$route.query.name,
      type: '',
      x: 0,
      stu: 0,
      js: Number(this.$route.query.type),
      tabPosition: 'left'
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
    }
  },
  computed: {
    nav () {
      if (this.js == 1) {
        this.yindao = '亲爱的'
        this.type = '同学！'
        return ['基本信息', '绑定微信', '修改经验', '清除数据', '更多功能']
      } else {
        this.yindao = '尊敬的'
        this.type = '老师！'
        return ['基本信息', '获取督导资格', '更多功能']
      }
    }
  },
  created () {

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
    margin-left: 60%
  }

  #c-content {
    margin-top: 10px;
    border: 1px solid #F5F7FA;
    border-radius: 10px;
    height: 600px;
    position: relative;
    box-shadow: #F5F7FA 2px 2px;
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
