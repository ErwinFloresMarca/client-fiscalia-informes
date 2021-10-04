<template>
  <div>
    <Title title="Nueva Noticia" />
    <el-row :gutter="20" type="flex" justify="center">
      <div v-loading="loading" class="form-container">
        <form-noticia @submit="onSubmit" @cancel="onCancel" />
      </div>
    </el-row>
  </div>
</template>

<script>
import Title from '@/components/Title.vue';
import FormNoticia from './components/FormNoticia.vue';
import { NoticiaResource } from '@/api/noticia';
export default {
  name: 'NuevaNoticia',
  components: {
    FormNoticia,
    Title,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    onSubmit(noticia) {
      this.loading = true;
      NoticiaResource.store(noticia).then(resp => {
        this.$message({
          message: 'Noticia creada Exitosamente.',
          type: 'success',
          showClose: true,
          duration: 3000,
        });
        this.loading = false;
        this.$router.push({ name: 'AdminNoticias' });
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
      this.$router.push({ name: 'AdminNoticias' });
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
