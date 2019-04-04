// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import VeeValidate from 'vee-validate';
import CxltToastr from 'cxlt-vue2-toastr';
import { store } from './store/store.js';
import VueSidebarMenu from 'vue-sidebar-menu';
import VueSweetalert2 from 'vue-sweetalert2';


//import BootstrapVue from 'bootstrap-vue'

//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'


import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';

import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';
Vue.component('v-icon', Icon);


Vue.use(CxltToastr, toastrConfigs);
Vue.use(VeeValidate);
Vue.use(VueSidebarMenu);
Vue.use(VueSweetalert2);
//Vue.use(BootstrapVue);

const http = axios.create({
  baseURL: store.state.baseURL
  //baseURL: 'http://localhost:8080/'
});

http.interceptors.response.use(response => {
  return response
}, error => { //getting error from backend and display it with snackbar(vuetify component)

   if(error.response.status == 401){
     router.push({name: 'Login'});
   }

  return Promise.reject(error )
});



Vue.prototype.$http = http;

var toastrConfigs = {
    position: 'top center',
    showDuration: 2000
};

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
