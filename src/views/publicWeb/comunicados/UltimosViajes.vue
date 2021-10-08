<template>
  <div>
    <show-viaje
      v-for="(viaje, index) in viajes"
      :key="'viaje-'+index"
      :viaje="viaje"
      :image-position="index%2===0? 'lefth':'right'"
    />
    <el-row type="flex" justify="center">
      <el-button v-if="showMas" type="primary" size="default" @click="getViajes()">Mas</el-button>
      <span v-else>No hay mas viajes</span>
    </el-row>
  </div>
</template>

<script>
import { ViajeResource } from '@/api/viaje';
import ShowViaje from '@/views/viaje/components/ShowViaje.vue';
export default {
  name: 'UltimosViajes',
  components: {
    ShowViaje,
  },
  data() {
    return {
      viajes: [],
      total: 0,
      loading: false,
      paginate: {
        skip: 0,
        limit: 3,
      },
    };
  },
  computed: {
    showMas() {
      return this.viajes.length < this.total;
    },
  },
  created() {
    ViajeResource.count().then(resp => {
      this.total = resp.data.count;
      this.getViajes();
    }).catch(err => console.log(err));
  },
  methods: {
    getViajes() {
      if (this.showMas) {
        this.loading = true;
        ViajeResource.list({
          order: 'fechaRegistro desc',
          ... this.paginate,
        }).then(resp => {
          this.loading = false;
          this.viajes = [...this.viajes, ...resp.data];
          this.paginate.skip += this.paginate.limit;
        }).catch(err => console.log(err));
      }
    },
  },
};
</script>

<style>

</style>
