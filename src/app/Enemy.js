import {
  UP,
  DOWN,
  LEFT,
  RIGHT,
  STOP,
  ROTATE_TO_LEFT,
  ROTATE_TO_RIGHT,
  ENEMY_BODY_SPRITE,
  ENEMY_HEAD_SPRITE,
  HIT_AUDIO,
  SHOT_AUDIO
} from './constants';
import {toDeg, toRad, almostEqual} from "./Utils";
import Vision from './Vision';
import Bullet from "./Bullet";
import Sprite from './Sprite';
import Scatter from "./Scatter";
import Entity from "./Entity";
import {assign} from "./Utils";

class Enemy extends Entity {
  constructor(x, y, map, cmd, game) {
    super(x, y, 32, 32, 0.5, 0.1, map);
    assign(this, {
      body: new Sprite(ENEMY_BODY_SPRITE, 3, x, y, 32, 24 * 3),
      head: new Sprite(ENEMY_HEAD_SPRITE, 1, x, y, 32, 16),
      dieScatter: new Scatter(20),
      bullet: new Bullet(),
      offset: 0,
      frameIndex: 0,
      frameTime: 0,
      cmd,
      cmdFullFill: false,
      cmdIndex: 0,
      timer: 0,
      player: game.player,
      vision: new Vision(x, y, 2, map.edges, 30, 0, 1000)
    });
    this.head.offsetY = 8;
    this.head.offsetX = 5;
  }

  update(time) {
    if (!this.alive) {
      this.dieScatter.update(time);
      return;
    }

    super.update(time);
    const {player, width, height, x, y, vision, dieScatter, offset, bullet} = this;
    if (x < player.x + player.width && x + width > player.x && y < player.y + player.height && y + height > player.y) {
      this.alive = false;
      dieScatter.generate(x, y);
    }

    vision.update(x + width / 2 + 2, y, offset);
    this.updateSprite(time);

    const intersectionRange = vision.getIntersectionRange(player.edges);
    const isAttacking = intersectionRange && player.alive;
    if (isAttacking) {
      const targetX = (intersectionRange[0].x + intersectionRange[1].x) / 2;
      const targetY = (intersectionRange[0].y + intersectionRange[1].y) / 2;
      const rad = toRad(offset);
      const diffY = targetY - y;
      const diffX = targetX - x;
      this.offset = toDeg(Math.atan2(diffY, diffX));
      bullet.shot(x  + width / 2 + Math.cos(rad) * 21, y + 7 + Math.sin(rad) * 21, targetX, targetY);
      player.attacked();
    } else {
      this.updateViaCmd(time);
    }
    bullet.update(time);
  }

  updateSprite (time) {
    const {head, offset, body, x, y} = this;
    let headAngle = offset % 360;
    if (headAngle > 0) {
      headAngle -= 360;
    }
    if (headAngle < -90) {
      head.rotate(headAngle + 180);
      head.flipHorizontal(false);
      body.flipHorizontal(false);
      body.offsetX = 0;
    } else {
      head.rotate(headAngle);
      head.flipHorizontal(true);
      body.flipHorizontal(true);
      body.offsetX = 5;
    }
    this.frameTime += time;
    if (this.frameTime > 10) {
      this.frameTime = 0;
      this.frameIndex ++;
    }
    this.frameIndex %= 3;

    body.setFrame(this.frameIndex);
    body.x = x;
    body.y = y + 8;
    head.x = x;
    head.y = y- 4;
  }

  updateViaCmd (time) {
    const {cmd, x, y} = this;
    const {action, until} = cmd[this.cmdIndex];

    if (action === STOP) {
      this.timer += time;
      this.cmdFullFill = (this.timer > until.time);

    } else if (action === RIGHT || action === LEFT) {
      this.cmdFullFill = (x === until.x * 16);
      this.moveUntil(action, until.x * 16, y);

    } else if (action === ROTATE_TO_RIGHT || action === ROTATE_TO_LEFT) {
      this.offset  += (until.offset - this.offset) < 0 ? -1 : 1;
      this.cmdFullFill = almostEqual(this.offset ,until.offset);
      this.cmdFullFill && (this.offset = until.offset);
    }
    if (this.cmdFullFill) {
      this.timer = 0;
      this.cmdFullFill = false;
      this.cmdIndex ++;
      this.cmdIndex %= cmd.length;
    }
  }

  render (ctx, novCtx) {
    const {alive, dieScatter, bullet, vision, head, body} = this;
    if (!alive) {
      dieScatter.render(ctx);
      return;
    }
    head.render(ctx);
    body.render(ctx);
    bullet.render(ctx);
    vision.render(novCtx);
  }
}

export default Enemy;
