import {
  UP,
  DOWN,
  LEFT,
  RIGHT,
  STOP,
  ROTATE_TO_LEFT,
  ROTATE_TO_RIGHT,
  ENEMY_BODY_SPRITE,
  ENEMY_HEAD_SPRITE
} from './constants';
import {toDeg, toRad, almostEqual} from "./Utils";
import Vision from './Vision';
import Bullet from "./Bullet";
import Asset from "./asset";
import Sprite from './Sprite';
import Scatter from "./Scatter";

class Enemy {
  constructor (x, y, map, cmd, game) {
    this.bodySprite = new Sprite('enemyBody', ENEMY_BODY_SPRITE, 3, x, y, 32, 24 * 3);
    this.headSprite = new Sprite('enemyHead', ENEMY_HEAD_SPRITE, 1, x, y, 32, 16);
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
    const player = this.game.player;
   if (
     this.x < player.x + player.width &&
     this.x + this.width > player.x &&
     this.y < player.y + player.height &&
     this.y + this.height > player.y) {
     this.isAlive = false;
     this.scatter.generate(this.x, this.y);
   }

   this.vision.update(this.x + this.width / 2 + 2, this.y, this.offset);

   let headAngle = this.offset % 360;
   if (headAngle > 0) {
     headAngle -= 360;
   }
    if (headAngle < -90) {
      this.headSprite.rotate(headAngle + 180);
      this.headSprite.flipVertical(false);
      this.headSprite.flipHorizontal(false);
      this.bodySprite.flipHorizontal(false);
      this.bodySprite.offsetX = 0;
    } else {
      this.headSprite.flipVertical(false);
      this.headSprite.flipHorizontal(true);
      this.headSprite.rotate(headAngle);
      this.bodySprite.flipHorizontal(true);
      this.bodySprite.offsetX = 5;
    }

    this.headSprite.offsetY = 8;
    this.headSprite.offsetX = 5;

   let intersectionRange = this.vision.getIntersectionRange(player.edges);
   if (intersectionRange && player.isAlive) {
      this.isAttacking = true;
      const targetX = (intersectionRange[0].x + intersectionRange[1].x) / 2;
      const targetY = (intersectionRange[0].y + intersectionRange[1].y) / 2;
      const rad = toRad(this.offset);
      this.bullet.shot(this.x  + this.width / 2 + Math.cos(rad) * 21, this.y + 7 + Math.sin(rad) * 21, targetX, targetY);
   } else {
     this.isAttacking = false;
   }
   if (this.isAttacking) {
     const targetX = player.x + player.width / 2;
     const targetY = player.y + player.height / 2;
     const diffY = targetY - this.y;
     const diffX = targetX - this.x;
     this.offset = toDeg(Math.atan2(diffY, diffX));
     player.attacked();
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
   this.bodySprite.setFrame(this.frameIndex);
  }

  doCmd (time) {
    const {action, until} = this.cmd[this.cmdIndex];
    let fullFill = false;
    const step = this.speed * time;
    switch(action) {
      case RIGHT:
        {
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
        this.offset  += (until.offset - this.offset) < 0 ? -1 : 1;
        if (almostEqual(this.offset ,until.offset)) {
          this.offset = until.offset;
          fullFill = true;
        }
      }
      break;
      case ROTATE_TO_RIGHT: {
        this.offset += (until.offset - this.offset) < 0 ? -1 : 1;
        if (almostEqual(this.offset ,until.offset)) {
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
    this.bodySprite.x = this.x;
    this.bodySprite.y = this.y + 8;
    this.headSprite.x = this.x;
    this.headSprite.y = this.y- 4;
  }

  draw (ctx, novCtx) {
    if (!this.isAlive) {
      this.scatter.render(ctx);
      return;
    }
    this.headSprite.render(ctx);
    this.bodySprite.render(ctx);
    this.bullet.render(ctx);
    this.vision.render(novCtx);
  }
}

export default Enemy;
