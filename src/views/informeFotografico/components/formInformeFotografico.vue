<template>
  <div class="form-container">
    <el-form ref="formData" :model="formData" :rules="rules" label-width="100px" label-position="lefth">
      <el-form-item label="CUD" size="normal">
        <el-input v-model="formData.cud" type="text" placeholder="CUD" size="normal" />
      </el-form-item>
      <el-form-item label="Carnet De Identidad" prop="ci">
        <el-input
          v-model="formData.ci"
          type="text"
        />
      </el-form-item>

      <el-form-item label="Permisos" label-position="top" size="normal">
        <el-checkbox-group :value="selectPermissions">
          <el-checkbox
            v-for="permission in permissions"
            :key="permission"
            :label="permission"
            @change="onTooglePermission(permission)"
          />
        </el-checkbox-group>
      </el-form-item>

      <el-form-item v-if="showPasswordsFields" label="Contraseña" prop="password">
        <el-input
          v-model="formData.password"
          type="password"
        />
      </el-form-item>

      <el-form-item v-if="showPasswordsFields" label="Repita la contraseña" prop="passwordConfirm">
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
  name: 'FormInformeFotografico',
  props: {
    informeFotografico: {
      type: Object,
      default: null,
    },
    idInformeFotografico: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      formData: {
      },
      rules: {
        name: [{ required: true, message: 'El Nombre es requerido', trigger: 'blur' }],
        ci: [{ required: true, message: 'El carnet de identidad es requerido', trigger: 'blur' }],
      },
      headers: {},
      showDeleteImage: -1,
      permissions: [],
    };
  },
  computed: {
    id() {
      return this.idInformeFotografico;
    },
  },
  watch: {
    informeFotografico(newVal) {
      this.formData = { ... this.informeFotografico };
      delete this.formData.id;
    },
  },
  created() {
    if (this.id) {
      this.formData = { ...this.informeFotografico };
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
