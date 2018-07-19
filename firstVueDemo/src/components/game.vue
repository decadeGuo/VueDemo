<template>
<div>
  <p class="update-info"></p>
  <div class="game">
    <p class="game-title">火眼金睛</p>
    <div class="game-left">
      <span class="wenzi" :class="['l_'+level,{'show':sa===index}]" v-for="(item,index) in content" :key="index" @click="sel(index)">{{item}}</span>
    </div>
    <div class="game-right">
      <div style="height: 141px">
        <div v-if="succe">
        <p style="margin-top: 30px;font-size: 1.1rem;color: orangered">恭喜你</p>
        <p style="font-size: 1.5rem;color: orangered">找到了</p>
        <p style="font-size: 0.8rem;color: orangered">用时: <span style="font-size: 1.3rem;color: black">{{res.time}}</span>S</p>
        <p style="font-size: 0.8rem;color: blue">段位评分:<br> <span style="font-size: 1.5rem;color: red">{{res.score}}</span></p>
        </div><div v-else style="margin-top: 20px">规则：找出不同的字<br>当前等级：{{level}}<br>当前字数：{{al}}</div>
      </div>
      <div>
      <button id="jx" @click="begain" v-if="already">{{go}}</button>
        <button id="jx" @click="begain" v-else disabled>{{go}}</button>
        <div style="margin-top: 20px">
          <p>最高记录</p>
          <p v-for="(item,index) in jilu" :key="index" v-if="jilu">{{item.lv}}: <span style="color: red">{{item.dw}}</span></p>
          <el-button type="primary" round plain style="margin-top: 10px" @click="showans">投降，查看答案</el-button>
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
      is_hit_showans: 0, // 有没有点击查看答案 0 默认 -1 点击过 1 答对 用于判断下次继续挑战的难度
      go: '开始挑战', // 主按钮文字
      succe: false, // 答对后显示文字
      level: 0, // 游戏级别
      content: {}, // 游戏内容
      right: -1, // 正确答案的索引
      al: '0', // 字数
      res: {}, // 答对后接口返回对象
      already: true, // 主按钮是否可点击
      sa: -1, // 显示正确答案的时候 改值置为正确答案的索引
      time: 0, // 用时
      time1: '', //  计时器
      jilu: [] // 最高记录
    }
  },
  methods: {
    begain () {
      this.succe = false
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
        this.jilu = res.data.jilu
        this.go = '正在游戏...'
        this.time = 0
        this.time1 = setInterval(() => {
          this.time ++
        }, 1000)
      })
    },
    sel (index) {
      if (this.sa !== -1) {
        return
      }
      if (this.right === index) {
        this.$message({type: 'success', message: '答对了！', center: true})
        api.get('/vue/game/res/?time=' + this.time + '&l=' + this.level).then(res => {
          clearInterval(this.time1)
          this.succe = true
          this.res = res.data
          this.jilu = res.data.jilu
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
  height: 25px;
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
    animation:myfirst 5s;
  }
  @keyframes myfirst
{
	from {color:green;}
	to {color:red;}
}
</style>
