class Penguin {
  //re-edit or hard code an initial/random position using []
  //need to figure out the contexts/ bg image
  constructor(position, distance, time_delta) {
    this.position = position
    this.distance = distance;
    this.time_delta = time_delta;
    this.animation = 'idle';
    this.img = new Image();
    this.index = 0;
    this.last_animation_time = new Date().getTime();
    this.data = $.ajax({
      url: 'animationData.json',
      async: false,
      dataType: 'json'
    }).responseJSON["TenderBud"];

    this.backgroundImage = null;
    // this.context = context;
    // this.velocity = [1, 1];
  }
  //figure out how to get rid of this
  setAnimation(anim) {
    this.animation = anim;
  }
  //use vectors for position, distance, and delta.
  setPosition(pos) {
    this.position[0] = pos[0];
    this.position[1] = pos[1];
  }
  setDistance(distance) {
    this.distance = distance
  }
  setDelta(delta) {
    this.time_delta = delta;
  }

  addVector(vec_a, vec_b) {
    //hardcoded diag for now, later call addVector for movement
    vec_a[0] = vec_a[0] + vec_b[0];
    vec_a[1] = vec_a[1] + vec_b[1];
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
      context.putImageData(this.backgroundImage, this.position[0], this.position[1]);
    }
    if(this.index > this.data[this.animation].length - 1){
      this.index = 0;
    }
    this.img.src = 'Penguins/' + this.animation + '/' + String(this.index) + '.png';
    //need to do something with these contexts.

    //this replaces bg image incompletely.
    this.backgroundImage = context.getImageData(
      this.position[0],
      this.position[1],
      this.data[this.animation][this.index]['w'],
      this.data[this.animation][this.index]['h']
      )
    //context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(
      this.img,
      this.position[0],
      this.position[1],
      this.data[this.animation][this.index]['w'],
      this.data[this.animation][this.index]['h']
      );
    this.index++;

    // if(this.velocity[0] == 0 || this.velocity[1] == 0) {
    //   return;
    // }
    // if(this.xPos < 0
    //   || this.yPos < 0
    //   || this.xPos > canvas.width
    //   || this.yPos > canvas.height) {
    //     this.velocity = [0, 0];
    //     return;
    // }
  }

  edges() {
    if(this.position[0] > width) {
      this.position[0] = 0;
    }else if(this.position[0] < 0) {
      this.position[0] = width;
    }
    if(this.position[1] > height) {
      this.position[1] = 0;
    }else if(this.position[1] < 0) {
      this.position[1] = height;
    }
  }

}//end of Penguin Class
