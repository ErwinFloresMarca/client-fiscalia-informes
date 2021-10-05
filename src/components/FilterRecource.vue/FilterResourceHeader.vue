<template>
  <div class="filter-container">
    <el-input
      v-if="selectProperty.filterable"
      v-model="keyword"
      class="filter-item"
      placeholder="palabra clave"
      size="mini"
      clearable
    />
    <el-select
      v-model="propertyKey"
      class="filter-item"
      placeholder="Campo donde buscar"
      size="mini"
      @change="searchProperty()"
    >
      <el-option
        v-for="property in properties"
        :key="property.key"
        :label="property.label"
        :value="property.key"
      />
    </el-select>
    <el-select v-model="orderKey" class="filter-item" placeholder="ordenar" size="mini">
      <el-option
        v-for="order in orders"
        :key="order.key"
        :label="order.label"
        :value="order.key"
      />
    </el-select>
    <el-button type="primary" class="filter-item" icon="el-icon-search" size="mini" :loading="loading" @click="onFilter()">Buscar / Refrescar</el-button>
    <template>
      <div class="filter-item" style="width: fit-content;">
        <slot />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'FilterResourceHeader',
  props: {
    listProperties: {
      type: Array,
      required: true,
    },
    defaultProperty: {
      type: String,
      default: () => {
        return this.properties[0].key;
      },
    },
  },
  data() {
    return {
      orders: [
        { key: 'asc', label: 'Acendente' },
        { key: 'desc', label: 'Decendente' },
      ],
      keyword: '',
      propertyKey: undefined,
      selectProperty: {},
      orderKey: 'desc',
      loading: false,
    };
  },
  computed: {
    properties() {
      return this.listProperties;
    },
  },
  created() {
    this.propertyKey = this.defaultProperty;
    this.searchProperty();
    this.onFilter();
  },
  methods: {
    searchProperty() {
      this.selectProperty = this.properties.find(p => {
        if (p.key === this.propertyKey) { return true; } else { return false; }
      });
      this.keyword = '';
    },
    onFilter() {
      const where = {};
      if (this.keyword.length > 0) {
        where[this.propertyKey] = { like: this.keyword };
      }
      this.$emit('on-filter', {
        order: `${this.propertyKey} ${this.orderKey}`,
        where: where,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-item{
  width: 150px;
  margin-right: 5px;
}
.filter-container{
  display: flex;
  padding-left: 10px;
  padding-top: 5px;
}
</style>
