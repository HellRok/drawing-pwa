export default class BasicTool {
  constructor(canvasElement, store) {
    this.reset();
    this.store = store;
    this.canvasElement = canvasElement
    this.canvas = this.canvasElement.getContext('2d');

    const _this = this;
    this._start = (event) => _this.start(event)
    this._move =  (event) => _this.movement(event)
    this._end =   (event) => _this.end(event)

    this.canvasElement.addEventListener('mousedown',  this._start);
    this.canvasElement.addEventListener('mousemove',  this._move);
    this.canvasElement.addEventListener('mouseup',    this._end);
    this.canvasElement.addEventListener('touchstart', this._start);
    this.canvasElement.addEventListener('touchmove',  this._move);
    this.canvasElement.addEventListener('touchend',   this._end);
  }

  deconstructor() {
    this.canvasElement.removeEventListener('mousedown',  this._start);
    this.canvasElement.removeEventListener('mousemove',  this._move);
    this.canvasElement.removeEventListener('mouseup',    this._end);
    this.canvasElement.removeEventListener('touchstart', this._start);
    this.canvasElement.removeEventListener('touchmove',  this._move);
    this.canvasElement.removeEventListener('touchend',   this._end);
    this.canvasElement.removeEventListener('mousedown',  this._start);
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
    if (event.type === 'mousedown' && event.button !== 0) { return }
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
      position: this.store.getters.position
    });
    this.canvas.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
  }
}
