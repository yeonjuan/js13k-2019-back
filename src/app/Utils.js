/**
 * Return random float number in range (min, max).
 * @param min {number} - minimum.
 * @param max {number} - maximum.
 * @returns {number} - random float.
 */
export function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Return random integer number in range (min, max).
 * @param min {number} - minimum.
 * @param max {number} - maximum.
 * @returns {number} - random integer.
 */
export function randomIntInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max) + 1;
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Create canvas with size (width, height).
 * @param width {number} - width
 * @param height {number} - height
 * @returns {{canvas: *, context: *}}
 */
export function createCanvas (width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return {
    canvas,
    context: canvas.getContext('2d')
  };
}

/**
 * Scale mapData x, y, width, height
 * @param mapData {Array.<{x, y, w, h}>}
 * @param scale {number}
 * @returns {Array.<{x, y, w, h}>}
 */
export function scaleMapData (mapData, scale) {
  return mapData.map(({x, y, w, h}) => ({ x: x * scale, y: y * scale, w: w * scale, h: h * scale}));
}

/**
 *
 * @param matrix
 * @param sx
 * @param ex
 * @param sy
 * @param ey
 * @param fn
 */
export function forEachAt2D (matrix, [sx, ex], [sy, ey], fn) {
 for (let x = sx; x < ex; x ++) {
   for (let y = sy; y < ey; y++) {
     fn (matrix, x, y);
   }
 }
}

/**
 *
 * @param size
 * @param fill
 * @returns {*[][]}
 */
export function create2D (size, fill) {
  return Array.from({length: size})
    .map(() => Array.from({length: size}).map(() => fill));
}

/**
 *
 * @param id
 * @returns {HTMLElement}
 */
export function selectDom (id) {
  return document.getElementById(id);
}

/**
 *
 * @param rad
 * @returns {number}
 */
export function toDeg (rad) {
  return rad * 180 / Math.PI;
}

