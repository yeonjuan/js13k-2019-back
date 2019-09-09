import {UP, DOWN, LEFT, RIGHT, BLOCK_SIZE, MAP_BLOCK_SIZE, MAP_SIZE, EMPTY, BLOCK} from "./constants";
import {scaleMapData, forEachAt2D, create2D} from "./Utils";
import createMapImage from './Background';

/**
 * Convert number to map block index
 * @param num
 * @returns {number}
 */
const toBlockIdx = (num) => (num / BLOCK_SIZE) | 0;

/**
 * Convert rectangle to edge
 * @param x
 * @param y
 * @param w
 * @param h
 * @returns {[]}
 */
const toEdge = ({x, y, w, h}) => {
  const edges = [];
  const vertices = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
  for (let si = 0, len = vertices.length; si < len; si ++) {
    const ei = (si + 1) % len;
    edges.push({
      start: {x: vertices[si][0], y: vertices[si][1]},
      end: {x: vertices[ei][0], y: vertices[ei][1]}
    });
  }
  return edges;
};

/**
 * Convert mapData to edges
 * @param mapData
 * @returns {{x, y, w, h}|*[]}
 */
const toEdges = mapData => (
  scaleMapData(mapData, BLOCK_SIZE)
    .reduce((edges, rect) => [...edges, ...toEdge(rect)], [])
);

/**
 * Convert mapData to blocks
 * @param mapData
 * @returns {unknown[]}
 */
const toBlocks = mapData => {
  const blocks = create2D(MAP_BLOCK_SIZE, EMPTY);
  mapData
    .forEach(
      ({x, y, w, h}) =>
       forEachAt2D(blocks, [x, x + w], [y, y + h], (blks, tx, ty) => blks[tx][ty] = BLOCK));
  return blocks;
};

class GameMap {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.img = createMapImage(null);
  }

  load (map) {
    this.edges = toEdges(map);
    this.blocks = toBlocks(map);
    this.img = createMapImage(map);
  }

  getOuterMost ({x, y, width, height}, moving) {
    const xIndex = toBlockIdx(x + width / 2);
    const yIndex = toBlockIdx(y + height / 2);
    switch (moving) {
      case LEFT:
        for (let i = xIndex; i >= 0; i --) {
          if (this.blocks[i][yIndex] === BLOCK) {
            return { x: (i + 1) * BLOCK_SIZE, y};
          }
        }
        return {x: 0, y};
      case UP:
          for (let i = yIndex; i >= 0; i --) {
            if (this.blocks[xIndex][i] === BLOCK) {
              return { x, y: (i + 1) * BLOCK_SIZE};
            }
          }
          return {x, y: 0};
      case DOWN:
          for (let i = yIndex; i < MAP_BLOCK_SIZE; i ++) {
            if (this.blocks[xIndex][i] === BLOCK) {
              return { x, y: i * BLOCK_SIZE - height};
            }
          }
          return {x, y: MAP_SIZE - height};
      case RIGHT:
        for (let i = xIndex; i < MAP_BLOCK_SIZE; i ++) {
          if (this.blocks[i][yIndex] === BLOCK) {
            return { x: i * BLOCK_SIZE - width, y};
          }
        }
        return {x: MAP_SIZE - width, y};
    }
  }

  hasBlockAt(x, y) {
    return x < 0 || y < 0 ||
      x >= MAP_SIZE || y >= MAP_SIZE ||
      this.blocks[toBlockIdx(x)][toBlockIdx(y)] === BLOCK;
  }

  renderReady (ctx) {
    this.x += 0.5;
    if (this.x >= MAP_SIZE - 1) {
      this.x = 0;
    }
    ctx.drawImage(this.img, 0, 0, MAP_SIZE - this.x, MAP_SIZE, this.x, 0, MAP_SIZE - this.x, MAP_SIZE);
    ctx.drawImage(this.img, MAP_SIZE - this.x, 0, this.x, MAP_SIZE, 0, 0, this.x, MAP_SIZE);
  }

  render (ctx) {
    ctx.drawImage(this.img, 0, 0);
  }
}

export default GameMap;
