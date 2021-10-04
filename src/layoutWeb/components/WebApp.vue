<template>
  <el-main class="web-app" :style="genStyle">
    <transition name="fade-transform" mode="out-in">
      <router-view />
    </transition>
  </el-main>
</template>

<script>
export default {
  name: 'WebApp',
  props: {
    mHeight: {
      type: String,
      required: true,
    },
  },
  computed: {
    genStyle() {
      return { height: this.mHeight };
    },
  },
};
</script>

<style lang="scss" scoped>
  .web-app{
    padding-top: 15px;
    padding-bottom: 0px;
    background-image: url('/images/fondo.jpg');
    background-repeat: no-repeat;
    background-position: right bottom;
    background-size: 550px;
  }
</style>
