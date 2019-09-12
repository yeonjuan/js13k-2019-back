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
      x: 6,
      y: 24,
      w: 6,
      h: 2
    },
    {
      x: 20,
      y: 24,
      w: 12,
      h: 2
    },
    {
      x: 6,
      y: 10,
      w: 9,
      h: 2
    },
    {
      x: 20,
      y: 10,
      w: 8,
      h: 2
    },
    {
      x: 8,
      y: 0,
      w: 2,
      h: 4
    },
    {
      x: 8,
      y: 24,
      w: 2,
      h: 8
    }
  ],
  enemies: [
      {
        x: 6,
        y: 22,
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
      x: 6,
      y: 8,
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
      x: 22,
      y: 8,
      init: {
        offset: 0,
      },
      cmd: [
        {
          action: RIGHT,
          until: {x: 24}
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
          until: {x: 20}
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
      x: 22,
      y: 22,
      init: {
        offset: 0,
      },
      cmd: [
        {
          action: RIGHT,
          until: {x: 24}
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
          until: {x: 20}
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
