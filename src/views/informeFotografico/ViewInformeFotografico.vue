<template>
  <div class="page-container">
    <el-row v-if="IF" :gutter="20">
      <el-col :span="10" :xs="24">
        <el-collapse :accordion="false">
          <el-collapse-item
            :title="`${IF.caso.cud} - ${IF.caso.delito}`"
            name="editIF"
          >
            <edit-form-informe-fotografico v-model="IF" @change="onChange()" />
          </el-collapse-item>
        </el-collapse>
        <el-row :gutter="20">
          <el-col :span="24" :offset="0">
            <el-card shadow="hover">
              <div slot="header">
                <span>Archivos:</span>
                <el-button
                  style="float: right; padding: 5px 5px"
                  type="primary"
                  icon="el-icon-refresh"
                  size="default"
                  @click="onClickOrderFiles()"
                >Ordenar</el-button>
              </div>
              <div v-if="archivos.length" class="files-container">
                <el-row type="flex" :gutter="0">
                  <foto-item v-for="arc in archivos" :key="arc.urlFoto" :value="arc" type-btn="success" icon-btn="el-icon-check" readonly @on-press="onSelectFoto(arc)" />
                </el-row>
              </div>
              <template v-else>
                Lista Vacia
              </template>
            </el-card>
          </el-col>
          <el-col v-if="nuevoGrupo.fotos.length" :span="24" :offset="0">
            <el-card shadow="hover">
              <div slot="header">
                <span>Nuevo Grupo</span>
                <el-button
                  style="float: right; padding: 5px 5px"
                  type="primary"
                  icon="el-icon-menu"
                  size="default"
                  :loading="lodingNuevoGrupo"
                  @click="onClickNewGrupo()"
                >Guardar</el-button>
              </div>
              <div class="files-container">
                <draggable v-model="nuevoGrupo.fotos" class="draggable" group="fotos" @start="drag=true" @end="drag=false">
                  <foto-item v-for="(fto, i) in nuevoGrupo.fotos" :key="fto.urlFoto" v-model="nuevoGrupo.fotos[i]" type-btn="danger" icon-btn="el-icon-delete" @on-press="onDeleteFotoNG(fto)" />
                </draggable>
              </div>
            </el-card>
          </el-col>
          <el-col :span="24" :offset="0">
            <manage-groups v-if="IF.grupos" v-model="IF" @change="getIF()" />
          </el-col>
        </el-row>
      </el-col>
      <el-col v-if="IF" :span="14" :xs="24">
        <informe-fotografico-report :informe-fotografico="IF" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { InformeFotograficoResource } from '@/api/informeFotografico';
import { generateOnlyFotoUrl, getListFoto } from '@/api/fileReader';
import FotoItem from './grupo/foto/FotoItem.vue';
import InformeFotograficoReport from './components/InformeFotograficoReport.vue';
import { filterNoUsedFiles, orderGroupsAndFotos } from '@/utils/informeFotografico';
import draggable from 'vuedraggable';
import { GrupoResource } from '@/api/grupo';
import ManageGroups from './grupo/ManageGroups.vue';
import EditFormInformeFotografico from './components/EditFormInformeFotografico.vue';
export default {
  name: 'ViewInformeFotografico',
  components: {
    FotoItem,
    InformeFotograficoReport,
    draggable,
    ManageGroups,
    EditFormInformeFotografico,
  },
  data() {
    return {
      idIF: undefined,
      IF: undefined,
      archivos: [],
      nuevoGrupo: {
        fotos: [],
      },
      lodingNuevoGrupo: false,
    };
  },
  created() {
    this.idIF = this.$route.params.id;
    if (this.idIF) {
      this.init();
    } else {
      this.$message({
        message: 'El informe seleccionado es incorrecto.',
        type: 'error',
        duration: 3000,
        showClose: true,
      });
      this.$router.push({ name: 'AdminInformesFotograficos' });
    }
  },
  methods: {
    init() {
      this.getIF();
    },
    getIF() {
      InformeFotograficoResource.get(this.idIF, {
        include: [
          { relation: 'caso', scope: { include: [{ relation: 'fiscal' }] }},
          { relation: 'grupos', scope: { include: [{ relation: 'fotos' }] }},
          { relation: 'dispositivo', scope: { include: [{ relation: 'tipoDispositivo' }, { relation: 'propietario' }] }},
        ],
      }).then(resp => {
        this.IF = orderGroupsAndFotos(resp.data);
        this.getArchivos();
      }).catch(err => console.log(err));
    },
    getArchivos() {
      getListFoto(this.IF.urlFotosFTP).then(resp => {
        this.archivos = (resp.data.sort((a, b) => {
          return a.localeCompare(b);
        })).map(arc => {
          return {
            urlFoto: generateOnlyFotoUrl(arc, this.IF.urlFotosFTP),
          };
        });
        this.archivos = filterNoUsedFiles(this.archivos, this.IF);
      }).catch(err => console.log(err));
    },
    onSelectFoto(fotoItem) {
      this.nuevoGrupo.fotos.push(fotoItem);
      this.archivos = this.archivos.filter(fi => fi.urlFoto !== fotoItem.urlFoto);
    },
    onDeleteFotoNG(fto) {
      this.archivos.push(fto);
      this.nuevoGrupo.fotos = this.nuevoGrupo.fotos.filter(fi => fi.urlFoto !== fto.urlFoto);
    },
    onClickOrderFiles() {
      this.archivos = this.archivos.sort((a, b) => {
        return a.urlFoto.localeCompare(b.urlFoto);
      });
    },
    onClickNewGrupo() {
      if (this.nuevoGrupo.fotos.length > 0) {
        this.$prompt('introduzca el Titulo del grupo', 'Nuevo Grupo', {
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Confirmar',
          inputPlaceholder: 'Titulo del grupo',
          inputType: 'text',
        }).then(({ value }) => {
          this.lodingNuevoGrupo = true;
          GrupoResource.store({
            tituloGrupo: value,
            informeFotograficoId: this.IF.id,
          }).then(resp => {
            this.IF.ordenGrupos.push(resp.data.id);
            InformeFotograficoResource.update(this.IF.id, { ordenGrupos: this.IF.ordenGrupos }).then().catch();
            const ordenFotos = [];
            let cantFR = 0;
            const FRG = GrupoResource.Foto(resp.data.id);
            this.nuevoGrupo.fotos.forEach((f, i) => {
              FRG.store({
                ...f,
                grupoId: resp.data.id,
              }).then(rf => {
                ordenFotos[i] = rf.data.id;
                cantFR++;
                if (cantFR === this.nuevoGrupo.fotos.length) {
                  GrupoResource.update(resp.data.id, { ordenFotos: ordenFotos }).then().catch();
                  this.nuevoGrupo = { fotos: [] };
                  this.lodingNuevoGrupo = false;
                  this.getIF();
                }
              });
            });
          }).catch(err => console.log(err));
          // guardar grupo y refrescar IF
        });
      } else {
        this.$message({
          message: 'no selecciono ninguna foto',
          type: 'warning',
        });
      }
    },
    onChange() {
      this.getIF();
    },
  },
};
</script>

<style lang="scss" scoped>
.page-container{
    margin: 10px;
}
.el-card{
  margin-top: 10px;
}

.files-container{
  overflow-x: auto;
  width: 100%;
}
.files-container::-webkit-scrollbar-track {
  border: 1px solid #fff;
  border-radius: 5px;
  padding: 2px 0;
  background-color: #bebebe;
}

.files-container::-webkit-scrollbar {
  width: 10px;
}

.files-container::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);
  background-color: #737272;
  border: 1px solid #737272;
}
.draggable{
  display: flex;
}
</style>
