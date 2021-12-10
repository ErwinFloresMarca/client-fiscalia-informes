<template>
  <el-row :gutter="20">
    <el-col :span="24" :offset="0">
      <el-form ref="form" :model="localData" :rules="rules" label-width="100px" label-position="right" size="normal">
        <el-form-item label="CUD" prop="casoId">
          <select-caso v-model="localData.casoId" @change="cambioCaso" />
        </el-form-item>
        <el-form-item v-if="caso" label-width="0">
          <show-caso :caso="caso" @change="cambioCaso(localDatacasoId)" />
        </el-form-item>
        <el-form-item label-width="0" prop="fotoSize">
          <label>Dimecion de Fotos: </label>
          <el-row :gutter="20">
            <el-col :span="12" :offset="0">
              <el-row :gutter="20" type="flex">
                <label class="label" for="fotoWidth">Ancho: </label>
                <el-input v-model="localData.fotoWidth" name="fotoWidth" type="text" />
              </el-row>
            </el-col>
            <el-col :span="12" :offset="0">
              <el-row :gutter="20" type="flex" justify="center">
                <label class="label" for="fotoHeight">Alto: </label>
                <el-input v-model="localData.fotoHeight" name="fotoHeight" type="text" />
              </el-row>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="urlFotosFTP" label-width="0">
          <label for="urlFileFTP">Dirección de los archivos:</label>
          <el-input v-model="localData.urlFotosFTP" name="urlFileFTP" type="text" clearable />
        </el-form-item>
        <el-form-item label-width="0">
          <el-row :gutter="20" type="flex" justify="space-around">
            <el-button type="primary" @click="onSave()">GUARDAR</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="12" :offset="0">
      <div />
    </el-col>
  </el-row>
</template>

<script>
import SelectCaso from '@/views/caso/components/SelectCaso.vue';
import { CasoResource } from '@/api/caso';
import ShowCaso from '@/views/caso/components/ShowCaso.vue';
import { InformeFotograficoResource } from '@/api/informeFotografico';
export default {
  name: 'EditFormInformeFotografico',
  components: {
    SelectCaso,
    ShowCaso,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
  data() {
    const fotoSizeValidator = (rule, value, cb) => {
      if (this.localData.fotoWidth && this.localData.fotoHeight) {
        cb();
      } else {
        cb(new Error('Las dimenciones no deben estar vacios'));
      }
    };
    return {
      localData: null,
      caso: undefined,
      rules: {
        casoId: [{ required: true, message: 'Seleccione un Caso', trigger: 'blur' }],
        fotoSize: [{ validator: fotoSizeValidator, trigger: 'blur' }],
        urlFotosFTP: [{ required: true, message: 'Seleccione un Caso', trigger: 'blur' }],
      },
    };
  },
  watch: {
    value(newVal) {
      this.localData = newVal;
    },
  },
  created() {
    this.localData = this.value;
    if (this.localData) {
      this.cambioCaso(this.localData.casoId);
    }
  },
  methods: {
    onChange() {
      this.$emit('change', this.localData);
      this.$emit('input', this.localData);
    },
    cambioCaso(idCaso) {
      if (idCaso) {
        CasoResource.get(idCaso, { include: ['fiscal'] }).then(resp => {
          this.caso = resp.data;
        }).catch(err => console.log(err));
      } else {
        this.caso = undefined;
      }
    },
    onChangeDirFotos(e) {
      var theFiles = e.target.files;
      var relativePath = theFiles[0];
      console.log(relativePath);
    },
    onSave() {
      this.$refs.form.validate(valid => {
        if (valid) {
          InformeFotograficoResource.update(this.localData.id, {
            casoId: this.localData.casoId,
            fotoWidth: this.localData.fotoWidth,
            fotoHeight: this.localData.fotoHeight,
            urlFotosFTP: this.localData.urlFotosFTP,
          }).then(resp => {
            this.$message({
              message: 'Informe actualizado con Exito.',
              type: 'success',
            });
            this.$refs.form.resetFields();
            this.onChange();
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.label{
  margin-left: 15px;
  margin-right: 5px;
}
</style>
