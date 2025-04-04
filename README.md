# p5.spatial.js (sp5tial)
Have you ever wanted to pan your sounds in ```p5.sound.js``` through a multichannel speaker environment. No? Well now you can!  🔈🔈🔈🔈

sp5tial is not meant to replace the ```3DPanner``` object in ```p5.sound.js```, but rather to allow users of ```p5.js``` to create immersive experiences and spatialized sound art using multichannel speaker systems with web-based interfaces and libraries. 

Compose generative experiences with spatial sound sources by creating multiple instances of the ```p5.AudioSource``` class. Connect your sketch to quadraphonic and other non-traditional speaker setups!

For a quick example of the library in action serve the webpage found in the ```dist``` folder.
## Usage
1. Configure a multichannel interface as your default system audio output device. (i.e in  your Mac or Windows system preferences.)
2. Add the ```p5.spatial.js``` library after the ```p5.sound.js``` and ```p5.js``` core library
3. Create a ```JSON Object``` containing the positions of the virtual speakers in the top of your sketch using ```canvas``` coordinates. A standard quad setup in a clockwise channel configuration could look like this for example:
```
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
You don't need to specifiy the widths or heights (w, h) for the speakers but it may be helpful if you are visualizing the sources with ```rect(x,y,w,h)``` for example.

1. Get the ```AudioContext``` of the window and assign it to a varible with ```context = getAudioContext()```. 
2. Create a ```p5.sound.js``` audio graph and call ```disconnect()``` on the final node in the chain. We'll connect it to our spatial audio source class in just a moment. 
3. Create a ```new p5.AudioSource()``` class and pass in the ```context``` and the ```speaker layout object```. It should look something like ```audioSource_1 = new p5.AudioSource(context, speakers)```
4. Connect the ```p5.sound.js``` audio graph to the ```p5.AudioSource``` oject using the regular ```connect()``` method.
5. Call the ```move()``` method on the ```p5.AudioSource``` object and pass in the ```x``` and ```y``` coordinate of the sound source. ```p5.AudioSource()``` will automatically calculate the loudnesses of your sound source in individual speakers based on the proximity of the source to your virtual speakers. 
6. Make sure to call ```start()``` on any sound making objects in your sketch!

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