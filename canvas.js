class Penguin {
  constructor(xPos, yPos, distance, time_delta, data) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.xDis = distance;
    this.yDis = distance;
    this.data = data;
    this.time_delta = time_delta;
    this.image = new Image();
  }
  setImg(anim, frame) {
    this.image.src = 'Penguins/' + anim + '/' + String(frame) + '.png';
  }

  setPosition(x, y) {
    this.xPos = x;
    this.yPos = y;
  }

  setDistance(x, y) {
    this.xDis = x;
    this.yDis = y;
  }

  setDelta(delta) {
    this.time_delta = delta;
  }

  randomIdle() {
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
}//end of Penguin Class

var p = new Penguin(
  xPos = 50,
  yPos = 50,
  distance = 10,
  time_delta = 80,
  data = $.ajax({
    url: 'animationData.json',
    async: false,
    dataType: 'json'
  }).responseJSON["TenderBud"]
);

const canvas = document.querySelector('canvas');
window.addEventListener('keydown', KeyPress, false);
window.addEventListener('keyup', function(e){
  anim = randomIdle();
})
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
img = new Image();


const context = canvas.getContext('2d');
// var x = 50;
// var y = 50;
// var xdis = 10;
// var ydis = 10;
var last_animation_time = new Date().getTime();
// var time_delta = 80;
var i = 0;
// var jsondata = $.ajax({
//   url: 'animationData.json',
//   async: false,
//   dataType: 'json'
// }).responseJSON["TenderBud"];
//jsondata = jsondata["TenderBud"];

//var anim = randomIdle();
console.log(p.setImg());
console.log(p.image);

// function randomIdle() {
//   idleArr = [
//     "idle",
//     "idleBackAndForth",
//     "idleBreathing",
//     "idleFall",
//     "idleLayDown",
//     "idleLookAround",
//     "idleLookDown",
//     "idleLookLeft",
//     "idleLookUp",
//     "idleSit",
//     "idleSpin",
//     "idleWave"
//   ]
//   return idleArr[Math.floor(Math.random()*idleArr.length)];
// }

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

//animate();