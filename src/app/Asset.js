class Asset {
  constructor() {
    this._imgs = {};
  }

  /**
   * Load image
   * @param {string} id - image id
   * @param {string} path - image file path
   */
  loadImage (id, path) {
    this._imgs[id] || ((this._imgs[id] = new Image()).src = path);
  }

  /**
   * Draw image
   * @param {CanvasRenderingContext2D} ctx - canvas' 2D rendering context
   * @param {string} id - image id
   * @param {number} sx - x in source.
   * @param {number} sy - y in source.
   * @param {number} sw - sub-width.
   * @param {number} sh - sub-height.
   * @param {number} x - x in canvas.
   * @param {number} y - y in canvas.
   * @param {number} w - width to draw.
   * @param {number} h - height to draw.
   */
  draw (ctx, id, sx, sy, sw, sh, x, y, w, h) {
    ctx.drawImage(this._imgs[id], sx, sy, sw, sh, x, y, w, h);
  }
}

export default new Asset();
