<template>
  <div class="img-container">
    <show-selectable-image
      :url="getUrlImage"
      :icon-btn="iconBtn"
      :type-btn="typeBtn"
      :use-default-view="false"
      preview
      @on-view="onView()"
      @on-press="onPressItem()"
    />
    <el-dialog
      title="Foto"
      :visible.sync="visible"
      @close="onCloseView()"
    >
      <el-row :gutter="20">
        <el-col :span="12" :xs="24" :offset="0">
          <el-image
            :src="getUrlImage"
            fit="contain"
            alt="NO se pudo cargar la imagen"
            style="width: 100%;"
          />
        </el-col>
        <el-col :span="12" :xs="24" :offset="0">
          <el-form
            ref="form"
            :model="localData"
            label-width="100px"
            :inline="false"
            size="normal"
            :disabled="readonly"
          >
            <el-form-item label="Descripción">
              <el-input
                v-model="localData.descripcion"
                type="textarea"
                :rows="2"
                placeholder="Descripcion"
              />
            </el-form-item>
            <el-form-item label="Ancho">
              <el-input v-model="localData.fotoWidth" type="text" />
            </el-form-item>
            <el-form-item label="Alto">
              <el-input v-model="localData.fotoHeight" type="text" />
            </el-form-item>
            <el-form-item size="normal" label-width="0">
              <el-row type="flex" justify="space-around">
                <el-button @click="onCloseView()">Cancel</el-button>
                <el-button type="primary" @click="onSaveChanges()">Guardar</el-button>
              </el-row>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import ShowSelectableImage from '@/components/ShowSelectableImage.vue';
import { downloadFotoUrl } from '@/api/fileReader';
import { GrupoResource } from '@/api/grupo';
export default {
  name: 'FotoItem',
  components: { ShowSelectableImage },
  props: {
    value: {
      type: Object,
      required: true,
    },
    typeBtn: {
      type: String,
      default: 'primary',
    },
    iconBtn: {
      type: String,
      default: 'el-icon-check',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: false,
      localData: {},
    };
  },
  computed: {
    getFotoItem() {
      return this.value;
    },
    getUrlImage() {
      return downloadFotoUrl(this.value.urlFoto);
    },
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
    onPressItem() {
      this.$emit('on-press');
    },
    onSaveChanges() {
      // save changes
      this.$emit('input', this.localData);
      if (this.localData.id && this.localData.idGrupo) {
        GrupoResource.Foto(this.localData.idGrupo).update(this.localData.id, {
          descripcion: this.localData.descripcion,
          fotoWidth: this.localData.fotoWidth,
          fotoHeight: this.localData.fotoHeight,
        }).then(() => {
          this.$message({
            message: 'Foto actualizado exitosamente',
            type: 'success',
          });
        });
      }
      this.visible = false;
    },
    onView() {
      this.visible = true;
    },
    onCloseView() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.img-container{
    margin: 3px;
}
.el-dialog{
  min-width: 300px;
}
</style>
