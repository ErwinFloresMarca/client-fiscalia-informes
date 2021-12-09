<template>
  <div class="main-image-container">
    <div class="image-container" @mouseenter="inside()" @mouseleave="outside()">
      <el-image
        ref="img"
        class="image"
        :src="getUrl"
        :preview-src-list="[getUrl]"
        fit="cover"
      />
      <div v-if="onHover" class="btn-container">
        <div>
          <el-button v-if="preview" type="warning" icon="el-icon-view" size="small" circle @click="onView()" />
          <el-button :type="typeBtn" :icon="iconBtn" size="small" circle @click="onPress()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  nmae: 'ShowSelectableImage',
  props: {
    url: {
      type: String,
      default: null,
    },
    typeBtn: {
      type: String,
      default: 'primary',
    },
    iconBtn: {
      type: String,
      default: 'el-icon-check',
    },
    useDefaultView: {
      type: Boolean,
      default: true,
    },
    preview: {
      type: Boolean,
      default: false,
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
    onPress() {
      this.$emit('on-press', this.getUrl);
    },
    onView() {
      if (this.useDefaultView) {
        this.$refs.img.clickHandler(this.getUrl);
      } else {
        this.$emit('on-view', this.getUrl);
      }
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
.main-image-container{
  width: 85px;
  height: 85px;
}
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
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border-radius: 10px;
  background-color: rgb(20,20,20,0.5);
}
</style>
