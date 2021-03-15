import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;
export default {
  extends: Doughnut,
  mixins: [reactiveProp],
  props: ["chartData"],
  data() {
    return {
      options: {
        labels: [],
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            position: 'right',

          },
      },
    };
  },
 
  mounted() {
    this.renderChart(this.chartData, this.options);
  },
  
}
