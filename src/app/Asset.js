import {createImage} from "./Utils";

const _imgs = {};
const _audios = {};
const _dir = './assets/';

/**
 * Load images.
 * @param {Array.<string|number>} ids - image IDs
 */
function loadImages (ids) {
  ids.forEach(id => _imgs[id] || (_imgs[id] = createImage(_dir + id + '.png')));
}

/**
 * Draw Asset image.
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
function draw(ctx, id, sx, sy, sw, sh, x, y, w, h) {
  ctx.drawImage(_imgs[id], sx, sy, sw, sh, x, y, w, h);
}

/**
 * Load audios.
 * @param {Array.<string|number>} ids - audio IDs
 */
function loadAudios (ids) {
  ids.forEach(id => _audios[id] || (_audios[id] = new Audio(_dir + id + '.mp3')));
}

/**
 * Play audio.
 * @param {string} id - audio id.
 */
function play(id) {
  _audios[id].paused && _audios[id].play();
}

export default {
  loadImages,
  draw,
  loadAudios,
  play,
}
