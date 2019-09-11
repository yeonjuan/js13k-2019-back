import {
  UP,
  DOWN,
  LEFT,
  RIGHT,
  STOP,
  MAP_SIZE,
  SCATTER_COLOR,
  PLAYER_SPRITE,
  MOVE_AUDIO,
  HIT_AUDIO,
  SHOT_AUDIO, HP_COLOR
} from './constants';
import Sprite from "./Sprite";
import Scatter from "./Scatter";
import Asset from "./Asset";
import Entity from "./Entity";
import {assign} from "./Utils";

class Player extends Entity{
  constructor(x, y, map) {
    super(x, y, 32, 32, 10, 1.5, map);
    this.sprite = new Sprite(PLAYER_SPRITE,1, x, y, 32, 32);
    this.dieScatter = new Scatter(30);
    this.attackedScatter = new Scatter(10, 10, SCATTER_COLOR, 5, 2, 4);
    this.hp = MAP_SIZE;
    this._lT = {x, y};
    this._rT = {x: this.x + this.width, y};
    this._lB = {x, y: this.y + this.height};
    this._rB = {x: this.x + this.width, y: this.y + this.height};
    this.edges = [
      [this._lT, this._rT],
      [this._rT, this._rB],
      [this._rB, this._lB],
      [this._lB, this._lT]
    ];
    this.updateEdges();
  }

  init (x, y) {
    super.init(x, y);
    assign(this, {hp: MAP_SIZE});
    (this.edges) && this.updateEdges();
  }

  move (moving) {
    if (this.moving === STOP) {
      Asset.play(MOVE_AUDIO);
      const {x, y} = this.map.getOuterMost(this, moving);
      this.moveUntil(moving, x, y);
    }
  }

  stop () {
    super.stop();
    const {x, y, width, height, map, sprite} = this;
    let flipV = false;
    let angle = 0;
    if (map.hasBlockAt(x + width / 2, y + height + 4)){
      flipV = false;
    } else if (map.hasBlockAt(x + width / 2, y - 4)) {
      flipV = true;
    } else if (map.hasBlockAt(x - 4, y + height/ 2)) {
      angle = 90;
    } else if (map.hasBlockAt(x + width + 4, y + height/ 2)) {
      angle = -90;
    }
    sprite.isFlipV = flipV;
    sprite.angleDeg = angle;
  }

  attacked() {
    const {alive, dieScatter, attackedScatter, x, y} = this;
    if (!alive) {
      return;
    }
    attackedScatter.generate(x, y);

    this.hp -= 16;
    Asset.play(SHOT_AUDIO);

    if (this.hp < 0) {
      Asset.play(HIT_AUDIO);
      this.hp = 0;
      this.alive = false;
      dieScatter.generate(x, y);
    }
  }

  update (time) {
    const {alive, dieScatter, attackedScatter, x, y} = this;
    if (!alive) {
      dieScatter.update(time);
      return;
    }
    super.update(time);
    attackedScatter.update(x, y);
    this.updateEdges();
  }

  updateEdges () {
    const {x, y, width, height, _lT, _rT, _lB, _rB} = this;
    _lT.x = x;
    _lT.y = y;
    _rT.x = x + width;
    _rT.y = y;
    _lB.x = x;
    _lB.y = y + height;
    _rB.x = x + width;
    _rB.y = y + height;
  }

  render (ctx) {
    this.renderHp(ctx);
    const {alive, dieScatter, x, y, sprite} = this;
    if (!alive) {
      dieScatter.render(ctx);
      return;
    }
    sprite.pos(x, y);
    sprite.render(ctx);
  }

  renderHp (ctx) {
    ctx.fillStyle = HP_COLOR;
    ctx.fillRect(0, 0, this.hp, 5);
  }
}

export default Player;
