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
  
  //vector functions based off mathematical properties of vectors
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
  //magnitude
  mag() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }
  //normalization
  norm() {
    var mag = this.mag();
    return new Vec(this.x/mag, this.y/mag);
  }
  //finding the distance between two vectors
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
    
    //creating new positions and velocities between a random min and max for each boid
    this.position = new Vec(Math.floor((Math.random() * canvas.width + 1)), Math.floor((Math.random() * canvas.height + 1)));
    this.velocity = new Vec(Math.floor((Math.random() * 11) - 5), Math.floor((Math.random() * 11) - 5));

    //accerleration is initially 0 but will be added to over time
    this.acceleration = new Vec(0, 0);
    
    //min size is 6, max is 12
    this.size = Math.floor(Math.random() * (12 - 6 + 1) + 6)
    
    //boid seeing penguin radius
    this.penguinRadius = 90;
    
    //boid seeing radius
    this.radius = 140;
    
    //maximum force to be applied
    this.maxForce = 0.04;
    
    //max speed applied to each boid
    this.speed = 2;
    
    //how far each boid will try to separate from one another
    this.separationDistance = 80;
    
    //random coloring
    this.randomColor = "#" + Math.floor(Math.random()*16777215).toString(16);
    
    //we need this to have a reference to the boid array
    this.upper = upper;
  }
  
  //function to actually draw the boid
  draw() {
    this.upper.context.beginPath();
    this.upper.context.fillStyle = this.randomColor;
    //sets how transparent the boid is
    this.upper.context.globalAlpha = 0.8;
    this.upper.context.arc(this.position.x, this.position.y, this.size, 0, 2*Math.PI);
    this.upper.context.fill();
  }
  
  //this updates with each animate frame
  update() {
    
    //applying force to each portion of algorithm
    //if all boids are similar in size then this does not have to be done
    this.force(this.alignment());
    this.force(this.separation());
    this.force(this.cohesion());
    this.force(this.penguin());

    //updating velocity, position, and acceleration
    this.velocity = this.velocity.add(this.acceleration);
    this.velocity = this.velocity.lim(this.speed);

    this.position = this.position.add(this.velocity);

    this.acceleration = this.acceleration.mul(new Vec(0, 0));
    
    //calling edges so all boids wrap around screen
    this.edges();
  }

  //function returning vector towards a certain point
  find(target) {
    var desired = target.sub(this.position);
    desired = desired.norm();
    desired = desired.mul(new Vec(this.speed, this.speed));

    var steering = desired.sub(this.velocity);
    steering = steering.lim(0.5);
    return steering;
  }
  //function returns vector of where the penguin is otherwise just returns a new vector and boid behavior is normalized
  penguin() {
    if(penguinPos != 0 && this.position.dist(this.upper.penguinPos) < this.penguinRadius) {
      //wanting boids to be above the middle of penguin head
      var center = new Vec(this.upper.penguinPos.x + 40, this.upper.penguinPos.y - 10)
      return this.find(center);
    }else {
      return new Vec(0, 0);
    }
  }
  
  //*note* cohesion, alignment, and separation all work basically the same way as far as implementation goes. Just with slightly changed parameters
  
  cohesion() {
    //new vector creations
    var sum = new Vec(0, 0);
    var steering = new Vec(0, 0);
    var total = 0;
    
    //we have to check the distance between this boid and all other boids within a certain distance
    for(let i = 0; i < this.upper.boids.length; i++) {
      
      //finding the distance between this boid and all other boids
      let d = this.position.dist(this.upper.boids[i].position);
      
      //if the distance between this boid and another boid is within the boid seeing radius
      if(d > 0 && d < this.radius) {
        
        //our summed vector is the addition of both those vectors
        sum = sum.add(this.upper.boids[i].velocity);

        //we add to a total because more than one boid can be in range and have an effect on our current boid
        total++;
      }
    }

    //this can be factored out and made to be a function call from cohesion, separation, and alignment
    if(total > 0) {
      sum = sum.div(new Vec(total, total));
      var desired = sum.sub(this.velocity);
      
      //normalizing the vector
      desired = desired.norm().mul(new Vec(this.speed, this.speed));

      //subtracting velocity and limiting its maximum force
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
    //new vector creations
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
  
  //applying a force to the boids
  force(f) {
    this.acceleration = this.acceleration.add(f.div(new Vec(this.size, this.size)));
  }
  
  //making sure boids will wrap around edges of screen
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
