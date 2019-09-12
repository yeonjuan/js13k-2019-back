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
      x: 16,
      y: 29,
      w: 2,
      h: 3,
    },
    {
      x: 0,
      y: 23,
      w: 20,
      h: 2,
    },
    {
      x: 4,
      y: 16,
      w: 28,
      h: 2,
    },
    {
      x: 18,
      y: 21,
      w: 2,
      h: 2,
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
    },
    {
      x: 5,
      y: 21,
      init: {
        offset: -180
      },
      cmd: [
        {
          action: LEFT,
          until: {x: 3}
        },
        {
          action: STOP,
          until: {time: 100}
        },
        {
          action: ROTATE_TO_RIGHT,
          until: {offset: 0}
        },
        {
          action: RIGHT,
          until: {x: 10}
        },
        {
          action: STOP,
          until: {time: 100}
        },
        {
          action: ROTATE_TO_LEFT,
          until: {offset: -180}
        }
      ]
    }
  ]
};

export default stage;
