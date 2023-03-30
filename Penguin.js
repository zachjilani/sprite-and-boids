$.getJSON( "", function(data) {
  console.log(data);
})

class Penguin {
  constructor(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }
}