import GameMap from './GameMap';
import getStage from "../assets/maps";
import Player from './player';
import Enemy from "./Enemy";
import Input from './Input';
import Asset from './asset';
import Hud from './Hud';
import {createCanvas, selectDom} from "./Utils";
import {
  UP, RIGHT, DOWN, LEFT, ENTER,
  MAP_SIZE, BLOCK_SIZE,
  GAME_READY, GAME_PLAYING, GAME_OVER, GAME_STAGE_CLEAR
} from "./constants";

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
    this.input = Input;
    this.gameState = GAME_READY;
    this.stageNum = 1;
  }


  init () {
    this.map = new GameMap(this.ctx);
    this.player = new Player(MAP_SIZE / 2 - 16, MAP_SIZE - 32,  this.map);
    this.input
      .on({ key: ENTER, onKeyDown: () => {
        switch(this.gameState) {
          case GAME_READY:
            selectDom('ready').style.display = 'none';
            this.load(this.stageNum);
            this.gameState = GAME_PLAYING;
            break;
          case GAME_PLAYING:
            break;
          case GAME_OVER:
            selectDom('over').style.display = 'none';
            this.load(this.stageNum);
            this.gameState = GAME_PLAYING;
            break;
          case GAME_STAGE_CLEAR:
            selectDom('clear').style.display = 'none';
            this.stageNum ++;
            this.load(this.stageNum);
            this.gameState = GAME_PLAYING;
            break;
        }
      }})
  }

  load (num) {
    const stage = getStage(num);

    this.map.load(stage.map);
    this.player.init(stage.player.x * BLOCK_SIZE, stage.player.y * BLOCK_SIZE);
    this.enemies = stage.enemies.map(({x, y, cmd}) => new Enemy(x * BLOCK_SIZE, y * BLOCK_SIZE, this.map, cmd, this));
    this.hud = new Hud();

    Asset.loadImage('enemyTop', '../assets/enemy_top.png');
    this.input
      .on({ key: UP, onKeyDown: () => this.player.move(UP) })
      .on({ key: DOWN, onKeyDown: () => this.player.move(DOWN)})
      .on({ key: LEFT, onKeyDown: () => this.player.move(LEFT)})
      .on({ key: RIGHT, onKeyDown: () => this.player.move(RIGHT)});
  }

  update (time) {
    const timeSlice = (time / 1000) * 60;
    this.player.update(timeSlice);
    this.enemies.forEach(enemy => enemy.update(timeSlice));
    if (this.enemies.every(enemy => !enemy.isAlive)) {
      this.stageClear();
    }
  }

  start() {
    window.requestAnimationFrame(this.render.bind(this))
  }


  renderReady (nms) {
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    this.map.renderReady(this.ctx);
    this.player.render(this.ctx);
  }



  renderPlaying(nms) {
    let time = nms - this.nextms;
    this.nextms = nms;

    this.update(time);
    this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    this.map.render(this.ctx);
    this.player.render(this.ctx);
    this.hud.render(this.ctx);
    this.novCtx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.novCtx.fillStyle = 'rgba(0,0,0,0.4)';
    this.novCtx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.enemies.forEach(enemy => enemy.draw(this.ctx, this.novCtx));
    this.ctx.save();

    this.ctx.globalCompositeOperation = 'darken';
    this.ctx.drawImage(this.novCanvas, 0, 0);
    this.ctx.restore();

    if (this.player.hp <= 0 && this.gameState === GAME_PLAYING) {
      this.gameOver();
    }
  }

  render (nms) {
    if (this.gameState === GAME_READY) {
      this.renderReady(nms);
    } else if (this.gameState === GAME_PLAYING || this.gameState === GAME_OVER || this.gameState === GAME_STAGE_CLEAR) {
      this.renderPlaying(nms);
    }
    window.requestAnimationFrame(this.render.bind(this));
  }

  // These methods change game state.
  gameOver() {
    this.gameState = GAME_OVER;
    this.player.isAlive = false;
    selectDom('over').style.display = 'block';
  }

  stageClear () {
    this.gameState = GAME_STAGE_CLEAR;
    selectDom('clear').style.display = 'block';
  }
}

export default new Game();
