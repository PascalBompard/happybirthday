var cols, rows, fr, flowfield, start_time, current_time, winW, winH, txtSize, weights, currentMessage;

var inc = 0.1
var scl = 100;
var zoff = 0;
var particles = [];
var timespan = (1 * 60) * 1000;
var message = [
  "This day will never come again and anyone who fails to eat and drink and taste and smell it will never have it offered to him again in all eternity. The sun will never shine as it does today...You must play your part and sing a song, one of your best. Hermann Hesse.","The need to be right is the sign of a vulgar mind. Albert Camus",
  "Life is sentimental. Why should I be cold and hard about it? That's the main content. The biggest thing in people's lives is their loves and dreams and visions, you know. Jim Harrison", "Man, sometimes it takes you a long time to sound like yourself. Miles Davis",
  "The more digital we have, the more naked skin and rawness we will want. Björk", 
  "And remember this: the page you are looking at now, I once typed the words with care with you in mind under a yellow light with the radio on. Charles Bukowski", 
  "It’s not so much staying alive, it’s staying human that’s important. What counts is that we don’t betray each other. George Orwell",  
  "What we see before us is just one tiny part of the world. We get in the habit of thinking, this is the world, but that's not true at all. The real world is a much darker and deeper place than this, and much of it is occupied by jellyfish and things. Haruki Murakami"
]

function setup() {
  start_time = millis();
  winW = windowWidth;
  winH = windowHeight;
  txtSize = winW/10;
  weights = winW/20;
  createCanvas(winW, winH);
  cols = floor(winW / scl);
  rows = floor(winH / scl);
  fr = createP('');
  flowfield = new Array(cols * rows);
  colorMode(HSB);
  start();
}

function draw() {
  
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
  
  push();
  fill(300,10,95)
  strokeWeight(5);
  textSize(txtSize);
  textLeading(txtSize)
  textAlign(CENTER, CENTER);
  text(currentMessage, 50, 50, winW-100, winH-100)
  pop();

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
  background(300,20,100);
  currentMessage = random(message);
  for (let i = 0;  i < 500; i++) {
    particles[i] = new Particle();
  }
  
}
