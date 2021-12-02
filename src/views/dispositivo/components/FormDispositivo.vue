<template>
  <el-form ref="form" :model="form" :rules="getRules" label-width="170px" :inline="false" size="normal">
    <el-form-item label="Propietario" prop="propietarioId">
      <select-propietario v-model="form.propietarioId" />
    </el-form-item>
    <el-form-item label="Tipo de Dispositivo" prop="tipoDispositivoId">
      <select-tipo-dispositivo v-model="form.tipoDispositivoId" @change="onChangeTipoDispositivo" />
    </el-form-item>
    <el-form-item v-for="att in getListAtributos" :key="att" :label="att" :prop="'info.'+att">
      <el-input v-model="form.info[att]" :type="tipoDispositivo.atributos[att].type" :placeholder="att" size="normal" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="danger" @click="onCancel()">CANCELAR</el-button>
      <el-button type="primary" @click="onSubmit">{{ getTxtBtnSubmit }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import SelectTipoDispositivo from '@/views/tipoDispositivo/components/SelectTipoDispositivo.vue';
import SelectPropietario from '@/views/propietario/components/SelectPropietario.vue';
export default {
  name: 'FormDispositivo',
  components: {
    SelectTipoDispositivo,
    SelectPropietario,
  },
  props: {
    txtBtnSubmit: {
      type: String,
      default: 'GUARDAR',
    },
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        info: {},
      },
      rules: {
        propietarioId: [{ required: true, message: 'Seleccione un propietario', trigger: 'blur' }],
        tipoDispositivoId: [{ required: true, message: 'Seleccione un tipo de dispositivo', trigger: 'blur' }],
      },
      asyncRules: {},
      tipoDispositivo: undefined,
    };
  },
  computed: {
    getValue() {
      return this.value;
    },
    getTxtBtnSubmit() {
      return this.txtBtnSubmit;
    },
    getListAtributos() {
      return this.tipoDispositivo ? Object.keys(this.tipoDispositivo.atributos) : [];
    },
    getRules() {
      return { ... this.rules, ... this.asyncRules };
    },
  },
  methods: {
    onChange() {
      this.$emit('input', { ...this.getValue, ...this.form });
    },
    onChangeTipoDispositivo(td) {
      this.tipoDispositivo = td;
      this.asyncRules = {};
      if (td) {
        this.getListAtributos.forEach(att => {
          const newRule = { required: this.tipoDispositivo.atributos[att].required, message: `El campo ${att} es requerido`, trigger: 'blur' };
          this.asyncRules['info.' + att] = newRule;
        });
      }
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.onChange();
          this.$emit('success');
        }
      });
    },
    onCancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style>

</style>
