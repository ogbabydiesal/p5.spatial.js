let osc, context;

let dragging = false;
let offsetX, offsetY;

let canvasWidth = 100;
let canvasHeight = 100;


let audioSource_1;

let speakers = {
  out_1 : {
    x: 0,
    y: 0,
    w: 10,
    h: 10
  },
  out_2 : {
    x: canvasWidth - 10,
    y: 0,
    w: 10,
    h: 10
  },
  out_3 : {
    x: canvasWidth - 10,
    y: canvasHeight - 10,
    w: 10,
    h: 10
  },
  out_4 : {
    x: 0,
    y: canvasHeight - 10,
    w: 10,
    h: 10
  } 
}

//initial position of source_1
let source_1 = {
  x: 20,
  y: 0,
  w: 10,
  h: 10
};

function preload() {
  //soundy = loadSound('assets/bowed gtr.mp3');
}

function setup() {
  createCanvas(400, 400);
  osc = new p5.Oscillator('sine');
  osc.freq(440);
  osc.disconnect();
  audioSource_1 = new p5.AudioSource('octaphonic');
  osc.connect(audioSource_1);
  
  background(220);
  textAlign(CENTER);
  textWrap(WORD);
}

function draw() {
  background(220);
  textSize(10);
  // Draw red block
  push();
  fill(255, 0, 0);
  rect(source_1.x, source_1.y, source_1.w, source_1.h);
  pop();
  
  //calculate distance from source_1 to each output
  audioSource_1.move(source_1.x, source_1.y);
  audioSource_1.renderLayout();
  audioSource_1.renderPickup();
  text('drag the red block around to pan the sound', 0, 20, 100);
}

function mousePressed() {
  //context.resume();
  osc.start();
  // Check if the mouse is over the red block
  if (
    mouseX > source_1.x &&
    mouseX < source_1.x + source_1.w &&
    mouseY > source_1.y &&
    mouseY < source_1.y + source_1.h
  ) {
    dragging = true;
    offsetX = mouseX - source_1.x;
    offsetY = mouseY - source_1.y;
  }
}

function mouseDragged() {
  if (dragging) {
    source_1.x = mouseX - offsetX;
    source_1.y = mouseY - offsetY;
  }
}

function mouseReleased() {
  dragging = false;
}