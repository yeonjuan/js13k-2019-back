import Asset from './asset';
class Sprite {
  constructor (id, path, frameNum, x, y, width, height) {
    Asset.loadImage(id, path);
    this.id = id;
    this.sh = (height / frameNum) | 0;
    this.sw = width;
    this.sy = 0;
    this.sx = 0;
    this.x = x;
    this.y = y;
    this.isFlipHorizontal = false;
    this.isFlipVertical = false;
    this.angleDeg = 0;
  }

  setFrame (index) {
    this.sy = index * this.sh;
  }

  flipHorizontal (flip) {
    this.isFlipHorizontal = flip;
  }

  flipVertical(flip) {
    this.isFlipVertical = flip;
  }

  rotate (angleDeg) {
    this.angleDeg = angleDeg;
  }

  render (ctx) {
    ctx.save();
    ctx.translate(this.x + this.sw / 2, this.y + this.sh / 2);
    ctx.rotate(this.angleDeg * Math.PI / 180);
    const scaleH = this.isFlipHorizontal ? -1 : 1;
    const scaleV = this.isFlipVertical ? -1 : 1;
    ctx.scale(scaleH, scaleV);
    Asset.draw(ctx, this.id, this.sx, this.sy, this.sw, this.sh, - this.sw / 2, - this.sh / 2, this.sw, this.sh);
    ctx.restore();
  }
}

export default Sprite;

