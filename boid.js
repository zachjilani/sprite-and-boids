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
  constructor(context) {
    this.position = new Vec(Math.floor((Math.random() * canvas.width) - 10), Math.floor((Math.random() * canvas.height) - 10));
    this.velocity = new Vec(Math.floor((Math.random() * 20) - 10), Math.floor((Math.random() * 20) - 10));
    this.acceleration = new Vec(0,0);
    this.context = context;
    this.size = 8;
    this.radius = 150;
    this.maxForce = 0.04;
    this.separationDistance = 80;
  }

  draw() {
    this.context.beginPath();
    this.context.fillStyle = 'white';
    this.context.globalAlpha = 0.7;
    this.context.arc(this.position.x, this.position.y, this.size, 0, 2*Math.PI);
    this.context.fill();
  }

  update() {
    this.position = this.position.add(this.velocity);
    this.velocity = this.velocity.add(this.acceleration);
    this.edges();
  }

  cohesion() {
    var sum = new Vec(0,0);
    var count = 0;
  }

  separation() {
  }

  alignment() {
    var sum = new Vector(0,0);
    var total = 0;

  }

  edges() {
    if(this.position.x < 0) {this.position.x = canvas.width};
    if(this.position.y < 0) {this.position.y = canvas.height};
    if(this.position.x > canvas.width) {this.position.x = 0};
    if(this.position.y > canvas.height) {this.position.y = 0};
  }

  // force(force) {
  //   this.acceleration = this.acceleration.add(force.div())
  // }

  seek() {
  }
}//end Boids class
