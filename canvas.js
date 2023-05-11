var context = document.querySelector('canvas').getContext('2d',{willReadFrequently: true}, {alpha:false});
window.addEventListener('keydown', function(key){
  p.move(key)
}, false);
window.addEventListener('keyup', function(){
  p.setAnimation('idle');
  this.penguinPos = p.position;
});

this.penguinPos = 0
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var p = new Penguin(this);


var boids = [];
for(let i = 0; i < 30; i++) {
  boids.push(new Boid(this))
}
function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  p.draw();
  p.edges();
  for(let boid of boids) {
    boid.alignment();
    boid.update();
    boid.draw();
  }
}
animate();
