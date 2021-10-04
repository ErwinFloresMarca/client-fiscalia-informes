<template>
  <div class="form-container">
    <el-form ref="formData1" :model="formData" :rules="rules" inline label-position="top">
      <el-form-item label="Destino" prop="destino">
        <el-input
          v-model="formData.destino"
          placeholder="introduzca el destino"
          size="normal"
          type="text"
        />
      </el-form-item>
      <el-form-item label="Fecha del Viaje" prop="fechaViaje">
        <el-date-picker
          v-model="formData.fechaViaje"
          type="date"
          size="normal"
          placeholder="Fecha del viaje"
          format="dd/MM/yyyy"
        />
      </el-form-item>
      <!-- <el-form-item label="Imagenes">
        <br>
        <br>
        <el-row :gutter="10" width="95%">
          <template v-if="formData.imagenes">
            <el-col
              v-for="(imagen, indexImagenes) in formData.imagenes"
              :key="'imagen'+indexImagenes"
              :span="8"
            >
              <div
                class="div-image img"
                :style="'background-image: url('+imagen+');'"
                @mouseover="showDeleteImage = indexImagenes"
                @mouseout="showDeleteImage = -1"
              >
                <el-row v-show="indexImagenes === showDeleteImage" type="flex" justify="center" align="middle" class="row-image">
                  <el-col :span="4"><el-button type="danger icon-img" circle @click="deleteImg(imagen)"><i class="el-icon-delete" /></el-button></el-col>
                </el-row>
              </div>
            </el-col>
          </template>
          <el-col :span="8">
            <div class="image-slot">
              <el-button type="success" round @click="imagecropperShow=true">Gargar Nuevo</el-button>
            </div>
          </el-col>
        </el-row>
        <image-cropper
          v-show="imagecropperShow"
          :key="imagecropperKey"
          :width="600"
          :height="450"
          :url="uploadImageUrl"
          :headers="headers"
          lang-type="es"
          @close="imagecropperShow=false"
          @crop-upload-success="cropSuccess"
        />
      </el-form-item> -->
    </el-form>
    <el-form ref="formData2" :model="formData" :rules="rules" :inline="false" size="normal" label-position="top">
      <el-form-item label="resumen" prop="resumen">
        <el-input v-model="formData.resumen" type="textarea" :autosize="{minRows: 3, maxRows: 6}" />
      </el-form-item>
      <el-form-item>
        <el-row :gutter="20" type="flex" justify="space-around">
          <el-button @click="onCancel()">Cancelar</el-button>
          <el-button type="primary" @click="onSubmit()">Guardar</el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import ImageCropper from '@/components/ImageCropper';
import { getToken } from '@/utils/auth';
export default {
  name: 'FormConvenio',
  components: {
    // ImageCropper,
  },
  props: {
    viaje: {
      type: Object,
      default: null,
    },
    idViaje: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      formData: {},
      rules: {
        destino: [{ required: true, message: 'El Destino es obligatorio.', trigger: 'blur' }],
        fechaViaje: [{ required: true, message: 'La fecha del viaje es obligatorio.', trigger: 'blur' }],
        resumen: [{ required: true, message: 'El resumen es obligatorio.', trigger: 'blur' }],
      },
      headers: {},
      showDeleteImage: -1,
    };
  },
  computed: {
    id() {
      return this.idViaje;
    },
  },
  watch: {
    viaje(newVal) {
      this.formData = { ... this.viaje };
      delete this.formData.id;
    },
  },
  created() {
    this.headers['authorization'] = 'Bearer ' + getToken();
    if (this.id) {
      this.formData = { ...this.viaje };
      delete this.formData.id;
    }
  },
  methods: {
    onSubmit() {
      this.$refs['formData1'].validate(valid => {
        if (valid) {
          this.$refs['formData2'].validate(valid => {
            if (valid) {
              this.$emit('submit', this.formData);
            }
          });
        }
      });
    },
    onCancel() {
      this.$emit('cancel', this.formData);
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-img{
    font-size: 30px;
}
.row-image{
    width: 100%;
    height: 150px;
    background-color: rgba(0, 0, 0, 0.37);
}
.div-image{
    width: 100%;
    height: 150px;
}
</style>
