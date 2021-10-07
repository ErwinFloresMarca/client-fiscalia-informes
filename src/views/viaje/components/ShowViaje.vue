<template>
  <center>
    <el-card shadow="hover" :body-style="{ padding: '20px' }">
      <el-row :gutter="20">
        <el-col v-if="getImagePosition === 'lefth'" :span="10" :offset="0">
          <imagenes-viaje :imagenes="getViaje.imagenes" />
        </el-col>
        <el-col :span="14" :offset="0">
          <descripcion-viaje :viaje="getViaje" />
        </el-col>
        <el-col v-if="getImagePosition === 'right'" :span="10" :offset="0">
          <imagenes-viaje :imagenes="getViaje.images" />
        </el-col>
      </el-row>
    </el-card>
  </center>
</template>

<script>
import ImagenesViaje from './ImagenesViaje.vue';
import DescripcionViaje from './DescripcionViaje.vue';
export default {
  name: 'ShowViaje',
  components: {
    ImagenesViaje,
    DescripcionViaje,
  },
  props: {
    viaje: {
      type: Object,
      required: true,
    },
    imagePosition: {
      type: String,
      default: 'left',
    },
  },
  computed: {
    getViaje() {
      return this.viaje;
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
