<template>
  <el-row :gutter="20" type="flex" justify="center">
    <h1 class="title">{{ getTitle }}</h1>
  </el-row>
</template>

<script>
export default {
  name: 'Title',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
    getTitle() {
      return this.title;
    },
  },
};
</script>

<style lang="scss" scoped>
.title{
  color: #285082;
}
</style>
