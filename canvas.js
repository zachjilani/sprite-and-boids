const context = document.querySelector('canvas').getContext('2d',{willReadFrequently: true}, {alpha:false});
window.addEventListener('keydown', KeyPress, false);
window.addEventListener('keyup', function(e){
  p.setAnimation('idle');
})
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var p = new Penguin(
  context
);





function KeyPress(key) {
  p.move(key);
}
var penguins = [p]

for(let i = 0; i < 10; i++) {
  penguins.push(new Penguin(context))
}
function animate() {
  requestAnimationFrame(animate);
  for(let p of penguins) {
    p.draw();
  }
}
animate();
