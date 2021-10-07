<template>
  <div class="upload-container">
    <dropzone
      :id="idUploadFileComponent"
      :key="idUploadFileComponent"
      :url="uploadUrl"
      :accepted-files="getAceptFiles"
      :max-filesize="getMaxFileSize"
      @dropzone-success="onUploadFile"
    />
  </div>
</template>

<script>
import { uploadFileUrl } from '@/api/file';
import Dropzone from './Dropzone';
export default {
  name: 'UploadFile',
  components: {
    Dropzone,
  },
  props: {
    aceptFiles: {
      type: String,
      default: '',
    },
    maxFileSize: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      idUploadFileComponent: (new Date()).toString(),
    };
  },
  computed: {
    uploadUrl() {
      return uploadFileUrl();
    },
    getAceptFiles() {
      return this.aceptFiles;
    },
    getMaxFileSize() {
      return this.maxFileSize;
    },
  },
  methods: {
    onUploadFile(file) {
      this.idUploadFileComponent = (new Date()).toString();
      this.$emit('success', file);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
