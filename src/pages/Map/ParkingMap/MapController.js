class MapController {
  constructor(initSize, initRow, initCol) {
    this.DEFAULT_SIZE = initSize;
    this.ROW = initRow;
    this.COL = initCol;
    this.MAX = this.ROW * this.COL;
  }

  getX(idx, zoom) {
    return (idx % this.COL) * (this.DEFAULT_SIZE * zoom);
  }

  getY(idx, zoom) {
    return Math.floor(idx / this.COL) * (this.DEFAULT_SIZE * zoom);
  }
}

export default MapController;
