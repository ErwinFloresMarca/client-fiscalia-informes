<template>
  <div>
    <el-select
      v-model="selectCaso"
      placeholder="Seleccione un Caso"
      clearable
      filterable
      remote
      reserve-keyword
      :remote-method="onFilter"
      style="width: 100%;"
      @change="onChange()"
    >
      <el-option
        v-for="caso in casos"
        :key="caso.id"
        :label="caso.cud"
        :value="caso.id"
      >
        <span style="float: left">{{ caso.cud }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">{{ caso.delito }}</span>
      </el-option>
      <template slot="empty">
        <el-button type="primary" size="mini" icon="el-icon-plus" style="width: 100%;" @click="onNew()">Nuevo</el-button>
      </template>
    </el-select>
    <dialog-new-caso :show="showDialogNew" @close="showDialogNew = false" @success="onSuccessNewCaso" />
  </div>
</template>

<script>
import { CasoResource } from '@/api/caso';
import DialogNewCaso from './DialogNewCaso.vue';
export default {
  name: 'SelectCaso',
  components: { DialogNewCaso },
  props: {
    value: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      casos: [],
      selectCaso: undefined,
      showDialogNew: false,
    };
  },
  watch: {
    value(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.selectCaso = newValue;
        this.onFilter(this.value);
      }
    },
  },
  created() {
    if (this.value) {
      this.onFilter(this.value);
      this.selectCaso = this.value;
    } else {
      this.onFilter('');
    }
  },
  methods: {
    onChange() {
      this.$emit('change', this.selectCaso);
      this.$emit('input', this.selectCaso);
    },
    onFilter(kw) {
      CasoResource.list({
        where: {
          or: [{ cud: { like: kw }},
            { delito: { like: kw }},
            { id: kw }],
        },
        order: ['cud asc', 'delito asc'],
        limit: 15,
      }).then(resp => {
        this.casos = resp.data;
      }).catch(err => console.log(err));
    },
    onNew() {
      this.showDialogNew = true;
    },
    onSuccessNewCaso(caso) {
      this.casos.push(caso);
      this.selectCaso = caso.id;
      this.showDialogNew = false;
      this.onChange();
      this.$message({
        message: 'El Caso Fue creado exitosamente.',
        type: 'success',
        showClose: true,
        duration: 3000,
      });
    },
  },
};
</script>

<style>

</style>
