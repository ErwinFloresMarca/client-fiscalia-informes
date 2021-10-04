<template>
  <el-carousel
    height="200px"
    type="default"
    direction="horizontal"
    :initial-index="0"
    :autoplay="true"
    :interval="3000"
    :loop="true"
    trigger="hover"
    indicator-position="none"
    arrow="hover"
  >
    <el-carousel-item v-for="(img, index) in getImagenes" :key="'image-'+index">
      <el-image style="width: 100%; height: 200px" :src="img.url" fit="contain" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: 'ImagenesNoticia',
  props: {
    imagenes: {
      type: Array,
      required: true,
    },
  },
  computed: {
    getImagenes() {
      return this.imagenes;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
