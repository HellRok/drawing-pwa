import Vue from 'vue/dist/vue.common.js';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    project: undefined
  },
  mutations: {
    project (state, project) {
      state.project = project
    }
  }
});
