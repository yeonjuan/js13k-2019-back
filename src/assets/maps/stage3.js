// 16 * 16 * 16
import {LEFT, RIGHT, STOP, ROTATE_TO_RIGHT, ROTATE_TO_LEFT} from "../../app/constants";

const stage = {
  player: {
    x: 0,
    y: 29,
  },
  map: [
    {
      x: 0,
      y: 31,
      w: 32,
      h: 1,
    },
    {
      x: 0,
      y: 0,
      w: 32,
      h: 1,
    },
    {
      x: 22,
      y: 15,
      w: 10,
      h: 2,
    },
    {
      x: 0,
      y: 24,
      w: 20,
      h: 2,
    },
    {
      x: 10,
      y: 10,
      w: 2,
      h: 9,
    }
  ],
  enemies: [
    {
      x: 25,
      y: 13,
      init: {
        offset: -180,
      },
      cmd: [
        {
          action: ROTATE_TO_LEFT,
          until: {offset: -200}
        },
        {
          action: STOP,
          until: {time: 30}
        },
        {
          action: ROTATE_TO_RIGHT,
          until: {offset: -130}
        },
        {
          action: STOP,
          until: {time: 30}
        },
      ]
    }
  ]
};

export default stage;
