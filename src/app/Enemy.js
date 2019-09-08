import {UP, DOWN, LEFT, RIGHT, STOP, ROTATE_TO_LEFT, ROTATE_TO_RIGHT, ENEMY_BODY_SPRITE} from './constants';
import {toDeg} from "./Utils";
import Vision from './Vision';
import Bullet from "./Bullet";
import Asset from "./asset";
import Sprite from './Sprite';
import Scatter from "./Scatter";

class Enemy {
  constructor (x, y, map, cmd, game) {
    this.sprite = new Sprite('enemyBody', ENEMY_BODY_SPRITE, 3, x, y, 32, 24 * 3);
    this.frameIndex = 0;
    this.frameTime = 0;
    this.x = x;
    this.y = y;
    this.speed = 0.7;
    this.map = map;
    this.width = 32;
    this.height = 32;
    this.cmd = cmd;
    this.cmdIndex = 0;
    this.offset = 0;
    this.timer = 0;
    this.game = game;
    this.vision = new Vision(this.x, this.y, 2, this.map.edges, 30, this.offset, 1000);
    this.bullet = new Bullet();
    this.isAttacking = false;
    this.isAlive = true;
    this.scatter = new Scatter(20);
  }

  update(time) {
    if (!this.isAlive) {
      this.scatter.update(time);
      return;
    }
   if (
     this.x < this.game.player.x + this.game.player.width &&
     this.x + this.width > this.game.player.x &&
     this.y < this.game.player.y + this.game.player.height &&
     this.y + this.height > this.game.player.y) {
     this.isAlive = false;
     this.scatter.generate(this.x, this.y);
   }

   this.vision.update(this.x + this.width / 2 + 2, this.y, this.offset);
   let intersectionRange = this.vision.getIntersectionRange(this.game.player.edges);
   if (intersectionRange && this.game.player.isAlive) {
      this.isAttacking = true;
      const targetX = (intersectionRange[0].x + intersectionRange[1].x) / 2;
      const targetY = (intersectionRange[0].y + intersectionRange[1].y) / 2;
      this.bullet.shot(this.x  + this.width / 2, this.y, targetX, targetY);
   } else {
     this.isAttacking = false;
   }
   if (this.isAttacking) {
     const targetX = this.game.player.x + this.game.player.width / 2;
     const targetY = this.game.player.y + this.game.player.height / 2;
     const diffY = targetY - this.y;
     const diffX = targetX - this.x;
     this.offset = toDeg(Math.atan2(diffY, diffX));
     this.game.player.attacked();
   }
   if (!this.isAttacking) {
     this.doCmd(time);
   }
   this.bullet.update(time);
   this.frameTime += time;
   if (this.frameTime > 10) {
     this.frameTime = 0;
     this.frameIndex ++;
   }
    if (this.frameIndex >= 3) {
      this.frameIndex = 0;
    }
   this.sprite.setFrame(this.frameIndex);
  }

  doCmd (time) {
    const {action, until} = this.cmd[this.cmdIndex];
    let fullFill = false;
    const step = this.speed * time;
    switch(action) {
      case RIGHT:
        {
          this.offset = 0;
          this.x += step;
          if (this.x > until.x * 16) {
            this.x = until.x * 16;
            fullFill = true;
          }
        }
        break;
      case LEFT:
        {
          this.offset = -180;
          this.x -= step;
          if (this.x < until.x * 16) {
            this.x = until.x * 16;
            fullFill = true;
          }
        }
        break;
      case DOWN:
        {
          this.y -= step;
          if (this.y < until.y * 16) {
            this.y = until.y * 16;
            fullFill = true;
          }
        }
        break;
      case UP:
        {
          this.y += step;
          if (this.y > until.y * 16) {
            this.y = until.y * 16;
            fullFill = true;
          }
        }
        break;
      case STOP: {
        this.timer += time;
        if (this.timer > until.time) {
          fullFill = true;
        }
       }
        break;
      case ROTATE_TO_LEFT: {
        this.offset --;
        if (this.offset < until.offset) {
          this.offset = until.offset;
          fullFill = true;
        }
      }
      break;
      case ROTATE_TO_RIGHT: {
        this.offset ++;
        if (this.offset > until.offset) {
          this.offset = until.offset;
          fullFill = true;
        }
      }
      break;
    }
    if (fullFill) {
      this.timer = 0;
      this.cmdIndex ++;
      if (this.cmdIndex >= this.cmd.length) {
        this.cmdIndex = 0;
      }
    }
    this.sprite.x = this.x;
    this.sprite.y = this.y + 8;
  }

  draw (ctx, novCtx) {
    if (!this.isAlive) {
      this.scatter.render(ctx);
      return;
    }
    Asset.draw(ctx, 'enemyTop',0,0,32, 16, this.x, this.y, 32, 16);
    this.sprite.render(ctx);
    this.bullet.render(ctx);
    this.vision.render(novCtx);
  }

}
export default Enemy;
