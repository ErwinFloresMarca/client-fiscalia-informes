<template>
  <div>
    <Title title="NUEVO TIPO DE DISPOSITIVO" />
    <el-row :gutter="20" type="flex" justify="center">
      <div v-loading="loading" class="form-container">
        <form-tipo-dispositivo @submit="onSubmit" @cancel="onCancel" />
      </div>
    </el-row>
  </div>
</template>

<script>
import Title from '@/components/Title.vue';

import { TipoDispositivoResource } from '@/api/tipoDispositivo';
import FormTipoDispositivo from './components/FormTipoDispositivo.vue';
export default {
  name: 'NewTipoDispositivo',
  components: {
    Title,
    FormTipoDispositivo,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    onSubmit(tipoDispositivo) {
      this.loading = true;
      TipoDispositivoResource.store(tipoDispositivo).then(resp => {
        this.$message({
          message: 'Tipo de Dispositivo creado Exitosamente.',
          type: 'success',
          showClose: true,
          duration: 3000,
        });
        this.loading = false;
        this.$router.push({ name: 'AdminTipoDispositivos' });
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
      this.$router.push({ name: 'AdminTipoDispositivos' });
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
