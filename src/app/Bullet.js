import {randomInRange, renderLine} from "./Utils";
import {BULLET_COLOR} from "./constants";

function renderEndPoint (ctx, x, y) {
  for (let i = 0; i < 5; i++) {
    renderLine(ctx, x, y, x + randomInRange(-10, 10), y +  randomInRange(-10, 10));
  }
}
class Bullet {
  constructor () {
    this.time = 0;
  }

  shot(ox,oy, tx, ty) {
    if (this.time <= 0) {
      this.time = 5;
      this.ox = ox;
      this.oy = oy;
      this.tx = tx;
      this.ty = ty;
    }
  }

  update (time) {
    this.time > 0 ? this.time -= time : this.time = 0;
  }

  render (ctx) {
    if (this.time > 0) {
      const {ox, oy, tx, ty} = this;
      ctx.beginPath();
      ctx.strokeStyle = BULLET_COLOR;
      renderEndPoint(ctx, ox, oy);
      renderLine(ctx, ox, oy, tx, ty);
      renderEndPoint(ctx, tx, ty);
      ctx.stroke();
    }
  }
}

export default Bullet;
