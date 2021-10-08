<template>
  <div>
    <show-noticia
      v-for="(noticia, index) in noticias"
      :key="'noticia-'+index"
      :noticia="noticia"
      :image-position="index%2===0? 'lefth':'right'"
    />
    <el-row type="flex" justify="center">
      <el-button v-if="!isDisableScroll" type="primary" size="default" :loading="loading" @click="getNoticias()">Mas</el-button>
      <span v-else>
        No hay mas Noticias
      </span>
    </el-row>
  </div>
</template>

<script>
import { NoticiaResource } from '@/api/noticia';
import ShowNoticia from '@/views/noticia/components/ShowNoticia.vue';
export default {
  name: 'Noticias',
  components: {
    ShowNoticia,
  },
  data() {
    return {
      noticias: [],
      paginate: {
        skip: 0,
        limit: 3,
      },
      totalNoticias: 0,
      loading: false,
    };
  },
  computed: {
    isDisableScroll() {
      return this.noticias.length >= this.totalNoticias;
    },
  },
  created() {
    NoticiaResource.count().then(resp => {
      this.totalNoticias = resp.data.count;
      this.getNoticias();
    }).catch(err => console.log(err));
  },
  methods: {
    getNoticias() {
      if (this.noticias.length < this.totalNoticias) {
        this.loading = true;
        NoticiaResource.list({
          order: 'fechaRegistro desc',
          ... this.paginate,
        }).then(resp => {
          this.noticias = [
            ... this.noticias,
            ... resp.data,
          ];
          this.loading = false;
          this.paginate.skip += this.paginate.limit;
        }).catch(err => console.log(err));
      }
    },
  },
};
</script>

<style>

</style>
