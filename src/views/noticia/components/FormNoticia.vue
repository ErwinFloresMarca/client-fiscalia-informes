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
      <el-form-item label-width="0px">
        <label>Imagenes: </label>
        <el-row width="95%">
          <template v-if="formData.imagenes">
            <el-col
              v-for="(imagen, indexImagenes) in formData.imagenes"
              :key="'imagen'+indexImagenes"
              :span="8"
            >
              <div class="img-container">
                <show-delet-image :url="downloadFileUrl+imagen.url" @delete="onDeleteFile(indexImagenes)" />
              </div>
            </el-col>
          </template>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="image-slot">
              <upload-file upload-file acept-files="image/*" @success="onUploadFile" />
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label-width="0px">
        <el-row :gutter="20" type="flex" justify="space-around">
          <el-button @click="onCancel()">Cancelar</el-button>
          <el-button type="primary" @click="onSubmit()">Guardar</el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth';
import UploadFile from '@/components/UploadFile.vue';
import { downloadFileUrl } from '@/api/file';
import ShowDeletImage from '@/components/ShowDeletImage.vue';
export default {
  name: 'FormNoticia',
  components: {
    UploadFile,
    ShowDeletImage,
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
    downloadFileUrl() {
      return downloadFileUrl('');
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
    onUploadFile(file) {
      if (this.formData.imagenes) {
        this.formData.imagenes = [... this.formData.imagenes, {
          url: file.name,
          type: file.type,
        }];
        this.formData = { ...this.formData };
      } else {
        this.formData.imagenes = [{
          url: file.name,
          type: file.type,
        }];
        this.formData = { ...this.formData };
      }
    },
    onDeleteFile(index) {
      this.formData.imagenes.splice(index, 1);
      this.formData = { ...this.formData };
    },
  },
};
</script>

<style lang="scss" scoped>
.img-container{
  width: 100%;
  padding: 5px;
}
</style>
