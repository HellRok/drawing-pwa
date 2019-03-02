import Vue from 'vue/dist/vue.common.js';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from './components/home';
import Draw from './components/draw';

import store from './store';

const routes = [
  { path: '/', component: Home },
  { path: '/draw', component: Draw }
];

const router = new VueRouter({ routes: routes });

document.addEventListener("DOMContentLoaded",function(){
  if (document.querySelectorAll('#app').length > 0) {
    const App = new Vue({
      el: '#app',
      router: router,
      store: store
    });
  }
});
