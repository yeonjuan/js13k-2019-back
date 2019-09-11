import {STOP, UP, LEFT, DOWN, RIGHT} from "./constants";
import {assign} from "./Utils";

class Entity {
  constructor (x, y, width, height, maxSpeed, accel, map) {
    assign(this, {
      width,
      height,
      maxSpeed,
      accel,
      map,
    });
    this.init(x, y);
  }

  init (x, y) {
    assign(this,{
      x,
      y,
      dx: x,
      dy: y,
      velocity: 0,
      alive: true,
      moving: STOP
    });
  }

  update(time) {
    const {moving, accel, maxSpeed, dx, dy} = this;
    const incVelocity = accel * time * (moving === UP || moving === LEFT) ? -1 : 1;

    (moving !== STOP) && (this.velocity += incVelocity);
    (this.velocity > maxSpeed) && (this.velocity = maxSpeed);
    (this.velocity < - maxSpeed) && (this.velocity = -maxSpeed);

    const dist = this.velocity * time;

    (moving === UP || moving === DOWN) && (this.y += dist);
    (moving === LEFT || moving === RIGHT) && (this.x += dist);

    if (moving === UP || moving === DOWN) {
      this.y += dist;
      if (moving === UP) {
        (this.y < dy) && this.stop();
      } else if (moving === DOWN) {
        (this.y > dy) && this.stop();
      }
    } else if (moving === LEFT || moving === RIGHT) {
      this.x += dist;
      if (moving === LEFT) {
        (this.x < dx) && this.stop();
      } else if (moving === RIGHT) {
        (this.x > dx) && this.stop();
      }
    }
  }

  moveUntil (moving, dx, dy) {
    this.moving = moving;
    this.dx = dx;
    this.dy = dy;
  }

  stop () {
    this.moving = STOP;
    this.velocity = 0;
    this.x = this.dx;
    this.y = this.dy;
  }
}

export default Entity;
