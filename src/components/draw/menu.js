import Vue from 'vue/dist/vue.common.js';
import './menu-item';

const template = `
  <div class="draw-menu">
    <draw-menu-item v-for="(element, index) in elements"
      :key="index"
      :icon="element.icon"
      :name="element.name"
      :action="element.action"
      :children="element.children"></draw-menu-item>
  </div>
`;

export default Vue.component(
  'draw-menu',
  {
    template: template,
    data: () => {
      return {
        elements: [
          {
            icon: 'bars',
            name: 'Menu',
            action: undefined,
            children: [
              {
                icon: 'pencil-alt',
                name: 'Pencil',
                action: undefined,
                children: []
              },
              {
                icon: 'arrows-alt',
                name: 'Pan',
                action: undefined,
                children: []
              },
              {
                icon: 'save',
                name: 'Save',
                action: undefined,
                children: []
              }
            ]
          }
        ]
      }
    }
  }
);
