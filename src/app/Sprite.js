import Asset from './Asset';
import {toRad} from "./Utils";

class Sprite {
  constructor (id, frameNum, x, y, width, height) {
    this.id = id;
    this.sh = (height / frameNum) | 0;
    this.sw = width;
    this.frame = 0;
    this.x = x;
    this.y = y;
    this.isFlipH = false;
    this.isFlipV = false;
    this.angleDeg = 0;
    this.offsetY = 0;
    this.offsetX = 0;
  }

  pos (x, y){
    this.x = x;
    this.y = y;
  }

  render (ctx) {
    const {x,y, frame, sw, sh, offsetX, offsetY, isFlipV, isFlipH, angleDeg, id} = this;
    ctx.save();
    ctx.translate(x + sw / 2 + offsetX, y + sh / 2 + offsetY);
    ctx.rotate(toRad(angleDeg));
    ctx.scale(isFlipH ? -1 : 1, isFlipV ? -1 : 1);
    Asset.draw(ctx, id, 0, frame * sh, sw, sh, - sw / 2 - offsetX, - sh / 2 - offsetY, sw, sh);
    ctx.restore();
  }
}

export default Sprite;

