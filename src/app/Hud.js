import game from './Game';
import {HP_COLOR} from "./constants";

class Hud {
  constructor () {

  }

  render (ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = HP_COLOR;
    ctx.rect(0, 0, game.player.hp , 5);
    ctx.fill();
    ctx.restore();
  }
}

export default Hud;
