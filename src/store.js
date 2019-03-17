import Vue from 'vue/dist/vue.common.js';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    project: undefined,
    tool: undefined,
    position: {
      x: 0,
      y: 0
    }
  },
  mutations: {
    project (state, project) {
      state.project = project;
    },
    tool (state, tool) {
      state.tool = tool;
    },
    position (state, position) {
      state.position = position;
    },
    commitCanvas(state, { canvas, position }) {
      state.project.commitCanvas(canvas, position);
    }
  },
  getters: {
    project: (state, getters) => {
      return state.project;
    },
    position: (state, getters) => {
      return state.position;
    },
    chunksFor: (state, getters) => (topLeft, bottomRight) => {
      if (typeof state.project === 'undefined') {
        return [];
      }
      return state.project.chunksFor(topLeft, bottomRight);
    }
  }
});
