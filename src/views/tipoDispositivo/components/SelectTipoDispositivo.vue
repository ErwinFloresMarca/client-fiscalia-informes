<template>
  <div>
    <el-select
      v-model="selectTipoDispositivo"
      placeholder="Seleccione un Tipo de Dispositivo"
      clearable
      filterable
      remote
      reserve-keyword
      :remote-method="onFilter"
      @change="onChange"
    >
      <el-option
        v-for="tipoDispositivo in tipoDispositivos"
        :key="tipoDispositivo.id"
        :label="tipoDispositivo.tipo"
        :value="tipoDispositivo.id"
      />
    </el-select>
    <!-- <dialog-new-tipoDispositivo :show="showDialogNew" @close="showDialogNew = false" @success="onSuccessNewFiscal" /> -->
  </div>
</template>

<script>
import { TipoDispositivoResource } from '@/api/tipoDispositivo';
// import DialogNewCaso from './DialogNewCaso.vue';
export default {
  name: 'SelectTipoDispositivo',
  components: {
    //   DialogNewCaso
  },
  props: {
    value: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      tipoDispositivos: [],
      selectTipoDispositivo: undefined,
    };
  },
  watch: {
    value(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.selectTipoDispositivo = newValue;
      }
    },
  },
  created() {
    this.onFilter('');
  },
  methods: {
    onChange(tipoDispositivo) {
      const td = this.tipoDispositivos.find(t => tipoDispositivo === t.id);
      this.$emit('change', td);
      this.$emit('input', this.selectTipoDispositivo);
    },
    onFilter(kw) {
      TipoDispositivoResource.list({
        where: {
          tipo: { like: kw },
        },
        order: ['tipo asc'],
        limit: 15,
      }).then(resp => {
        this.tipoDispositivos = resp.data;
      }).catch(err => console.log(err));
    },
  },
};
</script>

<style>

</style>
