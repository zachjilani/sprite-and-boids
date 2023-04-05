var canvas = document.querySelector('canvas');


var init_size = true;
// window.addEventListener('resize', resizeCanvas, false);
// function resizeCanvas() {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   if(init_size){
//     init_size = false;
//     return;
//   }

// }
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
img = new Image();
// img.src = '0.png';


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

console.log(jsondata['idle'].length)





function animate() {
  requestAnimationFrame(animate);
  if((time_delta+last_animation_time) > new Date().getTime()) {
    return;
  }
  last_animation_time = new Date().getTime();
  if(i > jsondata['idle'].length - 1){
    i = 0;
  }
  img.src = 'Penguins/idle/' + String(i) + '.png';
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, x, 10, 100, 100);
  i++;
}

animate();