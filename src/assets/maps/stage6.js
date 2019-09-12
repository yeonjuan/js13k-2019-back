// This map is design by Chang Myeong (My brother).
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
      y: 25,
      w: 20,
      h: 2,
    },
    {
      x: 0,
      y: 20,
      w: 2,
      h: 2,
    },
    {
      x: 8,
      y: 18,
      w: 12,
      h: 2,
    },
    {
      x: 16,
      y: 8,
      w: 2,
      h: 4,
    },
    {
      x: 6,
      y: 8,
      w: 14,
      h: 2,
    },
    {
      x: 8,
      y: 0,
      w: 2,
      h: 4,
    },
  ],
  enemies: [
    {
      x: 10,
      y: 23,
      init: {
        offset: -180,
      },
      cmd: [
        {
          action: LEFT,
          until: {x: 2}
        },
        {
          action: STOP,
          until: {time: 50}
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
          until: {time: 50}
        },
        {
          action: ROTATE_TO_LEFT,
          until: {offset: -180}
        }
      ]
    },
    {
      x: 8,
      y:16,
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
          until: {x: 8}
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
      x: 8,
      y: 6,
      init: {
        offset: -180,
      },
      cmd: [
        {
          action: LEFT,
          until: {x: 8}
        },
        {
          action: STOP,
          until: {time: 50}
        },
        {
          action: ROTATE_TO_RIGHT,
          until: {offset: 0}
        },
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
        }
      ]
    }
  ]
};

export default stage;
