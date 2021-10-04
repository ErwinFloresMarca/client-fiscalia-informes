<template>
  <div class="show-container">
    <el-card shadow="hover" :body-style="{ padding: '20px' }">
      <el-row :gutter="20">
        <el-col v-if="getImagePosition === 'lefth'" :span="10" :offset="0">
          <imagenes-noticia :imagenes="getNoticia.images" />
        </el-col>
        <el-col :span="14" :offset="0">
          <descripcion-noticia :noticia="getNoticia" />
        </el-col>
        <el-col v-if="getImagePosition === 'right'" :span="10" :offset="0">
          <imagenes-noticia :imagenes="getNoticia.images" />
        </el-col>
      </el-row>
    </el-card>
  </div>
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
.show-container{
    display: flex;
    justify-content: center;
}
.el-row{
    width: 800px;
}
.el-card{
    margin: 5px;
}
</style>
