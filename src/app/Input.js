import {UP, RIGHT, LEFT, DOWN, ENTER} from "./constants";

class Input {
  constructor () {
    this._keymap = {
      38: UP,
      40: DOWN,
      37: LEFT,
      39: RIGHT,
      13: ENTER
    };
    this._onKeyDown = {};

    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      const key = this._keymap[e.keyCode];
      this._onKeyDown[key] && this._onKeyDown[key]();
    });
  }
  on ({key, onKeyDown = null}) {
    if (onKeyDown) {
      this._onKeyDown[key] = onKeyDown;
    }
    return this;
  }
}

export default new Input();
