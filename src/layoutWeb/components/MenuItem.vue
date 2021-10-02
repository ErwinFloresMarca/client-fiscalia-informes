<template>
  <el-menu-item v-if="route.children === undefined" :index="route.name" @click="onClick(route)">{{ route.meta.title }}</el-menu-item>
  <el-submenu v-else :index="route.name">
    <template slot="title">{{ route.meta.title }}</template>
    <template v-for="(r, index) in route.children">
      <el-menu-item
        :key="'sub-route-'+index"
        :index="r.name"
        @click="onClick(r)"
      >{{ r.meta.title }}</el-menu-item>
    </template>
  </el-submenu>
</template>

<script>
export default {
  name: 'MenuItem',
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
