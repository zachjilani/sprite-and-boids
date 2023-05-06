class Vec {
  constructor(x, y) {
    if(x == 'undefined') {
      x = 0;
    }
    if(y == 'undefined') {
      y =0;
    }
    this.x = x;
    this.y = y;
  }

  add(vec) {
    return new Vec(this.x + vec.x, this.y + vec.y);
  }

  sub(vec) {
    return new Vec(this.x - vec.x, this.y - vec.y);
  }

  mul(vec) {
    return new Vec(this.x * vec.x, this.y * vec.y);
  }

  div(vec) {
    return new Vec(this.x/vec.x, this.y/vec.y);
  }

  mag() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }

  norm(vec) {
    var mag = this.mag;
    return new Vec(vec.x/mag, vec.y/mag);
  }

  dist(vec) {
    return Math.sqrt((this.x - vec.x)*(this.x - vec.x)
    + (this.y - vec.y)*(this.y - vec.y));
  }

  lim(limit) {
    var vec;
    if(this.mag() > limit) {
      vec = this.norm.mul(new Vec(limit, limit));
    }else {
      v = this;
    }
    return v;
  }
}//end of Vec class

class Boid {
  constructor() {
    this.position = new Vec(0,0);
    this.velocity = new Vec(0,0);
    this.acceleration = new Vec(0,0);
  }

  draw() {
  }

  update() {
  }

  cohesion() {
  }

  separation() {
  }

  alignment() {
  }

  edges() {
  }

  force() {
  }

  seek() {
  }
}//end Boids class
