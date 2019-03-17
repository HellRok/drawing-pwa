export default class Project {
  constructor() {
    this.chunkSize = 1024;
    this.chunks = {};
  }

  save() {
    // https://stuk.github.io/jszip/
  }

  commitCanvas(canvasElement, topLeft) {
    const canvas = canvasElement.getContext('2d');
    const bottomRight = {
      x: topLeft.x + canvasElement.width,
      y: topLeft.y + canvasElement.height
    }
    for (let chunk of this.chunksFor(topLeft, bottomRight)) {
      const chunkCanvas = chunk.canvasElement.getContext('2d');
      const offsetX = topLeft.x - (chunk.x * this.chunkSize);
      const offsetY = topLeft.y - (chunk.y * this.chunkSize);

      chunkCanvas.drawImage(canvasElement, offsetX, offsetY);
    }
  }

  chunksFor(topLeft, bottomRight) {
    const adjustedLeft = Math.floor(topLeft.x / this.chunkSize) - 1;
    const adjustedTop = Math.floor(topLeft.y / this.chunkSize) - 1;
    const adjustedRight = Math.floor(bottomRight.x / this.chunkSize) + 1;
    const adjustedBottom = Math.floor(bottomRight.y / this.chunkSize) + 1;
    let returnChunks = [];

    for (let y = adjustedTop; y <= adjustedBottom; y++) {
      for (let x = adjustedLeft; x <= adjustedRight; x++) {
        returnChunks.push({
          x: x, y: y,
          globalX: x * this.chunkSize, globalY: y * this.chunkSize,
          canvasElement: this.getChunk(x, y)
        });
      }
    }

    return returnChunks;
  }

  getChunk(x, y) {
    if (typeof this.chunks[`${x}:${y}`] === 'undefined') {
      this.chunks[`${x}:${y}`] = this.buildChunk();
    }

    return this.chunks[`${x}:${y}`];
  }

  buildChunk() {
    const newCanvasElement = document.createElement('canvas');
    newCanvasElement.setAttribute('width', this.chunkSize);
    newCanvasElement.setAttribute('height', this.chunkSize);
    return newCanvasElement;
  }
}
