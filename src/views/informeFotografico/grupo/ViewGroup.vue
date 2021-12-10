<template>
  <div v-if="localData" class="group-container">
    <el-popover
      placement="top"
      trigger="hover"
      content="Titulo del grupo"
    >
      <table slot="reference" width="100%">
        <tr>
          <td width="50px">
            <el-button
              :type="edit? 'success': 'warning'"
              :icon="'el-icon-'+ (edit? 'check': 'edit')"
              @click="onEdit()"
            />
          </td>
          <td>
            <el-input v-model="localData.tituloGrupo" :disabled="!edit" placeholder="Titulo" style="width: 100%" clearable />
          </td>
          <td width="50px">
            <el-button type="danger" icon="el-icon-delete" @click="onDelete()" />
          </td>
        </tr>
      </table>
    </el-popover>
    <el-row v-show="edit" :gutter="20">
      <el-col :span="12" :offset="0">
        <el-form label-width="80px">
          <el-form-item label="Ancho">
            <el-input
              v-model="localData.fotoWidth"
              type="text"
              :placeholder="'Def. ' + localData.defaultWidth"
              clearable
            />
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12" :offset="0">
        <el-form label-width="80px">
          <el-form-item label="Alto">
            <el-input
              v-model="localData.fotoHeigth"
              type="text"
              :placeholder="'Def. ' + localData.defaultHeight"
              clearable
            />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="files-container">
      <draggable v-model="localData.fotos" class="draggable" group="fotos" @change="onChangeOrderFotos()">
        <foto-item v-for="(fto, i) in localData.fotos" :key="fto.urlFoto" v-model="localData.fotos[i]" type-btn="danger" icon-btn="el-icon-delete" @on-press="onDeleteFoto(fto)" />
      </draggable>
    </div>
  </div>
</template>

<script>
import { GrupoResource } from '@/api/grupo';
import { FotoResource } from '@/api/foto';
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
      edit: false,
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
    onDelete() {
      GrupoResource.Foto(this.localData.id).destroy().then(() => {
        this.$message({
          message: 'Registro de fotos eliminados con Exito.',
          type: 'success',
        });
        GrupoResource.destroy(this.localData.id).then(() => {
          this.$message({
            message: 'Grupo Eliminado con Exito.',
            type: 'success',
          });
          this.$emit('delete', this.localData);
        });
      });
    },
    onChangeOrderFotos() {
      GrupoResource.update(this.localData.id, {
        ordenFotos: this.localData.fotos.map(f => f.id),
      }).then(() => {
        this.$message({
          message: 'Orden de Fotos actualizado.',
          type: 'success',
        });
        this.localData.fotos.forEach(f => {
          if (f.grupoId !== this.localData.id) {
            FotoResource.update(f.id, {
              grupoId: this.localData.id,
            }).then(() => {
              this.$message({
                message: 'Foto cambiado de grupo con Exito.',
                type: 'success',
              });
              this.onChange();
            });
          }
        });
      });
    },
    onDeleteFoto(fto) {
      FotoResource.destroy(fto.id)
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
            this.onChange();
          });
        });
    },
    onEdit() {
      this.edit = !this.edit;
      if (!this.edit) {
        this.onChange();
        GrupoResource.update(this.localData.id, {
          tituloGrupo: this.localData.tituloGrupo,
          fotoWidth: this.localData.fotoWidth,
          fotoHeigth: this.localData.fotoHeigth,
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
