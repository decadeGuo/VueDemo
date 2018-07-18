<template>
<div>
  <p class="update-info">提示：由于技术原因，该模块在持续更新！</p>
  <div class="game">
    <p class="game-title">火眼金睛</p>
    <div class="game-left">
      <span class="wenzi" :class="['l_'+level,{'show':sa===index}]" v-for="(item,index) in content" :key="index" @click="sel(index)">{{item}}</span>
    </div>
    <div class="game-right">
      <div style="height: 141px">
        <div v-if="succe">
        <p style="margin-top: 50px;font-size: 1.1rem;color: orangered">恭喜你</p>
        <p style="font-size: 1.5rem;color: orangered">找到了</p>
        <p style="font-size: 0.8rem;color: orangered">用时: <span style="font-size: 1.3rem;color: black">{{res.time}}</span>S</p>
        <p style="font-size: 0.8rem;color: blue">段位评分:<br> <span style="font-size: 1.5rem;color: red">{{res.score}}</span></p>
        </div><div v-else style="margin-top: 20px">规则：找出不同的字<br>当前等级：{{level}}<br>当前字数：{{al}}</div>
      </div>
      <div>
      <button id="jx" @click="begain" v-if="already">{{go}}</button>
        <button id="jx" @click="begain" v-else disabled>{{go}}</button>
        <div style="margin-top: 40px">
          <p style="color: aqua;font-size: 1.2rem;height: 40px" v-if="ans">真笨！答案即将亮起</p>
          <el-button type="primary" round plain style="margin-top: 20px" @click="showans">投降，查看答案</el-button>
        </div>
    </div>
    </div>

  </div>
</div>
</template>

<script>
import {api, URL} from './../api/index'
export default {
  name: 'game',
  data () {
    return {
      is_hit_showans: 0,
      go: '开始挑战',
      ans: false,
      succe: false,
      level: 0,
      content: {},
      right: -1,
      al: '',
      res: {},
      already: true,
      sa: -1,
      time: 0,
      time1: ''
    }
  },
  methods: {
    begain () {
      this.succe = false
      this.ans = false
      this.sa = -1
      if (this.is_hit_showans >= 0) {
        this.level ++
      } else if (this.is_hit_showans === -1) {
        this.level = 1
      }
      api.get('/vue/game/?l=' + this.level).then(res => {
        this.content = res.data.c
        this.right = res.data.n
        this.al = res.data.al
        this.already = false
        this.go = '正在游戏...'
        this.time = 0
        this.time1 = setInterval(() => {
          this.time ++
        }, 1000)
      })
    },
    sel (index) {
      if (this.right === index) {
        this.$message({type: 'success', message: '答对了！', center: true})
        api.get('/vue/game/res/?time=' + this.time).then(res => {
          clearInterval(this.time1)
          this.succe = true
          this.res = res.data
          this.go = '继续挑战'
          this.already = true
          this.is_hit_showans = 1
        })
      } else {
        this.$message({type: 'warning', message: '答错了！', center: true})
      }
    },
    showans () {
      this.sa = this.right
      this.go = '开始游戏'
      this.already = true
      this.ans = true
      this.is_hit_showans = -1
      clearInterval(this.time1)
    }
  }
}
</script>

<style scoped>
  p{
    margin: 0;
  }
  .game{
    /*background-image: url("../assets/xue.jpg");*/
    /*background-size: 100% 100%;*/
    background-color:whitesmoke ;
    width: 750px;
    height: 530px;
    position: relative;
  }
.update-info{
  font-size: 0.8rem;
  color: gray;
}
  .game-title{
    font-size: 1.5rem;
    text-align: center;
  }
  .game-left{
    background-color: azure;
    height: 480px;
    width: 550px;
    margin-top: 5px;
  }
  .game-right{
    position: absolute;
    top:41px;
    right:10px;
    background-color: lightskyblue;
    width: 180px;
    height: 480px;
    text-align: center;
  }
  .wenzi{
    color: green;
    cursor: pointer;
  }
  .l_1,.l_0{
    font-size: 4.6rem;
  }
  .l_2{
    font-size: 2.5rem;
  }
  .l_3{
    font-size: 1.6rem;
  }
  .l_4{
    font-size: 1.2rem;
    margin-left: 0.8px;
    margin-right: 0.8px;
  }
  .l_5{
    font-size: 1rem;
    margin-left: 0.5px;
    margin-right: 0.5px;
  }
  #jx{
    margin-top: 10px;
    background-color: dodgerblue;
    font-size: 1.5rem;
    border-radius: 50px;
    cursor: pointer;
    width: 160px;
    height: 60px;
    color: white;
  }
  #jx:hover{
    background-color: white;
    color: black;
  }
  .show{
    color: red;
  }
</style>
