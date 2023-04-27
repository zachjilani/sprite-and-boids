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
  time_delta = 99
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
