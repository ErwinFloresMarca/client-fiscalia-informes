<template>
  <div>
    <Title title="Editar Noticia" />
    <el-row :gutter="20" type="flex" justify="center">
      <div v-loading="loading" class="form-container">
        <form-noticia v-if="noticia" :id-noticia="idNoticia" :noticia="noticia" @submit="onSubmit" @cancel="onCancel" />
      </div>
    </el-row>
  </div>
</template>

<script>
import Title from '@/components/Title.vue';
import FormNoticia from './components/FormNoticia.vue';
import { NoticiaResource } from '@/api/noticia';
export default {
  name: 'EditarNoticia',
  components: {
    FormNoticia,
    Title,
  },
  data() {
    return {
      idNoticia: undefined,
      noticia: undefined,
      loading: true,
    };
  },
  watch: {
    $route(newVal) {
      if (newVal.name === 'EditNoticia') {
        this.init();
      }
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.idNoticia = this.$route.params.id;
      this.loading = true;
      NoticiaResource.get(this.idNoticia).then(resp => {
        this.noticia = resp.data;
        this.loading = false;
      }).catch(err => {
        console.log(err);
        this.$message({
          message: 'No existe una noticia con este id: ' + this.idNoticia,
          type: 'error',
          showClose: true,
          duration: 4000,
        });
        this.$router.push({ name: 'AdminNoticias' });
        this.loading = false;
      });
    },
    onSubmit(noticia) {
      this.loading = true;
      NoticiaResource.update(this.idNoticia, noticia).then(resp => {
        this.$message({
          message: 'Noticia actualizada Exitosamente.',
          type: 'success',
          showClose: true,
          duration: 3000,
        });
        this.$router.push({ name: 'AdminNoticias' });
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
