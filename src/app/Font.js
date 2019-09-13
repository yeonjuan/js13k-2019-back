/**
 * Refer to js13k-2018-raven.
 * @see https://github.com/PaulBGD/PixelFont
 */

const letters = {
    'A': [
      [, 1],
      [1, , 1],
      [1, , 1],
      [1, 1, 1],
      [1, , 1]
    ],
    'B': [
      [1, 1],
      [1, , 1],
      [1, 1, 1],
      [1, , 1],
      [1, 1]
    ],
    'C': [
      [1, 1, 1],
      [1],
      [1],
      [1],
      [1, 1, 1]
    ],
    'D': [
      [1, 1],
      [1, , 1],
      [1, , 1],
      [1, , 1],
      [1, 1]
    ],
    'E': [
      [1, 1, 1],
      [1],
      [1, 1, 1],
      [1],
      [1, 1, 1]
    ],
    'F': [
      [1, 1, 1],
      [1],
      [1, 1],
      [1],
      [1]
    ],
    'G': [
      [, 1, 1],
      [1],
      [1, , 1, 1],
      [1, , , 1],
      [, 1, 1]
    ],
    'H': [
      [1, , 1],
      [1, , 1],
      [1, 1, 1],
      [1, , 1],
      [1, , 1]
    ],
    'I': [
      [1, 1, 1],
      [, 1],
      [, 1],
      [, 1],
      [1, 1, 1]
    ],
    'J': [
      [1, 1, 1],
      [, , 1],
      [, , 1],
      [1, , 1],
      [1, 1, 1]
    ],
    'K': [
      [1, , , 1],
      [1, , 1],
      [1, 1],
      [1, , 1],
      [1, , , 1]
    ],
    'L': [
      [1],
      [1],
      [1],
      [1],
      [1, 1, 1]
    ],
    'M': [
      [1, 1, 1, 1, 1],
      [1, , 1, , 1],
      [1, , 1, , 1],
      [1, , , , 1],
      [1, , , , 1]
    ],
    'N': [
      [1, , , 1],
      [1, 1, , 1],
      [1, , 1, 1],
      [1, , , 1],
      [1, , , 1]
    ],
    'O': [
      [1, 1, 1],
      [1, , 1],
      [1, , 1],
      [1, , 1],
      [1, 1, 1]
    ],
    'P': [
      [1, 1, 1],
      [1, , 1],
      [1, 1, 1],
      [1],
      [1]
    ],
    'Q': [
      [0, 1, 1],
      [1, , , 1],
      [1, , , 1],
      [1, , 1, 1],
      [1, 1, 1, 1]
    ],
    'R': [
      [1, 1],
      [1, , 1],
      [1, , 1],
      [1, 1],
      [1, , 1]
    ],
    'S': [
      [1, 1, 1],
      [1],
      [1, 1, 1],
      [, , 1],
      [1, 1, 1]
    ],
    'T': [
      [1, 1, 1],
      [, 1],
      [, 1],
      [, 1],
      [, 1]
    ],
    'U': [
      [1, , 1],
      [1, , 1],
      [1, , 1],
      [1, , 1],
      [1, 1, 1]
    ],
    'V': [
      [1, , , , 1],
      [1, , , , 1],
      [, 1, , 1],
      [, 1, , 1],
      [, , 1]
    ],
    'W': [
      [1, , , , 1],
      [1, , , , 1],
      [1, , , , 1],
      [1, , 1, , 1],
      [1, 1, 1, 1, 1]
    ],
    'X': [
      [1, , , , 1],
      [, 1, , 1],
      [, , 1],
      [, 1, , 1],
      [1, , , , 1]
    ],
    'Y': [
      [1, , 1],
      [1, , 1],
      [, 1],
      [, 1],
      [, 1]
    ],
    'Z': [
      [1, 1, 1, 1, 1],
      [, , , 1],
      [, , 1],
      [, 1],
      [1, 1, 1, 1, 1]
    ],
    '0': [
      [1, 1, 1],
      [1, , 1],
      [1, , 1],
      [1, , 1],
      [1, 1, 1]
    ],
    '1': [
      [, 1],
      [, 1],
      [, 1],
      [, 1],
      [, 1]
    ],
    '2': [
      [1,1,1],
      [0,0,1],
      [1,1,1],
      [1,0,0],
      [1,1,1]
    ],
    '3':[
      [1,1,1],
      [0,0,1],
      [1,1,1],
      [0,0,1],
      [1,1,1]
    ],
    '4':[
      [1,0,1],
      [1,0,1],
      [1,1,1],
      [0,0,1],
      [0,0,1]
    ],
    '5':[
      [1,1,1],
      [1,0,0],
      [1,1,1],
      [0,0,1],
      [1,1,1]
    ],
    '6':[
      [1,1,1],
      [1,0,0],
      [1,1,1],
      [1,0,1],
      [1,1,1]
    ],
    '7':[
      [1,1,1],
      [0,0,1],
      [0,0,1],
      [0,0,1],
      [0,0,1]
    ],
    '8':[
      [1,1,1],
      [1,0,1],
      [1,1,1],
      [1,0,1],
      [1,1,1]
    ],
    '9':[
      [1,1,1],
      [1,0,1],
      [1,1,1],
      [0,0,1],
      [1,1,1]
    ],
    ' ': [
      [, ,],
      [, ,],
      [, ,],
      [, ,],
      [, ,]
      ]
};

export function drawFont(context, string, size, px, py) {
  //context.clearRect(0, 0, canvas.width, canvas.height);

  var needed = [];
  string = string.toUpperCase(); // because I only did uppercase letters
  for (var i = 0; i < string.length; i++) {
    var letter = letters[string.charAt(i)];
    if (letter) { // because there's letters I didn't do
      needed.push(letter);
    }
  }

  context.fillStyle = 'white';
  var currX = px;
  for (i = 0; i < needed.length; i++) {
    letter = needed[i];
    var currY =py;
    var addX = 0;
    for (var y = 0; y < letter.length; y++) {
      var row = letter[y];
      for (var x = 0; x < row.length; x++) {
        if (row[x]) {
          context.fillRect(currX + x * size, currY, size, size);
        }
      }
      addX = Math.max(addX, row.length * size);
      currY += size;
    }
    currX += size + addX;
  }
}

class Font {
  constructor (text, x, y, size) {
    this.text = text;
    this.progress = 0;
    this.time = 1;
    this.x = x;
    this.y = y;
    this.size = size;
    this.fullFill = false;
  }

  init () {
    this.fullFill = false;
    this.progress = 0;
    this.time = 2;
  }

  update(time) {
    this.time -= time;
    if (this.time < 0) {
      this.progress ++;
      if (this.progress > this.text.length) {
        this.progress = this.text.length;
        this.fullFill = true;
      }
      this.time = 2;
    }
  }

  render(ctx) {
    drawFont(ctx, this.text.substr(0, this.progress), this.size, this.x, this.y);
  }
}

export default Font;
