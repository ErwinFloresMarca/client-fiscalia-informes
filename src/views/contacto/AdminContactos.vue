<template>
  <div width="100%">
    <Title title="CONTACTOS" />
    <div class="filter-container">
      <el-input v-model="keyword" class="filter-item" placeholder="palabra clave" size="mini" clearable />
      <el-select v-model="propertyKey" class="filter-item" placeholder="Campo donde buscar" size="mini">
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
      <el-button type="primary" class="filter-item" size="mini" :loading="loading" @click="getList()">Buscar / Refrescar</el-button>
    </div>
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
            <el-button type="primary" icon="el-icon-tickets" size="mini" @click="onSelect(scope.row.id)">Ver</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="onDelete(scope.row.id)">Eliminar</el-button>
          </el-row>
        </el-table-column>
      </el-table>
      <pagination :total="total" :page="page" :limit="pagination.limit" @pagination="onPaginate" />
    </div>
  </div>
</template>

<script>
import { ContactoResource } from '@/api/contacto';
import Pagination from '@/components/Pagination';
import Title from '@/components/Title.vue';
import { formatTime } from '@/utils';
export default {
  name: 'AdminContactos',
  components: {
    Pagination,
    Title,
  },
  data() {
    return {
      orders: [
        { key: 'asc', label: 'Acendente' },
        { key: 'desc', label: 'Decendente' },
      ],
      properties: [
        { key: 'nombre', label: 'Nombre Completo' },
        { key: 'email', label: 'Correo Electrónico' },
        { key: 'asunto', label: 'Asunto' },
        { key: 'visto', label: 'Visto' },
        { key: 'fechaRegistro', label: 'Fecha de Registro' },
      ],
      keyword: '',
      propertyKey: 'fechaRegistro',
      orderKey: 'desc',
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
    where() {
      const where = {};
      if (this.keyword.length > 0) {
        where[this.propertyKey] = { like: this.keyword };
      }
      return where;
    },
    page() {
      return this.pagination.skip + 1;
    },
  },
  watch: {
    $route(to, from) {
      if (to.name === 'AdminContactos') {
        this.getList();
      }
    },
  },
  created() {
    this.getList();
  },
  methods: {
    onPaginate(pgn) {
      this.pagination = { skip: pgn.page - 1, limit: pgn.limit };
      this.getList();
    },
    prepareQuery() {
      return {
        order: `${this.propertyKey} ${this.orderKey}`,
        ...this.pagination,
        where: this.where,
      };
    },
    getList() {
      this.loading = true;
      this.getCant();
      ContactoResource.list(
        this.prepareQuery(),
      ).then(resp => {
        resp.data.forEach(e => {
          e.fechaRegistro = formatTime(e.fechaRegistro);
        });
        this.list = resp.data;
        this.loading = false;
      }).catch(err => {
        this.loading = false;
        console.log(err);
      });
    },
    getCant() {
      ContactoResource.count({
        order: `${this.propertyKey} ${this.orderKey}`,
        where: this.where,
      }).then(resp => {
        this.total = resp.data.count;
      }).catch(err => {
        console.log(err);
      });
    },
    onSelect(idContacto) {
      this.$router.push({
        name: 'ShowContacto',
        params: {
          id: idContacto,
        },
      });
    },
    onDelete(idContacto) {
      this.$alert('Esta seguro de eliminar el contacto?', 'Eliminar Contacto', {
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Aceptar',
      }).then(() => {
        ContactoResource.destroy(idContacto).then(resp => {
          this.$message({
            message: 'Contacto Eliminado!',
            type: 'success',
            showClose: true,
            duration: 3000,
          });
          this.getList();
        }).catch(err => console.log(err));
      }).catch(() => {
        this.$message({
          message: 'eliminar contacto cancelado.',
          type: 'info',
          showClose: true,
          duration: 3000,
        });
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
}
.title{
  color: #285082;
}
.list-container{
  padding: 5px;
}
</style>
