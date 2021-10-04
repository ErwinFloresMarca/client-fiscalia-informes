<template>
  <el-row :gutter="20" type="flex" justify="center">
    <h2 class="title">{{ getTitle }}</h2>
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
  padding-top: 6px;
  color: #285082;
}
</style>
