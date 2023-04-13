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

  animate() {
    requestAnimationFrame(animate);
    if((time_delta+last_animation_time) > new Date().getTime()) {
      return;
    }
    last_animation_time = new Date().getTime();
    if(x > window.innerWidth) {
      x = 10;
    }
    x = x + xdis;
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.drawImage(img, x, 10, 100, 200);
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