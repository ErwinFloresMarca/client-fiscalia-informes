<template>
  <center>
    <el-card shadow="hover" :body-style="{ padding: '20px' }">
      <el-row :gutter="20">
        <el-col v-if="getImagePosition === 'lefth'" :span="10" :offset="0">
          <imagenes-noticia :imagenes="getNoticia.imagenes" />
        </el-col>
        <el-col :span="14" :offset="0">
          <descripcion-noticia :noticia="getNoticia" />
        </el-col>
        <el-col v-if="getImagePosition === 'right'" :span="10" :offset="0">
          <imagenes-noticia :imagenes="getNoticia.imagenes" />
        </el-col>
      </el-row>
    </el-card>
  </center>
</template>

<script>
import DescripcionNoticia from './DescripcionNoticia.vue';
import ImagenesNoticia from './ImagenesNoticia.vue';
export default {
  name: 'ShowMoticia',
  components: {
    ImagenesNoticia,
    DescripcionNoticia,
  },
  props: {
    noticia: {
      type: Object,
      required: true,
    },
    imagePosition: {
      type: String,
      default: 'left',
    },
  },
  computed: {
    getNoticia() {
      return this.noticia;
    },
    getImagePosition() {
      return this.imagePosition;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-card{
    max-width: 800px;
    margin: 5px;
}
</style>
