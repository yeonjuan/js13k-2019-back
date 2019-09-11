import {CLEAR_HUD, OVER_HUD, READY_HUD} from "./constants";

const {random, ceil, floor, abs, PI} = Math;
/**
 * Return random float number in range (min, max).
 * @param min {number} - minimum.
 * @param max {number} - maximum.
 * @returns {number} - random float.
 */
export function randomInRange(min, max) {
  return random() * (max - min) + min;
}

/**
 * Return random integer number in range (min, max).
 * @param min {number} - minimum.
 * @param max {number} - maximum.
 * @returns {number} - random integer.
 */
export function randomIntInRange(min, max) {
  min = ceil(min);
  max = floor(max) + 1;
  return floor(random() * (max - min)) + min;
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
 * Convert radian to degree.
 * @param rad {number} - radian.
 * @returns {number} - degree.
 */
export function toDeg (rad) {
  return rad * 180 / PI;
}

/**
 * Convert degree to radian
 * @param deg {number} - degree.
 * @returns {number} - radian.
 */
export function toRad (deg) {
  return deg * PI / 180;
}

/**
 * Create Image Object with src
 * @param src {string}
 * @returns {HTMLImageElement}
 */
export function createImage (src) {
  const img = new Image();
  img.src = src;
  return img;
}

export function almostEqual (a, b) {
  return abs(a - b) <= 2;
}

export function assign (target, source) {
  return Object.assign(target, source);
}

export function renderLine (ctx, x, y, tx, ty) {
  ctx.moveTo(x,y);
  ctx.lineTo(tx, ty);
}

const _doms = {
  [READY_HUD]: selectDom(READY_HUD),
  [OVER_HUD]: selectDom(OVER_HUD),
  [CLEAR_HUD]: selectDom(CLEAR_HUD),
};

export function showDom (id, visible) {
  _doms[id].style.display = (visible ? 'block' : 'none');
}

/**
 *
 * @param id
 * @returns {HTMLElement}
 */
export function selectDom (id) {
  return document.getElementById(id);
}
