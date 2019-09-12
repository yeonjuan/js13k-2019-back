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
      x: 8,
      y: 22,
      w: 16,
      h: 2,
    },
    {
      x: 15,
      y: 1,
      w: 2,
      h: 4,
    },
    {
      x: 0,
      y: 0,
      w: 32,
      h: 1,
    },
  ],
  enemies: [
    {
      x: 10,
      y: 20,
      cmd: [
        {
          action: RIGHT,
          until: {x: 20}
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
          until: {x:10}
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
    },
  ]
};

export default stage;
