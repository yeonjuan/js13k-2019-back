import {UP, RIGHT, LEFT, DOWN, STOP, ENTER} from "./constants";

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
    this._onKeyUp = {};

    document.addEventListener('keydown', (e) => {
      e.preventDefault();
      const key = this._keymap[e.keyCode];
      this._onKeyDown[key] && this._onKeyDown[key]();
    });

    document.addEventListener('keyup', ({keyCode}) => {
      const key = this._keymap[keyCode];
      this._onKeyUp[key] && this._onKeyUp[key]();
    });
  }
  on ({key, onKeyDown = null, onKeyUp = null}) {
    if (onKeyDown) {
      this._onKeyDown[key] = onKeyDown;
    }
    if (onKeyUp) {
      this._onKeyUp[key] = onKeyUp;
    }
    return this;
  }
}

export default new Input();
