class Penguin {
  constructor(context,lead=false) {
    this.position = [Math.floor((Math.random() * canvas.width) - 10),
      Math.floor((Math.random() * canvas.height) - 10)];
    this.velocity = [Math.floor((Math.random() * 20) - 10),
      Math.floor((Math.random() * 20) - 10)];
    this.acceleration = [0, 0];
    this.distance = 1;
    this.time_delta = 99;
    this.animation = 'idleWave';
    this.img = new Image();
    this.index = 0;
    this.last_animation_time = new Date().getTime();
    this.data = $.ajax({
      url: 'animationData.json',
      async: false,
      dataType: 'json'
    }).responseJSON["TenderBud"];
    this.backgroundImage = null;
    this.context = context;
    this.lead = lead;
  }

  //figure out how to get rid of this
  setAnimation(anim) {
    this.animation = anim;
  }

  onEdge() {
    this.velocity = [Math.floor((Math.random() * 20) - 10),
      Math.floor((Math.random() * 20) - 10)];
    this.position = [Math.floor((Math.random() * canvas.width) - 10),
      Math.floor((Math.random() * canvas.height) - 10)];
  }

  move(key){
    switch(key.keyCode){
      //N
      case 87:
        this.setAnimation('walk_N');
        this.position[1] = this.position[1] - this.distance;
        break;
      //E
      case 68:
        this.setAnimation('walk_E');
        this.position[0] = this.position[0] + this.distance;
        break;
      //S
      case 83:
        this.setAnimation('walk_S');
        this.position[1] = this.position[1] + this.distance;
        break;
      //W
      case 65:
        this.setAnimation('walk_W');
        this.position[0] = this.position[0] - this.distance;
        break;
      default:
        break;
    }
  }

  draw() {
    if((this.time_delta + this.last_animation_time) > new Date().getTime()) {
      return;
    }
    this.last_animation_time = new Date().getTime();
    if(this.backgroundImage != null) {
      this.context.putImageData(this.backgroundImage, this.position[0], this.position[1]);
    }
    if(this.index > this.data[this.animation].length - 1){
      this.index = 0;
    }
    this.img.src = 'star.png';
    if(this.lead == true) {
      this.img.src = 'Penguins/' + this.animation + '/' + String(this.index) + '.png';
      this.position = [0,0];
    }
    //this.img.src = 'Penguins/' + this.animation + '/' + String(this.index) + '.png';

    //this replaces bg image incompletely.
    this.backgroundImage = this.context.getImageData(
      this.position[0],
      this.position[1],
      this.data[this.animation][this.index]['w']/4,
      this.data[this.animation][this.index]['h']/4
      )
    this.index++;
    this.context.drawImage(
      this.img,
      this.position[0],
      this.position[1],
      this.data[this.animation][this.index]['w']/4,
      this.data[this.animation][this.index]['h']/4
      );

    if(this.velocity[0] == 0 || this.velocity[1] == 0) {
      return;
    }
    //something is wrong here
    if(this.position[0] < 0
      || this.position[1] < 0
      || this.position[0] > canvas.width
      || this.position[1] > canvas.height
      //may not need this?
      && this.lead == false) {
        this.onEdge();
        return;
    }
  }

  /*All code here is to deal directly with flocking algorithm.*/
  addVector(vectorA, vectorB) {
    vectorA[0] = vectorA[0] + vectorB[0];
    vectorA[1] = vectorA[1] + vectorB[1];
  }

  subVector(vectorA, vectorB) {
    vectorA[0] = vectorA[0] - vectorB[0];
    vectorA[1] = vectorA[1] - vectorB[1];
  }

  howFar(pos_a, pos_b) {
    let x = pos_a[0] - pos_b[0];
    let y = pos_a[1] - pos_b[1];
    return Math.sqrt(x * x + y * y);
  }

  divide(vector, number) {
    for(let i of vector) {
      i = i/number;
    }
  }

  flock(obj) {
    let alignment = this.followMe(obj);
    //this.addVector(this.acceleration, alignment);
    this.acceleration = alignment;
  }

  update() {
    this.addVector(this.position, this.velocity);
    this.addVector(this.velocity, this.acceleration);
  }

  //separation
  goAway(arr) {
    let bubble = 50
  }
  //cohesion
  comeHere() {
  }
  //alignment
  followMe(arr) {
    let radius = 100;
    let total = 0;
    let steering = [0,0]
    for(let other of arr) {
      let d = this.howFar(this.position, other.position);
      if(other != this && d < radius) {
        this.addVector(steering, other.velocity);
        total++;
      }
    }
    if(total > 0) {
      this.divide(steering, total);
      this.subVector(steering, this.velocity);
    }
    return steering;
  }

}//end of Penguin Class
