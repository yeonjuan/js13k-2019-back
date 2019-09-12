import TinyMusic from "./TinyMusic";
const BG_MUSIC_NOTES = [
  'Gb4  w', 'B3  h', 'Db4  h', 'D4  e', 'E4  e', 'D4  e', 'C4  h', 'B3  h',
  'Gb4  w', 'B3  h', 'Db4  h', 'D4  e', 'E4  e', 'D4  e', 'F4  h', 'G4  h',
  'Gb4  w', 'B3  h', 'Db4  h', 'D4  e', 'E4  e', 'D4  e','C4  h', 'B3  h',
  'Gb4  w', 'G4  h', 'F4  h', 'E4  w', 'D4  h', 'E4  h',
];

const ac = new AudioContext();
const tempo = 240;

const bgMusicSeq = new TinyMusic.Sequence(ac, tempo, BG_MUSIC_NOTES);
bgMusicSeq.createCustomWave([-2, 2, 0.8]);
bgMusicSeq.loop = true;
bgMusicSeq.gain.gain.value = 0.1;
bgMusicSeq.waveType = 'square';

export function playBackgroundMusic () {
  bgMusicSeq.play();
}
