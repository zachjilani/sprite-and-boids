class Penguin {
  constructor(upper) {
    this.upper = upper;
    this.position = new Vec(canvas.width/2, canvas.height/2);
    this.distance = 30;
    this.index = 0;
    this.data = $.ajax({
      url: 'animationData.json',
      async: false,
      dataType: 'json'
    }).responseJSON["TenderBud"];
    this.animation = 'idle';
  }

  draw() {
    if(this.index > this.data[this.animation].length - 1){
      this.index = 0;
    }
    var newImg = new Image();
    newImg.src = 'Penguins/' + this.animation + '/' + String(Math.floor(this.index)) + '.png';
    this.upper.context.drawImage(newImg, this.position.x, this.position.y, 80, 80);
    this.index = this.index + 0.2;
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

  setAnimation(anim) {
    this.animation = anim;
  }

  move(key){
    switch(key.keyCode){
      case 87:
        this.setAnimation('walk_N');
        this.position.y = this.position.y - this.distance;
        break;
      case 68:
        this.setAnimation('walk_E');
        this.position.x = this.position.x + this.distance;
        break;
      case 83:
        this.setAnimation('walk_S');
        this.position.y = this.position.y + this.distance;
        break;
      case 65:
        this.setAnimation('walk_W');
        this.position.x = this.position.x - this.distance;
        break;
    }
  }
}
