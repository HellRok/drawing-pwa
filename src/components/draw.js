import Vue from 'vue/dist/vue.common.js';
import './draw/menu';
import BasicTool from './tools/basic_tool';
import PanTool from './tools/pan_tool';

const template = `
  <div>
    <div class="chunk-container"></div>
    <canvas class="drawing-canvas"></canvas>
    <draw-menu></draw-menu>
  </div>
`;

export default Vue.component(
  'Draw',
  {
    template: template,
    data: () => {
      return {
        drawingCanvasElement: undefined,
        chunkContainer: undefined,
        selectedTool: undefined,
        tools: {
          pencil: BasicTool,
          pan: PanTool
        },
        tool: undefined
      }
    },
    methods: {
      updateDrawingCanvasSize() {
        this.drawingCanvasElement.width = window.innerWidth;
        this.drawingCanvasElement.height = window.innerHeight;
        this.updateVisibleChunks();
      },
      updateVisibleChunks() {
        const chunks = this.$store.getters.chunksFor(this.position(),
          {
            x: this.position().x + this.drawingCanvasElement.width,
            y: this.position().y + this.drawingCanvasElement.height
          });

        for (let chunk of chunks) {
          this.chunkContainer.appendChild(chunk.canvasElement);
          chunk.canvasElement.style.top = `${chunk.globalY - this.position().y}px`;
          chunk.canvasElement.style.left = `${chunk.globalX - this.position().x}px`;
        }
      },
      setTool(tool) {
        if (typeof this.tool !== 'undefined') { this.tool.deconstructor(); }
        this.tool = new this.tools[tool](this.drawingCanvasElement, this.$store);
      },
      position() {
        return this.$store.getters.position;
      }
    },
    mounted: function() {
      if (typeof this.$store.getters.project === 'undefined') {
        this.$router.push('/');
        return;
      }

      this.drawingCanvasElement = document.querySelector('.drawing-canvas');
      this.chunkContainer = document.querySelector('.chunk-container');

      window.addEventListener('resize', this.updateDrawingCanvasSize);
      this.updateDrawingCanvasSize();

      this.$store.subscribe((mutation, state) => {
        if (mutation.type == 'tool') {
          this.setTool(state.tool);
        } else if (mutation.type == 'position') {
          this.updateVisibleChunks();
        }
      });
      this.$store.commit('tool', 'pencil');
    }
  }
);
