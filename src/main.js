// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import axios from "axios";

require('normalize.css');
require('@/styles/global/index.less');

Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.prototype.$axios = axios;

window.$config = {};
if (window.location.hostname === 'localhost') {
  window.$config.HOST = 'http://202.120.1.66:8080'
} else if (window.location.hostname === '202.120.1.66') {
  window.$config.HOST = 'http://202.120.1.66:8080'
} else {
  // backend url
  window.$config.HOST = 'http://localhost:3000'
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
