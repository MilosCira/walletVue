import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueFilterDateFormat from 'vue-filter-date-format';
import "chart.js";
import "hchs-vue-charts";
Vue.use(window.VueCharts);
// import za priakzivanje pie na statistici
// import FusionCharts from "fusioncharts";
// import Charts from "fusioncharts/fusioncharts.charts";
// import FCComponent  from "vue-fusioncharts";

Vue.use(VueFilterDateFormat);
// Vue.use(FusionCharts);
// Vue.use(Charts);
// Vue.use(FCComponent);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
