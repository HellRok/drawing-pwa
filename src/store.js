import Vue from 'vue/dist/vue.common.js';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    project: undefined
  },
  mutations: {
    project (state, project) {
      state.project = project;
    },
    commitCanvas(state, { canvas, position }) {
      state.project.commitCanvas(canvas, position);
    }
  },
  getters: {
    project: (state, getters) => {
      return state.project;
    },
    chunksFor: (state, getters) => (topLeft, bottomRight) => {
      if (typeof state.project === 'undefined') {
        return [];
      }
      return state.project.chunksFor(topLeft, bottomRight);
    }
  }
});
