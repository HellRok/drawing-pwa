import Vue from 'vue/dist/vue.common.js';
import BasicTool from './tools/basic_tool';

const template = `
  <div>
    <canvas class="drawing-canvas"></canvas>
  </div>
`;

export default Vue.component(
  'Draw',
  {
    template: template,
    data: () => {
      return {
        drawingCanvas: undefined,
        selectedTool: undefined,
        tool: undefined
      }
    },
    methods: {
      updateDrawingCanvasSize() {
        this.drawingCanvas.width = window.innerWidth;
        this.drawingCanvas.height = window.innerHeight;
      }
    },
    mounted: function() {
      this.drawingCanvas = document.querySelector('.drawing-canvas');
      this.updateDrawingCanvasSize();
      window.addEventListener('resize', this.updateDrawingCanvasSize);
      this.tool = new BasicTool(this.drawingCanvas);
    }
  }
);

