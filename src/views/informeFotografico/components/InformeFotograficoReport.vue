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
      :html-to-pdf-options="{margin: 10}"
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
      </section>
    </vue-html2pdf>
  </div>
</template>

<script>

import VueHtml2pdf from 'vue-html2pdf';
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
  },
};
</script>

<style lang="scss" scoped>
.report-option-item{
  margin: 5px;
}
</style>
