<template>
  <transition name="el-zoom-in-bottom" mode="out-in">
    <el-container direction="vertical">
      <web-app :m-height="mH" />
    </el-container>
  </transition>
</template>

<script>
import WebApp from './components/WebApp.vue';
export default {
  name: 'LayoutWeb',
  components: { WebApp },
  data() {
    return {
      hH: '0px',
      mH: '',
      fH: '0px',
    };
  },
  created() {
    this.calcMainHeight();
    window.onresize = this.calcMainHeight;
  },
  destroyed() {
    window.onresize = undefined;
  },
  methods: {
    calcMainHeight() {
      this.mH = (window.innerHeight - (parseInt(this.hH) + parseInt(this.fH) + 14)) + 'px';
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
