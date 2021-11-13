<template>
  <div class="usuarios-container">
    <Title title="USUARIOS" />
    <filter-resource-header
      :list-properties="properties"
      default-property="created"
      @on-filter="onFilter"
    >
      <el-button v-permission="['CreateUser']" type="primary" icon="el-icon-plus" size="mini" @click="onAdd()">Nuevo</el-button>
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
import { UserResource } from '@/api/user';
import { formatTime } from '@/utils';
import checkPermission from '@/utils/permission';
export default {
  name: 'Usuarios',
  components: {
    Title,
    FilterResourceHeader,
    Pagination,
  },
  directives: { permission },
  data() {
    return {
      properties: [
        { key: 'name', label: 'Nombre Completo', filterable: true },
        { key: 'ci', label: 'Carnet de Identidad', filterable: true },
        { key: 'created', label: 'Fecha de Registro', filterable: true },
        { key: 'state', label: 'Estado', filterable: false },
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
    onChangeState(id, state) {
      if (checkPermission(['UpdateUser'])) {
        UserResource.update(id, { state: !state }).then(resp => {
          this.$message({
            message: 'Estado actualizado exitosamente!',
            type: 'success',
          });
          this.getList();
        }).catch(err => console.log(err));
      } else {
        this.$message({
          message: 'No cuenta con Los permisos necesarios!',
          type: 'info',
        });
      }
    },
    onPaginate(pgn) {
      this.pagination = { skip: pgn.page - 1, limit: pgn.limit };
      this.getList();
    },
    getList() {
      this.loading = true;
      this.getCant();
      UserResource.list({
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
      UserResource.count({
        ...this.filter.where,
      }).then(resp => {
        this.total = resp.data.count;
      }).catch(err => {
        console.log(err);
      });
    },
    onAdd() {
      this.$router.push({ name: 'NewUser' });
    },
    onEdit(idUser) {
      this.$router.push({ name: 'EditUser', params: {
        id: idUser,
      }});
    },
    onDelete(idUser) {
      UserResource.destroy(idUser).then(resp => {
        this.$message({
          message: 'Usuario Eliminado exitosamente',
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
.usuarios-container{
    width: 100%;
    height: 100%;
}
.list-container{
  padding: 5px;
  height: 100%;
}
</style>
