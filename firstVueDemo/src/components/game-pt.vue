<template>
  <div>
    <p class="update-info">敬请期待</p>
  <div class="game">
    <p class="game-title">拼图</p>
    <div class="game-left">
      <div class="box">
          <ul class="puzzle-wrap">
              <li :class="{'puzzle': true, 'puzzle-empty': !puzzle}"
                  v-for="(puzzle,index) in puzzles"
                  v-text="puzzle" :key="index" @click="moveFn(index)"
              ></li>
          </ul>
      </div>
    </div>
    <div class="game-right">
      <div class="ruler">
        <p style="font-size: 1rem;color: red" v-if="pass">恭喜你,闯关成功!</p>
      </div>
      <button class="jx" @click="begain1">通关</button>
      <button class="jx" @click="begain">重置游戏</button>
    </div>
  </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'game-pt',
  data () {
    return {
      puzzles: [],
      pass: false,
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, ''] // 答案刘表
    }
  },
  methods: {
    // 重置渲染
    render () {
      let puzzleArr = [],
        i = 1
        // 生成包含1 ~ 15数字的数组
      for (i; i < 16; i++) {
        puzzleArr.push(i)
      }
      // 随机打乱数组
      puzzleArr = puzzleArr.sort(() => {
        return Math.random() - 0.5
      })
      // 页面显示
      this.puzzles = puzzleArr
      this.puzzles.push('')
    },
    begain () {
      this.render()
      this.pass = false
    },
    begain1 () {
      this.puzzles = this.list
      this.passFn()
    },
    // 点击方块
    moveFn (index) {
      if (this.pass) {
        this.$message({type: 'success', message: '请重置游戏!', center: true})
        return
      }
      // 获取点击位置及其上下左右的值
      let curNum = this.puzzles[index],
        leftNum = this.puzzles[index - 1],
        rightNum = this.puzzles[index + 1],
        topNum = this.puzzles[index - 4],
        bottomNum = this.puzzles[index + 4]
      // 和为空的位置交换数值
      if (leftNum === '' && index % 4) {
        this.$set(this.puzzles, index - 1, curNum)
        this.$set(this.puzzles, index, '')
      } else if (rightNum === '' && index % 4 !== 3) {
        this.$set(this.puzzles, index + 1, curNum)
        this.$set(this.puzzles, index, '')
      } else if (topNum === '') {
        this.$set(this.puzzles, index - 4, curNum)
        this.$set(this.puzzles, index, '')
      } else if (bottomNum === '') {
        this.$set(this.puzzles, index + 4, curNum)
        this.$set(this.puzzles, index, '')
      }
      this.passFn()
    },
    // 校验是否过关
    passFn () {
      if (this.puzzles[15] === '') {
        const newPuzzles = this.puzzles.slice(0, 15)
        const isPass = newPuzzles.every((e, i) => e === i + 1)
        if (isPass) {
          this.pass = true
          this.$alert('恭喜你通关成功!', {center: true, type: 'warning'})
        }
      }
    }
  },
  mounted () {
    this.render()
  }
}
</script>

<style scoped>
  p{
    margin: 0;
  }
  ul,li{
    margin: 0;
  }
  .puzzle-wrap {
    width: 410px;
    height: 400px;
    margin: auto;
    padding: 0;
    /*background: #ccc;*/
    list-style: none;
}
  .puzzle {
    float: left;
    width: 100px;
    height: 100px;
    font-size: 20px;
    background: #f90;
    text-align: center;
    line-height: 100px;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 4px;
    text-shadow: 1px 1px 1px #B9B4B4;
    cursor: pointer;
}

.puzzle-empty {
    background: #ccc;
    box-shadow: inset 2px 2px 18px;
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
    height: 440px;
    width: 550px;
    margin-top: 5px;
    padding-top: 40px;
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
  .jx{
    margin-top: 10px;
    background-color: dodgerblue;
    font-size: 1.5rem;
    border-radius: 50px;
    cursor: pointer;
    width: 160px;
    height: 60px;
    color: white;
  }
  .jx:hover{
    background-color: white;
    color: black;
  }
  .ruler{
    height: 300px;
    padding-top: 30px;
  }
</style>
