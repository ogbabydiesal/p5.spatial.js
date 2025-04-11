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
    
}

console.log(quad);

class AudioSource {
    constructor(speakerPositions, pickupRadius = 100, context) {
        this.context = context || getAudioContext();
        this.speakerPositions = speakerPositions || quad();
        this.outputNames = Object.keys(speakerPositions);
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
        
    }

    //given the coordinates update the position of the audio in all of the channels
    move(x, y) {
        this.outputNames.forEach ((key, index) => {
            //calculate the distance from the source to each speaker
            let now = this.context.currentTime;
            let distance = 1 - constrain(map(dist(x, y, this.speakerPositions[key].x, this.speakerPositions[key].y), 0, this.pickupRadius, 0, 1), 0, 1);
            this.gains[index].gain.setTargetAtTime(distance, now, 0.01);
        });
    }

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

p5.AudioOut = AudioOut;
p5.AudioSource = AudioSource;
