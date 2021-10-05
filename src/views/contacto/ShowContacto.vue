<template>
  <div v-loading="loading" class="show-contacto-container">
    <el-card shadow="hover" width="95%" :body-style="{ padding: '20px' }">
      <div slot="header">
        <strong>CONTACTO</strong>
        <el-button type="text" icon="el-icon-back" style="float: right; padding: 3px 0" size="small" @click="$router.back()">Atras</el-button>
      </div>
      <el-row v-if="contacto" :gutter="20">
        <el-col :span="24" :sm="8" :offset="0">
          <label>Nombre Completo: </label> <span>{{ contacto.nombre }}</span>
        </el-col>
        <el-col :span="24" :sm="8" :offset="0">
          <label>Asunto: </label> <span>{{ contacto.asunto }}</span>
        </el-col>
        <el-col :span="24" :sm="8" :offset="0">
          <label>Estado: </label>{{ contacto.visto? 'Visto':'No Visto' }}
          <el-button :type="contacto.visto? 'danger': 'success'" size="mini" @click="onToggleVisto()">
            {{ contacto.visto? 'Marcar como no visto': 'Marcar como visto' }}
          </el-button>
        </el-col>
        <el-col :span="24" :sm="12" :offset="0">
          <label>Correo Electrónico: </label>
          <el-link type="primary" icon="el-icon-message" :underline="false" :href="'mailto:'+contacto.email" target="_blank">
            {{ contacto.email }}
          </el-link>
        </el-col>
        <el-col :span="24" :sm="12" :offset="0">
          <label>Fecha De Registro: </label> <span>{{ fechaRegistro }}</span>
        </el-col>
        <el-col :span="24" :offset="0">
          <label>Mensaje: </label><br> <p>{{ contacto.mensaje }}</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { ContactoResource } from '@/api/contacto';
import { formatTime } from '@/utils';
export default {
  name: 'ShowContacto',
  data() {
    return {
      contacto: undefined,
      idContacto: undefined,
      loading: true,
    };
  },
  computed: {
    fechaRegistro() {
      return formatTime(this.contacto.fechaRegistro);
    },
  },
  created() {
    this.idContacto = this.$route.params.id;
    this.getContacto();
  },
  methods: {
    getContacto() {
      ContactoResource.get(this.idContacto).then(resp => {
        this.contacto = resp.data;
        this.loading = false;
        if (!this.contacto.visto) {
          this.onToggleVisto();
        }
      }).catch(err => console.log(err));
    },
    onToggleVisto() {
      ContactoResource.update(this.idContacto, { visto: !this.contacto.visto }).then(resp => {
        this.$message({
          message: `Marcado como ${this.contacto.visto ? 'no' : ''} visto!.`,
          type: 'success',
          showClose: true,
          duration: 3000,
        });
        this.contacto.visto = !this.contacto.visto;
      }).catch(err => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.show-contacto-container{
  margin: 20px;
}
.el-col{
    padding: 10px;
}
</style>
