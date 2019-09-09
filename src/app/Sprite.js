import Asset from './Asset';
import {toRad} from "./Utils";

class Sprite {
  constructor (id, path, frameNum, x, y, width, height) {
    this.id = id;
    this.sh = (height / frameNum) | 0;
    this.sw = width;
    this.sy = 0;
    this.sx = 0;
    this.x = x;
    this.y = y;
    this.isFlipH = false;
    this.isFlipV = false;
    this.angleDeg = 0;
    this.offsetY = 0;
    this.offsetX = 0;
  }

  setFrame (index) {
    this.sy = index * this.sh;
  }

  flipHorizontal (flip) {
    this.isFlipH = flip;
  }

  flipVertical(flip) {
    this.isFlipV = flip;
  }

  rotate (angleDeg) {
    this.angleDeg = angleDeg;
  }

  render (ctx) {
    ctx.save();
    ctx.translate(this.x + this.sw / 2 + this.offsetX, this.y + this.sh / 2 + this.offsetY);
    ctx.rotate(toRad(this.angleDeg));
    const scaleH = this.isFlipH ? -1 : 1;
    const scaleV = this.isFlipV ? -1 : 1;
    ctx.scale(scaleH, scaleV);
    Asset.draw(ctx, this.id, this.sx, this.sy, this.sw, this.sh, - this.sw / 2 - this.offsetX, - this.sh / 2 - this.offsetY, this.sw, this.sh);
    ctx.restore();
  }
}

export default Sprite;

