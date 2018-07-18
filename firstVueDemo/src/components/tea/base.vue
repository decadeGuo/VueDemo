<template>
  <div>
    <!--加载中样式-->
    <el-div v-loading.fullscreen.lock="load0"></el-div>
    <!--培训中-->
    <el-span  v-loading.fullscreen.lock="loading"
              :element-loading-text="loadtext"
              :element-loading-spinner="loadingspinner"
              element-loading-background="rgba(0, 0, 0, 0.7)"></el-span>
    <!--通过培训-->
    <el-span  v-loading.fullscreen.lock="loading2"
              :element-loading-text="loadtext2"
              :element-loading-spinner="loadingspinner2"
              element-loading-background="rgba(0, 0, 0, 0.7)"></el-span>
    <div style="margin-left: 30px;" v-if="x==0">
      <p><span class="rem">教师ID：<span class="blue">{{uid}}</span></span></p>
      <p>
        <span class="rem">管理班级(cls_id)：</span><br>
        <span class="rem m-ll" style="color: dodgerblue" v-if="data1.cls_info" v-for="item in data1.cls_info">{{item.name}}({{item.id}})</span>
        <span class="rem m-ll" style="color: dodgerblue" v-else >暂无管理的班级</span>
      </p>
      <div>
        <span class="rem">当前督导资格：</span><br>
        <p class="rem m-ll" style="color: dodgerblue;margin-top: 0;margin-bottom: 8px" v-if="item.status==1"
           v-for="item in data1.pro_info">{{item.project_name}}({{item.project_id}}):有</p>
        <p class="rem m-ll" style="color: grey;margin-top: 0;margin-bottom: 8px" v-else
           >{{item.project_name}}({{item.project_id}}):无</p>
      </div>
    </div>
    <div style="margin-left: 30px;" v-if="x==1">
      <p><span class="rem">未通过培训的科目：</span></p>
      <div v-if="data1.need.length">
      <p v-for="(item) in data1.need" class="h"><span class="rem m-ll tishi" >{{item.name}}</span>
        <el-button type="primary" plain  @click="pass(item.id,1)"  style="margin-left: 20%">点我通过培训</el-button>
        <el-button type="info" round disabled style="margin-left: 20%">反向功能</el-button>
      </p>
      </div><p v-else class="rem m-ll tishi">没有需要培训的科目</p>

      <p><span class="rem">已培训完成的科目：</span></p>
      <div v-if="data1.already_info.length">
      <p v-for="item in data1.already_info"  class="h"><span class="rem m-ll tishi">{{item.project_name}}</span>
        <el-button type="info" round disabled style="margin-left: 20%">点我通过培训</el-button>
        <el-button type="primary" plain @click="pass(item.project_id,2)" style="margin-left: 20%">反向功能</el-button></p>
      </div>
      <p v-else class="rem m-ll tishi">没有已经通过培训的科目</p>
    </div>
    <div style="margin-left: 30px;" v-if="x==2">
      <!--<p class="rem m-l blue">更多功能敬请期待。。。</p>-->
      <logs></logs>
    </div>
    <div style="margin-left: 30px;" v-if="x==3">
      <!--<p class="rem m-l blue">更多功能敬请期待。。。</p>-->
      <games></games>
    </div>
  </div>

</template>

<script>
import {api, URL} from '../../api/index'
import logs from '../log'
import games from '../game'
export default {
  data () {
    return {
      load0: true,
      loading: false,
      loadtext: '正在努力通过培训。。。',
      loadingspinner: 'el-icon-loading',
      loading2: false,
      loadtext2: '培训完成！',
      loadingspinner2: 'el-icon-circle-check',
      uid: localStorage.getItem('uid'),
      data1: {}
    }
  },
  props: {
    x: {'type': Number, default: 0}
  },
  methods: {
    // 点击通过培训
    pass (id, type) {
      if (type == 2) {
        this.loadtext = '正在努力取消培训。。。'
        this.loadtext2 = '取消成功！'
      }
      this.loading = true
      setTimeout(() => {
        api.get(URL.DUDAO(id, type)).then(res => {
          let resData = res
          if (resData.status == 1) {
            this.loading = false
            this.loading2 = true
            setTimeout(() => {
              this.loading2 = false
              this.loadtext = '正在努力通过培训。。。'
              this.loadtext2 = '培训完成！'
              this.info()
            }, 1500)
          } else {
            this.loadtext = resData.message
            setTimeout(() => {
              this.loading = false
              this.loadtext = '正在努力通过培训。。。'
              this.loadtext2 = '培训完成！'
            }, 1500)
          }
        })
      }, 4000)
    },
    //  初始化函数
    info () {
      this.load0 = true
      api.get(URL.TEAINDEX).then(res => {
        let resData = res
        if (resData.status == 1) {
          this.load0 = false
          this.data1 = resData.data
        } else {
          this.load0 = false
          this.$alert('加载失败', '错误提示！')
        }
      })
    }
  },
  created () {
    this.info()
  },
  components: {
    logs,
    games
  }
}
</script>

<style scoped>
  /*.m-ll {*/
    /*margin-left: 50px*/
  /*}*/
  /*.tishi{*/
    /*color: dodgerblue;*/
/*}*/
  /*.h{*/
    /*margin-top: 8px;*/
    /*margin-bottom: 0;*/
  /*}*/
  /*.b{display: block!important;}*/
</style>
