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
  //need to maybe clean this up and remove context since
  //im taking everything with parent here.
  constructor(upper) {
    this.position = new Vec(Math.floor((Math.random() * canvas.width) - 10), Math.floor((Math.random() * canvas.height) - 10));
    this.velocity = new Vec(Math.floor((Math.random() * 20) - 10), Math.floor((Math.random() * 20) - 10));
    this.acceleration = new Vec(0,0);
    this.size = 15;
    this.radius = 150;
    this.maxForce = 0.04;
    this.separationDistance = 80;
    this.randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    this.upper = upper;
  }

  draw() {
    this.upper.context.beginPath();
    this.upper.context.fillStyle = this.randomColor;
    this.upper.context.globalAlpha = 0.6;
    this.upper.context.arc(this.position.x, this.position.y, this.size, 0, 2*Math.PI);
    this.upper.context.fill();
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
    var sum = new Vec(0,0);
    var total = 0;

    for(let i = 0; i < this.upper.boids.length; i++) {
      let d = this.position.dist(this.upper.boids[i].position);
      if(d > 0 && d < this.radius) {
        sum = sum.add(this.upper.boids[i].velocity);
        total++;
      }
    }
    if(total > 0) {
      sum = sum.div(new Vec(count, count));
      sum = sum.norm();
      sum = sum.mul(new Vec())
    }

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
