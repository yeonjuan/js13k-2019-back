// 16 * 16 * 16
import {UP, LEFT, RIGHT, DOWN, STOP, ROTATE_TO_RIGHT, ROTATE_TO_LEFT} from "../../app/constants";

const stage = {
  player: {
    x: 0,
    y: 29,
  },
  map: [
    { // bottom
      type: 'block',
      x: 0,
      y: 31,
      w: 32,
      h: 1,
    },
    {
      type: 'block',
      x: 0,
      y: 0,
      w: 32,
      h: 1,
    }
  ],
  enemies: [
    {
      x: 20,
      y: 29,
      cmd: [
        {
          action: RIGHT,
          until: {x: 28}
        },
        {
          action: STOP,
          until: {time: 50}
        },
        {
          action: ROTATE_TO_LEFT,
          until: {offset: -180}
        },
        {
          action: LEFT,
          until: {x: 22}
        },
        {
          action: STOP,
          until: {time: 50}
        },
        {
          action: ROTATE_TO_RIGHT,
          until: {offset: 0}
        }
      ]
    }
  ]
};

export default stage;
