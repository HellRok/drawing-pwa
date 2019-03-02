import Vue from 'vue/dist/vue.common.js';

import Project from './objects/project';

const template = `
  <div>
    <div class="menu">
      <h1 class="logo">Drawing!</h1>
      <button class="pure-button menu-item" @click="newProject">New</button>
      <button class="pure-button menu-item" @click="clickOpenInput">Open</button>
      <input class="open-file" type="file" @change="openFile($event)" hidden></input>
    </div>
  </div>
`;

export default Vue.component(
  'Home',
  {
    template: template,
    data: function () {
      return {
        project: undefined
      }
    },
    methods: {
      newProject() {
        this.$store.commit('project', new Project);
        this.$router.push('/draw');
      },
      clickOpenInput() {
        document.querySelector('.open-file').click();
      },
      openFile(event) {
        console.log(event.target.files);
      }
    }
  }
);
