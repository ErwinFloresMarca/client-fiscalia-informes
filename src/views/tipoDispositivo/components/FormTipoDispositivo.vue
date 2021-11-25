<template>
  <div class="form-container">
    <el-form ref="formData" :model="formData" :rules="rules" label-width="100px" label-position="lefth">
      <el-form-item label="Tipo" prop="tipo">
        <el-input v-model="formData.tipo" type="text" placeholder="Tipo" size="normal" />
      </el-form-item>
      <el-form-item label="Atributos" prop="atributos" label-position="top">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-row v-for="att in Object.keys(formData.atributos)" :key="att" :gutter="20" type="flex" justify="space-between">
              <template v-if="formData.atributos[att]">
                <el-col :span="6" :offset="0">
                  {{ att }}
                </el-col>
                <el-col :span="6" :offset="0">
                  {{ formData.atributos[att].type }}
                </el-col>
                <el-col :span="6" :offset="0">
                  <el-tag v-if="formData.atributos[att].required" type="success" size="mini" effect="dark">Requerido</el-tag>
                  <el-tag v-else type="danger" size="mini" effect="dark">No requerido</el-tag>
                </el-col>
                <el-col :span="3" :offset="0">
                  <el-button type="danger" size="mini" icon="el-icon-delete" circle @click="onDeleteAtributo(att)" />
                </el-col>
              </template>
            </el-row>
          </el-col>
        </el-row>
        <br>
        <el-row :gutter="20">
          <el-col :span="10" :offset="0">
            <el-input
              v-model="newTipo.key"
              placeholder="nombre atributo"
              type="text"
            />
          </el-col>
          <el-col :span="10" :offset="0">
            <el-checkbox v-model="newTipo.required">Obligatorio</el-checkbox>
          </el-col>
          <el-col :span="10" :offset="0">
            <el-select v-model="newTipo.type" placeholder="tipo atributo">
              <el-option
                v-for="item in tipos"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="10" :offset="0">
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="onAddAtributo">Agregar</el-button>
          </el-col>
        </el-row>
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
  name: 'FormTipoDispositivo',
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
        atributos: {},
      },
      rules: {
        tipo: [{ required: true, message: 'El Tipo es requerido', trigger: 'blur' }],
        atributos: [{ required: true, message: 'Los Atributos son requeridos', trigger: 'blur' }],
      },
      newTipo: {
        type: 'text',
        required: true,
      },
      tipos: [
        {
          label: 'Texto',
          value: 'text',
        },
        {
          label: 'Numerico',
          value: 'number',
        },
      ],
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
    onAddAtributo() {
      if (!this.newTipo.key) {
        this.$message({
          message: 'el campo nombre de atributo no debe estar vacio',
          type: 'warning',
        });
        return;
      }
      this.formData.atributos[this.newTipo.key] = {
        type: this.newTipo.type,
        required: this.newTipo.required,
      };
      const att = this.formData.atributos;
      this.formData.atributos = {};
      this.formData.atributos = att;
      this.newTipo = {
        type: 'text',
        required: true,
      };
    },
    onDeleteAtributo(att) {
      const attAux = this.formData.atributos;
      this.formData.atributos = {};
      attAux[att] = undefined;
      this.formData.atributos = attAux;
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
