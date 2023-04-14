class Penguin {//may change the constructor here, im unsure.
  constructor(width=0, height=0, x=0, y=0) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    img = new Image();
  }
  setImg(anim, frame) {
    img.src = 'Penguins/' + anim + '/' + String(frame) + '.png';
  }
}

var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
img = new Image();



var context = canvas.getContext('2d');
var x = 10;
var xdis = 10;
var last_animation_time = new Date().getTime();
var time_delta = 99;
var i = 0;
var jsondata = $.ajax({
  url: 'animationData.json',
  async: false,
  dataType: 'json'
}).responseJSON;
jsondata = jsondata["TenderBud"];


Array.prototype.random = function() {
  return this[Math.floor((Math.random()*this.length))];
}

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
  return idleArr.random();
}

function KeyPress(key) {
  switch(key.keyCode){
    //N
    case 87:
      dir = 'walk_N';
      break;
    //E
    case 68:
      dir = 'walk_E';
      break;
    //S
    case 83:
      dir = 'walk_S';
      break;
    //W
    case 65:
      dir = 'walk_W';
      break;
    default:
    //randomidleanim
      dir = 'none'
      break;
  }
}

function animate() {
  requestAnimationFrame(animate);
  if((time_delta+last_animation_time) > new Date().getTime()) {
    return;
  }
  last_animation_time = new Date().getTime();
  if(i > jsondata[rand].length - 1){
    i = 0;
  }
  img.src = 'Penguins/' + rand + '/' + String(i) + '.png';
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, x, 10, jsondata[rand][i]['w'], jsondata[rand][i]['h']);
  i++;
}

animate();