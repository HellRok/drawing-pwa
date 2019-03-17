import Vue from 'vue/dist/vue.common.js';

const template = `
  <div>
    <a href="#" class="draw-menu-item pure-button"
      v-on:click.prevent.capture="clicked()" :title="name">
      <div :class="iconClass()"></div>
    </a>
    <div class="draw-menu-item-children" v-show="showChildren">
      <draw-menu-item v-for="(element, index) in children"
        :key="index"
        :icon="element.icon"
        :name="element.name"
        :action="element.action"
        :children="element.children"></draw-menu-item>
    </div>
  </div>
`;

export default Vue.component(
  'draw-menu-item',
  {
    template: template,
    props: ['element', 'icon', 'name', 'action', 'children'],
    data: () => {
      return {
        showChildren: false
      }
    },
    methods: {
      iconClass() {
        return `fas fa-${this.icon} fa-fw`;
      },
      clicked() {
        if (typeof this.action === 'function') {
          this.action();
        } else {
          this.toggle();
        }
      },
      toggle() {
        this.showChildren = !this.showChildren;
      },
      setTool(tool) {
        this.$store.commit('tool', tool);
      }
    }
  }
);
