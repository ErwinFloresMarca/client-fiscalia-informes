<template>
  <div>
    <show-noticia
      v-for="(noticia, index) in noticias"
      :key="'noticia-'+index"
      :noticia="noticia"
      :image-position="index%2===0? 'lefth':'right'"
    />
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
    };
  },
  created() {
    NoticiaResource.list({
      order: 'fechaRegistro desc',
      skip: 0,
      limit: 5,
    }).then(resp => {
      resp.data.forEach(element => {
        element.images = [
          { url: '/images/noticias/nt1.png' },
          { url: '/images/noticias/nt2.png' },
          { url: '/images/noticias/nt3.jpg' },
        ];
      });
      this.noticias = resp.data;
    }).catch(err => console.log(err));
  },
};
</script>

<style>

</style>
