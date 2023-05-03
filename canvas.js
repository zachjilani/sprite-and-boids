const context = document.querySelector('canvas').getContext('2d',{willReadFrequently: true}, {alpha:false});
window.addEventListener('keydown', KeyPress, false);
window.addEventListener('keyup', function(){
  leader.setAnimation('idleWave');
})
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function KeyPress(key) {
  leader.move(key);
}
var leader = new Penguin(context);
var penguins = [leader]
for(let i = 0; i < 10; i++) {
  penguins.push(new Penguin(context))
}
function animate() {
  requestAnimationFrame(animate);
  for(let p of penguins) {
    p.followMe(penguins)
    p.update();
    p.draw();
  }
}
animate();
