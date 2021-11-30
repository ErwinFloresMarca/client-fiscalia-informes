<template>
  <div>
    <Title title="NUEVO FISCAL" />
    <el-row :gutter="20" type="flex" justify="center">
      <div v-loading="loading" class="form-container">
        <form-fiscal @submit="onSubmit" @cancel="onCancel" />
      </div>
    </el-row>
  </div>
</template>

<script>
import Title from '@/components/Title.vue';

import { FiscalResource } from '@/api/fiscal';
import FormFiscal from './components/FormFiscal.vue';
export default {
  name: 'NewFiscal',
  components: {
    Title,
    FormFiscal,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    onSubmit(fiscal) {
      this.loading = true;
      FiscalResource.store(fiscal).then(resp => {
        this.$message({
          message: 'Fiscal creado Exitosamente.',
          type: 'success',
          showClose: true,
          duration: 3000,
        });
        this.loading = false;
        this.$router.push({ name: 'AdminFiscales' });
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
      this.$router.push({ name: 'AdminFiscales' });
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
