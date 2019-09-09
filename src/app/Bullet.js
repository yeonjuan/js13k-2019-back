import {randomInRange, renderLine} from "./Utils";
import {BULLET_COLOR} from "./constants";

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
      ctx.beginPath();
      ctx.strokeStyle = BULLET_COLOR;
      for (let i = 0; i < 5; i++) {
        renderLine(ctx, this.ox, this.oy, this.ox + randomInRange(-10, 10), this.oy +  randomInRange(-10, 10));
      }
      renderLine(ctx, this.ox, this.oy, this.tx, this.ty);
      for (let i = 0; i < 5; i++) {
        renderLine(ctx, this.tx, this.ty, this.tx + randomInRange(-10, 10), this.ty +  randomInRange(-10, 10));
      }
      ctx.stroke();
    }
  }
}

export default Bullet;
