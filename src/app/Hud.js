import game from './Game';

class Hud {
  constructor () {

  }

  render (ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'rgb(139,0,0)';
    ctx.rect(0, 0, game.player.hp , 5);
    ctx.fill();
    ctx.restore();
  }
}

export default Hud;
