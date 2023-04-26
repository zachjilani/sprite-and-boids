class Penguin {
  constructor(xPos, yPos, distance, time_delta) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.distance = distance;
    this.time_delta = time_delta;
    this.animation = 'idle';


    // this.last_animation_time = new Date().getTime();
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

  draw() {
    var cur_time = new Date().getTime();
    if((this.time_delta + this.last_animation_time) > new Date().getTime()) {
      return;
    }
    if(this.backgroundImage != null) {
      this.context.putImageData(this.backgroundImage, this.xPos, this.yPos)
    }
    requestAnimationFrame(animate);
    // if((p.time_delta+last_animation_time) > new Date().getTime()) {
    //   return;
    // }
    //last_animation_time = new Date().getTime();
    //this needs to be redone based on class
    if(i > jsondata[p.animation].length - 1){
      i = 0;
    }
    img.src = 'Penguins/' + p.animation + '/' + String(i) + '.png';
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, p.xPos, p.yPos, jsondata[p.animation][i]['w'], jsondata[p.animation][i]['h']);
    i++;

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


var img = new Image();
var last_animation_time = new Date().getTime();
var i = 0;

/*
also tried this inside penguin class but kept running into errors.
i assume due to having a sync function before creating the object.
*/
var jsondata = $.ajax({
  url: 'animationData.json',
  async: false,
  dataType: 'json'
}).responseJSON["TenderBud"];
const context = document.querySelector('canvas').getContext('2d', {alpha:false});
window.addEventListener('keydown', KeyPress, false);
window.addEventListener('keyup', function(e){
  p.setAnimation(randomIdle());
})
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var p = new Penguin(
  xPos = 50,
  yPos = 50,
  distance = 10,
  time_delta = 99
);

/*
had this in penguin class at one point but felt like it ran slower when
it was in the class function. The screen flash i found is caused by this
randomly picked idle. I could remove it and change it to have only one
idle, but that would be boring.
*/
//remove this tbh
function randomIdle() {
  var idleArr = [
    "idle",
    "idleBackAndForth",
    "idleBreathing",
    "idleFall",
    "idleLayDown",
    "idleLookAround",
    "idleLookDown",
    "idleLookLeft",
    "idleLookUp",
    "idleSit",
    "idleSpin",
    "idleWave"
  ]
  return idleArr[Math.floor(Math.random()*idleArr.length)];
}
function KeyPress(key) {
  switch(key.keyCode){
    //N
    case 87:
      p.setAnimation('walk_N');
      p.yPos = p.yPos - p.distance;
      break;
    //E
    case 68:
      p.setAnimation('walk_E');
      p.xPos = p.xPos + p.distance;
      break;
    //S
    case 83:
      p.setAnimation('walk_S');
      p.yPos = p.yPos + p.distance;
      break;
    //W
    case 65:
      p.setAnimation('walk_W');
      p.xPos = p.xPos - p.distance;
      break;
    default:
      break;
  }
}
var penguins = [p];
function animate() {
  requestAnimationFrame(animate);
  if((p.time_delta+last_animation_time) > new Date().getTime()) {
    return;
  }
  last_animation_time = new Date().getTime();
  if(i > jsondata[p.animation].length - 1){
    i = 0;
  }
  img.src = 'Penguins/' + p.animation + '/' + String(i) + '.png';
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, p.xPos, p.yPos, jsondata[p.animation][i]['w'], jsondata[p.animation][i]['h']);
  i++;
  // for(let p of penguins) {
  //   p.draw();
  // }
}
animate();
