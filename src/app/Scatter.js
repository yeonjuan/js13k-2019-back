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
        r: randomInRange(minR,maxR),
        xs: randomInRange(-speed, speed),
        ys: randomInRange(-speed, speed / 3),
        t: randomInRange(20, time),
        x: 0,
        y: 0,
      }));
  }

  init () {
    this.time = 30;
    this.alive = false;
  }

  generate(x, y) {
    const {alive, particles} = this;
    if (alive) {
      return;
    }
    this.alive = true;
    particles.forEach(ptc => {
      ptc.x = x;
      ptc.y = y;
    });
  }

  update (time) {
    const {alive, particles} = this;
    if (alive) {
      this.time -= time;
      if (this.time < 0) {
        this.alive = false;
        this.time = 30;
      }
      particles.forEach(ptc => {
        ptc.x += ptc.xs;
        ptc.y += ptc.ys;
      });
    }
  }

  render (ctx) {
    const {alive, color, particles} = this;
    if (alive) {
      ctx.fillStyle = color;
      particles.forEach(ptc => {
        ctx.beginPath();
        ctx.arc(ptc.x, ptc.y, ptc.r, 0, 2 * Math.PI);
        ctx.fill();
      });
    }
  }
}

export default Scatter;
