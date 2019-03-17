export default class BasicTool {
  constructor(canvasElement, store, position) {
    this.reset();
    this.position = position;
    this.store = store;
    this.canvasElement = canvasElement
    this.canvas = this.canvasElement.getContext('2d');

    const _this = this;
    this.canvasElement.addEventListener('mousedown',  (event) => _this.start(event));
    this.canvasElement.addEventListener('mousemove',  (event) => _this.movement(event));
    this.canvasElement.addEventListener('mouseup',    (event) => _this.end(event));
    this.canvasElement.addEventListener('touchstart', (event) => _this.start(event));
    this.canvasElement.addEventListener('touchmove',  (event) => _this.movement(event));
    this.canvasElement.addEventListener('touchend',   (event) => _this.end(event));
  }

  deconstructor() {
    this.canvasElement.removeEventListener('mousedown',  (event) => _this.start(event));
    this.canvasElement.removeEventListener('mousemove',  (event) => _this.movement(event));
    this.canvasElement.removeEventListener('mouseup',    (event) => _this.end(event));
    this.canvasElement.removeEventListener('touchstart', (event) => _this.start(event));
    this.canvasElement.removeEventListener('touchmove',  (event) => _this.movement(event));
    this.canvasElement.removeEventListener('touchend',   (event) => _this.end(event));
  }

  reset() {
    this.started = false;
    this.positions = []
  }

  positionFrom(event) {
    if (typeof event.x !== 'undefined') {
      return {
        x: event.x, y: event.y
      }
    } else if (typeof event.touches !== 'undefined') {
      return {
        x: event.touches[0].clientX, y: event.touches[0].clientY
      }
    }
  }

  start(event) {
    event.preventDefault();
    this.positions.push(this.positionFrom(event));
    this.started = true;
    this.update();
  }

  movement(event) {
    if (this.started) {
      event.preventDefault();
      this.positions.push(this.positionFrom(event));
      this.update();
    }
  }

  end(event) {
    event.preventDefault();
    if (event.type !== 'touchend') {
      this.positions.push(this.positionFrom(event));
    }
    this.started = false;
    this.update();
    this.reset();
    this.commit();
  }

  update() {
    this.canvas.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

    this.canvas.strokeStyle = 'rgba(0,0,0,1)'; //getColour();
    this.canvas.lineWidth = 3;
    this.canvas.lineCap = 'round';
    this.canvas.lineJoin = 'round';
    this.canvas.beginPath();
    this.canvas.moveTo(this.positions[0].x, this.positions[0].y);

    for (let position of this.positions) {
      this.canvas.lineTo(position.x, position.y);
    }

    this.canvas.stroke();
  }

  commit() {
    this.store.commit('commitCanvas', {
      canvas: this.canvasElement,
      position: this.position
    });
    this.canvas.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
  }
}
