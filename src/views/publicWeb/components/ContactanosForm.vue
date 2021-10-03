<template>
  <el-form ref="form" :model="formData" :rules="rules" :inline="false" size="normal" width="100%">
    <el-form-item prop="nombre">
      <el-input v-model="formData.nombre" placeholder="Nombre Completo" />
    </el-form-item>
    <el-form-item prop="email">
      <el-input v-model="formData.email" placeholder="Correo Electrónico" />
    </el-form-item>
    <el-form-item prop="asunto">
      <el-input v-model="formData.asunto" placeholder="Asunto" />
    </el-form-item>
    <el-form-item prop="mensaje">
      <el-input
        v-model="formData.mensaje"
        type="textarea"
        :rows="4"
        :maxlength="500"
        :show-word-limit="true"
        placeholder="Mensaje"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="width: 100%" @click="onSubmit">ENVIAR</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { ContactoResource } from '@/api/contacto';
import { validEmail } from '@/utils/validate';
export default {
  name: 'ContactanosForm',
  data() {
    const validateEmail = (rule, value, cb) => {
      if (!validEmail(value)) {
        cb(new Error('Este Correo no es valido.'));
      } else {
        cb();
      }
    };
    return {
      formData: {},
      rules: {
        nombre: [{ required: true, trigger: 'blur', message: 'El nombre es requerido' }],
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        asunto: [{ required: true, trigger: 'blur', message: 'El asunto es requerido' }],
        mensaje: [{ required: true, trigger: 'blur', message: 'El mensaje es requerido' }],
      },
      loading: false,
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true;
          ContactoResource.store(this.formData).then(resp => {
            this.onSuccess();
          }).catch(err => {
            this.$message({
              message: 'Algo salió Mal.',
              type: 'error',
              showClose: true,
              duration: 4000,
            });
            console.log(err);
          });
        }
      });
    },
    onSuccess() {
      this.$message({
        message: 'Mensage enviado.',
        type: 'success',
        showClose: true,
        duration: 4000,
      });
      this.formData = {};
      this.loading = false;
    },
  },
};
</script>

<style>

</style>
