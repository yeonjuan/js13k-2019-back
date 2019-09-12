import GameMap from './GameMap';
import getStage from "../assets/maps";
import Player from './player';
import Enemy from "./Enemy";
import input from './Input';
import Asset from './Asset';
import {createCanvas, selectDom, showDom} from "./Utils";
import {drawFont} from "./Font";
import {
  UP,
  RIGHT,
  DOWN,
  LEFT,
  ENTER,
  MAP_SIZE,
  BLOCK_SIZE,
  GAME_READY,
  GAME_PLAYING,
  GAME_OVER,
  GAME_STAGE_CLEAR,
  ENEMY_HEAD_SPRITE,
  PLAYER_SPRITE,
  ENEMY_BODY_SPRITE,
  MOVE_AUDIO,
  HIT_AUDIO, SHOT_AUDIO, OVER_HUD, CLEAR_HUD, READY_HUD
} from "./constants";
import {playBackgroundMusic} from './Music';

class Game {
  constructor() {
    this.canvas = selectDom('canvas');
    this.canvas.width = MAP_SIZE;
    this.canvas.height = MAP_SIZE;
    this.ctx = this.canvas.getContext('2d');

    const nvcs = createCanvas(MAP_SIZE, MAP_SIZE);
    this.novCanvas =nvcs.canvas;
    this.novCtx = nvcs.context;

    this.nextms = 0;
   // this.input = Input;
    this.state = GAME_READY;
    this.stageNum =1;
  }

  init () {
    Asset.loadImages([PLAYER_SPRITE, ENEMY_HEAD_SPRITE, ENEMY_BODY_SPRITE]);
    Asset.loadAudios([MOVE_AUDIO, HIT_AUDIO, SHOT_AUDIO]);
    playBackgroundMusic();
    this.map = new GameMap(this.ctx);
    this.player = new Player(MAP_SIZE / 2 - 16, MAP_SIZE - 32,  this.map);
    input({
      [ENTER]: () => {
        switch(this.state) {
          case GAME_READY:
            showDom(READY_HUD, false);
            this.load(this.stageNum);
            this.state = GAME_PLAYING;

            break;
          case GAME_PLAYING:
            break;
          case GAME_OVER:
            showDom(OVER_HUD, false);
            this.load(this.stageNum);
            this.state = GAME_PLAYING;
            break;
          case GAME_STAGE_CLEAR:
            showDom(CLEAR_HUD, false);
            this.stageNum ++;
            this.load(this.stageNum);
            this.state = GAME_PLAYING;
            break;
        }
      }
    })
  }

  load (num) {
    const {player, map} = this;
    const stage = getStage(num);

    map.load(stage.map);
    player.init(stage.player.x * BLOCK_SIZE, stage.player.y * BLOCK_SIZE);
    this.enemies = stage.enemies.map(({x, y, cmd, init = null}) => {
      const enemy =  new Enemy(x * BLOCK_SIZE, y * BLOCK_SIZE, map, cmd, this);
      if (init) {
        enemy.initialSetup(init);
      }
      return enemy;
    });

     input({
       [UP]: () => player.move(UP),
       [DOWN]: () => player.move(DOWN),
       [LEFT]: () => player.move(LEFT),
       [RIGHT]: () => player.move(RIGHT),
     });
  }

  update (time) {
    const {player, enemies, state} = this;
    const timeSlice = (time / 1000) * 60;
    player.update(timeSlice);
    enemies.forEach(enemy => enemy.update(timeSlice));
    enemies.every(enemy => !enemy.alive) && (state === GAME_PLAYING) && this.stageClear();
  }

  start() {
    window.requestAnimationFrame(this.render.bind(this))
  }

  renderReady (nms) {
    const {ctx, map, player} = this;

    ctx.clearRect(0,0, MAP_SIZE, MAP_SIZE);
    map.renderReady(ctx);
    player.render(ctx);
    drawFont(ctx, 'back attacker', 8, 40, 200);
    drawFont(ctx, 'press Enter to start', 2, 120, 250);
  }

  renderPlaying(nms) {
    const {ctx, map, player, novCtx, enemies, state, novCanvas} = this;

    let time = nms - this.nextms;
    this.nextms = nms;

    this.update(time);
    ctx.clearRect(0,0, MAP_SIZE, MAP_SIZE);

    map.render(ctx);
    player.render(ctx);

    novCtx.clearRect(0, 0, MAP_SIZE, MAP_SIZE);
    novCtx.fillStyle = 'rgba(0,0,0,0.4)';
    novCtx.fillRect(0, 0, MAP_SIZE, MAP_SIZE);
    enemies.forEach(enemy => enemy.render(ctx, novCtx));
    ctx.save();
    ctx.globalCompositeOperation = 'darken';
    ctx.drawImage(novCanvas, 0, 0);
    ctx.restore();

    if (player.hp <= 0 && state === GAME_PLAYING) {
      this.gameOver();
    }
  }

  render (nms) {
    const {state} = this;
    if (state === GAME_READY) {
      this.renderReady(nms);
    } else if (state === GAME_PLAYING || state === GAME_OVER || state === GAME_STAGE_CLEAR) {
      this.renderPlaying(nms);
    }
    window.requestAnimationFrame(this.render.bind(this));
  }

  // These methods change game state.
  gameOver() {
    this.state = GAME_OVER;
    this.player.isAlive = false;
    showDom(OVER_HUD, true);
  }

  stageClear () {
    this.state = GAME_STAGE_CLEAR;
    showDom(CLEAR_HUD, true);
  }
}

export default new Game();
