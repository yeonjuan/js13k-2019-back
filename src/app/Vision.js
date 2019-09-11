import {VISION_COLOR} from "./constants";
import {toRad} from "./Utils";

function isInBounds (p, bounds, fudge = 1){
  let a = bounds[0].x;
  let b = bounds[1].x;
  let c = bounds[0].y;
  let d = bounds[1].y;
  (a > b) && ([a, b] = [b, a]);
  (c > d) && ([c, d] = [d, c]);
  return p.x >= a - fudge && p.x <= b + fudge && p.y >= c - fudge && p.y <= d + fudge;
}

function getIntersection(line1, line2) {
  let A1 = line1[1].y - line1[0].y;
  let B1 = line1[0].x - line1[1].x;
  let C1 = A1 * line1[0].x + B1 * line1[0].y;

  let A2 = line2[1].y - line2[0].y;
  let B2 = line2[0].x - line2[1].x;
  let C2 = A2 * line2[0].x + B2 * line2[0].y;

  let det = A1*B2 - A2*B1;

  if (det !== 0) {
    let p = {
      x: (B2*C1 - B1*C2)/det,
      y: (A1*C2 - A2*C1)/det
    };

    if (isInBounds(p, line1, 1) && isInBounds(p, line2, 1)) {
      return p;
    }
  }
}

function getShorter(origin, end1, end2) {
  if (!end1) {
    return end2;
  }
  const end1dx = origin.x - end1.x;
  const end1dy = origin.y - end1.y;
  const end1Len = end1dx * end1dx + end1dy * end1dy;
  const end2dx = origin.x - end2.x;
  const end2dy = origin.y - end2.y;
  const end2Len = end2dx * end2dx + end2dy * end2dy;

  if(end1Len > end2Len) {
    return end2;
  }
  return end1;
}


class Vision {
  constructor (x, y, gap = 2, mapEdges, angleDeg, offsetDeg, radius) {
    this.origin = {x, y};
    this.gap = gap;
    this.mapEdges = mapEdges;
    this.offsetDeg = offsetDeg;
    this.angleDeg = angleDeg;
    this.radius = radius;
  }

  getIntersectionRange (edges) {
    let firstIntersection = null, lastIntersection = null;
    this.rayEnds.forEach(rayEnd => {
      edges.forEach(edge => {
        let intersection = getIntersection([this.origin, rayEnd], edge);
        if (intersection) {
          (lastIntersection) && (lastIntersection = intersection);
          if (!firstIntersection) {
            firstIntersection = intersection;
            lastIntersection = intersection;
          }
        }
      })
    });
    if (!firstIntersection) {
      return null;
    }
    return [firstIntersection, lastIntersection];
  }

  update(x, y, offsetDeg) {
    this.offsetDeg = offsetDeg;
    this.origin.x = x;
    this.origin.y = y;
    const endDeg = this.offsetDeg + this.angleDeg / 2;
    let endIndex = 0;
    let visionDeg = this.offsetDeg - this.angleDeg / 2;
    this.rayEnds = [];
    this.rayEnds.length = (this.angleDeg / this.gap) | 0;

    while (visionDeg < endDeg) {
      const visionRad = toRad(visionDeg);
      const visionEndX = this.origin.x + Math.cos(visionRad) * this.radius;
      const visionEndY = this.origin.y + Math.sin(visionRad) * this.radius;
      const visionEnd = {x: visionEndX, y: visionEndY};
      this.mapEdges.forEach(mapEdge => {
        const inter = getIntersection([this.origin, visionEnd], [mapEdge.start, mapEdge.end]);
        this.rayEnds[endIndex] = getShorter(this.origin, this.rayEnds[endIndex], inter || visionEnd);
      });
      visionDeg += this.gap;
      endIndex ++;
    }
  }

  render(ctx) {
    ctx.fillStyle = VISION_COLOR;
    ctx.beginPath();
    ctx.moveTo(this.origin.x, this.origin.y);
    this.rayEnds.forEach(end => end && ctx.lineTo(end.x, end.y));
    ctx.closePath();
    ctx.fill();
  }
}

export default Vision;
