<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>Hacerca de mi</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="user.avatar?getAvatarUrl:'/images/defaultUser.png'" :height="'100px'" :width="'100px'" :hoverable="false">
          <br>
          <el-button
            type="primary"
            icon="el-icon-upload"
            circle
            @click="imagecropperShow=true"
          />
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
        <el-dropdown trigger="click" size="default" split-button type="primary">
          Permisos
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="item in user.permissions"
              :key="item"
            >
              {{ item }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey+''"
      :width="300"
      :height="300"
      :url="getUploadFileUrl"
      lang-type="es"
      :field="'avatar-'+getUser.name"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
  </el-card>
</template>

<script>
import PanThumb from '@/components/PanThumb';
import ImageCropper from '@/components/ImageCropper';
import { uploadFileUrl, downloadFileUrl } from '@/api/file';
import { UserResource } from '@/api/user';
export default {
  name: 'UserCard',
  components: {
    PanThumb,
    ImageCropper,
  },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          avatar: '',
          permissions: '',
        };
      },
    },
  },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 1,
    };
  },
  computed: {
    getUser() {
      return this.user;
    },
    getUploadFileUrl() {
      return uploadFileUrl();
    },
    getAvatarUrl() {
      return downloadFileUrl(this.getUser.avatar);
    },
  },
  methods: {
    cropSuccess(resData) {
      this.imagecropperShow = false;
      this.imagecropperKey = this.imagecropperKey + 1;
      UserResource.getAuthUser().then(resp => {
        UserResource.update(resp.data.id, { avatar: resData.files[0].originalname }).then(resp => {
          this.$message({
            message: 'Imagen de perfil actualizado.',
            type: 'success',
            showClose: true,
            duration: 3000,
          });
          this.$store.dispatch('user/getInfo');
        }).catch(err => console.log(err));
      }).catch(err => console.log(err));
    },
    close() {
      this.imagecropperShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-permissions {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
