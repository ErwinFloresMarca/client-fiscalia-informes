<template>
  <div class="desc-container">
    <el-row :gutter="20" type="flex" justify="space-between">
      <strong>{{ getViaje.destino }}</strong> <span>{{ getTimeAgo }}</span>
    </el-row>
    <div class="desc">
      <div>
        <p>{{ getViaje.resumen }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { timeAgo } from '@/filters';
export default {
  name: 'DescripcionViaje',
  props: {
    viaje: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getViaje() {
      return this.viaje;
    },
    getTimeAgo() {
      return timeAgo(this.getViaje.fechaViaje);
    },
  },
};
</script>

<style lang="scss" scoped>
.desc-container{
    padding-left: 10px;
}
.desc{
    width: 100%;
    height: 165px;
    margin-top: 20px;
    overflow-y: auto;
    text-align: left;
}
</style>
