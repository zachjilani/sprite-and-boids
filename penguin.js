class Penguin {
  constructor(context) {
    this.position = [50, 50];
    this.distance = 10;
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
  }

  //figure out how to get rid of this
  setAnimation(anim) {
    this.animation = anim;
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
    this.img.src = 'Penguins/' + this.animation + '/' + String(this.index) + '.png';

    //this replaces bg image incompletely.
    this.backgroundImage = this.context.getImageData(
      this.position[0],
      this.position[1],
      this.data[this.animation][this.index]['w'],
      this.data[this.animation][this.index]['h']
      )
    this.index++;
    this.context.drawImage(
      this.img,
      this.position[0],
      this.position[1],
      this.data[this.animation][this.index]['w'],
      this.data[this.animation][this.index]['h']
      );
    //something is wrong here
    if(this.position[0] < 0
      || this.position[1] < 0
      || this.position[0] > canvas.width
      || this.position[1] > canvas.height
      ) {this.position = [0,0];}
  }
}//end of Penguin Class
