<template>
  <div class="report-container">
    <el-row :gutter="20">
      <el-col :span="24" :offset="0">
        <el-button class="report-option-item" type="primary" size="small" @click="onDownload()"><svg-icon icon-class="pdf" /> Download</el-button>
        <el-switch v-model="size" active-text="carta" inactive-text="oficio" active-value="letter" inactive-value="legal" />
      </el-col>
      <el-col :span="12" :offset="0">
        otras opciones
      </el-col>
    </el-row>
    <vue-html2pdf
      ref="html2Pdf"
      :show-layout="true"
      :float-layout="false"
      :enable-download="false"
      :preview-modal="true"
      pdf-content-width="100%"
      filename="new File"
      :pdf-quality="2"
      :paginate-elements-by-height="1000"
      :manual-pagination="false"
      :pdf-format="size"
      pdf-orientation="portrait"
      :html-to-pdf-options="{margin: 18, html2canvas: {
        useCORS: true,
      }}"
      @hasGenerated="hasGenerated($event)"
    >
      <section slot="pdf-content">
        <el-row type="flex" justify="center">
          <h2>INFORME FOTOGRAFICO</h2>
        </el-row>
        <table width="100%">
          <tr>
            <th align="left" width="100px">CUD:</th>
            <td>{{ getIF.caso.cud }}</td>
          </tr>
          <tr>
            <th align="left">Delito:</th>
            <td>{{ getIF.caso.delito }}</td>
          </tr>
          <tr>
            <th align="left">Fiscal:</th>
            <td>{{ `${getIF.caso.fiscal.nombres} ${getIF.caso.fiscal.apPaterno} ${getIF.caso.fiscal.apMaterno}` }}</td>
          </tr>
        </table>
        <br>
        <table width="100%">
          <template v-for="k in Object.keys(getIF.dispositivo.info)">
            <tr v-if="getIF.dispositivo.info[k]" :key="k">
              <th align="left" width="100px">{{ k }}:</th>
              <td>{{ getIF.dispositivo.info[k] }}</td>
            </tr>
          </template>
        </table>
        <div v-for="grupo in getIF.grupos" :key="grupo.id" class="group-container">
          <el-row :gutter="20" type="flex" justify="center">
            <h3>{{ grupo.tituloGrupo }}</h3>
          </el-row>
          <div class="images-container">
            <div v-for="foto in grupo.fotos" :key="foto.id" class="image-container" :style="{width: (foto.fotoWidth || foto.defaultWidth)}">
              <div class="image" :style="{ width: '100%', height: (foto.fotoHeight || foto.defaultHeight)}">
                <img class="img" :src="downloadFotoUrl(foto.urlFoto)" alt="no se pudo cargar la imagen">
              </div>
              <p>{{ foto.descripcion }}</p>
            </div>
          </div>
        </div>
      </section>
    </vue-html2pdf>
  </div>
</template>

<script>

import VueHtml2pdf from 'vue-html2pdf';
import { downloadFotoUrl } from '@/api/fileReader';
export default {
  name: 'InformeFotograficoReport',
  components: {
    VueHtml2pdf,
  },
  props: {
    informeFotografico: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      size: 'letter',
    };
  },
  computed: {
    getIF() {
      return this.informeFotografico;
    },
  },
  methods: {
    hasGenerated(file) {
      console.log(file);
    },
    onDownload() {
      this.$refs.html2Pdf.generatePdf();
    },
    downloadFotoUrl,
  },
};
</script>

<style lang="scss" scoped>
.report-option-item{
  margin: 5px;
}
.group-container{
  .images-container{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .image-container{
      width: fit-content;
      height: fit-content;
      .image{
        display: flex;
        justify-content: center;
        align-items: center;
        .img {
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
  }
}

</style>
