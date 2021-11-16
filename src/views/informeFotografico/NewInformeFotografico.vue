<template>
  <div>
    <Title title="NUEVO INFORME FOTOGRAFICOS" />
    <el-row :gutter="20" type="flex" justify="center">
      <div v-loading="loading" class="form-container">
        <form-informe-fotografico @submit="onSubmit" @cancel="onCancel" />
      </div>
    </el-row>
  </div>
</template>

<script>
import Title from '@/components/Title.vue';

import { InformeFotograficoResource } from '@/api/informeFotografico';
import FormInformeFotografico from './components/formInformeFotografico.vue';
export default {
  name: 'NewInformeFotografico',
  components: {
    Title,
    FormInformeFotografico,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    onSubmit(user) {
      this.loading = true;
      delete user.passwordConfirm;
      InformeFotograficoResource.store(user).then(resp => {
        this.$message({
          message: 'Informe Fotografico creado Exitosamente.',
          type: 'success',
          showClose: true,
          duration: 3000,
        });
        this.loading = false;
        this.$router.push({ name: 'AdminInformesFotograficos' });
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
      this.$router.push({ name: 'AdminInformesFotograficos' });
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
