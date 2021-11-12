<template>
  <div class="form-container">
    <el-form ref="formData" :model="formData" :rules="rules" label-width="100px" label-position="lefth">
      <el-form-item label="Nombre Completo" prop="name">
        <el-input v-model="formData.name" placeholder="Nombre Completo" size="normal" />
      </el-form-item>
      <el-form-item label="Carnet De Identidad" prop="ci">
        <el-input
          v-model="formData.ci"
          type="text"
        />
      </el-form-item>

      <el-form-item label="Contraseña" prop="password">
        <el-input
          v-model="formData.password"
          type="password"
        />
      </el-form-item>

      <el-form-item label="Repita la contraseña" prop="passwordConfirm">
        <el-input
          v-model="formData.passwordConfirm"
          type="password"
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
  name: 'FormUsuario',
  props: {
    user: {
      type: Object,
      default: null,
    },
    idUser: {
      type: String,
      default: null,
    },
    showPasswordsFields: {
      type: Boolean,
      default: false,
    },
  },
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
      formData: {
        password: '',
        passwordConfirm: '',
      },
      rules: {
        name: [{ required: true, message: 'El Nombre es requerido', trigger: 'blur' }],
        ci: [{ required: true, message: 'El carnet de identidad es requerido', trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        passwordConfirm: [{ required: true, trigger: 'blur', validator: validatePasswordConfirm }],
      },
      headers: {},
      showDeleteImage: -1,
    };
  },
  computed: {
    id() {
      return this.idUser;
    },
  },
  watch: {
    user(newVal) {
      this.formData = { ... this.user };
      delete this.formData.id;
    },
  },
  created() {
    if (this.id) {
      this.formData = { ...this.user };
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
  },
};
</script>

<style lang="scss" scoped>
.img-container{
  width: 100%;
  padding: 5px;
}
</style>
