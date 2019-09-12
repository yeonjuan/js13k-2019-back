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
      x: 7,
      y: 25,
      w: 2,
      h: 7,
    },
    {
      x: 5,
      y: 25,
      w: 6,
      h: 2,
    },
    {
      x: 15,
      y: 20,
      w: 6,
      h: 2,
    },
    {
      x: 17,
      y: 20,
      w: 2,
      h: 12,
    },
    {
      x: 26,
      y: 22,
      w: 6,
      h: 2,
    },
    {
      x: 6,
      y: 4,
      w: 2,
      h: 4,
    },
    {
      x: 8,
      y: 4,
      w: 10,
      h: 2,
    },
    {
      x: 22,
      y: 4,
      w: 8,
      h: 2,
    },
  ],
  enemies: [
      {
        x: 6,
        y: 23,
        init: {
          offset: -180,
        },
        cmd: [
          {
            action: LEFT,
            until: {x: 5}
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
            until: {x: 9}
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
      x: 28,
      y: 20,
      init: {
        offset: 0,
      },
      cmd: [
        {
          action: RIGHT,
          until: {x: 30}
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
          until: {x: 28}
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
      x: 10,
      y: 2,
      init: {
        offset: 0,
      },
      cmd: [
        {
          action: RIGHT,
          until: {x: 12}
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
    }
  ]
};

export default stage;
