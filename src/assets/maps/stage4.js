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
      x: 0,
      y: 22,
      w: 20,
      h: 2,
    },
    {
      x: 16,
      y: 14,
      w: 16,
      h: 2,
    },
    {
      x: 14,
      y: 14,
      w: 2,
      h: 5,
    },
    {
      x: 0,
      y: 10,
      w: 2,
      h: 2,
    },
    {
      x: 22,
      y: 4,
      w: 2,
      h: 8,
    }
  ],
  enemies: [
    {
      x: 4,
      y: 20,
      cmd: [
        {
          action: RIGHT,
          until: {x: 16}
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
          until: {x: 4}
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
    {
      x: 0,
      y: 8,
      cmd: [
        {
          action: ROTATE_TO_RIGHT,
          until: {offset: -40}
        },
        {
          action: STOP,
          until: {time: 20}
        },
        {
          action: ROTATE_TO_RIGHT,
          until: {offset: 50}
        },
        {
          action: STOP,
          until: {time: 20}
        },
      ]
    }
  ]
};

export default stage;
