<template>
  <div>
    <el-row :gutter="20">
      <el-col v-for="(grupo, i) in localData.grupos" :key="grupo.id" :span="24" :offset="0">
        <view-group v-model="localData.grupos[i]" @change="onChange()" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ViewGroup from './ViewGroup.vue';
export default {
  name: 'ManageGroups',
  components: { ViewGroup },
  props: {
    value: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      localData: null,
    };
  },
  watch: {
    value(newVal) {
      this.localData = newVal;
    },
  },
  created() {
    this.localData = this.value;
  },
  methods: {
    onChange() {
      this.$emit('change', this.localData);
      this.$emit('input', this.localData);
    },
  },
};
</script>

<style>

</style>
