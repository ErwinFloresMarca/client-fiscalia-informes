<template>
  <div class="form-container">
    <el-steps :active="step" finish-status="success" align-center>
      <el-step title="CUD" />
      <el-step title="Dispositivo" />
      <el-step title="Fotos" />
    </el-steps>
    <transition name="el-zoom-in-top">
      <div v-show="step == 0" class="step-container">
        <el-form ref="fst1" :model="form" :rules="rulesfst1" label-width="50%" label-position="right" size="normal">
          <el-form-item label="CUD" prop="casoId">
            <select-caso v-model="form.casoId" @change="cambioCaso" />
          </el-form-item>
          <el-form-item v-if="caso" label-width="0">
            <show-caso :caso="caso" @change="cambioCaso(form.casoId)" />
          </el-form-item>
          <el-form-item label-width="0">
            <el-row :gutter="20" type="flex" justify="space-around">
              <el-button type="danger" @click="onCancel">CANCELAR</el-button>
              <el-button type="primary" @click="step2()">SIGUIENTE</el-button>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </transition>
    <transition name="el-zoom-in-bottom">
      <div v-show="step == 1" class="step-container">
        2
      </div>
    </transition>
    <transition name="el-zoom-in-top">
      <div v-show="step == 2" class="step-container">
        3
      </div>
    </transition>
  </div>
</template>

<script>
import SelectCaso from '@/views/caso/components/SelectCaso.vue';
import { CasoResource } from '@/api/caso';
import ShowCaso from '@/views/caso/components/ShowCaso.vue';
export default {
  name: 'FormInformeFotografico',
  components: { SelectCaso, ShowCaso },
  data() {
    return {
      form: {
      },
      rulesfst1: {
        casoId: [{ required: true, message: 'Debe escojer un CUD', trigger: 'blur' }],
      },
      rulesfst2: {
      },
      rulesfst3: {
      },
      caso: undefined,
      step: 0,
    };
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  methods: {
    onSubmit() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          this.$emit('submit', this.formData);
        }
      });
    },
    step2() {
      this.$refs.fst1.validate(valid => {
        if (valid) {
          this.step = 1;
        }
      });
    },
    onCancel() {
      this.$emit('cancel', this.formData);
    },
    cambioCaso(idCaso) {
      if (idCaso) {
        CasoResource.get(idCaso, { include: ['fiscal'] }).then(resp => {
          this.caso = resp.data;
        }).catch(err => console.log(err));
      } else {
        this.caso = undefined;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form-container{
  padding: 20px;
}
.step-container {
  margin: 20px;
}
</style>
