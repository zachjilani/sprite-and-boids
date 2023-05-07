var context = document.querySelector('canvas').getContext('2d',{willReadFrequently: true}, {alpha:false});
//window.addEventListener('keydown', KeyPress, false);
window.addEventListener('keyup', function(){
  //leader.setAnimation('idleWave');
})
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// function KeyPress(key) {
//   leader.move(key);
// }
// var leader = new Penguin(context, lead=true);
var boids = []
for(let i = 0; i < 20; i++) {
  boids.push(new Boid(this))
}
function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  for(let boid of boids) {
    boid.update();
    boid.draw();
    // p.flock(penguins);
    // p.update();
    // p.draw();
  }
}
animate();
