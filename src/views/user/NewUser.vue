<template>
  <div>
    <Title title="Nuevo Usuario" />
    <el-row :gutter="20" type="flex" justify="center">
      <div v-loading="loading" class="form-container">
        <form-user show-passwords-fields @submit="onSubmit" @cancel="onCancel" />
      </div>
    </el-row>
  </div>
</template>

<script>
import Title from '@/components/Title.vue';

import { UserResource } from '@/api/user';
import FormUser from './components/FormUser.vue';
export default {
  name: 'NewUser',
  components: {
    Title,
    FormUser,
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
      UserResource.store(user).then(resp => {
        this.$message({
          message: 'Usuario creado Exitosamente.',
          type: 'success',
          showClose: true,
          duration: 3000,
        });
        this.loading = false;
        this.$router.push({ name: 'AdminUsers' });
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
