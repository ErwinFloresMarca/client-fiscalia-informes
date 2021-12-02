<template>
  <div>
    <Title title="NUEVO INFORME FOTOGRAFICOS" />
    <el-row :gutter="20" type="flex" justify="center">
      <div v-loading="loading" class="form-container">
        <form-informe-fotografico @submit="onSubmit" @cancel="onCancel" />
      </div>
    </el-row>
  </div>
</template>

<script>
import Title from '@/components/Title.vue';

import { InformeFotograficoResource } from '@/api/informeFotografico';
import FormInformeFotografico from './components/formInformeFotografico.vue';
import { DispositivoResource } from '@/api/dispositivo';
export default {
  name: 'NewInformeFotografico',
  components: {
    Title,
    FormInformeFotografico,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    onSubmit(informeFotografico) {
      this.loading = true;
      const inF = { ...informeFotografico };
      const disp = {
        info: informeFotografico.info,
        propietarioId: informeFotografico.propietarioId,
        tipoDispositivoId: informeFotografico.tipoDispositivoId,
      };
      inF.info = inF.propietarioId = inF.tipoDispositivoId = undefined;
      DispositivoResource.store(disp).then(resp => {
        inF.dispositivoId = resp.data.id;
        InformeFotograficoResource.store(inF).then(resp => {
          this.$message({
            message: 'Informe Fotografico creado Exitosamente.',
            type: 'success',
            showClose: true,
            duration: 3000,
          });
          this.loading = false;
          this.$router.push({ name: 'ViewInformeFotografico', params: { id: resp.data.id }});
        }).catch(err => {
          this.loading = false;
          console.log(err);
          this.$message({
            message: err.data.error.message,
            type: 'error',
            showClose: true,
            duration: 4000,
          });
        });
      }).catch(err => console.log(err));
    },
    onCancel() {
      this.$message({
        message: 'Cancelado',
        type: 'info',
        showClose: true,
        duration: 2000,
      });
      this.$router.push({ name: 'AdminInformesFotograficos' });
    },
  },
};
</script>

<style lang="scss" scoped>
.form-container{
    width: 100%;
    max-width: 700px;
    min-width: 400px;
}
</style>
