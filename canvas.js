const context = document.querySelector('canvas').getContext('2d', {alpha:false});
window.addEventListener('keydown', KeyPress, false);
window.addEventListener('keyup', function(e){
  p.setAnimation('idle');
})
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var p = new Penguin(
  position=[50, 50],
  distance = 10,
  time_delta = 99
);

//LOL
//var bunch = []
// for(let i=0; i<50; i++) {
//   let x = Math.floor(Math.random() * canvas.width) + 1;
//   let y = Math.floor(Math.random() * canvas.height) + 1;
//   bunch.push(new Penguin([x, y], 10, 99));
// }





function KeyPress(key) {
  p.move(key);
}
var penguins = [p]
function animate() {
  requestAnimationFrame(animate);
  for(let p of penguins) {
    p.draw();
  }
}
animate();
