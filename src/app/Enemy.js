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
  SHOT_AUDIO, BULLET_COLOR
} from './constants';
import {toDeg, toRad, almostEqual, renderLine, randomInRange} from "./Utils";
import Vision from './Vision';
import Sprite from './Sprite';
import Scatter from "./Scatter";
import Entity from "./Entity";
import {assign} from "./Utils";
import Asset from "./Asset";

function renderEndPoint (ctx, x, y) {
  for (let i = 0; i < 5; i++) {
    renderLine(ctx, x, y, x + randomInRange(-10, 10), y +  randomInRange(-10, 10));
  }
}

class Enemy extends Entity {
  constructor(x, y, map, cmd, game) {
    super(x, y, 32, 32, 0.5, 0.1, map);
    assign(this, {
      body: new Sprite(ENEMY_BODY_SPRITE, 3, x, y, 32, 24 * 3),
      head: new Sprite(ENEMY_HEAD_SPRITE, 1, x, y, 32, 16),
      dieScatter: new Scatter(20),
      bulletTimer: 0,
      offset: 0,
      frameTime: 0,
      cmd,
      cmdFullFill: false,
      cmdIndex: 0,
      timer: 0,
      player: game.player,
      vision: new Vision(x, y, map.edges, 30,1000)
    });
    this.head.offsetY = 8;
    this.head.offsetX = 5;
  }

  initialSetup({offset}) {
    this.offset = offset;
  }

  update(time) {
    if (!this.alive) {
      this.dieScatter.update(time);
      return;
    }

    super.update(time);
    const {player, width, height, x, y, vision, dieScatter} = this;
    if (x < player.x + player.width && x + width > player.x && y < player.y + player.height && y + height > player.y) {
      Asset.play(HIT_AUDIO);
      this.alive = false;
      dieScatter.generate(x, y);
    }


    this.updateSprite(time);
    vision.update(x + width / 2, y, this.offset);
    const intersectionRange = vision.getIntersectionRange(player.edges);
    const isAttacking = intersectionRange && player.alive;
    if (isAttacking) {
      const targetX = (intersectionRange[0].x + intersectionRange[1].x) / 2;
      const targetY = (intersectionRange[0].y + intersectionRange[1].y) / 2;
      const rad = toRad(this.offset);
      const diffY = player.y + player.height / 2 - y;
      const diffX = player.x + player.width / 2 - x - this.width / 2;
      this.offset = toDeg(Math.atan2(diffY, diffX));
      this.ox = x  + width / 2 + Math.cos(rad) * 21;
      this.oy =  y + 7 + Math.sin(rad) * 21;
      this.tx = targetX;
      this.ty = targetY;
      (this.bulletTimer <= 0) && (this.bulletTimer = 5);
      player.attacked();
    } else {
      this.updateViaCmd(time);
    }
    this.bulletTimer > 0 ? this.bulletTimer -= time : this.bulletTimer = 0;
  }


  updateSprite (time) {
    const {head, offset, body, x, y} = this;
    let headAngle = offset % 360;
    if (headAngle > 0) {
      headAngle -= 360;
    }
    if (headAngle < -90 && headAngle >= -270) {
      head.angleDeg = headAngle + 180;
      head.isFlipH = false;
      body.isFlipH = false;
      body.offsetX = 0;
    } else {
      head.angleDeg = headAngle;
      head.isFlipH = true;
      body.isFlipH = true;
      body.offsetX = 5;
    }
    this.frameTime += time;
    if (this.frameTime > 10) {
      this.frameTime = 0;
      body.frame ++;
    }
    body.frame %= 3;
    body.pos(x, y + 8);
    head.pos(x, y - 4);
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
    const {alive, dieScatter, vision, head, body} = this;
    if (!alive) {
      dieScatter.render(ctx);
      return;
    }
    head.render(ctx);
    body.render(ctx);
    this.renderBullet(ctx);
    vision.render(novCtx);
  }

  renderBullet (ctx) {
    const {bulletTimer, ox, oy, tx, ty} = this;
    if (bulletTimer > 0) {
      ctx.beginPath();
      ctx.strokeStyle = BULLET_COLOR;
      renderEndPoint(ctx, ox, oy);
      renderLine(ctx, ox, oy, tx, ty);
      renderEndPoint(ctx, tx, ty);
      ctx.stroke();
    }
  }
}

export default Enemy;
