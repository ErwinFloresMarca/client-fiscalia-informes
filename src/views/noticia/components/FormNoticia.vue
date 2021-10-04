<template>
  <div class="form-container">
    <el-form ref="formData" :model="formData" :rules="rules" label-width="100px" label-position="lefth">
      <el-form-item label="Titulo" prop="titulo">
        <el-input v-model="formData.titulo" placeholder="titulo" size="normal" />
      </el-form-item>
      <el-form-item label="Descripción" prop="desc">
        <el-input
          v-model="formData.desc"
          type="textarea"
          :autosize="{minRows: 3, maxRows: 6}"
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
  name: 'FormNoticia',
  components: {
    // ImageCropper,
  },
  props: {
    noticia: {
      type: Object,
      default: null,
    },
    idNoticia: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      formData: {},
      rules: {
        titulo: [{ required: true, message: 'El titulo es requerido', trigger: 'blur' }],
        desc: [{ required: true, message: 'La Descripción es requerida', trigger: 'blur' }],
      },
      headers: {},
      showDeleteImage: -1,
    };
  },
  computed: {
    id() {
      return this.idNoticia;
    },
  },
  watch: {
    noticia(newVal) {
      this.formData = { ... this.noticia };
      delete this.formData.id;
    },
  },
  created() {
    this.headers['authorization'] = 'Bearer ' + getToken();
    if (this.id) {
      this.formData = { ...this.noticia };
      delete this.formData.id;
    }
  },
  methods: {
    onSubmit() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.$emit('submit', this.formData);
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
