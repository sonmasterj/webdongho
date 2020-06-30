import Vue from 'vue'
import App from './App.vue'
import VueTableDynamic from 'vue-table-dynamic';
import excel from 'vue-excel-export';
Vue.use(excel);
Vue.use(VueTableDynamic);
new Vue({
  el: '#app',
  render: h => h(App)
})
