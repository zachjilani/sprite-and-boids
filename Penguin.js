var jsondata = $.ajax({
  url: 'animationData.json',
  async: false,
  dataType: 'json'
}).responseJSON;
var dir;

Array.prototype.random = function() {
  return this[Math.floor((Math.random()*this.length))];
}
class Penguin {
  constructor(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    img = new Image();
  }
  //maybe need an img src method?

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
    return idleArr.random();
  }
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
  //need to move this into Penguin class
  img.src = 'Penguins/' + rand + '/' + String(i) + '.png';
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, x, 10, jsondata[rand][i]['w'], jsondata[rand][i]['h']);
  i++;
}

animate();