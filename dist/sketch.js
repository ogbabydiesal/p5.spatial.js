/*
let osc

let dragging = false;
let offsetX, offsetY;

let canvasWidth = 100;
let canvasHeight = 100;

let audioSource_1;

//initial position of source_1
let source_1 = {
  x: 200,
  y: 100,
  w: 10,
  h: 10
};

function setup() {
  createCanvas(400, 400);
  osc = new p5.Oscillator('sine');
  osc.freq(440);
  osc.disconnect();
  audioSource_1 = new p5.AudioSource('5.1', 200);
  osc.connect(audioSource_1);
  
  background(220);
  textAlign(CENTER);
  textWrap(WORD);
  textSize(16);
}

function draw() {
  background(220);
  text('drag the white block around to pan the sound', 0, 20, width);
  
  audioSource_1.renderLayout();
  audioSource_1.renderPickup();
  audioSource_1.move(source_1.x, source_1.y);
  audioSource_1.renderSource();
}

function mousePressed() {
  osc.start();
  // Check if the mouse is over the white block
  if (
    mouseX > source_1.x - source_1.w &&
    mouseX < source_1.x + source_1.w &&
    mouseY > source_1.y - source_1.h &&
    mouseY < source_1.y + source_1.h
  ) {
    dragging = true;
    offsetX = mouseX ;
    offsetY = mouseY;
  }
}

function mouseDragged() {
  if (dragging) {
    source_1.x = mouseX;
    source_1.y = mouseY;
  }
}

function mouseReleased() {
  dragging = false;
}
*/
// let counter;
// function setup() {
//   createCanvas(400, 400);
//   osc = new p5.Oscillator('sine');
//   osc.freq(440);
//   osc.disconnect();
//   counter = 0;

//   audioSource_1 = new p5.AudioSource('octophonic', 200);
//   //create a subwoofer output 
//   //subOut = new p5.ChannelOut(3);

//   osc.connect(audioSource_1);
//   //osc.connect(subOut);

// }

// function draw() {
//   console.log(random(0, 8))
//   background(220);
//   counter++;
//   //subOut.switch(floor(random(7)));
//   osc.freq(440 + counter * 100);
//   if (counter >= 9) {
//     counter = -1;
//   }
//   text('drag the white block around to pan the sound', 0, width, width);
//   audioSource_1.renderLayout();
//   audioSource_1.renderDistance();
//   audioSource_1.move(mouseX, mouseY);
//   audioSource_1.renderSource();
// }

// function mousePressed() {
//   osc.start();
// }



function setup() {
  cnv = createCanvas(300, 300)

  cnv.mousePressed(startSound)
  background(220)
  osc = new p5.Oscillator()
  osc.disconnect()
  spat = new p5.AudioSource('quad', 300);
  osc.connect(spat)  
}


function draw() {
  background(220)
  frameRate(3)
  spat.renderLayout()
  spat.move(width/2, height/2)
  spat.renderDistance()
  spat.renderSource()
}

function startSound() {
  osc.start()
}

