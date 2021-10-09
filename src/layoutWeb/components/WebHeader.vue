<template>
  <el-header class="web-header" :height="hHeight">
    <div class="images-container" width="90%">
      <el-row type="flex" justify="space-around">
        <div class="image-content hidden-xs-only">
          <el-image
            style="width: 220px; height: 140px"
            src="/images/imagen-e-p-bolivia.jpg"
            fit="contain"
          />
        </div>
        <div class="image-content">
          <el-image
            style="width: 220px; height: 140px"
            src="/images/iniafLogo.png"
            fit="contain"
          />
        </div>
        <div class="image-content hidden-xs-only">
          <el-image
            style="width: 80px; height: 140px"
            src="/images/potosiMapa.png"
            fit="contain"
          />
        </div>
      </el-row>
    </div>
    <el-row :gutter="20" type="flex" justify="center">
      <web-menu />
    </el-row>
  </el-header>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css';
import WebMenu from './WebMenu.vue';
export default {
  name: 'WebHeader',
  components: {
    WebMenu,
  },
  props: {
    hHeight: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.web-header{
  padding-left: 10px; padding-right: 10px;
}
.images-container {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4);
  padding: 0;
  margin-bottom: 5px;
}
.image-content{
  width: 220px;
  height: 140px;
  display: flex;
  justify-content: center;
}
</style>
