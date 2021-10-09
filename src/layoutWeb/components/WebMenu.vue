<template>
  <el-menu
    mode="horizontal"
    background-color="#285082"
    text-color="#ffffff"
    active-text-color="#ffdd00"
    :collapse-transition="false"
    :default-active="selected"
    menu-trigger="click"
  >
    <template v-if="!menuCollapse">
      <menu-item v-for="(r, index) in listWebRoutes" :key="'g-m-i-'+index" :route="r" />
    </template>
    <el-submenu v-else index="1">
      <template slot="title">Menu</template>
      <menu-item v-for="(r, index) in listWebRoutes" :key="'g-m-i-'+index" :route="r" />
    </el-submenu>

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
      menuCollapse: false,
    };
  },
  computed: {
    listWebRoutes() {
      return webRoutes.children;
    },
  },
  watch: {

  },
  created() {
    this.calculateCollapse();
    window.addEventListener('resize', this.calculateCollapse);
  },
  destroyed() {
    window.removeEventListener('resize', this.calculateCollapse);
  },
  mounted() {
    this.selected = this.$route.name;
  },
  methods: {
    calculateCollapse() {
      this.menuCollapse = document.getElementsByTagName('body')[0].offsetWidth < 531;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
