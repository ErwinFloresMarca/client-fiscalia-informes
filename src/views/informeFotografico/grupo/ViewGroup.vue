<template>
  <div v-if="localData" class="group-container">
    <el-popover
      placement="top"
      trigger="hover"
      content="Titulo del grupo"
    >
      <el-input slot="reference" v-model="localData.tituloGrupo" :disabled="!editTitle" placeholder="Titulo" style="width: 90%" clearable>
        <template slot="prepend">
          <el-button
            :type="editTitle? 'success': 'warning'"
            :icon="'el-icon-'+ (editTitle? 'check': 'edit')"
            @click="onEditTitle()"
          />
        </template>
      </el-input>
    </el-popover>
    <div class="files-container">
      <draggable v-model="localData.fotos" class="draggable" group="fotos" @change="onChangeOrderFotos()">
        <foto-item v-for="(fto, i) in localData.fotos" :key="fto.urlFoto" v-model="localData.fotos[i]" type-btn="danger" icon-btn="el-icon-delete" @on-press="onDeleteFoto(fto)" />
      </draggable>
    </div>
  </div>
</template>

<script>
import { GrupoResource } from '@/api/grupo';
import FotoItem from './foto/FotoItem.vue';
import draggable from 'vuedraggable';
export default {
  name: 'ViewGroup',
  components: {
    FotoItem,
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
      editTitle: false,
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
    onChangeOrderFotos() {
      GrupoResource.update(this.localData.id, {
        ordenFotos: this.localData.fotos.map(f => f.id),
      }).then(() => {
        this.$message({
          message: 'Orden de Fotos actualizado.',
          type: 'success',
        });
      });
      this.onChange();
    },
    onDeleteFoto(fto) {
      GrupoResource.Foto(fto.grupoId).destroy(fto.id)
        .then(() => {
          this.$message({
            message: 'Foto Eliminado Exitosamente',
            type: 'success',
          });
          GrupoResource.update(this.localData.id, {
            ordenFotos: this.localData.ordenFotos.filter(f => f !== fto.id),
          }).then(() => {
            this.$message({
              message: 'Orden de Fotos actualizado.',
              type: 'success',
            });
          });
        });
      this.onChange();
    },
    onEditTitle() {
      this.editTitle = !this.editTitle;
      if (!this.editTitle) {
        this.onChange();
        GrupoResource.update(this.localData.id, {
          tituloGrupo: this.localData.tituloGrupo,
        }).then(() => {
          this.$message({
            message: 'El titulo del grupo fue actualizado exitosamente.',
            type: 'success',
          });
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.group-container{
  padding: 10px;
  border: 2px solid #ddd;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
}
.group-container:hover{
  box-shadow: 0 0 7px #ddd;
  border: 2px solid #ccc;
}
.files-container{
  overflow-x: auto;
  width: 100%;
}
.files-container::-webkit-scrollbar-track {
  border: 1px solid #fff;
  border-radius: 5px;
  padding: 2px 0;
  background-color: #bebebe;
}

.files-container::-webkit-scrollbar {
  width: 10px;
}

.files-container::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #737272;
  border: 1px solid #737272;
}
.draggable{
  display: flex;
}
</style>
