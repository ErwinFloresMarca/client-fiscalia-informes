<template>
  <div>
    <Title title="EDITAR TIPO DE DISPOSITIVO" />
    <el-row :gutter="20" type="flex" justify="center">
      <div v-loading="loading" class="form-container">
        <form-tipo-dispositivo :id-tipo-dispositivo="idTipoDispositivo" :tipo-dispositivo="tipoDispositivo" @submit="onSubmit" @cancel="onCancel" />
      </div>
    </el-row>
  </div>
</template>

<script>
import Title from '@/components/Title.vue';
import { TipoDispositivoResource } from '@/api/tipoDispositivo';
import FormTipoDispositivo from './components/FormTipoDispositivo.vue';
export default {
  name: 'EditTipoDispositivo',
  components: {
    Title,
    FormTipoDispositivo,
  },
  data() {
    return {
      idTipoDispositivo: undefined,
      tipoDispositivo: undefined,
      loading: true,
    };
  },
  watch: {
    $route(newVal) {
      if (newVal.name === 'EditTipoDispositivo') {
        this.init();
      }
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.idTipoDispositivo = this.$route.params.id;
      this.loading = true;
      TipoDispositivoResource.get(this.idTipoDispositivo).then(resp => {
        this.tipoDispositivo = resp.data;
        this.loading = false;
      }).catch(err => {
        console.log(err);
        this.$message({
          message: 'No existe un tipo de dispositivo con este id: ' + this.idTipoDispositivo,
          type: 'error',
          showClose: true,
          duration: 4000,
        });
        this.$router.push({ name: 'AdminTipoDispositivos' });
        this.loading = false;
      });
    },
    onSubmit(tipoDispositivo) {
      this.loading = true;
      TipoDispositivoResource.update(this.idTipoDispositivo, tipoDispositivo).then(resp => {
        this.$message({
          message: 'Tipo de Dispositivo actualizado Exitosamente.',
          type: 'success',
          showClose: true,
          duration: 3000,
        });
        this.$router.push({ name: 'AdminTipoDispositivos' });
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
