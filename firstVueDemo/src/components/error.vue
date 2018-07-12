<template>
  <div class="error">
    <el-alert
      :closable="false"
      :title="error"
      type="error">
    </el-alert>
  </div>
</template>
<script>
export default {
  props: {
    error: {'type': String, default: '错误信息！'}
  }
}
</script>
<style>
  .error{
    width: 400px;
    margin-left: 200px;
    margin-top: 10px;
  }
</style>
