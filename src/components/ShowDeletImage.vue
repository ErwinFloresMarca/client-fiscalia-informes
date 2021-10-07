<template>
  <div class="image-container" @mouseenter="inside()" @mouseleave="outside()">
    <el-image
      class="image"
      :src="getUrl"
      fit="cover"
    />
    <div v-if="onHover" class="btn-container">
      <div class="btn-delete">
        <el-button type="danger" icon="el-icon-delete" size="default" circle @click="onPressDelete()" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  nmae: 'ShowDeleteImage',
  props: {
    url: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      onHover: false,
    };
  },
  computed: {
    getUrl() {
      return this.url;
    },
  },
  methods: {
    onPressDelete() {
      this.$emit('delete', this.getUrl);
    },
    inside() {
      if (this.onHover === false) { this.onHover = true; }
    },
    outside() {
      if (this.onHover === true) {
        this.onHover = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.image-container {
  width: 100%;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  position: relative; /* If you want text inside of it */
}
.image {
  border-radius: 10px;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.btn-container{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 10px;
  background-color: rgb(20,20,20,0.5);
}
.btn-delete{
  border-radius: 10px;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  bottom: 0;
  right: 0;
  margin-top: -19px;
  margin-left: -19px;
}
</style>
