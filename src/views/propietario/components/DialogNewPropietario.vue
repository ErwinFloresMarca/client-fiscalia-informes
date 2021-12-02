<template>
  <el-dialog
    title="Nuevo Propietario"
    :visible="visible"
    width="30%"
    append-to-body
    @close="onClose()"
  >
    <el-form ref="formData" :model="form" :rules="rules" label-width="140px" label-position="lefth">
      <el-form-item label="Nombres" prop="nombres">
        <el-input v-model="form.nombres" type="text" placeholder="Nombres" size="normal" />
      </el-form-item>
      <el-form-item label="Apellido Paterno" prop="apPaterno">
        <el-input v-model="form.apPaterno" type="text" placeholder="Apellido Paterno" size="normal" />
      </el-form-item>
      <el-form-item label="Apellido Materno" prop="apMaterno">
        <el-input v-model="form.apMaterno" type="text" placeholder="Apellido Materno" size="normal" />
      </el-form-item>
      <el-form-item label="C.I." prop="ci">
        <el-input v-model="form.ci" type="text" placeholder="C.I." size="normal" />
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-row :gutter="20" type="flex" justify="space-around">
        <el-button @click="onClose()">Cancelar</el-button>
        <el-button type="primary" @click="onSubmit()">Registrar</el-button>
      </el-row>
    </span>
  </el-dialog>
</template>

<script>
import { PropietarioResource } from '@/api/propietario';
export default {
  name: 'DialogNewPropietario',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {},
      rules: {
        nombres: [{ required: true, message: 'El Nombre es requerido', trigger: 'blur' }],
        apMaterno: [{ required: true, message: 'El Apellido materno es requerido', trigger: 'blur' }],
        ci: [{ required: true, message: 'El C.I. es requerido', trigger: 'blur' }],
      },
    };
  },
  computed: {
    visible() {
      return this.show;
    },
  },
  watch: {
    show(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.form = {};
      }
    },
  },
  methods: {
    onClose() {
      this.$emit('close');
    },
    onSubmit() {
      PropietarioResource.store(this.form).then(resp => {
        this.$emit('success', resp.data);
      }).catch(err => console.log(err));
    },
  },
};
</script>

<style>

</style>
