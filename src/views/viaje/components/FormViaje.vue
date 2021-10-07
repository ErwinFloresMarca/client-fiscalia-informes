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
    </el-form>
    <el-form ref="formData2" :model="formData" :rules="rules" :inline="false" size="normal" label-position="top">
      <el-form-item label="resumen" prop="resumen">
        <el-input v-model="formData.resumen" type="textarea" :autosize="{minRows: 3, maxRows: 6}" />
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
import { getToken } from '@/utils/auth';
import { downloadFileUrl } from '@/api/file';
import ShowDeletImage from '@/components/ShowDeletImage.vue';
import UploadFile from '@/components/UploadFile.vue';
export default {
  name: 'FormConvenio',
  components: {
    ShowDeletImage,
    UploadFile,
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
    downloadFileUrl() {
      return downloadFileUrl('');
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
