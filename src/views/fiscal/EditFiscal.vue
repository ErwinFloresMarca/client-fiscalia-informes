<template>
  <div>
    <Title title="EDITAR FISCAL" />
    <el-row :gutter="20" type="flex" justify="center">
      <div v-loading="loading" class="form-container">
        <form-fiscal :id-fiscal="idFiscal" :fiscal="fiscal" @submit="onSubmit" @cancel="onCancel" />
      </div>
    </el-row>
  </div>
</template>

<script>
import Title from '@/components/Title.vue';
import { FiscalResource } from '@/api/fiscal';
import FormFiscal from './components/FormFiscal.vue';
export default {
  name: 'EditFiscal',
  components: {
    Title,
    FormFiscal,
  },
  data() {
    return {
      idFiscal: undefined,
      fiscal: undefined,
      loading: true,
    };
  },
  watch: {
    $route(newVal) {
      if (newVal.name === 'EditFiscal') {
        this.init();
      }
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.idFiscal = this.$route.params.id;
      this.loading = true;
      FiscalResource.get(this.idFiscal).then(resp => {
        this.fiscal = resp.data;
        this.loading = false;
      }).catch(err => {
        console.log(err);
        this.$message({
          message: 'No existe un Fiscal con este id: ' + this.idFiscal,
          type: 'error',
          showClose: true,
          duration: 4000,
        });
        this.$router.push({ name: 'AdminFiscales' });
        this.loading = false;
      });
    },
    onSubmit(fiscal) {
      this.loading = true;
      FiscalResource.update(this.idFiscal, fiscal).then(resp => {
        this.$message({
          message: 'Fiscal actualizado Exitosamente.',
          type: 'success',
          showClose: true,
          duration: 3000,
        });
        this.$router.push({ name: 'AdminFiscales' });
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
