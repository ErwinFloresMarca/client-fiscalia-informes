<template>
  <transition name="el-zoom-in-bottom" mode="out-in">
    <el-container direction="vertical">
      <web-header :h-height="hH" />
      <web-app :m-height="mH" />
      <web-footer :f-height="fH" />
    </el-container>
  </transition>
</template>

<script>
import WebApp from './components/WebApp.vue';
import WebFooter from './components/WebFooter.vue';
import WebHeader from './components/WebHeader.vue';
export default {
  name: 'LayoutWeb',
  components: { WebHeader, WebApp, WebFooter },
  data() {
    return {
      hH: '210px',
      mH: '',
      fH: '120px',
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
