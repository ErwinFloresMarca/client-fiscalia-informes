<template>
  <el-form ref="userForm" :model="userForm" :rules="rules">
    <el-form-item label="Nombre de usuario" prop="name">
      <el-input v-model="userForm.name" />
    </el-form-item>
    <el-form-item label="Carnet de identidad" prop="ci">
      <el-input v-model="userForm.ci" />
    </el-form-item>
    <el-form-item label="Contraseña" prop="password">
      <el-input v-model="userForm.password" type="password" placeholder="deje vacio para no cambiar la contraseña." />
    </el-form-item>
    <el-form-item label="Confirmar Contraseña" prop="passwordConfirm">
      <el-input v-model="userForm.passwordConfirm" type="password" placeholder="deje vacio para no cambiar la contraseña." />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Actualizar</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { UserResource } from '@/api/user';
export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          ci: '',
        };
      },
    },
  },
  data() {
    const validatePasswordConfirm = (rule, value, cb) => {
      if (value !== this.userForm.password) {
        cb(new Error('las contraseñas no son iguales'));
      }
      cb();
    };
    return {
      rules: {
        name: [{ required: true, message: 'En nombre de usuario es requerido', trigger: 'blur' }],
        ci: [{ required: true, trigger: 'blur', message: 'El Carnet de identidad es obligatorio' }],
        passwordConfirm: [{ validator: validatePasswordConfirm, trigger: 'blur' }],
      },
      userForm: {},
    };
  },
  created() {
    this.userForm = { name: this.user.name, ci: this.user.ci };
  },
  methods: {
    submit() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          UserResource.getAuthUser().then(resp => {
            const userUp = {
              name: this.userForm.name,
              ci: this.userForm.ci,
              password: this.userForm.password,
            };
            if (!this.userForm.password) { delete userUp.password; }
            UserResource.update(resp.data.id, userUp).then(resp => {
              this.$message({
                message: 'El usuario fue actualizado exitosamente.',
                type: 'success',
                showClose: true,
                duration: 3000,
              });
            }).catch(err => console.log(err));
          }).catch(err => console.log(err));
        }
      });
    },
  },
};
</script>
