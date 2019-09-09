import {createImage} from "./Utils";

const _imgs = {};
const _audios = {};
const _dir = './assets/';
/**
 * Load image
 * @param {string} id - image id
 * @param {string} path - image file path
 */
function loadImage (id, path) {
  _imgs[id] || (_imgs[id] = createImage(_dir + path + '.png'));
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
function draw(ctx, id, sx, sy, sw, sh, x, y, w, h) {
  ctx.drawImage(_imgs[id], sx, sy, sw, sh, x, y, w, h);
}

function loadAudio (id, path) {
  _audios[id] || (_audios[id] = new Audio(_dir + path + '.mp3'));
}

function playAudio(id) {
  _audios[id].paused && _audios[id].play();
}

export default {
  loadImage,
  draw,
  loadAudio,
  playAudio,
}
