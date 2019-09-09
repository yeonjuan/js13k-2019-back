import {SCATTER_COLOR} from "./constants";
import {randomInRange} from "./Utils";

class Scatter {
  constructor (particleNum, time = 30, color = SCATTER_COLOR, speed = 3, minR = 5, maxR = 10) {
    this.time = time;
    this.color = color;
    this.alive = false;
    this.particles = Array
      .from({length: particleNum},
      () => ({
        radius: randomInRange(minR,maxR),
        xSpeed: randomInRange(-speed, speed),
        ySpeed: randomInRange(-speed, speed / 3),
        time: randomInRange(20, this.time),
        x: 0,
        y: 0,
      }));
  }
  init () {
    this.time = 30;
    this.alive = false;
  }

  generate(x, y) {
    if (this.alive) {
      return;
    }
    this.alive = true;
    this.particles.forEach(ptc => {
      ptc.x = x;
      ptc.y = y;
    });
  }

  update (time) {
    if (this.alive) {
      this.time -= time;
      if (this.time < 0) {
        this.alive = false;
        this.time = 30;
      }
      this.particles.forEach(ptc => {
        ptc.x += ptc.xSpeed;
        ptc.y += ptc.ySpeed;
      });
    }
  }

  render (ctx) {
    if (this.alive) {
      ctx.fillStyle = this.color;
      this.particles.forEach(ptc => {
        ctx.beginPath();
        ctx.arc(ptc.x, ptc.y, ptc.radius, 0, 2 * Math.PI);
        ctx.fill();
      });
    }
  }
}

export default Scatter;
