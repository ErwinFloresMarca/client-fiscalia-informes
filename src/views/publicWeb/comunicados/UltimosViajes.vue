<template>
  <div>
    <show-viaje
      v-for="(viaje, index) in viajes"
      :key="'viaje-'+index"
      :viaje="viaje"
      :image-position="index%2===0? 'lefth':'right'"
    />
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
    };
  },
  created() {
    ViajeResource.list({
      order: 'fechaRegistro desc',
      skip: 0,
      limit: 5,
    }).then(resp => {
      resp.data.forEach(element => {
        element.images = [
          { url: '/images/noticias/nt1.png' },
          { url: '/images/noticias/nt2.png' },
          { url: '/images/noticias/nt3.jpg' },
        ];
      });
      this.viajes = resp.data;
    }).catch(err => console.log(err));
  },
};
</script>

<style>

</style>
