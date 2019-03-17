import Vue from 'vue/dist/vue.common.js';
import './draw/menu';
import BasicTool from './tools/basic_tool';

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
        tool: undefined,
        position: {
          x: 0,
          y: 0
        }
      }
    },
    methods: {
      updateDrawingCanvasSize() {
        this.drawingCanvasElement.width = window.innerWidth;
        this.drawingCanvasElement.height = window.innerHeight;
        this.updateVisibleChunks();
      },
      updateVisibleChunks() {
        const chunks = this.$store.getters.chunksFor(this.position,
          {
            x: this.position.x + this.drawingCanvasElement.width,
            y: this.position.y + this.drawingCanvasElement.height
          });

        for (let chunk of chunks) {
          this.chunkContainer.appendChild(chunk.canvasElement);
          chunk.canvasElement.style.top = `${chunk.globalY - this.position.y}px`;
          chunk.canvasElement.style.left = `${chunk.globalX - this.position.x}px`;
        }
      }
    },
    mounted: function() {
      if (typeof this.$store.getters.project === 'undefined') {
        this.$router.push('/');
      }

      this.drawingCanvasElement = document.querySelector('.drawing-canvas');
      this.chunkContainer = document.querySelector('.chunk-container');

      window.addEventListener('resize', this.updateDrawingCanvasSize);
      this.updateDrawingCanvasSize();

      this.tool = new BasicTool(this.drawingCanvasElement, this.$store, this.position);
    }
  }
);
