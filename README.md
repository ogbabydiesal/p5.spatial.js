# p5.spatial.js (sp5tial)
Have you ever wanted to pan your sounds in ```p5.sound.js``` through a multichannel speaker environment. No? Well now you can!  🔈🔈🔈🔈

p5.spatial.js is not meant to replace the ```p5.3DPanner``` class in ```p5.sound.js``` (which is great for creating virtual headphone environments), but rather to allow users of ```p5.js``` to create spatialized sound works using multichannel speaker systems in a web browser. 

Combine this library with your ```p5.js``` and ```p5.sound.js``` sketches to create moving and interactive spatialized sound objects with the included ```p5.AudioSource``` class. Connect your sketch to quadraphonic and other non-traditional speaker setups!

## A minimal code example
Below is a simple example of the multichannel audio class, ```p5.AudioSource```, from p5.spatial.js. A live example can be found [here](https://editor.p5js.org/thomasjohnmartinez/sketches/GR0uwnKSQ). Note how the audio node graph follows the same pattern found in ```p5.sound.js```, where source nodes can be chained to the spatial ```p5.AudioSource``` class using the ```connect()``` method. Calling ```p5.spatial.js``` with no arguments initializes a quadraphonic panner (with speakers in a clockwise layout). Custom speaker layouts can be defined using a ```JSON``` object that describes the position of each speaker in the system. An example of how these layouts should be formatted is illustrated in the General Usage section below. Calling the ```move(x, y)``` method on the ```p5.AudioSource``` object updates the position of the audio source and evaluates the gain relative to each channel in the speaker layout.
```javascript copy
let osc;
let spatSource;

let pos, speed; 

function setup() {
  createCanvas(100, 100);
  
  pos = createVector(0, 0);
  speed = createVector(1, 1.3);

  osc = new p5.Oscillator('sine');
  osc.disconnect();

  /*
  Creates a multichannel audio node and connects a sound source to it!
  */
  spatSource = new p5.AudioSource();
  osc.connect(spatSource);
  
  background(220);
  textAlign(CENTER);
  textWrap(WORD);
}

function draw() {
  background(220);
  textSize(10);
  
  pos.x += speed.x;
  pos.y += speed.y;
  
  if (pos.x < 0 || pos.x > width) { 
    speed.x *= -1;
  }
  
  if (pos.y < 0 || pos.y > height) { 
    speed.y *= -1;
  }
  
  //Draw a moving rectangle and attach a sound source to it
  rect(pos.x, pos.y, 10, 10);
  spatSource.move(pos.x, pos.y);
  
  text('click to start the sound', 0, 20, 100);
}

function mousePressed() {
  osc.start();
}
```

For more examples of the library in use see the p5 editor examples [here](https://editor.p5js.org/thomasjohnmartinez/collections/HK0ZrxLoQ). Additionally, the ```dist``` folder in this repo contains an example you can start with.
## General Usage
1. Configure a multichannel interface as the default system audio output device. (i.e in  your Mac or Windows system preferences.)
2. Add the ```p5.spatial.js``` library after the ```p5.sound.js``` and ```p5.js``` core library
3. (optional) Create a ```JSON Object``` containing the positions of the virtual speakers in the top of your sketch using ```canvas``` coordinates. A standard quad setup in a clockwise channel configuration might look like this for example:
```json
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
```
You don't need to specifiy the widths or heights (w, h) for the speakers but it may be helpful if you are visualizing the sources with ```rect(x,y,w,h)``` for example. By default ```p5.AudioSource()``` defaults to this configuration.

1. Create a ```p5.sound.js``` audio node graph and call ```disconnect()``` on the final node in the chain. We'll connect it to our spatial audio source class in just a moment. 
2. Create a ```new p5.AudioSource()``` class and optionally, a speaker layout 'object.' The pickup radius of the speakers is determined by the second argument. Your code might look something like ```audioSource_1 = new p5.AudioSource(speakers, 100)```. Additionally you maybe specify a built-in layout. Currently there are two, ```'quad'``` and ```'octaphonic'```. Create an octaphonic multichannel layout like this: ```p5.AudioSource('octaphonic', 45)```, where 45 adjusts the speaker's pickup radius.
3. Connect the ```p5.sound.js``` audio node graph to the ```p5.AudioSource``` oject using the regular ```connect()``` method.
4. Call the ```move()``` method on the ```p5.AudioSource``` object and pass in the ```x``` and ```y``` coordinate of the sound source. ```p5.AudioSource()``` will automatically calculate the loudnesses of your sound source in each speaker based on the proximity of the source to the virtual speakers. 
5. Make sure to call ```start()``` on any sound making objects in your sketch!
6. To visualize the speaker layout call the ```renderLayout()``` and ```renderPickup()``` methods. See this [example](https://editor.p5js.org/thomasjohnmartinez/sketches/qAKMyNI_q) for more info.

## Build from Source
Do you want to extend or add to the library? 

1. Clone the repo and run ```npm install``` to download the dependencies.
2. Create a new class like the ```AudioSource.js``` file in the ```src``` folder. 
3. Add that exported class to the ```app.js``` file. 
4. In the root directory use the ```npm run build``` command to build the library.
5. The built library will appear in the ```dist``` folder.

## To Do
1. Separate source and ouput logic so you can treat output channels with indepent effects.
2. Allow movement of speaker positions post-setup.
3. Create more examples with common speaker setups (8-channel cube, ring, etc...).
4. Make 3D examples using the ```WebGL``` property of ```canvas```.
5. Create flocking examples 🐥.
6. Allow the renderLayout and renderPickup methods to accept rgb values.