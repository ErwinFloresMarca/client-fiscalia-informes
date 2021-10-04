<template>
  <el-menu-item v-if="route.children === undefined" :index="route.name" class="submenu-title-noDropdown" @click="onClick(route)">{{ route.meta.title }}</el-menu-item>
  <el-submenu v-else ref="subMenu" :index="route.name" popper-append-to-body>
    <template slot="title">{{ route.meta.title }}</template>
    <template v-for="(r, index) in route.children">
      <el-menu-item
        :key="'sub-route-'+index"
        :index="r.name"
        class="submenu-title-noDropdown"
        @click="onClick(r)"
      >{{ r.meta.title }}</el-menu-item>
    </template>
  </el-submenu>
</template>

<script>
import FixiOSBug from '../../layout/components/Sidebar/FixiOSBug';
export default {
  name: 'MenuItem',
  mixins: { FixiOSBug },
  props: {
    route: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onClick(route) {
      if (!route.children) {
        this.$router.push(route);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
