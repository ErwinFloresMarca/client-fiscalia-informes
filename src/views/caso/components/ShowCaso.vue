<template>
  <el-row :gutter="20">
    <el-col :span="24" :offset="0">
      <el-form label-width="100px" :inline="true" size="normal">
        <el-form-item label="CUD">
          <span>{{ getCaso.cud }}</span>
        </el-form-item>
        <el-form-item label="Delito">
          <span>{{ getCaso.delito }}</span>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col v-if="showSelectFiscal || !getCaso.fiscal" :span="24" :offset="0">
      <el-form label-width="80px" :inline="true" size="normal">
        <el-form-item label="Fiscal">
          <select-fiscal v-model="selectFiscal" @change="onChangeFiscal" />
        </el-form-item>
      </el-form>
    </el-col>
    <el-col v-if="!showSelectFiscal && getCaso.fiscal" :span="24" :offset="0">
      <el-form label-width="170px" :inline="false" size="normal">
        <el-form-item label="Nombre Completo">
          <span>{{ `${getCaso.fiscal.nombres} ${getCaso.fiscal.apPaterno} ${getCaso.fiscal.apMaterno}` }}</span>
          <el-button class="edit-btn" type="warning" size="mini" icon="el-icon-edit" circle @click="showSelectFiscal = true" />
        </el-form-item>
        <el-form-item label="Cargo">
          <span>{{ getCaso.fiscal.cargo }}</span>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import SelectFiscal from '@/views/fiscal/components/SelectFiscal.vue';
import { CasoResource } from '@/api/caso';
export default {
  name: 'ShowCaso',
  components: { SelectFiscal },
  props: {
    caso: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showSelectFiscal: false,
      selectFiscal: undefined,
    };
  },
  computed: {
    getCaso() {
      return this.caso;
    },
  },
  methods: {
    onChangeFiscal(idFiscal) {
      if (idFiscal) {
        CasoResource.update(this.getCaso.id, {
          fiscalId: idFiscal,
        }).then(resp => {
          this.$emit('change');
          this.showSelectFiscal = false;
          this.$message({
            message: 'El Fiscal fue cambiado para este caso.',
            type: 'success',
            showClose: true,
            duration: 3000,
          });
        }).catch(err => console.log(err));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-btn{
    margin-left: 10px;
}
</style>
