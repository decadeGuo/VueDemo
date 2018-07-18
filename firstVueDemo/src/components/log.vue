<template>
<div class="log">
  <el-collapse v-model="activeNames" accordion>
  <el-collapse-item title="查看操作日志" name="1">
    <div v-for="(item,index) in data.logs" :key="index">{{item}}</div>
  </el-collapse-item>
    <el-collapse-item title="留言反馈" name="2">
      <div style="width: 700px">
        <el-input
      type="text"
      :autosize="{ minRows: 1, maxRows: 4}"
      placeholder="再此输入您的意见"
      v-model="text"><el-button type="primary" slot="append" :loading="load" @click="sub">提交</el-button>
    </el-input>
        <div>
          <p class="ds-p">留言区：</p>
          <p class="ds-p" v-for="(item,index) in data.liuyan" :key="index"><span class="blue">{{item.name}}</span>:{{item.content}}</p>
        </div>
      </div>
  </el-collapse-item>
    <el-collapse-item title="打赏激励" name="３">
      <div style="position: relative">
        <img src="http://192.168.6.134:8000/static/imgs/money.png" alt="打赏一下吧">
        <div class="ds">您的支持就是我前进的动力！<br>可扫描左边二维码进行打赏!<br>成功后本站会重谢，并会大力表杨宣传！</div>
        <div style="display: inline-block;margin-left: 350px;"><img src="../assets/aixin.jpeg" alt=""></div>
      </div>
      <div>
        <p class="ds-p blue">郑重感谢！</p>
        <p class="ds-p">感谢<span class="blue f-12">郭东波</span>于 <span class="blue">2018/07/18</span>捐赠<span class="my f-12">500</span>元！</p>
        <p class="ds-p">感谢<span class="blue f-12">郭东波</span>于 <span class="blue">2018/07/18</span>捐赠<span class="my f-12">125</span>元！</p>
      </div>
  </el-collapse-item>
  </el-collapse>
</div>
</template>

<script>
import {api, URL} from './../api/index'
export default {
  data () {
    return {
      activeNames: '',
      load: false,
      text: '',
      data: {}
    }
  },
  methods: {
    sx () {
      api.get('/vue/index/').then(res => {
        this.data = res.data
        console.log(this.data)
        this.text = ''
      })
    },
    sub () {
      if (!this.text) {
        this.$message({type: 'warning', message: '提交内容不能为空哦！', center: true})
        return
      }
      this.load = true
      api.post('/vue/liuyan/', {text: this.text}).then(res => {
        this.sx()
        this.load = false
      })
    }
  },
  created () {
    this.sx()
  }
}
</script>

<style scoped>
.log{
  margin-top: 10px;
  margin-left: 20px;
  width: 700px;
  height: 550px;
}
  img{
    width: 150px;
    height: 150px;
  }
  .ds{
    position: absolute;
    /*border: 1px red solid;*/
    top:32px;
    left: 200px;
  }
  .ds-p{
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 10px;
  }
  .my{
    color: red;
  }
  .f-12{
    font-size: 1.2rem;
  }

</style>
