<template>
  <el-card shadow="hover" :body-style="{ padding: '20px' }">
    <div slot="header">
      <span>Grupos</span>
    </div>
    <draggable v-model="localData.grupos" class="draggable" group="grupos" @change="onChangeOrderGroups()">
      <view-group v-for="(grupo, i) in localData.grupos" :key="grupo.id" v-model="localData.grupos[i]" @change="onChange()" @delete="onDelete(grupo)" />
    </draggable>
  </el-card>
</template>

<script>
import { InformeFotograficoResource } from '@/api/informeFotografico';
import ViewGroup from './ViewGroup.vue';
import draggable from 'vuedraggable';
export default {
  name: 'ManageGroups',
  components: {
    ViewGroup,
    draggable,
  },
  props: {
    value: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      localData: null,
    };
  },
  watch: {
    value(newVal) {
      this.localData = newVal;
    },
  },
  created() {
    this.localData = this.value;
  },
  methods: {
    onChange() {
      this.$emit('change', this.localData);
      this.$emit('input', this.localData);
    },
    onDelete(grupo) {
      InformeFotograficoResource.update(this.localData.id, {
        ordenGrupos: this.localData.ordenGrupos.filter(gi => gi !== grupo.id),
      }).then(() => {
        this.$message({
          message: 'Informe actualizado con Exito.',
          type: 'success',
        });
        this.onChange();
      });
    },
    onChangeOrderGroups() {
      InformeFotograficoResource.update(this.localData.id, {
        ordenGrupos: this.localData.grupos.map(g => g.id),
      }).then(() => {
        this.$message({
          message: 'Orden de grupos actualizado.',
          type: 'success',
        });
        this.onChange();
      }).catch(() => this.onChange());
    },
  },
};
</script>

<style>

</style>
