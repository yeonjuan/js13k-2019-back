import GameMap from './GameMap';
import getStage from "../assets/maps";
import Player from './player';
import Enemy from "./Enemy";
import input from './Input';
import Asset from './Asset';
import {createCanvas, selectDom} from "./Utils";
import Font ,{drawFont} from "./Font";
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
  HIT_AUDIO, SHOT_AUDIO,
  MAX_STAGE_NUM,
  GAME_ALL_CLEAR,
  TEXT_START_X,
  LINE_HEIGHT, TEXT_START_Y, FONT_SIZE_SMALL, FONT_SIZE_BIG, PRESS_ENTER
} from "./constants";
import {playBackgroundMusic} from './Music';

class Game {
  constructor() {

  }

  init () {
    // main canvas
    this.canvas = selectDom('canvas');
    this.canvas.width = MAP_SIZE;
    this.canvas.height = MAP_SIZE;
    this.ctx = this.canvas.getContext('2d');

    // canvas for rendering vision
    const nvcs = createCanvas(MAP_SIZE, MAP_SIZE);
    this.novCanvas =nvcs.canvas;
    this.novCtx = nvcs.context;

    // texts for ready state
    this.readyTexts = [
      new Font('This is the Ninja Forest', TEXT_START_X, TEXT_START_Y, FONT_SIZE_SMALL),
      new Font('Invaders have entered', TEXT_START_X, TEXT_START_Y + LINE_HEIGHT, FONT_SIZE_SMALL),
      new Font('they have brought a gun cowardly', TEXT_START_X, TEXT_START_Y + LINE_HEIGHT * 2, FONT_SIZE_SMALL),
      new Font('Get rid of them in the dark', TEXT_START_X, TEXT_START_Y + LINE_HEIGHT * 3, FONT_SIZE_SMALL),
    ];
    this.readyTextIdx = -1;

    // text for over state
    this.overText = new Font('you lose', 200, 200, FONT_SIZE_BIG);

    // text for stage clear state
    this.clearText = new Font('clear', 220, 200, FONT_SIZE_BIG);

    // Text for all stage cleared state
    this.allClearTexts = [
      new Font('No enemies are left', TEXT_START_X, TEXT_START_Y, 3),
      new Font('The forest is safe', TEXT_START_X, TEXT_START_Y + LINE_HEIGHT, FONT_SIZE_SMALL),
      new Font('You win', TEXT_START_X, TEXT_START_Y + LINE_HEIGHT * 2, FONT_SIZE_SMALL),
      new Font('Thanks for playing', TEXT_START_X, TEXT_START_Y + LINE_HEIGHT * 3, FONT_SIZE_SMALL),
    ];
    this.allClearTextIdx = 0;

    this.pressEnterShowTime = 40;
    this.nextEnable = true;

    this.nextms = 0;
    this.state = GAME_READY;
    this.stageNum = 1;

    this.isSongPlaying = false;

    Asset.loadImages([PLAYER_SPRITE, ENEMY_HEAD_SPRITE, ENEMY_BODY_SPRITE]);
    Asset.loadAudios([MOVE_AUDIO, HIT_AUDIO, SHOT_AUDIO]);

    this.map = new GameMap(this.ctx);
    this.player = new Player(MAP_SIZE / 2 - 16, MAP_SIZE - 32,  this.map);
    input({
      [ENTER]: () => {
        if (!this.nextEnable) {
          return;
        }
        switch(this.state) {
          case GAME_READY:
            if (!this.isSongPlaying) {
              this.isSongPlaying = true;
              playBackgroundMusic();
            }
            if (this.readyTextIdx < this.readyTexts.length - 1) {
              this.nextEnable = false;
              this.readyTextIdx ++;
            } else {
              this.nextEnable = false;
              this.readyTextIdx = this.readyTexts.length - 1;
              this.load(this.stageNum);
              this.state = GAME_PLAYING;
            }
            break;
          case GAME_PLAYING:
            break;
          case GAME_OVER:
            this.load(this.stageNum);
            this.state = GAME_PLAYING;
            break;
          case GAME_STAGE_CLEAR:
            this.stageNum ++;
            this.load(this.stageNum);
            this.state = GAME_PLAYING;
            break;
          case GAME_ALL_CLEAR:
            this.init();
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
    player.update(time);
    enemies.forEach(enemy => enemy.update(time));
    enemies.every(enemy => !enemy.alive) && (state === GAME_PLAYING) && this.stageClear();

    if (player.hp <= 0 && state === GAME_PLAYING) {
      this.gameOver();
    }
  }

  start() {
    window.requestAnimationFrame(this.render.bind(this))
  }

  renderReady (nms) {
    const {ctx, map, player} = this;

    ctx.clearRect(0,0, MAP_SIZE, MAP_SIZE);
    map.renderReady(ctx);
    player.render(ctx);

    drawFont(ctx, 'Back Attacker', 8, 50, 100);
  }

  renderPlaying(time) {
    const {ctx, map, player, novCtx, enemies, novCanvas} = this;

    ctx.clearRect(0,0, MAP_SIZE, MAP_SIZE);

    map.render(ctx);
    player.render(ctx);

    // for vision
    novCtx.clearRect(0, 0, MAP_SIZE, MAP_SIZE);
    novCtx.fillStyle = 'rgba(0,0,0,0.4)';
    novCtx.fillRect(0, 0, MAP_SIZE, MAP_SIZE);

    // render enemies
    enemies.forEach(enemy => enemy.render(ctx, novCtx));

    // darken
    ctx.save();
    ctx.globalCompositeOperation = 'darken';
    ctx.drawImage(novCanvas, 0, 0);
    ctx.restore();
  }

  updateText (time) {
    const {state, readyTextIdx, readyTexts, overText, clearText, allClearTexts} = this;
    if (state === GAME_READY) {
      for (let i = 0; i <= readyTextIdx; i++) {
        readyTexts[i].update(time);
        if (readyTexts[readyTextIdx].fullFill) {
          this.nextEnable = true;
        }
      }
    } else if (state === GAME_OVER) {
      overText.update(time);
      if (overText.fullFill) {
        this.nextEnable = true;
      }
    } else if (state ===GAME_STAGE_CLEAR) {
      clearText.update(time);
      if (clearText.fullFill) {
        this.nextEnable = true;
      }
    } else if (state === GAME_ALL_CLEAR) {
      for (let i = 0, len = this.allClearTextIdx; i <= len; i++) {
        allClearTexts[i].update(time);
        if (allClearTexts[this.allClearTextIdx].fullFill && this.allClearTextIdx < allClearTexts.length - 1) {
          this.allClearTextIdx ++;
        }
        if (allClearTexts[allClearTexts.length - 1].fullFill) {
          this.nextEnable = true;
        }
      }
    }
    this.pressEnterShowTime --;
    if (this.pressEnterShowTime < 0) {
      this.pressEnterShowTime = 40;
    }
  }

  renderText (ctx) {
    const {state, readyTexts, readyTextIdx, overText, clearText, pressEnterShowTime, allClearTexts, allClearTextIdx} = this;
    const showPressEnter = pressEnterShowTime > 20;
    if (state === GAME_READY) {
      for (let i = 0; i <= readyTextIdx; i++) {
        readyTexts[i].render(ctx);
      }
      if (showPressEnter) {
        const text = PRESS_ENTER + (readyTextIdx === readyTexts.length - 1 ? ' to start' : '');
        const tx = readyTextIdx === readyTexts.length - 1 ? 180 : 200;
        drawFont(ctx, text, 2, tx, 220 + readyTextIdx * 30);
      }
    } else if (state === GAME_OVER) {
      overText.render(ctx);
      (showPressEnter) &&drawFont(ctx, PRESS_ENTER + ' to retry', 2, 180, 250);
    } else if (state === GAME_STAGE_CLEAR) {
        clearText.render(ctx);
      (showPressEnter) && drawFont(ctx, PRESS_ENTER + ' to next', 2, 180, 250);
    } else if (state === GAME_ALL_CLEAR) {
      for (let i = 0; i <= allClearTextIdx; i++) {
        allClearTexts[i].render(ctx);
      }
    }
  }


  render (nms) {
    const {state, ctx} = this;
    let time = ((nms - this.nextms) / 1000) * 60;
    this.nextms = nms;

    this.updateText(time);

    if (state === GAME_READY) {
      this.renderReady(nms);
    } else {
      this.update(time);
      this.renderPlaying(nms);
    }
    this.renderText(ctx);
    window.requestAnimationFrame(this.render.bind(this));
  }

  gameOver() {
    this.overText.init();
    this.state = GAME_OVER;
  }

  stageClear () {
    this.nextEnable = false;
    this.clearText.init();
    this.state = this.stageNum >= MAX_STAGE_NUM ? GAME_ALL_CLEAR : GAME_STAGE_CLEAR;
  }
}

export default new Game();
