// keyboard keymap & moving states of Entity
export const ENTER = 10;
export const STOP = 0;
export const UP = 1;
export const DOWN = 2;
export const LEFT = 3;
export const RIGHT = 4;
export const ROTATE_TO_RIGHT = 5;
export const ROTATE_TO_LEFT = 6;

// map
export const BLOCK_SIZE = 16;
export const MAP_BLOCK_SIZE = 32;
export const MAP_SIZE = BLOCK_SIZE * MAP_BLOCK_SIZE;
export const EMPTY = 0;
export const BLOCK = 1;

// states of game
export const GAME_READY = 0;
export const GAME_PLAYING = 1;
export const GAME_STAGE_CLEAR = 2;
export const GAME_OVER = 3;
export const GAME_ALL_CLEAR = 4;

// colors
export const VISION_COLOR = 'rgba(255, 255, 255,0.2)';
export const BULLET_COLOR = 'yellow';
export const HP_COLOR = 'rgb(139,0,0)';
export const BLOCK_COLOR = 'black';
export const SCATTER_COLOR = 'black';
export const GRASS_COLOR = 'rgba(20, 30, 30, 0.78)';

// asset IDs
export const ENEMY_BODY_SPRITE = 'ebody';
export const ENEMY_HEAD_SPRITE = 'ehead';
export const PLAYER_SPRITE = 'player';
export const HIT_AUDIO = 'hit';
export const MOVE_AUDIO = 'move';
export const SHOT_AUDIO = 'shot';

// game
export const MAX_STAGE_NUM = 8;
export const TEXT_START_X = 40;
export const TEXT_START_Y = 180;
export const LINE_HEIGHT = 30;
export const FONT_SIZE_SMALL = 3;
export const FONT_SIZE_BIG = 4;
export const PRESS_ENTER = 'press enter';
