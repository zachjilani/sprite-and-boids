class Penguin {
  constructor(upper) {
    
    //a reference to the context is needed
    this.upper = upper;

    //setting initial location and distance per frame of penguin
    this.position = new Vec(canvas.width/2, canvas.height/2);
    this.distance = 30;
    this.index = 0;

    //this is so that we load the penguin first before the program runs
    this.data = $.ajax({
      url: 'animationData.json',
      async: false,
      dataType: 'json'
    }).responseJSON["TenderBud"];
    this.animation = 'idle';
  }
  
  //function to draw the penguin
  draw() {
    if(this.index > this.data[this.animation].length - 1){
      this.index = 0;
    }
    //doing this makes it look like I lower the framerate when in reality it just the same frame 5 times
    var newImg = new Image();
    newImg.src = 'Penguins/' + this.animation + '/' + String(Math.floor(this.index)) + '.png';
    this.upper.context.drawImage(newImg, this.position.x, this.position.y, 80, 80);
    this.index = this.index + 0.2;
  }
  
  //penguin also wraps around screen
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
  
  //animation function for when a key is pressed and let up again for moving and idle poses
  setAnimation(anim) {
    this.animation = anim;
  }
  //cases are for W,A,S,D movement and sets correct animation, as well as accounts for distance
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
}//end of Penguin class
