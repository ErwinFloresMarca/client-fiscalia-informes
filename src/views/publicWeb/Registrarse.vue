<template>
  <div class="register-container">
    <el-form ref="form" :model="formData" :disabled="loading" :rules="rules" :inline="false" size="normal">
      <el-form-item prop="name">
        <el-input v-model="formData.name" placeholder="Nombre de Usuario" />
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="formData.email" placeholder="Correo Electronico" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="formData.password" type="password" placeholder="Contraseña" />
      </el-form-item>
      <el-form-item prop="passwordConfirm">
        <el-input v-model="formData.passwordConfirm" type="password" placeholder="Repita la contraseña" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" style="width: 100%" @click="onSubmit">Registrar</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { UserResource } from '@/api/user';
export default {
  name: 'Registrarse',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error('La contraseña no puede tener menos de 8 digitos'));
      } else {
        callback();
      }
    };
    const validatePasswordConfirm = (rule, value, callback) => {
      console.log(value, this.formData.password);
      if (value !== this.formData.password) {
        callback(new Error('esta contraseña es diferente'));
      } else {
        callback();
      }
    };
    return {
      formData: {},
      rules: {
        name: [{ required: true, trigger: 'blur', message: 'el nombre de usuario es requerido' }],
        email: [{ required: true, trigger: 'blur', message: 'el correo electronico es requerido' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        passwordConfirm: [{ required: true, trigger: 'blur', validator: validatePasswordConfirm }],
      },
      loading: false,
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          const newUser = this.formData;
          delete newUser.passwordConfirm;
          UserResource.store(newUser).then(resp => {
            this.$message({
              message: 'Usuario registrado exitosamente!',
              type: 'success',
              showClose: true,
              duration: 3000,
            });
            this.login();
          }).catch(err => {
            this.loading = false;
            console.log('error al registrar: ', err);
            this.$message({
              message: err.data.error.message,
              type: 'error',
              showClose: true,
              duration: 4000,
            });
          });
        }
      });
    },
    login() {
      this.$store.dispatch('user/login', { email: this.formData.email, password: this.formData.password })
        .then(() => {
          this.$router.push({ path: '/admin/dashboard' });
          this.loading = false;
        })
        .catch(() => {
          this.$router.push({ path: '/login' });
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.register-container{
  display: flex;
  justify-content: center;
}
</style>
