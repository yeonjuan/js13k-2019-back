import {randomInRange} from "./Utils";
import {BULLET_COLOR} from "./constants";

class Bullet {
  constructor () {
    this.liveTime = 0;
  }

  shot(originX,originY, targetX, targetY) {
    if (this.liveTime <= 0) {
      this.liveTime = 5;
      this.originX = originX;
      this.originY = originY;
      this.targetX = targetX;
      this.targetY = targetY;
    }
  }

  update (time) {
    this.liveTime > 0 ? this.liveTime -= time : this.liveTime = 0;
  }

  render (ctx) {
    if (this.liveTime > 0) {
      ctx.beginPath();
      ctx.strokeStyle = BULLET_COLOR;
      for (let i = 0; i < 5; i++) {
        ctx.moveTo(this.originX, this.originY);
        ctx.lineTo(this.originX + randomInRange(-10, 10), this.originY +  randomInRange(-10, 10));
      }

      ctx.moveTo(this.originX, this.originY);
      ctx.lineTo(this.targetX, this.targetY);

      for (let i = 0; i < 5; i++) {
        ctx.moveTo(this.targetX, this.targetY);
        ctx.lineTo(this.targetX + randomInRange(-10, 10), this.targetY +  randomInRange(-10, 10));
      }
      ctx.stroke();
    }
  }
}

export default Bullet;
