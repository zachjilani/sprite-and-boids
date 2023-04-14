class Penguin {//may change the constructor here, im unsure.
  constructor(width=0, height=0, x=0, y=0, image) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.image = image;
  }
  setImg(anim, frame) {
    image.src = 'Penguins/' + anim + '/' + String(frame) + '.png';
  }
}

var canvas = document.querySelector('canvas');
window.addEventListener('keydown', KeyPress, false);
window.addEventListener('keyup', function(e){
  anim = randomIdle();
  console.log("key up");
})

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
img = new Image();
//var p = new Penguin(new Image());



var context = canvas.getContext('2d');
var x = 10;
var y = 10;
var xdis = 5;
var ydis = 5;
var last_animation_time = new Date().getTime();
var time_delta = 99;
var i = 0;
var jsondata = $.ajax({
  url: 'animationData.json',
  async: false,
  dataType: 'json'
}).responseJSON;
jsondata = jsondata["TenderBud"];

var anim = randomIdle();
console.log(anim);

function randomIdle() {
  idleArr = [
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
      anim = 'walk_N';
      y = y - ydis;
      break;
    //E
    case 68:
      anim = 'walk_E';
      x = x + xdis;
      break;
    //S
    case 83:
      anim = 'walk_S';
      y = y + ydis;
      break;
    //W
    case 65:
      anim = 'walk_W';
      x = x - xdis;
      break;
    default:
      break;
  }
}

function animate() {
  requestAnimationFrame(animate);
  if((time_delta+last_animation_time) > new Date().getTime()) {
    return;
  }
  last_animation_time = new Date().getTime();
  if(i > jsondata[anim].length - 1){
    i = 0;
  }
  //p.setImg(rand, i)
  img.src = 'Penguins/' + anim + '/' + String(i) + '.png';
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, x, y, jsondata[anim][i]['w'], jsondata[anim][i]['h']);
  i++;
}

animate();