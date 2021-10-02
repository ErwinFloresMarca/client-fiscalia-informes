<template>
  <el-form ref="form" :model="formData" :rules="rules" :inline="false" size="normal">
    <el-form-item>
      <el-input v-model="formData.nombre" placeholder="Nombre Completo" />
    </el-form-item>
    <el-form-item>
      <el-input v-model="formData.email" placeholder="Correo Electrónico" />
    </el-form-item>
    <el-form-item>
      <el-input v-model="formData.asunto" placeholder="Asunto" />
    </el-form-item>
    <el-form-item>
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
export default {
  name: 'ContactanosForm',
  data() {
    return {
      formData: {},
      rules: {},
    };
  },
  methods: {
    onSubmit() {

    },
  },
};
</script>

<style>

</style>
