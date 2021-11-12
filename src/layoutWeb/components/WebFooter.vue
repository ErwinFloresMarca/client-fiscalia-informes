<template>
  <el-footer class="web-footer" :height="fHeight">
    <el-row :gutter="20" type="flex" justify="center">
      <h1><strong>UN FOOTER</strong></h1>
    </el-row>
  </el-footer>
</template>

<script>
export default {
  name: 'WebFooter',
  props: {
    fHeight: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.web-footer{
  padding-top: 12px;
  margin-top: 10px;
  box-shadow: 0 0px 12px 0 rgba(0, 0, 0, 0.4);
}
hr.rounded {
  border-top: 8px solid rgb(78, 78, 78);
  border-radius: 5px;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  box-shadow: 0 0px 12px 0 rgba(0, 0, 0, 0.5);
}
</style>
