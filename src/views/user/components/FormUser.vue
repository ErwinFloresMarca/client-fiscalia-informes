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
import { UserResource } from '@/api/user';
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
    return {
      formData: {
        password: '',
        passwordConfirm: '',
        permissions: [],
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
      return this.idUser;
    },
    selectPermissions() {
      return this.formData.permissions;
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
    this.getPermissions();
    if (this.showPasswordsFields) {
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
      this.rules = {
        ...this.rules,
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        passwordConfirm: [{ required: true, trigger: 'blur', validator: validatePasswordConfirm }],
      };
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
    getPermissions() {
      UserResource.getPermissions().then(resp => {
        this.permissions = resp.data;
        if (!this.user) {
          this.formData.permissions = [...this.permissions];
        }
      }).catch(error => console.log(error));
    },
    onTooglePermission(permission) {
      if (this.formData.permissions.includes(permission)) {
        this.formData.permissions = this.formData.permissions.filter(p => {
          return p !== permission;
        });
      } else {
        this.formData.permissions.push(permission);
      }
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
