<template>
  <div class="viaje-container">
    <Title title="VIAJES" />
    <filter-resource-header
      :list-properties="properties"
      default-property="fechaRegistro"
      @on-filter="onFilter"
    >
      <el-button type="primary" icon="el-icon-plus" size="mini" @click="onAdd()">Nuevo</el-button>
    </filter-resource-header>
    <div class="list-container">
      <el-table :data="list" border stripe :loading="loading">
        <el-table-column
          v-for="prop in properties"
          :key="prop.key"
          :prop="prop.key"
          :label="prop.label"
          :width="prop.width"
        >
          <template slot-scope="scope">
            <el-tag v-if="prop.key === 'visto'" :type="scope.row.visto? 'success': 'danger'" size="mini" effect="dark">
              {{ scope.row.visto? 'Visto': 'No Visto' }}
            </el-tag>
            <span v-else>
              {{ scope.row[prop.key] }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="Opciones"
          width="200px"
        >
          <el-row slot-scope="scope" type="flex" justify="space-around">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="onEdit(scope.row.id)">Editar</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="onDelete(scope.row.id)">Eliminar</el-button>
          </el-row>
        </el-table-column>
      </el-table>
      <pagination :total="total" :page="page" :limit="pagination.limit" @pagination="onPaginate" />
    </div>
  </div>
</template>

<script>
import Title from '@/components/Title.vue';
import FilterResourceHeader from '@/components/FilterRecource.vue/FilterResourceHeader.vue';
import Pagination from '@/components/Pagination';
import { ViajeResource } from '@/api/viaje';
import { formatTime } from '@/utils';
export default {
  name: 'Viajes',
  components: {
    Title,
    FilterResourceHeader,
    Pagination,
  },
  data() {
    return {
      properties: [
        { key: 'destino', label: 'Destino', filterable: true },
        { key: 'resumen', label: 'Resumen', filterable: true },
        { key: 'fechaViaje', label: 'Fecha del Viaje', filterable: false },
        { key: 'fechaRegistro', label: 'Fecha de Registro', filterable: false },
      ],
      filter: {},
      list: [],
      pagination: {
        skip: 0,
        limit: 10,
      },
      total: 0,
      loading: false,
    };
  },
  computed: {
    page() {
      return this.pagination.skip + 1;
    },
  },
  watch: {
    $route(newVal) {
      if (newVal.name === 'AdminViajes') {
        this.getList();
      }
    },
  },
  created() {
  },
  methods: {
    onFilter(filter) {
      this.filter = filter;
      this.getList();
    },
    onPaginate(pgn) {
      this.pagination = { skip: pgn.page - 1, limit: pgn.limit };
      this.getList();
    },
    getList() {
      this.loading = true;
      this.getCant();
      ViajeResource.list({
        ... this.filter,
        ... this.pagination,
      }).then(resp => {
        resp.data.forEach(e => {
          e.fechaRegistro = formatTime(e.fechaRegistro);
          e.fechaViaje = formatTime(e.fechaViaje);
        });
        this.list = resp.data;
        this.loading = false;
      }).catch(err => {
        console.log(err);
        this.loading = false;
      });
    },
    getCant() {
      ViajeResource.count({
        ...this.filter,
      }).then(resp => {
        this.total = resp.data.count;
      }).catch(err => {
        console.log(err);
      });
    },
    onAdd() {
      this.$router.push({ name: 'NewViaje' });
    },
    onEdit(idViaje) {
      this.$router.push({ name: 'EditViaje', params: {
        id: idViaje,
      }});
    },
    onDelete(idViaje) {
      ViajeResource.destroy(idViaje).then(resp => {
        this.$message({
          message: 'Viaje Eliminado exitosamente',
          type: 'success',
          showClose: true,
          duration: 3000,
        });
        this.getList();
      }).catch(err => console.log(err.response.data.error));
    },
  },
};
</script>

<style lang="scss" scoped>
.viaje-container{
    width: 100%;
    height: 100%;
}
.list-container{
  padding: 5px;
  height: 100%;
}
</style>
