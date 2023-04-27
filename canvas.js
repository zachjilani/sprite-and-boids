class Penguin {
  constructor(xPos, yPos, distance, time_delta, data) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.distance = distance;
    this.time_delta = time_delta;
    this.animation = 'idleWave';
    this.data = data
    this.img = new Image();
    this.index = 0;


    this.last_animation_time = new Date().getTime();
    // this.backgroundImage = null;
    // this.context = context;
    // this.velocity = [1, 1];
  }
  setAnimation(anim) {
    this.animation = anim;
  }
  setPosition(x, y) {
    this.xPos = x;
    this.yPos = y;
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
        this.yPos = this.yPos - this.distance;
        break;
      //E
      case 68:
        this.setAnimation('walk_E');
        this.xPos = this.xPos + this.distance;
        break;
      //S
      case 83:
        this.setAnimation('walk_S');
        this.yPos = this.yPos + this.distance;
        break;
      //W
      case 65:
        this.setAnimation('walk_W');
        this.xPos = this.xPos - this.distance;
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
    if(this.index > this.data[this.animation].length - 1){
      this.index = 0;
    }
    this.img.src = 'Penguins/' + this.animation + '/' + String(this.index) + '.png';
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(
      this.img,
      this.xPos,
      this.yPos,
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

}//end of Penguin Class


var jsondata = $.ajax({
  url: 'animationData.json',
  async: false,
  dataType: 'json'
}).responseJSON["TenderBud"];
const context = document.querySelector('canvas').getContext('2d', {alpha:false});
window.addEventListener('keydown', KeyPress, false);
window.addEventListener('keyup', function(e){
  p.setAnimation('idleWave');
})
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var p = new Penguin(
  xPos = 50,
  yPos = 50,
  distance = 10,
  time_delta = 99,
  jsondata
);

function KeyPress(key) {
  p.move(key);
}
var penguins = [p];
function animate() {
  requestAnimationFrame(animate);
  for(let p of penguins) {
    p.draw();
  }
}
animate();
