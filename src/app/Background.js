import {MAP_SIZE, BLOCK_SIZE, BLOCK_COLOR} from "./constants";
import {randomInRange, randomIntInRange, scaleMapData, createCanvas, createImage} from "./Utils";

// virtual canvas for drawing background
const mcvs = createCanvas(MAP_SIZE, MAP_SIZE);
const mapCanvas = mcvs.canvas;
const mapContext = mcvs.context;

/**
 * start Drawing with context style
 * @param ctx {CanvasRenderingContext2D}
 * @param style {string}
 */
function drawingStart(ctx, style) {
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = style;
}

/**
 * Finish drawing.
 * @param ctx {CanvasRenderingContext2D}
 */
function drawingEnd(ctx) {
  ctx.restore();
}

/**
 * Draw blocks on mapCanvas
 * @param ctx {CanvasRenderingContext2D}
 * @param scaledBlocks {Array.<{x, y, w, h}>}
 */
function drawBlocks (ctx, scaledBlocks) {
  drawingStart(ctx, BLOCK_COLOR);
  scaledBlocks.forEach(({x, y, w, h}) => ctx.fillRect(x, y, w, h));
  drawingEnd(ctx);
}

/**
 * Draw grass on mapCanvas
 * @param ctx {CanvasRenderingContext2D}
 * @param scaledBlocks {Array.<{x, y, w, h}>}
 */
function drawGrass (ctx, scaledBlocks) {
  drawingStart(ctx, 'rgba(20, 30, 30, 0.78)');
  scaledBlocks.forEach(({x, y, w}) => {
    ctx.fillRect(x, y, w, 5);
    for (let i = x; i < x + w; i += 6) {
      ctx.fillRect(i, y + 2, 2, 5);
    }
  });
  drawingEnd(ctx);
}

/**
 * Draw leaf of bamboo
 * @param ctx {CanvasRenderingContext2D}
 * @param x {number}
 * @param y {number}
 */
function drawLeaf(ctx, x, y) {
  const exists = randomIntInRange(0, 3);
  if (exists === 2 || exists === 3) {
    return;
  }
  const way = (randomIntInRange(0, 10) % 2) === 0 ? 1 : -1 ;
  const dx = randomInRange(5, 50) * way;
  const dy = randomInRange(5, 20);
  const w = randomInRange(4, 6) * way;
  x += way;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + dx, y -  dy);
  ctx.closePath();
  ctx.fill();
}

const BAMBOO_MIN_HEIGHT = 20;
const BAMBOO_MAX_HEIGHT = 60;

/**
 * Draw parts of bamboo
 * @param ctx {CanvasRenderingContext2D}
 * @param x {number}
 * @param y {number}
 * @param level {number}
 * @param width {number}
 */
function drawPartsOfBamboo(ctx, x, y, level, width) {
  if (level <= 0) {
    for (let i = 0; i < 10; i ++ ){
      drawLeaf(ctx, x, y + 2);
    }
    return;
  }
  const height = randomInRange(BAMBOO_MIN_HEIGHT + level * 10, BAMBOO_MAX_HEIGHT+ level * 10);
  ctx.rect(x - 1, y + 2, width + 1, 2);
  const leafNum = randomIntInRange(0, 10);
  for (let i = 0; i < leafNum; i ++ ) {
    drawLeaf(ctx, x , y + 2);
  }
  ctx.fillRect(x, y - height, width, height);
  drawPartsOfBamboo(ctx, x, y - height - 6, level - 1, width);
}

/**
 * @param ctx {CanvasRenderingContext2D}
 * @param depth {number}
 */
function drawBamboos (ctx, depth) {
  const rgba = `rgba(${20 + depth}, ${30 + depth}, ${30 + depth}, 0.78)`;
  drawingStart(ctx, rgba);
  for (let x = 0; x < MAP_SIZE; x += 10) {
    if (randomIntInRange(0, 5) < 3) {
      drawPartsOfBamboo(ctx, x + randomIntInRange(-10, 10), MAP_SIZE, randomIntInRange(3, 6), randomIntInRange(3, 6));
    }
  }
  drawingEnd(ctx);
}

/**
 * create map Image
 * @param mapData
 * @returns {HTMLImageElement}
 */
export default function createMapImage (mapData) {
  mapContext.clearRect(0, 0, MAP_SIZE, MAP_SIZE);
  // draw background bamboos
  drawBamboos(mapContext, 10);
  drawBamboos(mapContext, 0);

  if (mapData) {
    const scaledBlocks = scaleMapData(mapData, BLOCK_SIZE);
    // drawing
    drawBlocks(mapContext, scaledBlocks);
    drawGrass(mapContext, scaledBlocks);
  }

  // return image
  return createImage(mapCanvas.toDataURL());
}
