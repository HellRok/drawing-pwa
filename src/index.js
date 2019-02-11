import Vue from 'vue/dist/vue.common.js';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from './components/home';

document.addEventListener("DOMContentLoaded",function(){
  const routes = [
    { path: '/', component: Home }
  ];

  const router = new VueRouter({ routes: routes });

  if (document.querySelectorAll('#app').length > 0) {
    const App = new Vue({
      el: '#app',
      router: router
    });
  }
});
