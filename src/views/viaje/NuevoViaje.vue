<template>
  <div>
    <Title title="Nuevo Viaje" />
    <el-row :gutter="20" type="flex" justify="center">
      <div v-loading="loading" class="form-container">
        <form-viaje @submit="onSubmit" @cancel="onCancel" />
      </div>
    </el-row>
  </div>
</template>

<script>
import Title from '@/components/Title.vue';
import FormViaje from './components/FormViaje.vue';
import { ViajeResource } from '@/api/viaje';
export default {
  name: 'NuevoViaje',
  components: {
    FormViaje,
    Title,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    onSubmit(Viaje) {
      this.loading = true;
      ViajeResource.store(Viaje).then(resp => {
        this.$message({
          message: 'Viaje creado Exitosamente.',
          type: 'success',
          showClose: true,
          duration: 3000,
        });
        this.loading = false;
        this.$router.push({ name: 'AdminViajes' });
      }).catch(err => {
        this.loading = false;
        console.log(err);
        this.$message({
          message: err.data.error.message,
          type: 'error',
          showClose: true,
          duration: 4000,
        });
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
