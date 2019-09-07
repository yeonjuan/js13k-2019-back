function getRandomArbitrary(min, max) { return Math.random() * (max - min) + min; }

class Scatter {
  constructor (particleNum, time = 30, color = 'black', speed = 3, minR = 5, maxR = 10) {
    this.time = time;
    this.color = color;
    this.alive = false;
    this.particles = Array
      .from({length: particleNum},
      () => ({
        radius: getRandomArbitrary(minR,maxR),
        xSpeed: getRandomArbitrary(-speed, speed),
        ySpeed: getRandomArbitrary(-speed, speed / 3),
        time: getRandomArbitrary(20, this.time),
        x: 0,
        y: 0,
      }));
  }

  generate(x, y) {
    if (this.alive) {
      return;
    }
    this.alive = true;
    this.particles.forEach(ptc => {
      ptc.x = x;
      ptc.y = y;
    });
  }

  update (time) {
    if (this.alive) {
      this.time -= time;
      if (this.time < 0) {
        this.alive = false;
        this.time = 30;
      }
      this.particles.forEach(ptc => {
        ptc.x += ptc.xSpeed;
        ptc.y += ptc.ySpeed;
      });
    }
  }

  render (ctx) {
    if (this.alive) {
      ctx.fillStyle = this.color;
      this.particles.forEach(ptc => {
        ctx.beginPath();
        ctx.arc(ptc.x, ptc.y, ptc.radius, 0, 2 * Math.PI);
        ctx.fill();
      });
    }
  }
}

export default Scatter;
