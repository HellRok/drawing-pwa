export default class BasicTool {
  constructor(canvasElement) {
    this.started = false;
    this.canvas = canvasElement.getContext('2d');

    const _this = this;
    canvasElement.addEventListener('mousedown', (event) => _this.start(event));
    canvasElement.addEventListener('mousemove', (event) => _this.movement(event));
    canvasElement.addEventListener('mouseup', (event) => _this.end(event));
    canvasElement.addEventListener('touchstart', (event) => _this.start(event));
    canvasElement.addEventListener('touchmove', (event) => _this.movement(event));
    canvasElement.addEventListener('touchend', (event) => _this.end(event));
  }

  deconstructor() {
    canvasElement.removeEventListener('mousedown', (event) => _this.start(event));
    canvasElement.removeEventListener('mousemove', (event) => _this.movement(event));
    canvasElement.removeEventListener('mouseup', (event) => _this.end(event));
    canvasElement.removeEventListener('touchstart', (event) => _this.start(event));
    canvasElement.removeEventListener('touchmove', (event) => _this.movement(event));
    canvasElement.removeEventListener('touchend', (event) => _this.end(event));
  }

  positionFrom(event) {
    if (typeof event.x !== 'undefined') {
      return {
        'x': event.x, 'y': event.y
      }
    } else if (typeof event.touches !== 'undefined') {
      return {
        'x': event.touches[0].clientX, 'y': event.touches[0].clientY
      }
    }
  }

  start(event) {
    event.preventDefault();
    const position = this.positionFrom(event);

    this.canvas.strokeStyle = 'rgba(0,0,0,1)'; //getColour();
    this.canvas.lineWidth = 3;
    this.canvas.lineCap = "round";
    this.canvas.lineJoin = "round";
    this.canvas.beginPath();
    this.canvas.moveTo(position.x, position.y);
    this.started = true;
  }

  movement(event) {
    if (this.started) {
      event.preventDefault();
      const position = this.positionFrom(event);

      this.canvas.lineTo(position.x, position.y);
      this.canvas.stroke();
    }
  }

  end(event) {
    event.preventDefault();
    this.started = false;
  }

  update() {
  }

  commit() {
  }
}
