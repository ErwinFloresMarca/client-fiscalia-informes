<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row :gutter="20" type="flex" justify="center">
      <h3 class="title">
        {{ selectedChart==='newContactos'? 'CONTACTOS' : (selectedChart==='noticias'? 'NOTICIAS' : (selectedChart==='viajes'? 'VIAJES' : '')) }}
      </h3>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <!-- <line-chart :chart-data="lineChartData" /> -->
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup';
// import LineChart from './components/LineChart';
import { generateRangeDates } from '@/utils/datesByReport';

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    // LineChart,
  },
  data() {
    return {
      lineChartData: {
        actualData: [],
        xAxisData: [],
      },
      newContactos: [],
      noticias: [],
      viajes: [],
      rangesReport: generateRangeDates(7),
      selectedChart: 'newContactos',
    };
  },
  created() {
    // this.refreshData();
  },
  methods: {
    async handleSetLineChartData(type) {
      this.selectedChart = type;
      this.refreshData();
      this.changeLocalDataChart();
    },
    changeLocalDataChart() {
      this.lineChartData = {
        actualData: this[this.selectedChart],
        xAxisData: this.rangesReport.days,
      };
    },
    refreshData() {
      switch (this.selectedChart) {
        case 'newContactos':
          this.generateReport(this.rangesReport.ranges, 'contactos'); break;
        case 'noticias':
          this.generateReport(this.rangesReport.ranges, 'noticias'); break;
        case 'viajes':
          this.generateReport(this.rangesReport.ranges, 'viajes'); break;
      }
    },
    async generateReport(listRanges, type) {
      listRanges.map(async(e, i) => {
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
.title{
  color: #285082;
}
</style>
