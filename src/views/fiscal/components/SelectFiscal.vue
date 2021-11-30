<template>
  <div>
    <el-select
      v-model="selectFiscal"
      placeholder="Seleccione un Fiscal"
      clearable
      filterable
      remote
      reserve-keyword
      :remote-method="onFilter"
      @change="onChange()"
    >
      <el-option
        v-for="fiscal in fiscales"
        :key="fiscal.id"
        :label="fiscal.nombres + fiscal.apPaterno + fiscal.apMaterno"
        :value="fiscal.id"
      />
      <!-- <template slot="empty">
        <el-button type="primary" size="mini" icon="el-icon-plus" style="width: 100%;" @click="onNew()">Nuevo</el-button>
      </template> -->
    </el-select>
    <!-- <dialog-new-fiscal :show="showDialogNew" @close="showDialogNew = false" @success="onSuccessNewFiscal" /> -->
  </div>
</template>

<script>
import { FiscalResource } from '@/api/fiscal';
// import DialogNewCaso from './DialogNewCaso.vue';
export default {
  name: 'SelectFiscal',
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
      fiscales: [],
      selectFiscal: undefined,
      showDialogNew: false,
    };
  },
  watch: {
    value(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.selectFiscal = newValue;
      }
    },
  },
  created() {
    this.onFilter('');
  },
  methods: {
    onChange() {
      this.$emit('change', this.selectFiscal);
      this.$emit('input', this.selectFiscal);
    },
    onFilter(kw) {
      FiscalResource.list({
        where: {
          or: [{ nombres: { like: kw }},
            { apPaterno: { like: kw }},
            { apMaterno: { like: kw }}],
        },
        order: ['nombres asc', 'apPaterno asc', 'apMaterno asc'],
        limit: 15,
      }).then(resp => {
        this.fiscales = resp.data;
      }).catch(err => console.log(err));
    },
    onNew() {
      this.showDialogNew = true;
    },
    onSuccessNewFiscal(fiscal) {
      this.fiscales.push(fiscal);
      this.selectFiscal = fiscal.id;
      this.showDialogNew = false;
    },
  },
};
</script>

<style>

</style>
