<template>
  <div class="contactanos-container">
    <el-row :gutter="20">
      <el-col :span="24" :sm="8">
        <iframe id="gmap_canvas" width="100%" height="320" src="https://maps.google.com/maps?q=-19.568882%2C%20-65.758167&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" />
      </el-col>
      <el-col :span="24" :sm="8">
        <div width="80%">
          <contactanos-form />
        </div>
      </el-col>
      <el-col :span="24" :sm="8">
        <table width="100%">
          <tr>
            <td width="40%" align="center" valign="middle">
              <i class="icon-container el-icon-phone-outline" />
            </td>
            <td width="60%" valign="middle">
              <template v-for="tel in telefonos">
                <span :key="tel" class="content-info">
                  <el-link icon="el-icon-phone" type="default" :href="'tel:'+tel">{{ tel }}</el-link>
                </span>
                <br :key="'br-'+tel">
              </template>
            </td>
          </tr>
        </table>
        <table width="100%">
          <tr>
            <td width="40%" align="center" valign="middle">
              <i class="icon-container el-icon-message" />
            </td>
            <td width="60%" valign="middle">
              <template v-for="email in emails">
                <span :key="email" class="content-info">
                  <el-link icon="el-icon-message" type="default" :href="'mailto: '+email">{{ email }}</el-link>
                </span>
                <br :key="'br-'+email">
              </template>
            </td>
          </tr>
        </table>
        <table width="100%">
          <tr>
            <td width="40%" align="center" valign="middle">
              <i class="icon-container el-icon-watch" />
            </td>
            <td width="60%" valign="middle">
              <template v-for="hora in horarios">
                <span :key="hora" class="content-info">
                  <el-link>{{ hora }}</el-link>
                </span>
                <br :key="'br-'+hora">
              </template>
            </td>
          </tr>
        </table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ContactanosForm from './components/ContactanosForm.vue';
export default {
  name: 'Contactanos',
  components: {
    ContactanosForm,
  },
  data() {
    return {
      telefonos: [
        '2113629',
        '22124341',
        '22124411',
      ],
      emails: [
        'info@iniaf.gob.bo',
        'iniaf@iniaf.gob.bo',
      ],
      horarios: [
        'Lun a Vier: 08:00 - 16:00',
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.contactanos-container{
  widows: 100%;
  padding-right: 20px;
  padding-left: 20px;
}
.icon-container{
  font-size: 50px;
  color: forestgreen;
}
.content-info{
  font-size: 30px;
}
table{
  margin: 20px;
  background-color: rgb(230, 230, 230,0.7);
  border-radius: 10px;
}
</style>
