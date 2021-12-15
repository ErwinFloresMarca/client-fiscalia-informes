<template>
  <div>
    <el-select
      v-model="selectPropietario"
      placeholder="Seleccione un Propietario"
      clearable
      filterable
      remote
      reserve-keyword
      :remote-method="onFilter"
      @change="onChange()"
    >
      <el-option
        v-for="propietario in propietarios"
        :key="propietario.id"
        :label="`${propietario.nombres} ${propietario.apPaterno || ''} ${propietario.apMaterno}`"
        :value="propietario.id"
      />
      <template slot="empty">
        <el-button type="primary" size="mini" icon="el-icon-plus" style="width: 100%;" @click="onNew()">Nuevo</el-button>
      </template>
    </el-select>
    <dialog-new-propietario :show="showDialogNew" @close="showDialogNew = false" @success="onSuccesNewPersona" />
  </div>
</template>

<script>
import { PropietarioResource } from '@/api/propietario';
import DialogNewPropietario from './DialogNewPropietario.vue';
export default {
  name: 'SelectPropietario',
  components: {
    DialogNewPropietario,
  },
  props: {
    value: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      propietarios: [],
      selectPropietario: undefined,
      showDialogNew: false,
    };
  },
  watch: {
    value(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.selectPropietario = newValue;
      }
    },
  },
  created() {
    this.onFilter('');
  },
  methods: {
    onChange() {
      this.$emit('change', this.selectPropietario);
      this.$emit('input', this.selectPropietario);
    },
    onFilter(kw) {
      PropietarioResource.list({
        where: {
          or: [{ nombres: { like: kw }},
            { apPaterno: { like: kw }},
            { apPaterno: { like: kw }}],
        },
        order: ['nombres asc', 'apPaterno asc', 'apMaterno asc'],
        limit: 15,
      }).then(resp => {
        this.propietarios = resp.data;
      }).catch(err => console.log(err));
    },
    onNew() {
      this.showDialogNew = true;
    },
    onSuccesNewPersona(propietario) {
      this.propietarios.push(propietario);
      this.selectPropietario = propietario.id;
      this.showDialogNew = false;
      this.onChange();
      this.$message({
        message: 'La Persona Fue creada exitosamente.',
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
