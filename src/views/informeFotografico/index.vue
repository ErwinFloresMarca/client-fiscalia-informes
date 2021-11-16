<template>
  <div class="informes-fotografdicos-container">
    <Title title="INFORMES FOTOGRAFICOS" />
    <filter-resource-header
      :list-properties="properties"
      default-property="cud"
      @on-filter="onFilter"
    >
      <el-button v-permission="['CreateInFoto']" type="primary" icon="el-icon-plus" size="mini" @click="onAdd()">Nuevo</el-button>
    </filter-resource-header>
    <div class="list-container">
      <el-table :data="list" border stripe :loading="loading">
        <el-table-column width="50px" label="No.">
          <template slot-scope="scope">
            {{ scope.$index + 1 + (pagination.limit * pagination.skip) }}
          </template>
        </el-table-column>
        <el-table-column
          v-for="prop in properties"
          :key="prop.key"
          :prop="prop.key"
          :label="prop.label"
          :width="prop.width"
        >
          <template slot-scope="scope">
            <el-button v-if="prop.key === 'state'" :type="scope.row.state? 'success': 'danger'" size="mini" @click="onChangeState(scope.row.id, scope.row.state)">
              {{ scope.row.state? 'Activo': 'Inactivo' }}
            </el-button>
            <span v-else-if="prop.key === 'created'">
              {{ formatTime(scope.row.created, '{d}/{m}/{y}') }}
            </span>
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
            <el-button v-permission="['UpdateUser']" type="primary" icon="el-icon-edit" size="mini" @click="onEdit(scope.row.id)">Editar</el-button>
            <el-button v-permission="['DeleteUser']" type="danger" icon="el-icon-delete" size="mini" @click="onDelete(scope.row.id)">Eliminar</el-button>
          </el-row>
        </el-table-column>
      </el-table>
      <pagination :total="total" :page="page" :limit="pagination.limit" @pagination="onPaginate" />
    </div>
  </div>
</template>

<script>
import Title from '@/components/Title.vue';
import permission from '@/directive/permission/index.js';
import FilterResourceHeader from '@/components/FilterRecource.vue/FilterResourceHeader.vue';
import Pagination from '@/components/Pagination';
import { InformeFotograficoResource } from '@/api/informeFotografico';
import { formatTime } from '@/utils';
// import checkPermission from '@/utils/permission';
export default {
  name: 'InformesFotograficos',
  components: {
    Title,
    FilterResourceHeader,
    Pagination,
  },
  directives: { permission },
  data() {
    return {
      properties: [
        { key: 'cud', label: 'CUD', filterable: true },
        { key: 'victima', label: 'Victima', filterable: true },
        { key: 'denunciado', label: 'Denunciado', filterable: true },
        { key: 'propietarioDispositivo', label: 'Propietario Disp.', filterable: false },
        { key: 'marcaDispositivo', label: 'Marca Disp.', filterable: true },
        { key: 'nombreDispositivo', label: 'Nombre Disp.', filterable: true },
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
      if (newVal.name === 'AdminUsers') {
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
    formatTime,
    onPaginate(pgn) {
      this.pagination = { skip: pgn.page - 1, limit: pgn.limit };
      this.getList();
    },
    getList() {
      this.loading = true;
      this.getCant();
      InformeFotograficoResource.list({
        ... this.filter,
        limit: this.pagination.limit,
        skip: this.pagination.skip * this.pagination.limit,
      }).then(resp => {
        resp.data.forEach(e => {
          e.fechaRegistro = formatTime(e.fechaRegistro);
        });
        this.list = resp.data;
        this.loading = false;
      }).catch(err => {
        console.log(err);
        this.loading = false;
      });
    },
    getCant() {
      InformeFotograficoResource.count({
        ...this.filter.where,
      }).then(resp => {
        this.total = resp.data.count;
      }).catch(err => {
        console.log(err);
      });
    },
    onAdd() {
      this.$router.push({ name: 'NewInformeFotografico' });
    },
    onEdit(idInformeFotografico) {
      this.$router.push({ name: 'EditInformeFotografico', params: {
        id: idInformeFotografico,
      }});
    },
    onDelete(idInformeFotografico) {
      InformeFotograficoResource.destroy(idInformeFotografico).then(resp => {
        this.$message({
          message: 'Informe Fotografico Eliminado exitosamente',
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
.informes-fotografdicos-container{
    width: 100%;
    height: 100%;
}
.list-container{
  padding: 5px;
  height: 100%;
}
</style>
