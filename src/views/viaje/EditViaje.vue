<template>
  <div>
    <Title title="Editar Viaje" />
    <el-row :gutter="20" type="flex" justify="center">
      <div v-loading="loading" class="form-container">
        <form-viaje v-if="viaje" :id-viaje="idViaje" :viaje="viaje" @submit="onSubmit" @cancel="onCancel" />
      </div>
    </el-row>
  </div>
</template>

<script>
import Title from '@/components/Title.vue';
import FormViaje from './components/FormViaje.vue';
import { ViajeResource } from '@/api/viaje';
export default {
  name: 'Editarviaje',
  components: {
    FormViaje,
    Title,
  },
  data() {
    return {
      idViaje: undefined,
      viaje: undefined,
      loading: true,
    };
  },
  watch: {
    $route(newVal) {
      if (newVal.name === 'EditViaje') {
        this.init();
      }
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.idViaje = this.$route.params.id;
      this.loading = true;
      ViajeResource.get(this.idViaje).then(resp => {
        this.viaje = resp.data;
        this.loading = false;
      }).catch(err => {
        console.log(err);
        this.$message({
          message: 'No existe un viaje con este id: ' + this.idViaje,
          type: 'error',
          showClose: true,
          duration: 4000,
        });
        this.$router.push({ name: 'AdminViajes' });
        this.loading = false;
      });
    },
    onSubmit(viaje) {
      this.loading = true;
      ViajeResource.update(this.idViaje, viaje).then(resp => {
        this.$message({
          message: 'Viaje actualizado Exitosamente.',
          type: 'success',
          showClose: true,
          duration: 3000,
        });
        this.$router.push({ name: 'AdminViajes' });
        this.loading = false;
      }).catch(err => {
        console.log(err);
        this.$message({
          message: err.data.error.message,
          type: 'error',
          showClose: true,
          duration: 4000,
        });
        this.loading = false;
      });
    },
    onCancel() {
      this.$message({
        message: 'Cancelado',
        type: 'info',
        showClose: true,
        duration: 2000,
      });
      this.$router.push({ name: 'AdminViajes' });
    },
  },
};
</script>

<style lang="scss" scoped>
.form-container{
    max-width: 500px;
    min-width: 400px;
}
</style>
