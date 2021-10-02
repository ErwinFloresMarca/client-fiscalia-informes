<template>
  <el-menu
    mode="horizontal"
    background-color="#285082"
    text-color="#ffffff"
    active-text-color="#ffdd00"
    :default-active="selected"
  >
    <menu-item v-for="(r, index) in listWebRoutes" :key="'g-m-i-'+index" :route="r" />
  </el-menu>
</template>

<script>
import webRoutes from '@/router/modules/web';
import MenuItem from './MenuItem.vue';
export default {
  name: 'WebMenu',
  components: {
    MenuItem,
  },
  data() {
    return {
      selected: 'Home',
    };
  },
  computed: {
    listWebRoutes() {
      return webRoutes.children;
    },
  },
  mounted() {
    this.selected = this.$route.name;
  },
};
</script>

<style lang="scss" scoped>

</style>
