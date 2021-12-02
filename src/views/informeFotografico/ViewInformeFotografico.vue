<template>
  <div class="page-container">
    <el-row :gutter="20">
      <el-col :span="12" :offset="0">
        View info {{ idIF }}
      </el-col>
      <el-col :span="12" :offset="0">
        view pdf
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { InformeFotograficoResource } from '@/api/informeFotografico';
export default {
  name: 'ViewInformeFotografico',
  data() {
    return {
      idIF: undefined,
      IF: undefined,
      archivos: [],
    };
  },
  created() {
    this.idIF = this.$route.params.id;
    if (this.idIF) {
      this.init();
    } else {
      this.$message({
        message: 'El informe seleccionado es incorrecto.',
        type: 'error',
        duration: 3000,
        showClose: true,
      });
      this.$router.push({ name: 'AdminInformesFotograficos' });
    }
  },
  methods: {
    init() {
      this.getIF();
    },
    getIF() {
      InformeFotograficoResource.get(this.idIF, {
        include: [
          {
            relation: 'caso',
            scope: {
              include: [{ relation: 'fiscal' }],
            },
          },
          {
            relation: 'grupos',
            scope: {
              include: [{ relation: 'fotos' }],
            },
          },
          {
            relation: 'dispositivo',
            scope: {
              include: [{ relation: 'tipoDispositivo' }, { relation: 'propietario' }],
            },
          },
        ],
      }).then(resp => {
        this.IF = resp.data;
      }).catch(err => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.page-container{
    margin: 10px;
}
</style>
