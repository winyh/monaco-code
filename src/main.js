import Vue from 'vue';
import App from './App.vue';
import MonacoCode from 'monaco-code';

Vue.use(MonacoCode);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
