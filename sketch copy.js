var inc = 0.1
var scl = 100;
var cols, rows;
var fr;
var zoff = 0;
var particles = [];
var flowfield;
var start_time;
var current_time;
var timespan = (2 * 60) * 1000;
var weights = [1,1,1,1,2,2,3,3,5,6,10,15,20];



function setup() {
  start_time = millis();
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  cols = floor(width / scl);
  rows = floor(height / scl);
  fr = createP('');
  flowfield = new Array(cols * rows);
  start();
}

function draw() {
  // background(255,);
  let yoff = 0;


  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(.2);
      flowfield[index] = v;
      xoff += inc
    }
    yoff += inc
    zoff += 0.0002;
  }

  for (i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update(); 
    particles[i].edges();
    particles[i].show();
    
  }
  
  current_time = millis();
  if (current_time > start_time + timespan) {
      start();
  }

  fr.html(floor(frameRate()))

  


}

function start() {
  console.log("in start");
  particles = [];
  start_time = millis();
  strokeWeight(random(weights));
  background(random(360),random(10,50),random(70,90),.8);
  for (let i = 0;  i < 500; i++) {
    particles[i] = new Particle();
  }
  
}
