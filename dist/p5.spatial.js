//TODO: this is a stub for AudioOut
class AudioOut {
    constructor(context, inputs) {
        this.context = context;
    }
}

function quad() {
  return {
    out_1 : {
      x: 0,
      y: 0,
      w: 10,
      h: 10
    },
    out_2 : {
      x: width,
      y: 0,
      w: 10,
      h: 10
    },
    out_3 : {
      x: width,
      y: height,
      w: 10,
      h: 10
    },
    out_4 : {
      x: 0,
      y: height,
      w: 10,
      h: 10
    }
  } 
}

function octophonic() {
  // Calculate center point
  const centerX = width / 2;
  const centerY = height / 2;
  // Calculate radius (slightly smaller than half the minimum dimension)
  const radius = width / 2;
  
  // Create 8 evenly spaced points in a circle
  return {
    out_1: {  // top
      x: centerX,
      y: centerY - radius,
      w: 10,
      h: 10
    },
    out_2: {  // top-right
      x: centerX + radius * 0.7071,  // cos(45°) ≈ 0.7071
      y: centerY - radius * 0.7071,      // sin(45°) ≈ 0.7071
      w: 10,
      h: 10
    },
    out_3: {  // right
      x: centerX + radius,
      y: centerY,
      w: 10,
      h: 10
    },
    out_4: {  // bottom-right
      x: centerX + radius * 0.7071,
      y: centerY + radius * 0.7071,
      w: 10,
      h: 10
    },
    out_5: {  // bottom
      x: centerX,
      y: centerY + radius,
      w: 10,
      h: 10
    },
    out_6: {  // bottom-left
      x: centerX - radius * 0.7071,
      y: centerY + radius * 0.7071,
      w: 10,
      h: 10
    },
    out_7: {  // left
      x: centerX - radius,
      y: centerY,
      w: 10,
      h: 10
    },
    out_8: {  // top-left
      x: centerX - radius * 0.7071,
      y: centerY - radius * 0.7071,
      w: 10,
      h: 10
    }
  }
}

function fivePointOne() {
  return {
    out_1: {  // front left
      x: 0,
      y: 0,
      w: 10,
      h: 10
    },
    out_2: {  // front right
      x: width,
      y: 0,
      w: 10,
      h: 10
    },
    out_3: {  // center
      x: width / 2,
      y: 0,
      w: 10,
      h: 10
    },
    out_4: {  // rear left
      x: 0,
      y: height,
      w: 10,
      h: 10
    },
    out_5: {  // rear right
      x: width,
      y: height,
      w: 10,
      h: 10
    }
  }
}

class AudioSource {
    //if no pickup radius is given, determine how many speakers are in the layout and set the pickup radius to that number
    constructor(speakerPositions, pickupRadius = (width / speakerPositions.length * speakerPositions.length), context) {
        if (typeof speakerPositions == 'string') { 
            if (speakerPositions == 'quad') {
                speakerPositions = quad();
            }
            if (speakerPositions == 'octophonic') {
                speakerPositions = octophonic();
            }
            if (speakerPositions == 'fivePointOne') {
                speakerPositions = fivePointOne();
            }
        }
        if (typeof speakerPositions == 'number') {
            pickupRadius = speakerPositions;
            speakerPositions = quad();
        }
        this.context = context || getAudioContext();
        this.speakerPositions = speakerPositions || quad();
        this.outputNames = Object.keys(this.speakerPositions);
        this.outputs = this.outputNames.length;
        let maxChannelCount = this.context.destination.maxChannelCount;
        this.context.destination.channelCount = maxChannelCount;
        this.audioSource = this.context.createGain();
        this.merger = this.context.createChannelMerger(this.outputs);
        this.gains = [];
        this.pickupRadius = pickupRadius;
        for (let i = 0; i < this.outputs; i++) {
            let speaker = this.context.createGain();
            this.audioSource.connect(speaker);
            speaker.gain.value = 0;
            speaker.connect(this.merger, 0, i);
            this.gains.push(speaker);
        }
        this.merger.connect(this.context.destination);
        this.x = width / 2;
        this.y = height / 2;
    }

    //given the coordinates update the position of the audio in all of the channels
    move(x, y) {
        this.x = x;
        this.y = y;
        this.outputNames.forEach ((key, index) => {
            //calculate the distance from the source to each speaker
            let now = this.context.currentTime;
            let distance = 1 - constrain(map(dist(x, y, this.speakerPositions[key].x, this.speakerPositions[key].y), 0, this.pickupRadius, 0, 1), 0, 1);
            this.gains[index].gain.setTargetAtTime(distance, now, 0.01);
        });
    }

    //render the layout of the speakers using p5.js rect
    renderLayout() {
        this.outputNames.forEach((key) => {
            let speaker = this.speakerPositions[key];
            push();
            rectMode(CENTER);
            fill(0, 0, 0, 150);
            rect(speaker.x, speaker.y, speaker.w, speaker.h);
            pop();
        });
    }

    //render the radius of the pickup area
    renderPickup() {
        this.outputNames.forEach((key) => {
            let speaker = this.speakerPositions[key];
            push();
            fill(0, 0, 0, 10);
            ellipse(speaker.x, speaker.y, this.pickupRadius * 2);
            pop();
        });
    }

    //render the audio source as a white square
    renderSource() {
        push();
        fill(255, 255, 255, 200);
        rectMode(CENTER);
        rect(this.x, this.y, 10, 10);
        pop();
    }

    //change the pickup radius of the audio source
    pickupRadius(x) {
        this.pickupRadius = x;
    }

    getNode() {
        return this.audioSource;
    }

    connect(destination) {
        this.audioSource.connect(destination.getNode());
    }
}

p5.prototype.quad = quad;
p5.prototype.octophonic = octophonic;
p5.prototype.fivePointOne = fivePointOne;

p5.AudioOut = AudioOut;
p5.AudioSource = AudioSource;
