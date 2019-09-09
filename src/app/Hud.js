import game from './Game';
import {HP_COLOR, OVER_HUD, CLEAR_HUD, READY_HUD} from "./constants";
import {selectDom} from "./Utils";

const _doms = {
  [READY_HUD]: selectDom(READY_HUD),
  [OVER_HUD]: selectDom(OVER_HUD),
  [CLEAR_HUD]: selectDom(CLEAR_HUD),
};
console.log(_doms);
function renderHp (ctx) {
  ctx.beginPath();
  ctx.fillStyle = HP_COLOR;
  ctx.rect(0, 0, game.player.hp , 5);
  ctx.fill();
}

function showHud (id, visible) {
  _doms[id].style.display = (visible ? 'block' : 'none');
}

export default {
  renderHp,
  showHud,
};
