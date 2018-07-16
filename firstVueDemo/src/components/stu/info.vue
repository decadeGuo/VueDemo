<template>
  <div style="margin-top: 20px">
    <!--加载中样式-->
    <!--<el-div v-loading.fullscreen.lock="load0"></el-div>-->
    <!--培训中-->
    <!--<el-span  v-loading.fullscreen.lock="loading"-->
              <!--:element-loading-text="loadtext"-->
              <!--:element-loading-spinner="loadingspinner"-->
              <!--element-loading-background="rgba(0, 0, 0, 0.7)"></el-span>-->
    <!--&lt;!&ndash;通过培训&ndash;&gt;-->
    <!--<el-span  v-loading.fullscreen.lock="loading2"-->
              <!--:element-loading-text="loadtext2"-->
              <!--:element-loading-spinner="loadingspinner2"-->
              <!--element-loading-background="rgba(0, 0, 0, 0.7)"></el-span>-->
    <div style="margin-left: 30px;" v-if="x==0">
      <p><span class="el-icon-info weight">&nbsp;&nbsp;&nbsp;<span>============通用信息============</span></span></p>
      <p><span class="rem">学生ID烦烦烦：<span class="tishi">{{uid}}</span></span></p>
      <p><span class="rem">是否绑定微信：<span class="tishi">{{data1.is_weixin}}</span></span></p>
      <p><span class="rem">是否有答案权限：<span class="tishi" v-if="data1.is_daan">有</span><span class="tishi" v-else>无</span></span>
        <el-button type="primary" plain round size="mini" class="answer" v-if="data1.is_daan">取消答案</el-button>
        <el-button type="primary" plain round size="mini" class="answer" v-else>添加答案</el-button>
      </p>
      <p><span class="el-icon-info weight">&nbsp;&nbsp;&nbsp;<span>============科目信息============</span></span></p>
      <p><el-dropdown trigger="click" @command="handleCommand" placement="bottom-start">
        <el-button type="primary" plain class="rem">
          {{cls_name}}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item,index) in cls" :command="item" :key="index">{{item}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown></p>
      <div style="margin-left: 10px">
        <p style="margin-top: 20px;"><span class="rem">头像：<span class="tishi">暂不支持</span></span>
                                </p>
        <p><span class="rem">当前经验值：<span class="tishi">123</span>
                    <span class="m-l">等级：</span><span class="tishi">10</span>
                    <span class="m-l">称号：</span><span class="tishi">学神</span>
                </span></p>
          <p><span class="rem">当前教材：<span class="tishi">1234</span></span></p>
          <p><span class="rem">当前班级：<span
                  class="tishi">测试班级(123)</span></span></p>
          <p><span class="rem">当前课时：<span
                  class="tishi">41(41)</span></span></p>
          <p><span class="rem">当前关卡：<span class="tishi">5</span></span></p>
      </div>
    </div>
    <div style="margin-left: 30px;" v-if="x==1">
      <p><span class="el-icon-info weight">&nbsp;&nbsp;&nbsp;<span>============微信绑定，更换，解绑============</span></span></p>
      <p><span class="rem">当前状态：<span class="tishi">已绑定</span></span>
          <el-button type="primary" plain round size="mini" class="answer">解除绑定</el-button>
      </p>
      <p><span class="rem">微信绑定流程：</span></p>
      <p class="m-l rem">1、绑定优鸿教育微信公众号 <br>
          <img class="money" src="../../assets/yh_weixin.jpg" style="margin-left: 30px;">
          <br>2、向系统发送“//openid”，等待系统返回字符串
          <br>3、将返回的字符串粘贴到下面的输入框内，点击提交即可。
      </p>
      <p class="m-l rem">字符串粘贴处：<el-input class="openid" v-model="openid" placeholder="openid：omNnxwrYo-p_Wsve8OwUnwZGT5j4"></el-input></p>
      <p class="m-l">
          <el-button  type="primary" plain style="width: 300px">提交</el-button>
      </p>
      <p class="m-l" style="color: blueviolet">提示：若之前绑定过，提交输入框为空即可</p>
    </div>
    <div style="margin-left: 30px;" v-if="x==2">
      <p><span class="el-icon-info weight">&nbsp;&nbsp;&nbsp;<span>============修改经验============</span></span></p>
      <div>
        <span class="rem">项目：<span class="tishi">初中数学培优</span></span>
        <p class="m-ll" style="margin-top: 5px"><span class="rem">当前经验值：<span class="tishi">1123</span>
                                            <span class="m-l">等级：</span><span class="tishi">5</span>
                                            <span class="m-l">称号：</span><span class="tishi">学神</span>
        </span><br>
        <el-button v-for="(item,index) in buts" :type="item.type" plain size="small" :key="index">{{item.val}}exp</el-button>
        </p>
      </div>
    </div>
    <div style="margin-left: 30px;" v-if="x==3">
      <p><span class="el-icon-info weight">&nbsp;&nbsp;&nbsp;<span>============清楚数据============</span></span></p>
      <el-dropdown trigger="click" @command="handleCommand2" placement="bottom-start" style="margin-top: 10px">
        <el-button type="primary" plain class="rem">
          {{cls_name2}}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item,index) in cls" :command="item" :key="index">{{item}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div style="margin-left: 30px;" v-if="x==4">
      <p><span class="el-icon-info weight">&nbsp;&nbsp;&nbsp;<span>============更多功能敬请期待！============</span></span></p>
    </div>
  </div>
</template>

<script>
import {api, URL} from '../../api/index'
export default {
  name: 'info',
  data () {
    return {
      load0: true,
      loading: false,
      loadtext: '正在努力通过培训。。。',
      loadingspinner: 'el-icon-loading',
      loading2: false,
      loadtext2: '培训完成！',
      loadingspinner2: 'el-icon-circle-check',
      cls_name: '点击查看班级哦',
      cls_name2: '点击查看班级',
      uid: localStorage.getItem('uid'),
      cls: ['测试班级(初中数学培优)', '恬恬的班级(高中数学)'],
      buts: [{val: '+10', type: 'primary'}, {val: '+20', type: 'primary'}, {val: '+50', type: 'primary'}, {val: '+100', type: 'primary'},
        {val: '-10', type: 'warning'}, {val: '-20', type: 'warning'}, {val: '-50', type: 'warning'}, {val: '-100', type: 'warning'}],
      data1: {}
    }
  },
  props: {
    x: {'type': Number, default: 0}
  },
  methods: {
    handleCommand (command) {
      this.$message('您选择了' + command)
      this.cls_name = command
    },
    handleCommand2 (command) {
      this.$message('您选择了' + command)
      this.cls_name2 = command
    },
    info () {
      api.get(URL.TEAINDEX).then(res => {
        let resData = res
        console.log(resData.data)
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
  }
}
</script>

<style scoped>
  p {
    margin-bottom: 0;
    margin-top: 10px
  }

  .weight {
    /*font-weight: bold;*/
    color: blueviolet;
    font-size: 1.4rem;
  }
  .money{
    width: 200px;
    height: 200px;
  }
  .answer {
    margin-left: 20px;
    position: relative;
    top: -4px
  }
  .openid{
    width: 400px;
  }
</style>
