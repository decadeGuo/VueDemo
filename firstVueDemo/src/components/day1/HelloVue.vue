<template>
  <div id="xiaoyu">Hello A Fang {{message}}
    <p>
      <router-link to="/"> 返回到刚才</router-link>
      <span>name:{{name}}</span>
      <span>message:{{message}}</span>
    </p>
  </div>
</template>
<script type="text/javascript">
import Axios from 'axios'
export default {
  name: 'xiaoyu',
  data () {
    return {
      message: '',
      name: ''
    }
  },
  created () {
    let that = this
    Axios.get('http://192.168.6.134:8000/vue/test/').then(function(response) {
      that.message = response.data.data.message
      that.name = response.data.data.name
    }).catch(function (response) {
      console.log('faild')
      console.log(response)// 发生错误时执行的代码
    })
  }
}
</script>
<style>
  #xiaoyu {
    color: green;
    font-size: 28px;
  }
</style>
