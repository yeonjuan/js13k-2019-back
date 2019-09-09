import {UP, DOWN, LEFT, RIGHT, STOP, MAP_SIZE, SCATTER_COLOR, PLAYER_SPRITE} from './constants';
import {assign} from "./Utils";
import Sprite from "./Sprite";
import Scatter from "./Scatter";

class Player {
  constructor (x, y, map) {
    this.velocity = 0;
    this.maxSpeed = 20;
    this.accel = 1.5;
    this.map = map;
    this.width = 32;
    this.height = 32;
    this.x = x;
    this.y = y;

    this.sprite = new Sprite('player', PLAYER_SPRITE, 3, x, y, 32, 32 * 3);
    this.scatter = new Scatter(30);
    this.attackedScatter = new Scatter(10, 0.5, SCATTER_COLOR, 5, 2, 4);

    this._leftTop = {x: this.x, y: this.y};
    this._rightTop = {x: this.x + this.width, y: this.y};
    this._leftBottom = {x: this.x, y: this.y + this.height};
    this.rightBottom = {x: this.x + this.width, y: this.y + this.height};
    this.edges = [
      [this._leftTop, this._rightTop],
      [this._rightTop, this.rightBottom],
      [this.rightBottom,this._leftBottom],
      [this._leftBottom, this._leftTop]
    ];
    this.init(x, y);
  }

  init (x, y) {
    this.hp = MAP_SIZE;
    this.x = x;
    this.y = y;
    this.dx = x;
    this.dy = y;
    this.isAlive = true;
    this.moving = STOP;
    this.updateEdges();
    this.stop();
    this.attackedScatter.init();
    this.scatter.init();
  }

  updateEdges () {
   this._leftTop.x = this.x;
   this._leftTop.y = this.y;

   this._rightTop.x = this.x + this.width;
   this._rightTop.y = this.y;

   this._leftBottom.x = this.x;
   this._leftBottom.y = this.y + this.height;

   this.rightBottom.x = this.x + this.width;
   this.rightBottom.y = this.y + this.height;
  }

  attacked () {
    this.hp -= 16;
    this.attackedScatter.generate(this.x + this.width / 2, this.y + this.height/ 2);
    if (this.hp < 0) {
      this.hp = 0;
    }
  }

  update(time) {
    if (!this.isAlive) {
      this.scatter.generate(this.x, this.y);
      this.scatter.update();
      return;
    }
    this.attackedScatter.update(time);

    this.updateEdges();
    const {maxSpeed, accel, dx, dy} = this;

    const incVelocity = accel * time * ((this.moving === UP || this.moving === LEFT) ? -1 : 1);
    if (this.moving !== STOP) {
      this.velocity += incVelocity;
    }
    if (this.velocity > maxSpeed) {
      this.velocity = maxSpeed;
    } else if (this.velocity < -maxSpeed) {
      this.velocity = -maxSpeed;
    }
    const distance = this.velocity * time;

    if (this.moving === UP || this.moving === DOWN) {
      this.y += distance;
      if (this.moving === UP) {
        if (this.y < dy) {
          this.y = dy;
          this.stop();
        }
      } else if (this.moving === DOWN) {
        if (this.y > dy) {
          this.y = dy;
          this.stop();
        }
      }
    } else if (this.moving === LEFT || this.moving === RIGHT) {
      this.x += distance;
      if (this.moving === LEFT) {
        if (this.x < dx) {
          this.x = dx;
          this.stop();
        }
      } else if (this.moving === RIGHT) {
        if (this.x > dx) {
          this.x = dx;
          this.stop();
        }
      }
    }
  }

  stop () {
    this.velocity = 0;
    this.moving = STOP;
    this.dx = this.x;
    this.dy = this.y;

   // let flipH = false;
    let flipV = false;
    let angle = 0;
    if (this.map.hasBlockAt(this.x + this.width / 2, this.y + this.height + 4)){
      flipV = false;
    } else if (this.map.hasBlockAt(this.x + this.width / 2, this.y - 4)) {
      // top
      flipV = true;
    } else if (this.map.hasBlockAt(this.x - 4, this.y + this.height/ 2)) {
      angle = 90;
    } else if (this.map.hasBlockAt(this.x + this.width + 4, this.y + this.height/ 2)) {
      angle = -90;
    }
    this.sprite.flipVertical(flipV);
    this.sprite.rotate(angle);
  }

  move (moving) {
    if (this.moving === STOP) {
      const {x, y} = this.map.getOuterMost(this, moving);
      this.dx = x;
      this.dy = y;
      this.moving = moving;
    }
  }

  render (ctx) {
    if (!this.isAlive) {
      this.scatter.render(ctx);
      return;
    }
    ctx.beginPath();
    this.sprite.x = this.x;
    this.sprite.y = this.y;
    this.sprite.render(ctx);
    ctx.fill();
    ctx.stroke();
    this.attackedScatter.render(ctx);
  }
}
export default Player;
