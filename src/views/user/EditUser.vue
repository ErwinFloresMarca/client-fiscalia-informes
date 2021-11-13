<template>
  <div>
    <Title title="Editar Usuario" />
    <el-row :gutter="20" type="flex" justify="center">
      <div v-loading="loading" class="form-container">
        <form-user v-if="user" :id-user="idUser" :user="user" @submit="onSubmit" @cancel="onCancel" />
      </div>
    </el-row>
  </div>
</template>

<script>
import Title from '@/components/Title.vue';
import FormUser from './components/FormUser.vue';
import { UserResource } from '@/api/user';
export default {
  name: 'EditUser',
  components: {
    FormUser,
    Title,
  },
  data() {
    return {
      idUser: undefined,
      user: undefined,
      loading: true,
    };
  },
  watch: {
    $route(newVal) {
      if (newVal.name === 'EditUser') {
        this.init();
      }
    },
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.idUser = this.$route.params.id;
      this.loading = true;
      UserResource.get(this.idUser).then(resp => {
        this.user = resp.data;
        this.loading = false;
      }).catch(err => {
        console.log(err);
        this.$message({
          message: 'No existe un usuario con este id: ' + this.idUser,
          type: 'error',
          showClose: true,
          duration: 4000,
        });
        this.$router.push({ name: 'AdminUsers' });
        this.loading = false;
      });
    },
    onSubmit(user) {
      this.loading = true;
      UserResource.update(this.idUser, user).then(resp => {
        this.$message({
          message: 'Usuario actualizado Exitosamente.',
          type: 'success',
          showClose: true,
          duration: 3000,
        });
        this.$router.push({ name: 'AdminUsers' });
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
      this.$router.push({ name: 'AdminUsers' });
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
