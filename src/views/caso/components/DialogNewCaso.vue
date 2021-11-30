<template>
  <el-dialog
    title="Nuevo Caso"
    :visible="visible"
    width="30%"
    append-to-body
    @close="onClose()"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="25%" label-position="right" size="normal">
      <el-form-item label="CUD" prop="cud">
        <el-input v-model="form.cud" type="text" />
      </el-form-item>
      <el-form-item label="Delito" prop="delito">
        <el-input v-model="form.delito" type="text" />
      </el-form-item>
      <el-form-item label="Fiscal" prop="fiscalId">
        <select-fiscal v-model="form.fiscalId" />
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
import { CasoResource } from '@/api/caso';
import SelectFiscal from '@/views/fiscal/components/SelectFiscal.vue';
export default {
  name: 'DialogNewCaso',
  components: { SelectFiscal },
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
        cud: [{ required: true, message: 'El cud es requerido', trigger: 'blur' }],
        delito: [{ required: true, message: 'El delito es requerido', trigger: 'blur' }],
        fiscalId: [{ required: true, message: 'Debe seleccionar un fiscal', trigger: 'blur' }],
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
      CasoResource.store(this.form).then(resp => {
        this.$emit('success', resp.data);
      }).catch(err => console.log(err));
    },
  },
};
</script>

<style>

</style>
