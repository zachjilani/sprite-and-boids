//getting the context
var context = document.querySelector('canvas').getContext('2d',{willReadFrequently: true}, {alpha:false});

//listener events for whenever the penguin moves and stops if the penguin is currently added
window.addEventListener('keydown', function(key){
  this.penguinPos = p.position;
  p.move(key)
}, false);
window.addEventListener('keyup', function(){
  p.setAnimation('idle');
  this.penguinPos = 0;
});

//defining an original value for the position of the penguin
this.penguinPos = 0
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//var p = new Penguin(this);
var boids = [];

//need to have a reference to the boid array, and context. so Boid class takes a reference to this to use later.
//creating array for 40 boids
for(let i = 0; i < 40; i++) {
  boids.push(new Boid(this))
}

//animate function that draws the penguin and boids
function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.width, canvas.height);
  p.draw();
  p.edges();
  for(let boid of boids) {
    boid.update();
    boid.draw();
  }
}
animate();
