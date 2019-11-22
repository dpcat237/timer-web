import Date from 'Datejs'
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'

Vue.use(VueResource);
Vue.http.options.root = 'http://timer.local:8080/v1/';

new Vue({
  el: '#app',
  render: h => h(App)
});
