<template>
  <div class="home-container">
    <el-carousel
      height="320px"
      type="card"
      direction="horizontal"
      :initial-index="0"
      :autoplay="true"
      :interval="5000"
      :loop="true"
      trigger="hover"
      indicator-position="outside"
      arrow="hover"
    >
      <el-carousel-item v-for="(item, index) in contenido" :key="'item-'+index">
        <el-row :gutter="20" type="flex" justify="center">
          <el-image
            style="width: 500px; height: 280px"
            :src="item.imagen"
            fit="contain"
          />
        </el-row>
        <el-row :gutter="20" type="flex" justify="center">
          <h4><span class="name-image">{{ item.desc }}</span></h4>
        </el-row>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      contenido: [
        {
          imagen: '/images/homeImages/personalAdministrativo.jpg',
          desc: 'Personal Administrativo',
        },
        {
          imagen: '/images/homeImages/personalAdministrativo2.jpg',
          desc: 'Personal Administrativo',
        },
        {
          imagen: '/images/homeImages/laboratorio.jpg',
          desc: 'Laboratorio',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.home-container{
  width: 100%;
  height: 100%;
}
.name-image{
  color: #02b7cf;
}
</style>
