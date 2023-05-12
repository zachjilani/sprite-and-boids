class Vec {
  constructor(x, y) {
    if(x == 'undefined') {
      x = 0;
    }
    if(y == 'undefined') {
      y = 0;
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

  norm() {
    var mag = this.mag();
    return new Vec(this.x/mag, this.y/mag);
  }

  dist(vec) {
    return Math.sqrt((this.x - vec.x)*(this.x - vec.x)
    + (this.y - vec.y)*(this.y - vec.y));
  }

  lim(limit) {
    var vec;
    if(this.mag() > limit) {
      vec = this.norm().mul(new Vec(limit, limit));
    }else {
      vec = this;
    }
    return vec;
  }
}//end of Vec class

class Boid {
  constructor(upper) {
    this.position = new Vec(Math.floor((Math.random() * canvas.width + 1)), Math.floor((Math.random() * canvas.height + 1)));
    this.velocity = new Vec(Math.floor((Math.random() * 11) - 5), Math.floor((Math.random() * 11) - 5));
    this.acceleration = new Vec(0, 0);
    //min size is 6, max is 12
    this.size = Math.floor(Math.random() * (12 - 6 + 1) + 6)
    //seeing radius
    this.penguinRadius = 90;
    this.radius = 140;
    this.maxForce = 0.04;
    this.speed = 2;
    this.separationDistance = 80;
    this.randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    this.upper = upper;
  }

  draw() {
    this.upper.context.beginPath();
    this.upper.context.fillStyle = this.randomColor;
    //sets how transparent the boid is
    this.upper.context.globalAlpha = 0.8;
    this.upper.context.arc(this.position.x, this.position.y, this.size, 0, 2*Math.PI);
    this.upper.context.fill();
  }

  update() {
    this.force(this.alignment());
    this.force(this.separation());
    this.force(this.cohesion());
    this.force(this.penguin());


    this.velocity = this.velocity.add(this.acceleration);
    this.velocity = this.velocity.lim(this.speed);

    this.position = this.position.add(this.velocity);

    this.acceleration = this.acceleration.mul(new Vec(0, 0));

    this.edges();
  }

  find(target) {
    var desired = target.sub(this.position);
    desired = desired.norm();
    desired = desired.mul(new Vec(this.speed, this.speed));

    var steering = desired.sub(this.velocity);
    steering = steering.lim(0.5);
    return steering;
  }

  penguin() {
    if(penguinPos != 0 && this.position.dist(this.upper.penguinPos) < this.penguinRadius) {
      //wanting boids to be above the middle of penguin head
      var center = new Vec(this.upper.penguinPos.x + 40, this.upper.penguinPos.y - 10)
      return this.find(center);
    }else {
      return new Vec(0, 0);
    }
  }

  cohesion() {
    var sum = new Vec(0, 0);
    var steering = new Vec(0, 0);
    var total = 0;

    for(let i = 0; i < this.upper.boids.length; i++) {
      let d = this.position.dist(this.upper.boids[i].position);
      if(d > 0 && d < this.radius) {
        sum = sum.add(this.upper.boids[i].velocity);
        total++;
      }
    }
    if(total > 0) {
      sum = sum.div(new Vec(total, total));
      var desired = sum.sub(this.velocity);
      desired = desired.norm().mul(new Vec(this.speed, this.speed));
      steering = desired.sub(this.velocity);
      steering = steering.lim(this.maxForce);
    }
    return steering;
  }

  separation() {
    var steering = new Vec(0, 0);
    var total = 0;

    for(let i = 0; i < this.upper.boids.length; i++) {
      let d = this.position.dist(this.upper.boids[i].position) - (this.size);
      if(d > 0 && d < this.separationDistance) {
        var difference = this.position.sub(this.upper.boids[i].position);
        difference = difference.norm();
        difference = difference.div(new Vec(d, d));
        steering = steering.add(difference);
        total++;
      }
    }
    if(total > 0) {
      steering = steering.div(new Vec(total, total));
      steering = steering.norm();
      steering = steering.mul(new Vec(this.speed, this.speed));
      steering = steering.sub(this.velocity);
      steering = steering.lim(this.maxForce);
    }
    return steering;
  }

  alignment() {
    var sum = new Vec(0, 0);
    var steering = new Vec(0, 0);
    var total = 0;

    for(let i = 0; i < this.upper.boids.length; i++) {
      let d = this.position.dist(this.upper.boids[i].position);
      if(d > 0 && d < this.radius) {
        sum = sum.add(this.upper.boids[i].velocity);
        total++;
      }
    }
    if(total > 0) {
      sum = sum.div(new Vec(total, total));
      sum = sum.norm();
      sum = sum.mul(new Vec(this.speed, this.speed));
      steering = sum.sub(this.velocity);
      steering = steering.lim(this.maxForce);
    }
    return steering;
  }

  force(f) {
    this.acceleration = this.acceleration.add(f.div(new Vec(this.size, this.size)));
  }

  edges() {
    if(this.position.x < 0) {
      this.position.x = canvas.width
    }
    if(this.position.y < 0) {
      this.position.y = canvas.height
    }
    if(this.position.x > canvas.width) {
      this.position.x = 0
    }
    if(this.position.y > canvas.height) {
      this.position.y = 0
    }
  }
}//end Boids class
