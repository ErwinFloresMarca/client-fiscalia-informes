<template>
  <div class="form-container">
    <el-form ref="formData" :model="formData" :rules="rules" label-width="100px" label-position="lefth">
      <el-form-item label="Nombres" prop="nombres">
        <el-input v-model="formData.nombres" type="text" placeholder="Nombres" size="normal" />
      </el-form-item>
      <el-form-item label="Apellido Paterno" prop="apPaterno">
        <el-input v-model="formData.apPaterno" type="text" placeholder="Apellido Paterno" size="normal" />
      </el-form-item>
      <el-form-item label="Apellido Materno" prop="apMaterno">
        <el-input v-model="formData.apMaterno" type="text" placeholder="Apellido Materno" size="normal" />
      </el-form-item>
      <el-form-item label="C.I." prop="ci">
        <el-input v-model="formData.ci" type="text" placeholder="C.I." size="normal" />
      </el-form-item>
      <el-form-item label="Cargo" prop="cargo">
        <el-autocomplete
          v-model="formData.cargo"
          :fetch-suggestions="searchCargo"
          placeholder="Cargo"
          size="normal"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item label-width="0px">
        <el-row :gutter="20" type="flex" justify="space-around">
          <el-button @click="onCancel()">Cancelar</el-button>
          <el-button type="primary" @click="onSubmit()">Guardar</el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'FormFiscal',
  props: {
    fiscal: {
      type: Object,
      default: null,
    },
    idFiscal: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      formData: {
      },
      rules: {
        nombres: [{ required: true, message: 'El Nombre es requerido', trigger: 'blur' }],
        apMaterno: [{ required: true, message: 'El Apellido materno es requerido', trigger: 'blur' }],
        ci: [{ required: true, message: 'El C.I. es requerido', trigger: 'blur' }],
        cargo: [{ required: true, message: 'El Cargo es requerido', trigger: 'blur' }],
      },
    };
  },
  computed: {
    id() {
      return this.idFiscal;
    },
  },
  watch: {
    fiscal(newVal) {
      this.formData = { ... this.fiscal };
      delete this.formData.id;
    },
  },
  created() {
    if (this.id) {
      this.formData = { ...this.fiscal };
      delete this.formData.id;
    }
  },
  methods: {
    onSubmit() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.$emit('submit', this.formData);
        }
      });
    },
    onCancel() {
      this.$emit('cancel', this.formData);
    },
    searchCargo(qs, cb) {
      var links = [{ label: 'FISCAL DE MATERIA III', value: 'FISCAL DE MATERIA III' },
        { label: 'FISCAL DE MATERIA II', value: 'FISCAL DE MATERIA II' },
        { label: 'FISCAL DE MATERIA I', value: 'FISCAL DE MATERIA I' }];
      var results = qs ? links.filter((link) => {
        return (link.value.toLowerCase().includes(qs.toLowerCase()));
      }) : links;
      cb(results);
    },
  },
};
</script>

<style lang="scss" scoped>
.img-container{
  width: 100%;
  padding: 5px;
}
</style>
