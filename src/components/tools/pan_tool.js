export default class PanTool {
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
    this.lastPosition = undefined
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
    this.lastPosition = this.positionFrom(event);
    this.started = true;
  }

  movement(event) {
    if (this.started) {
      event.preventDefault();

      const currentPosition = this.positionFrom(event);

      this.store.commit('position', {
        x: this.store.getters.position.x + this.lastPosition.x - currentPosition.x,
        y: this.store.getters.position.y + this.lastPosition.y - currentPosition.y
      });

      this.lastPosition = currentPosition;
    }
  }

  end(event) {
    event.preventDefault();
    this.started = false;
    this.reset();
  }
}
