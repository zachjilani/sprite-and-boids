var jsondata = $.ajax({
  url: 'animationData.json',
  async: false,
  dataType: 'json'
}).responseJSON;

class Penguin {
  constructor(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
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
}